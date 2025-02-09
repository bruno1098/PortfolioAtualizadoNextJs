"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function CertificateScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
    });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;

    // Criar hexágonos flutuantes para representar certificados
    const hexGroup = new THREE.Group();
    const hexGeometry = new THREE.CircleGeometry(1, 6);
    
    for (let i = 0; i < 12; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(`hsl(${i * 30}, 70%, 50%)`),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      
      const hex = new THREE.Mesh(hexGeometry, material);
      
      hex.position.x = (Math.random() - 0.5) * 10;
      hex.position.y = (Math.random() - 0.5) * 10;
      hex.position.z = (Math.random() - 0.5) * 10;
      
      hex.rotation.x = Math.random() * Math.PI;
      hex.rotation.y = Math.random() * Math.PI;
      
      hexGroup.add(hex);
    }
    
    scene.add(hexGroup);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);
      hexGroup.rotation.x += 0.001;
      hexGroup.rotation.y += 0.002;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 -z-10"
    />
  );
} 