import React, { useRef, useEffect } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // 3D Particles
    interface Particle3D {
      x: number;
      y: number;
      z: number;
      ox: number; // Original
      oy: number;
      oz: number;
      color: string;
      size: number;
      speed: number;
    }

    const particles: Particle3D[] = [];
    const particleCount = 200;

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 150 + Math.random() * 300;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particles.push({
        x,
        y,
        z,
        ox: x,
        oy: y,
        oz: z,
        color: i % 2 === 0 ? '#C850C0' : '#4FACFE',
        size: Math.random() * 2 + 0.5,
        speed: (Math.random() * 0.05 + 0.01) * (Math.random() < 0.5 ? 1 : -1)
      });
    }

    // Torus Knots or Points
    interface Point3D {
      x: number;
      y: number;
      z: number;
    }
    const torusPoints: Point3D[] = [];
    const torusSegments = 32;
    const torusTubeSegments = 16;
    const torusRadius = 130;
    const torusTubeRadius = 40;

    for (let i = 0; i < torusSegments; i++) {
      const u = (i / torusSegments) * Math.PI * 2;
      for (let j = 0; j < torusTubeSegments; j++) {
        const v = (j / torusTubeSegments) * Math.PI * 2;
        const x = (torusRadius + torusTubeRadius * Math.cos(v)) * Math.cos(u);
        const y = (torusRadius + torusTubeRadius * Math.cos(v)) * Math.sin(u);
        const z = torusTubeRadius * Math.sin(v);
        torusPoints.push({ x, y, z });
      }
    }

    // Motion parameters
    let angleX = 0.003;
    let angleY = 0.005;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // 3D Matrix Projection & Rotation
    const project = (pt: Point3D) => {
      const focalLength = 400;
      // Rotate around X and Y based on scroll/mouse
      let x1 = pt.x;
      let y1 = pt.y * Math.cos(angleX) - pt.z * Math.sin(angleX);
      let z1 = pt.y * Math.sin(angleX) + pt.z * Math.cos(angleX);

      let x2 = x1 * Math.cos(angleY) + z1 * Math.sin(angleY);
      let y2 = y1;
      let z2 = -x1 * Math.sin(angleY) + z1 * Math.cos(angleY);

      // Camera offset
      const scale = focalLength / (focalLength + z2 + 250);
      const projX = x2 * scale + width / 2;
      const projY = y2 * scale + height / 2;

      return { x: projX, y: projY, scale, visible: z2 > -400 };
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update rotation offsets slowly based on mouse position
      angleX += 0.005 + mouseY * 0.5;
      angleY += 0.008 + mouseX * 0.5;

      // Draw background noise Grid
      ctx.strokeStyle = 'rgba(107, 63, 160, 0.06)';
      ctx.lineWidth = 1;
      const gridSize = 45;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw 3D outer particles
      particles.forEach((p) => {
        // Orbit around Y
        p.oz += p.speed;
        const co = Math.cos(p.speed);
        const si = Math.sin(p.speed);
        const rx = p.ox * co - p.oz * si;
        const rz = p.ox * si + p.oz * co;
        p.ox = rx;
        p.oz = rz;

        const projected = project({ x: p.ox, y: p.oy, z: p.oz });
        if (projected.visible) {
          ctx.beginPath();
          ctx.arc(projected.x, projected.y, p.size * projected.scale * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10 * projected.scale;
          ctx.shadowColor = p.color;
          ctx.fill();
        }
      });
      ctx.shadowBlur = 0; // reset

      // Draw wireframe Torus projection
      ctx.strokeStyle = 'rgba(200, 80, 192, 0.15)';
      ctx.lineWidth = 0.8;
      
      // Plot mesh grid mapping
      for (let i = 0; i < torusSegments; i++) {
        ctx.beginPath();
        for (let j = 0; j <= torusTubeSegments; j++) {
          const idx = (i * torusTubeSegments) + (j % torusTubeSegments);
          const proj = project(torusPoints[idx]);
          if (proj.visible) {
            if (j === 0) ctx.moveTo(proj.x, proj.y);
            else ctx.lineTo(proj.x, proj.y);
          }
        }
        ctx.stroke();
      }

      for (let j = 0; j < torusTubeSegments; j++) {
        ctx.beginPath();
        for (let i = 0; i <= torusSegments; i++) {
          const idx = ((i % torusSegments) * torusTubeSegments) + j;
          const proj = project(torusPoints[idx]);
          if (proj.visible) {
            if (i === 0) ctx.moveTo(proj.x, proj.y);
            else ctx.lineTo(proj.x, proj.y);
          }
        }
        ctx.strokeStyle = j % 2 === 0 ? 'rgba(79, 172, 254, 0.18)' : 'rgba(200, 80, 192, 0.14)';
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none block z-0"
    />
  );
}
