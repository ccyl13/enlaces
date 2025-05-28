document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.createElement("canvas");
  canvas.id = "background-canvas";
  document.getElementById("background").appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let width, height, points;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initPoints();
  }

  function initPoints() {
    points = [];
    for (let i = 0; i < 80; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      p1.x += p1.vx;
      p1.y += p1.vy;

      if (p1.x < 0 || p1.x > width) p1.vx *= -1;
      if (p1.y < 0 || p1.y > height) p1.vy *= -1;

      ctx.beginPath();
      ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.fill();

      for (let j = i + 1; j < points.length; j++) {
        const p2 = points[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = "rgba(255,255,255,0.05)";
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
});
