/* ==========================
   TYPEWRITER
========================== */
const tw = document.getElementById("typewriter");
const words = ["Simplified", "Personalized", "Smarter Care"];
let wi = 0, ci = 0, del = false;

function typeLoop() {
  const word = words[wi];
  tw.textContent = word.slice(0, ci);

  if (!del && ci < word.length) {
    ci++;
  } else if (del && ci > 0) {
    ci--;
  } else if (ci === word.length) {
    del = true;
  } else {
    del = false;
    wi = (wi + 1) % words.length;
  }
  setTimeout(typeLoop, del ? 70 : 120);
}
typeLoop();

/* ==========================
   START BUTTON SCROLL
========================== */
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("services").scrollIntoView({ behavior: "smooth" });
});

/* ==========================
   CARD ANIMATION ON SCROLL
========================== */
const cards = document.querySelectorAll(".card");
const io = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.2 }
);
cards.forEach(c => io.observe(c));

/* ==========================
   PARTICLE BACKGROUND (THREE.JS)
========================== */
const canvas = document.getElementById("heroEffect");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 0); // transparent in light mode

// Particle geometry
const particleCount = 2500;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  positions[i * 3 + 0] = (Math.random() - 0.5) * 12;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
}

const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const particleMaterial = new THREE.PointsMaterial({
  color: 0x88ccee,
  size: 0.05,
  transparent: true,
  opacity: 0.6,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Animate particles
let t = 0;
function animateParticles() {
  requestAnimationFrame(animateParticles);
  t += 0.002;

  const pos = particleGeometry.attributes.position.array;
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    pos[i3 + 1] += Math.sin(t * 3 + pos[i3]) * 0.003; // more fluid wave
    if (pos[i3 + 1] < -6) pos[i3 + 1] = 6;
  }

  particleGeometry.attributes.position.needsUpdate = true;
  particles.rotation.y += 0.0005;
  particles.rotation.x += 0.0002;
  renderer.render(scene, camera);
}
animateParticles();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ==========================
   DARK MODE TOGGLE
========================== */
const darkToggle = document.getElementById("darkToggle");

function updateParticleTheme() {
  if (document.body.classList.contains("dark-mode")) {
    particleMaterial.color.set(0xffcc33); // 🌟 PURE YELLOW
    particleMaterial.opacity = 0.9;
    renderer.setClearColor(0x000000, 1);
  } else {
    particleMaterial.color.set(0x88ccee);
    particleMaterial.opacity = 0.6;
    renderer.setClearColor(0xffffff, 0);
  }
}

if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    updateParticleTheme();

    const heroText = document.querySelector(".hero-inner");
    if (heroText) {
      heroText.style.color = document.body.classList.contains("dark-mode")
        ? "#fff"
        : "#111";
    }
  });
}

updateParticleTheme(); // run once at load

/* ==========================
   CHATBOT
========================== */
const fab = document.getElementById("chatbotFab");
const chat = document.getElementById("chatWindow");
const close = document.getElementById("chatClose");
const body = document.getElementById("chatBody");

fab.addEventListener("click", () => chat.classList.toggle("open"));
close.addEventListener("click", () => chat.classList.remove("open"));

document.getElementById("chatSend").addEventListener("click", sendMsg);

function sendMsg() {
  const input = document.getElementById("chatInput");
  if (!input.value.trim()) return;
  append("user", input.value);
  setTimeout(() => append("bot", "This is a demo bot 🤖."), 600);
  input.value = "";
}

function append(type, text) {
  const d = document.createElement("div");
  d.className = "msg " + type;
  d.textContent = text;
  body.appendChild(d);
  body.scrollTop = body.scrollHeight;
}
