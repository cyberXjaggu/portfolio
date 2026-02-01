import { useEffect, useRef, memo } from 'react';

const CyberBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const nodesRef = useRef([]);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reduce particle count on mobile/low-performance devices
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 30 : 50;
    const particleCount = isMobile ? 15 : 30;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    // Initialize nodes
    const initNodes = () => {
      nodesRef.current = [];
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: 2 + Math.random() * 2,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
    };

    // Initialize floating particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: -0.1 - Math.random() * 0.3,
          size: 1 + Math.random() * 2,
          opacity: 0.2 + Math.random() * 0.3
        });
      }
    };

    resize();
    initNodes();
    initParticles();

    window.addEventListener('resize', () => {
      resize();
      initNodes();
      initParticles();
    });

    const animate = () => {
      if (prefersReducedMotion) {
        // Static render for reduced motion
        ctx.clearRect(0, 0, width, height);
        drawNodes(ctx, 0);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const time = Date.now() * 0.001;

      // Update and draw nodes
      nodesRef.current.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around edges
        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;
      });

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Reset particle when it goes off screen
        if (particle.y < -10) {
          particle.y = height + 10;
          particle.x = Math.random() * width;
        }
        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
      });

      drawNodes(ctx, time);
      drawParticles(ctx);
      drawConnections(ctx);

      animationRef.current = requestAnimationFrame(animate);
    };

    const drawNodes = (ctx, time) => {
      nodesRef.current.forEach((node) => {
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.3 + 0.7;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 65, ${0.4 * pulse})`;
        ctx.fill();

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 65, ${0.1 * pulse})`;
        ctx.fill();
      });
    };

    const drawParticles = (ctx) => {
      particlesRef.current.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });
    };

    const drawConnections = (ctx) => {
      const maxDistance = isMobile ? 100 : 150;

      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const nodeA = nodesRef.current[i];
          const nodeB = nodesRef.current[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(0, 255, 65, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="cyber-background"
      aria-hidden="true"
    />
  );
};

export default memo(CyberBackground);
