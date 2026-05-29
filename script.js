document.addEventListener("DOMContentLoaded", () => {
  
  /* ── 1. STABLE ASYNC SIMULATION PRELOADER ── */
  const progressBar = document.getElementById("progress-bar");
  const percentageDisplay = document.getElementById("loading-percentage");
  const loaderWrapper = document.getElementById("loader-wrapper");
  
  let loadValue = 0;
  const loaderTimer = setInterval(() => {
    loadValue += Math.floor(Math.random() * 15) + 5;
    if(loadValue >= 100) {
      loadValue = 100;
      clearInterval(loaderTimer);
      setTimeout(() => {
        loaderWrapper.classList.add("fade-out");
      }, 400);
    }
    progressBar.style.width = `${loadValue}%`;
    percentageDisplay.textContent = `${String(loadValue).padStart(2, '0')}%`;
  }, 70);


  /* ── 2. MOLECULAR NET PARTICLES ENGINE ── */
  const canvas = document.getElementById("interactive-net");
  const ctx = canvas.getContext("2d");
  
  let width, height, nodeArray = [];
  const mouseCoords = { x: null, y: null, maxRange: 150 };

  function syncCanvasBoundaries() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  syncCanvasBoundaries();
  window.addEventListener("resize", syncCanvasBoundaries);
  window.addEventListener("mousemove", (e) => {
    mouseCoords.x = e.clientX;
    mouseCoords.y = e.clientY;
  });
  window.addEventListener("mouseleave", () => {
    mouseCoords.x = null;
    mouseCoords.y = null;
  });

  // Generate systemic nodes
  const structuralNodeCount = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 20000));
  for(let i = 0; i < structuralNodeCount; i++) {
    nodeArray.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 1.5 + 0.5
    });
  }

  function renderNodeNetwork() {
    ctx.clearRect(0, 0, width, height);
    
    nodeArray.forEach(node => {
      node.x += node.speedX;
      node.y += node.speedY;
      
      // Keep nodes inside screen boundaries
      if(node.x < 0 || node.x > width) node.speedX *= -1;
      if(node.y < 0 || node.y > height) node.speedY *= -1;
      
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(80, 250, 123, 0.25)";
      ctx.fill();
    });

    // Draw connection matrix vectors
    for (let a = 0; a < nodeArray.length; a++) {
      for (let b = a + 1; b < nodeArray.length; b++) {
        const deltaX = nodeArray[a].x - nodeArray[b].x;
        const deltaY = nodeArray[a].y - nodeArray[b].y;
        const physicalDistance = Math.hypot(deltaX, deltaY);

        if (physicalDistance < 120) {
          ctx.beginPath();
          ctx.moveTo(nodeArray[a].x, nodeArray[a].y);
          ctx.lineTo(nodeArray[b].x, nodeArray[b].y);
          ctx.strokeStyle = `rgba(80, 250, 123, ${0.12 * (1 - physicalDistance/120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Track mouse attraction constraints
      if (mouseCoords.x !== null && mouseCoords.y !== null) {
        const mouseDeltaX = nodeArray[a].x - mouseCoords.x;
        const mouseDeltaY = nodeArray[a].y - mouseCoords.y;
        const mouseDistance = Math.hypot(mouseDeltaX, mouseDeltaY);
        if(mouseDistance < mouseCoords.maxRange) {
          ctx.beginPath();
          ctx.moveTo(nodeArray[a].x, nodeArray[a].y);
          ctx.lineTo(mouseCoords.x, mouseCoords.y);
          ctx.strokeStyle = `rgba(80, 250, 123, ${0.15 * (1 - mouseDistance/mouseCoords.maxRange)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(renderNodeNetwork);
  }
  renderNodeNetwork();


  /* ── 3. HEROS CHARACTER TYPING MATRIX ── */
  const typingTarget = document.getElementById("typing-target");
  const professionMatrix = ["PYTHON DEVELOPER", "LECTURER", "AI RESEARCH LAB Scholar"];
  let matrixIndex = 0, characterIndex = 0, dynamicDeletion = false;

  function processTypingLoop() {
    const currentStringString = professionMatrix[matrixIndex];
    
    if (!dynamicDeletion) {
      typingTarget.textContent = currentStringString.substring(0, characterIndex + 1);
      characterIndex++;
      if (characterIndex === currentStringString.length) {
        dynamicDeletion = true;
        setTimeout(processTypingLoop, 2000); // Wait at text peak
        return;
      }
    } else {
      typingTarget.textContent = currentStringString.substring(0, characterIndex - 1);
      characterIndex--;
      if (characterIndex === 0) {
        dynamicDeletion = false;
        matrixIndex = (matrixIndex + 1) % professionMatrix.length;
      }
    }
    setTimeout(processTypingLoop, dynamicDeletion ? 40 : 100);
  }
  setTimeout(processTypingLoop, 1000);


  /* ── 4. INTERACTIVE PORTFOLIO PROJECT FILTER ── */
  const filteringButtons = document.querySelectorAll(".filter-btn");
  const designCards = document.querySelectorAll(".project-card");
  const mainGrid = document.getElementById("main-project-grid");

  filteringButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filteringButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const targetCategory = btn.getAttribute("data-filter");
      
      // Animate project grid items
      designCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (targetCategory === "all" || cardCategory === targetCategory) {
          card.classList.remove("collapsed");
        } else {
          card.classList.add("collapsed");
        }
      });
    });
  });


  /* ── 5. SCROLL TRIGGER INTERSECTION OBSERVER FOR SKILLS ── */
  const skillItems = document.querySelectorAll(".skill-item");

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillCard = entry.target;
        const targetPercent = parseInt(skillCard.getAttribute("data-percent"), 10);
        const fillBar = skillCard.querySelector(".fill");
        const valDisplay = skillCard.querySelector(".skill-val-display");

        // Set dynamic visual fill width 
        fillBar.style.width = `${targetPercent}%`;

        // Smoothly count up text numbers
        let initialCounter = 0;
        const counterSpeed = Math.floor(1500 / targetPercent);
        const counterInterval = setInterval(() => {
          initialCounter++;
          valDisplay.textContent = `${initialCounter}%`;
          if (initialCounter >= targetPercent) {
            clearInterval(counterInterval);
          }
        }, counterSpeed);

        skillObserver.unobserve(skillCard); // Animate once
      }
    });
  }, { threshold: 0.15 });

  skillItems.forEach(item => skillObserver.observe(item));


  /* ── 6. ACTIVE ROUTE LINKS TRACKER & BACK TO ROOT BUTTON ── */
  const contentSections = document.querySelectorAll("section[id]");
  const navigationAnchors = document.querySelectorAll(".nav-links a");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    let trackingY = window.pageYOffset;

    // Toggle scroll to top visibility
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }

    // Toggle nav active highlight tracking 
    contentSections.forEach(sec => {
      const height = sec.offsetHeight;
      const top = sec.offsetTop - 180;
      const id = sec.getAttribute("id");

      if (trackingY > top && trackingY <= top + height) {
        navigationAnchors.forEach(a => {
          a.classList.remove("active");
          if (a.getAttribute("href") === `#${id}`) {
            a.classList.add("active");
          }
        });
      }
    });
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});