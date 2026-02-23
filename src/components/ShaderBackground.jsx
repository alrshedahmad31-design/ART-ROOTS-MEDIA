import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * WebGL Shader Background — CMYK Print Edition
 * Four-wave CMYK color separation effect on Obsidian background
 * Cyan, Magenta, Yellow waves with slight offset — like print registration marks
 */
export default function ShaderBackground() {
    const canvasRef = useRef(null);
    const sceneRef = useRef({
        scene: null,
        camera: null,
        renderer: null,
        mesh: null,
        uniforms: null,
        animationId: null,
    });

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const { current: refs } = sceneRef;

        const vertexShader = `
            attribute vec3 position;
            void main() {
                gl_Position = vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            precision highp float;
            uniform vec2 resolution;
            uniform float time;
            uniform float xScale;
            uniform float yScale;
            uniform float distortion;

            float sat(float x) { return clamp(x, 0.0, 1.0); }

            // موجة مستقرة: تمنع الانفجار لما abs(...) تقرب للصفر
            float stableWave(float denom, float gain) {
                float a = abs(denom);
                a = max(a, 0.02);              // epsilon أهم سطر لمنع التشوه
                float w = gain / a;
                return sat(w);                 // clamp عشان ما تبيض الدنيا
            }

            void main() {
                vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

                float d = length(p) * distortion;

                // Registration offsets
                float cx = p.x * (1.0 + d * 1.2);
                float mx = p.x * (1.0 + d * 0.3);
                float yx = p.x * (1.0 - d * 0.8);
                float kx = p.x;

                // Denominators
                float denom_c = p.y + 0.02 + sin((cx + time * 0.95) * xScale) * yScale;
                float denom_m = p.y +        sin((mx + time * 1.05) * xScale) * yScale;
                float denom_y = p.y - 0.02 + sin((yx + time)       * xScale) * yScale;
                float denom_k = p.y +        sin((kx + time * 0.85) * xScale * 1.2) * (yScale * 0.8);

                // Plate “ink coverage”
                float C = stableWave(denom_c, 0.035);
                float M = stableWave(denom_m, 0.035);
                float Y = stableWave(denom_y, 0.035);
                float K = stableWave(denom_k, 0.018);

                // Base background (Obsidian-ish)
                vec3 base = vec3(0.05, 0.05, 0.07);

                // Pure CMY colors (screen-space approximation)
                vec3 colC = vec3(0.0, 1.0, 1.0);
                vec3 colM = vec3(1.0, 0.0, 1.0);
                vec3 colY = vec3(1.0, 1.0, 0.0);

                // Add inks on dark base (controlled)
                vec3 rgb = base;
                rgb += colC * (C * 0.65);
                rgb += colM * (M * 0.60);
                rgb += colY * (Y * 0.60);

                // Key plate darkens everything (registration feel)
                rgb *= (1.0 - K * 0.75);

                // Gentle tone control (optional but helps)
                rgb = clamp(rgb, 0.0, 1.0);

                gl_FragColor = vec4(rgb, 1.0);
            }
        `;

        const initScene = () => {
            refs.scene = new THREE.Scene();
            refs.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
            refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            refs.renderer.setClearColor(new THREE.Color(0x0D0D12));

            refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);

            refs.uniforms = {
                resolution: { value: [window.innerWidth, window.innerHeight] },
                time: { value: 0.0 },
                xScale: { value: 1.0 },
                yScale: { value: 0.5 },
                distortion: { value: 0.05 },
            };

            const position = [
                -1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                -1.0, 1.0, 0.0,
                1.0, -1.0, 0.0,
                -1.0, 1.0, 0.0,
                1.0, 1.0, 0.0,
            ];

            const positions = new THREE.BufferAttribute(new Float32Array(position), 3);
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', positions);

            const material = new THREE.RawShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: refs.uniforms,
                side: THREE.DoubleSide,
            });

            refs.mesh = new THREE.Mesh(geometry, material);
            refs.scene.add(refs.mesh);

            handleResize();
        };

        const animate = () => {
            if (refs.uniforms) refs.uniforms.time.value += 0.008;
            if (refs.renderer && refs.scene && refs.camera) {
                refs.renderer.render(refs.scene, refs.camera);
            }
            refs.animationId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            if (!refs.renderer || !refs.uniforms) return;
            const parent = canvas.parentElement;
            const width = parent ? parent.clientWidth : window.innerWidth;
            const height = parent ? parent.clientHeight : window.innerHeight;
            refs.renderer.setSize(width, height, false);
            refs.uniforms.resolution.value = [width, height];
        };

        initScene();
        animate();
        window.addEventListener('resize', handleResize);

        return () => {
            if (refs.animationId) cancelAnimationFrame(refs.animationId);
            window.removeEventListener('resize', handleResize);
            if (refs.mesh) {
                refs.scene?.remove(refs.mesh);
                refs.mesh.geometry.dispose();
                if (refs.mesh.material instanceof THREE.Material) {
                    refs.mesh.material.dispose();
                }
            }
            refs.renderer?.dispose();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ display: 'block' }}
        />
    );
}
