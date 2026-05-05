let text = "Santhosh Kumar Kanakapudi";
let i = 0;

function type() {
  if (i < text.length) {
    document.getElementById("type").innerHTML += text[i++];
    setTimeout(type, 80);
  } else {
    // wait, then restart
    setTimeout(() => {
      document.getElementById("type").innerHTML = "";
      i = 0;
      type();
    }, 1500); // pause before restarting
  }
}

type();

let mouse = {
  x: null,
  y: null
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

/* PARTICLES BOUNCE */

function getRandomLightColor() {
  const r = Math.floor(180 + Math.random() * 75);
  const g = Math.floor(180 + Math.random() * 75);
  const b = Math.floor(180 + Math.random() * 75);

  return `rgb(${r}, ${g}, ${b})`;
}

const c = document.getElementById("particles");
const ctx = c.getContext("2d");
c.width = innerWidth; c.height = innerHeight;

let p = [];
for (let i = 0; i < 100; i++) {
  p.push({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    r: Math.random() * 2,
    dx: 0.5,
    dy: 0.5,
    color: getRandomLightColor()
  });
}

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);

  const radius = 80; // interaction distance (tune this)
  const minDist = 14; // hard separation distance

  for (let i = 0; i < p.length; i++) {
    let a = p[i];
    // 1. MOUSE REPULSION
    if (mouse.x && mouse.y) {
      const dx = a.x - mouse.x;
      const dy = a.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const mouseRadius = 150;
      if (distance < mouseRadius) {
        const force = (mouseRadius - distance) / mouseRadius;
        a.x += dx * force * 0.6;
        a.y += dy * force * 0.6;
      }
    }
    // 2. PARTICLE REPULSION
    for (let j = i + 1; j < p.length; j++) {
      let b = p[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius && dist > 0) {
        const force = (radius - dist) / radius;
        const fx = (dx / dist) * force * 0.4;
        const fy = (dy / dist) * force * 0.4;
        a.x += fx;
        a.y += fy;
        b.x -= fx;
        b.y -= fy;
      }
      // hard separation (prevents stacking)
      if (dist < minDist && dist > 0) {
        const fx = (dx / dist) * 0.8;
        const fy = (dy / dist) * 0.8;
        a.x += fx;
        a.y += fy;
        b.x -= fx;
        b.y -= fy;
      }
    }
    // DRAW PARTICLE
    ctx.beginPath();
    ctx.arc(a.x, a.y, a.r, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#38bdf8";
    ctx.fill();
    // MOVE
    a.x += a.dx;
    a.y += a.dy;
    // WALL BOUNCE
    if (a.x < 0 || a.x > c.width) a.dx *= -1;
    if (a.y < 0 || a.y > c.height) a.dy *= -1;
  }

  requestAnimationFrame(draw);
}
draw();

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
const indicator = document.getElementById("indicator");

let currentActive = null;

function moveIndicator(el) {
  if (currentActive === el) return;

  const parentRect = indicator.parentElement.getBoundingClientRect();
  const rect = el.getBoundingClientRect();

  // ONLY center logic (no width dependency)
  const offset = rect.left - parentRect.left + (rect.width / 2) - 35;

  indicator.style.transform = `translateX(${offset}px)`;

  currentActive = el;
}
/* CLICK EFFECT */
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    moveIndicator(link);
  });
});

/* SCROLL ACTIVE + AUTO MOVE */
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    if (link.getAttribute("href") === "#" + current) {
      if (!link.classList.contains("active")) {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        moveIndicator(link);
      }
    }
  });
});

/* INITIAL POSITION */
window.onload = () => {
  const first = document.querySelector("nav a");
  first.classList.add("active");
  moveIndicator(first);
};
/* REVEAL */
const obs = new IntersectionObserver(e => {
  e.forEach(x => { if (x.isIntersecting) x.target.classList.add("active"); });
});
document.querySelectorAll(".reveal").forEach(el => obs.observe(el));

/* SKILLS */
window.addEventListener("scroll", () => {
  document.querySelectorAll(".fill").forEach(e => {
    e.style.width = e.getAttribute("data");
  });
});

/* MODAL */
const modal = document.getElementById("modal");

function openProject(p) {

  const data = {
    ai: {
      title: "AI Desktop Assistant",
      img: "assets/ai_assistant.png",
      desc: "Voice-controlled assistant that automates system tasks.",
      impact: "Reduced manual workload significantly by enabling voice-driven automation. Improved productivity by integrating APIs and real-time execution.",
      tech: "Python, System Libraries, APIs, AI Models",
      works: "Have a detailed description in my Github Page or watch Video to know more",
      github: "https://github.com/SanthoshKanakapudi/AI-Assistant-for-Desktop",
      youtube: "https://youtu.be/GZBS4hCaZnM?si=FXnGeeyBxXxBB3hj"
    },

    home: {
      title: "Smart Voice Controlled Home Automation",
      img: "assets/home_automation.png",
      desc: "Smart system for controlling appliances remotely.",
      impact: "Enabled efficient energy usage and remote control of devices. Provided seamless integration between hardware and software.",
      tech: "Arduino, ESP8266, Web(Blynk Cloud), Python, Google Assitant",
      works: "Have a detailed description in my Github Page or watch Video to know more",
      github: "https://github.com/SanthoshKanakapudi/Voice-Controlled-Home-Automation",
      youtube: "https://youtu.be/7QBbJY5o2F8?si=02jQbKK07BgBqFAk"
    },

    eye: {
      title: "Face Authorized HCI using Eyeball Movement",
      img: "assets/vcmodeface.jpg",
      desc: "Cursor control using eye tracking.",
      impact: "Improved accessibility for physically challenged users. Demonstrated real-time vision-based interaction.",
      tech: "Python, OpenCV",
      works: "Have a detailed description in my Github Page to know more (No Demo Video Available)",
      github: "https://github.com/SanthoshKanakapudi/Face-Authorized-HCI-using-Eyeball-Movement",
      youtube: "#"
    },

    fire: {
      title: "Fire Detection Robot",
      img: "assets/fire_detection.png",
      desc: "Robot that detects fire hazards.",
      impact: "Provided early warning system to prevent accidents. Useful in industrial safety environments.",
      tech: "Arduino, Sensors",
      works: "Have a detailed description in my Github Page or watch Video to know more",
      github: "https://github.com/SanthoshKanakapudi/Fire-Detection-Robot-Project",
      youtube: "https://youtu.be/bNNthD1Ggng?si=Zo5zJQM1ML2of7yR"
    },
    todo: {
      title: "Basic Todo Web App",
      img: "assets/todo_app.jpg",
      desc: "{Developed a web-based task management application to create, manage, and organize daily tasks.",
      impact: "Designed a responsive user interface for improved usability and task tracking.",
      tech: "HTML, CSS, JS",
      works: "Have a detailed description in my Github Page or watch Live Page to know more",
      github: "https://github.com/SanthoshKanakapudi/Todo-App",
      youtube: "https://santhoshkanakapudi.github.io/Todo-App/"
    }
  };

  const d = data[p];

  document.getElementById("title").innerText = d.title;
  document.getElementById("modal-img").src = d.img;
  document.getElementById("desc").innerText = d.desc;
  document.getElementById("impact").innerText = d.impact;
  document.getElementById("tech").innerText = d.tech;
  document.getElementById("works").innerText = d.works;

  document.getElementById("github").href = d.github;
document.getElementById("youtube").href = d.youtube;

  modal.classList.add("show");
}

function scrollProjects(direction) {
  const container = document.getElementById("projectContainer");

  const scrollAmount = 320; // card width

  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
}

document.querySelector(".close").onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };
function closeModal() {
  modal.classList.remove("show");
}

document.querySelector(".close").onclick = closeModal;

window.onclick = (e) => {
  if (e.target.id === "modal") closeModal();
};

const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = new FormData(form);

  const response = await fetch(form.action, {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  });

  if (response.ok) {
    successMsg.style.display = "block";
    form.reset();
  } else {
    alert("Something went wrong!");
  }
});

const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    themeBtn.innerHTML = "🌙 Dark";
  } else {
    themeBtn.innerHTML = "☀️ Light";
  }
});
