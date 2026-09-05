export function triggerExplosion(x: number, y: number, colors: string[]) {
  // Check if we're in performance mode (mobile or explicitly set)
  if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) {
    return; // Skip on mobile
  }

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return;

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    life: number;
    decay: number;
    gravity: number;
  }
  const particles: Particle[] = [];
  const particleCount = 40;

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 2;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
      decay: Math.random() * 0.02 + 0.015,
      gravity: 0.2
    });
  }

  function animate() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    
    let activeParticles = 0;
    
    particles.forEach(p => {
      if (p.life <= 0) return;
      activeParticles++;
      
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      
      ctx!.globalAlpha = Math.max(0, p.life);
      ctx!.fillStyle = p.color;
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx!.fill();
    });
    
    if (activeParticles > 0) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }
  
  animate();
}
