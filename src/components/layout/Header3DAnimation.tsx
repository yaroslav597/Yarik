import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Header3DAnimation: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Сцена, камера, рендерер
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 20, 10);
    scene.add(directionalLight);

    // Загрузка моделей
    const loader = new GLTFLoader();
    let boat: THREE.Group | null = null;
    let fisherman: THREE.Group | null = null;
    let swordfish: THREE.Group | null = null;

    loader.load('models/boat.glb', (gltf) => {
      boat = gltf.scene;
      boat.position.set(0, 0, 0);
      scene.add(boat);
    });

    loader.load('models/fisherman.glb', (gltf) => {
      fisherman = gltf.scene;
      fisherman.position.set(0, 0.5, 0);
      scene.add(fisherman);
    });

    loader.load('models/swordfish.glb', (gltf) => {
      swordfish = gltf.scene;
      swordfish.position.set(0, -1, -2);
      swordfish.visible = false;
      scene.add(swordfish);
    });

    // Вода (простая плоскость)
    const waterGeometry = new THREE.PlaneGeometry(50, 50);
    const waterMaterial = new THREE.MeshPhongMaterial({
      color: 0x1e90ff,
      transparent: true,
      opacity: 0.7,
    });
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = -Math.PI / 2;
    scene.add(water);

    // Анимация поклевки и прыжка рыбы
    let startTime: number | null = null;

    const animateSwordfishJump = (time: number) => {
      if (!startTime) startTime = time;
      const t = (time - startTime) / 1000; // секунды

      if (swordfish) {
        if (t > 1 && t < 3) {
          swordfish.visible = true;
          // Прыжок по параболе
          const jumpT = (t - 1) / 2;
          swordfish.position.set(0, 2 * Math.sin(Math.PI * jumpT), -2 + 4 * jumpT);
          swordfish.rotation.x = -Math.PI / 6 * Math.sin(Math.PI * jumpT);
        } else if (t >= 3) {
          swordfish.visible = false;
        }
      }

      renderer.render(scene, camera);
      if (t < 10) {
        requestAnimationFrame(animateSwordfishJump);
      }
    };

    requestAnimationFrame(animateSwordfishJump);

    // Обработка ресайза
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Очистка
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Dispose scene objects if needed
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '300px', height: '150px', position: 'relative', zIndex: 1 }}
      aria-label="3D animation header"
    />
  );
};

export default Header3DAnimation;
