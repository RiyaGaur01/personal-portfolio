// === COSMIC BACKGROUND: Stars + Meteors ===
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

// Handle Retina screens
function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// === Stars ===
let width = window.innerWidth;
let height = window.innerHeight;
const centerX = width;
const centerY = height;
const stars = [];
const starCount = 500;

for (let i = 0; i < starCount; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * Math.min(width, height);
  stars.push({
    angle,
    radius,
    speed: 0.0005 + Math.random() * 0.001,
    size: Math.random() * 1.5,
  });
}

// === Meteors ===
const meteors = [];

function spawnMeteor() {
  meteors.push({
    x: Math.random() * -300,
    y: Math.random() * -200,
    length: 250 + Math.random() * 150,
    speed: 3 + Math.random() * 1.5,
    opacity: 1,
    angle: Math.atan2(height + 300, width + 300),
    fadeRate: 0.0015 + Math.random() * 0.001
  });
}

// spawn meteors occasionally
setInterval(() => {
  if (Math.random() < 0.7) spawnMeteor();
}, 4000);

function drawMeteors() {
  meteors.forEach((m, i) => {
    const tailX = m.x - Math.cos(m.angle) * m.length;
    const tailY = m.y - Math.sin(m.angle) * m.length;

    // Bluish tail
    const gradient = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
    gradient.addColorStop(0, `rgba(200, 220, 255, ${m.opacity})`);
    gradient.addColorStop(1, `rgba(200, 220, 255, 0)`);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(200,220,255,0.8)';

    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();

    // Move and fade
    m.x += Math.cos(m.angle) * m.speed;
    m.y += Math.sin(m.angle) * m.speed;
    m.opacity -= m.fadeRate;

    if (m.x > width + 400 || m.y > height + 400 || m.opacity <= 0) {
      meteors.splice(i, 1);
    }
  });
}

// === Draw stars & meteors ===
function animate() {
  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1a002b');
  gradient.addColorStop(1, '#000000');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Stars
  stars.forEach(star => {
    star.angle += star.speed;
    const x = centerX - (star.radius * Math.cos(star.angle) + star.radius * 0.5);
    const y = centerY - (star.radius * Math.sin(star.angle) + star.radius * 0.5);
    ctx.beginPath();
    ctx.arc(x, y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'rgba(255,255,255,0.9)';
    ctx.shadowBlur = 6;
    ctx.fill();
  });

  // Meteors
  drawMeteors();

  requestAnimationFrame(animate);
}

animate();
// === Typing Effect ===
const roles = [
  "Full-Stack Developer",
  "Cybersecurity Enthusiast",
  "AI & Data Science Learner",
  "Web Application Developer",
  "Tech Innovator"
];

let roleIndex = 0;
let charIndex = 0;
const typingSpeed = 100;   // typing delay (lower = faster)
const erasingSpeed = 50;   // erasing delay
const delayBetween = 1000; // delay before erasing starts
const typewriter = document.getElementById("typewriter");

function type() {
  if (!typewriter) return;
  if (charIndex < roles[roleIndex].length) {
    typewriter.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, delayBetween);
  }
}

function erase() {
  if (charIndex > 0) {
    typewriter.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingSpeed);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (roles.length && typewriter) setTimeout(type, 1000);
});
// === ANIMATE SKILL BARS ON SCROLL ===
const skillBars = document.querySelectorAll('.skill-fill');
let animated = false;

window.addEventListener('scroll', () => {
  const skillsSection = document.getElementById('skills');
  const rect = skillsSection.getBoundingClientRect();

  if (!animated && rect.top < window.innerHeight - 100) {
    skillBars.forEach(bar => {
      bar.style.animation = 'fillAnim 1.5s forwards ease-in-out';
    });
    animated = true;
  }
});
