
import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.005);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for(let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 120;
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.15,
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const geoGeometry = new THREE.IcosahedronGeometry(15, 1);
    const geoMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    const geoMesh = new THREE.Mesh(geoGeometry, geoMaterial);
    scene.add(geoMesh);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      particles.rotation.y += 0.0003;
      
      // Interaction au scroll
      const targetRotation = scrollY.current * 0.001;
      geoMesh.rotation.y += (targetRotation - geoMesh.rotation.y) * 0.05;
      geoMesh.rotation.x += 0.001;
      
      camera.position.z = 40 + (scrollY.current * 0.02);
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    const handleScroll = () => { scrollY.current = window.scrollY; };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) renderer.domElement.remove();
      geometry.dispose(); material.dispose();
      geoGeometry.dispose(); geoMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#020617]/50 via-transparent to-[#020617] pointer-events-none"></div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <span className={`text-[10px] uppercase tracking-[0.8em] text-blue-500 mb-12 block font-bold transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Full Stack Architect & Digital Visionary
        </span>
        <h1 className="text-6xl md:text-[10rem] font-serif font-bold mb-10 leading-[0.85] tracking-tighter">
          <span className={`block transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>HOUNTON</span>
          <span className={`block italic font-light text-slate-500 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>Fred Marc-Owen</span>
        </h1>
        <p className={`max-w-xl mx-auto text-slate-400 text-lg font-light leading-relaxed mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          L'alliance de la rigueur algorithmique et de la pureté visuelle. Façonner le futur, une ligne de code à la fois.
        </p>
      </div>
    </div>
  );
};
export default Hero;