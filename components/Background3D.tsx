"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer;

    try {
      // Configuração básica
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      
      renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
      });
      
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.innerHTML = ''; // Limpa qualquer canvas anterior
      containerRef.current.appendChild(renderer.domElement);

      // Criar partículas
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 2000;
      const posArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 8;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

      // Material das partículas com brilho
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.015,
        color: '#3b82f6',
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);

      camera.position.z = 2;

      // Manipulador de movimento do mouse
      const onMouseMove = (event: MouseEvent) => {
        mousePosition.current = {
          x: (event.clientX / window.innerWidth) * 2 - 1,
          y: -(event.clientY / window.innerHeight) * 2 + 1,
        };
      };

      // Redimensionamento
      const handleResize = () => {
        if (!containerRef.current) return;
        
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', handleResize);

      // Animação
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        particlesMesh.rotation.x += 0.0003;
        particlesMesh.rotation.y += 0.0005;

        particlesMesh.rotation.x += (mousePosition.current.y * 0.3 - particlesMesh.rotation.x) * 0.05;
        particlesMesh.rotation.y += (mousePosition.current.x * 0.3 - particlesMesh.rotation.y) * 0.05;

        renderer.render(scene, camera);
      };

      animate();

      // Cleanup
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        renderer.dispose();
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      };
    } catch (error) {
      console.error('Error initializing Three.js:', error);
      return () => {};
    }
  }, [mounted]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10"
      style={{ 
        pointerEvents: 'none',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.5s'
      }}
    />
  );
} 