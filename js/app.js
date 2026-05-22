document.addEventListener("DOMContentLoaded", () => {
  const config = window.weddingConfig;
  if (!config) {
    console.error("Wedding configuration not found!");
    return;
  }

  // --- DOM Elements ---
  const coverPage = document.getElementById("cover-page");
  const btnBuka = document.getElementById("btn-buka");
  const gameContainer = document.getElementById("game-container");
  const scrollForcer = document.getElementById("scroll-forcer");
  const parallaxBg = document.getElementById("parallax-bg-layer");
  const bgSkyImg = document.getElementById("bg-sky-img");
  const mainPlayer = document.getElementById("main-player");
  const speechBubble = document.getElementById("speech-bubble");
  const speechText = document.getElementById("speech-text");
  
  const btnLeft = document.getElementById("up");
  const btnRight = document.getElementById("down");
  
  const musicToggle = document.getElementById("music-toggle");
  const audioEl = document.getElementById("music_source");
  
  const modalOverlay = document.getElementById("modal-overlay");
  const modalContainer = document.getElementById("modal-container");
  const landscapeFrame = document.getElementById("landscape-frame");

  // --- State Variables ---
  let isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  let activeMilestone = null;
  let hasStartedWalking = false;

  // --- Initialization & Setup ---
  initGameAssets();
  populateBulletinBoard();
  setupEventListeners();
  updateScrollBounds();
  
  // Set initial scroll coordinates
  gameContainer.scrollLeft = 0;
  
  // Bind scroll event to our native scroll physics handler
  gameContainer.addEventListener("scroll", handleScroll);

  // Bind window resize event
  window.addEventListener("resize", () => {
    updateScrollBounds();
    handleScroll();
  });

  // Load configuration assets, texts, positions & dynamic elements
  function initGameAssets() {
    // Parallax background texture
    if (config.assets.background) {
      if (bgSkyImg) {
        bgSkyImg.src = config.assets.background;
      }
      if (coverPage) {
        coverPage.style.backgroundImage = `url('${config.assets.background}')`;
      }
      // Dynamically override body::before background-image for desktop blur
      const styleEl = document.createElement("style");
      styleEl.innerHTML = `@media (min-width: 1024px) { body::before { background-image: url('${config.assets.background}') !important; } }`;
      document.head.appendChild(styleEl);
    }
    
    // Set floor path ground texture
    const groundTiles = document.getElementById("ground-tiles");
    if (groundTiles && config.assets.floor) {
      groundTiles.src = config.assets.floor;
    }
    const coverGrass = document.querySelector(".cover-grass-floor");
    if (coverGrass && config.assets.floor) {
      coverGrass.style.backgroundImage = `url('${config.assets.floor}')`;
    }
    
    // Set character default images
    if (mainPlayer) {
      const standImg = mainPlayer.querySelector(".stand");
      const walkImg = mainPlayer.querySelector(".walk");
      if (standImg && config.assets.characterIdle) standImg.src = config.assets.characterIdle;
      if (walkImg && config.assets.characterWalk) walkImg.src = config.assets.characterWalk;
    }
    
    // Touch controls arrow images
    if (btnLeft && config.assets.arrowLeft) {
      const leftImg = btnLeft.querySelector("img");
      if (leftImg) leftImg.src = config.assets.arrowLeft;
    }
    if (btnRight && config.assets.arrowRight) {
      const rightImg = btnRight.querySelector("img");
      if (rightImg) rightImg.src = config.assets.arrowRight;
    }
    // Speech bubble background handled by CSS for high-quality styled border & tail

    // Set cover details from config
    const coverTitle = document.getElementById("cover-title");
    const coverSubtitle = document.getElementById("cover-subtitle");
    const guestTitle = document.getElementById("guest-title");
    
    if (coverTitle) coverTitle.innerText = config.cover.title;
    if (coverSubtitle) coverSubtitle.innerText = config.cover.subtitle;
    if (guestTitle) guestTitle.innerText = config.cover.greetingText;
    if (btnBuka) {
      btnBuka.innerText = (config.cover.buttonText || "open invitation").toLowerCase();
    }
    
    // Set cursive calligraphy details dynamically
    const coverBride = document.getElementById("cover-bride");
    const coverGroom = document.getElementById("cover-groom");
    const coverDateDisplay = document.getElementById("cover-date-display");

    if (coverBride) coverBride.innerText = config.general.brideNickname;
    if (coverGroom) coverGroom.innerText = config.general.groomNickname;

    if (coverDateDisplay) {
      coverDateDisplay.innerText = config.general.weddingDateFormatted || "12 . 07 . 26";
    }
    
    // Populate retro names and dates on landmarks and headers
    const labelBride = document.getElementById("label-bride");
    const labelGroom = document.getElementById("label-groom");
    const labelWeddingDate = document.getElementById("label-wedding-date");
    
    if (labelBride) labelBride.innerText = config.general.brideNickname;
    if (labelGroom) labelGroom.innerText = config.general.groomNickname;
    if (labelWeddingDate) {
      labelWeddingDate.innerText = config.general.weddingDateFormatted || "12 . 07 . 26";
    }

    const signBride = document.getElementById("sign-bride");
    const signGroom = document.getElementById("sign-groom");
    const signDate = document.getElementById("sign-date");

    if (signBride) signBride.innerText = config.general.brideNickname;
    if (signGroom) signGroom.innerText = config.general.groomNickname;
    if (signDate) {
      signDate.innerText = config.general.weddingDateFormatted || config.general.weddingDate.replace("Minggu, ", "");
    }

    const easelBride = document.getElementById("easel-bride");
    const easelGroom = document.getElementById("easel-groom");
    const easelDate = document.getElementById("easel-date");

    if (easelBride) easelBride.innerText = config.general.brideNickname + " &";
    if (easelGroom) easelGroom.innerText = config.general.groomNickname;
    if (easelDate) {
      easelDate.innerText = config.general.weddingDateFormatted || "12 . 07 . 26";
    }

    // Position landmarks based on config pos configuration
    config.milestones.forEach(m => {
      const el = document.querySelector(`[data-milestone-id="${m.id}"]`);
      if (el) {
        el.style.left = `${m.pos}px`;
        if (m.bottom !== undefined) {
          el.style.bottom = m.bottom;
        }
        const img = el.querySelector("img:not(.dialog-box):not(.cat-object)");
        if (img && m.imgUrl) {
          img.src = m.imgUrl;
        }
      }
    });

    // Position decorative entities
    if (config.entities) {
      config.entities.forEach(ent => {
        const el = document.getElementById(`entity-${ent.id}`);
        if (el) {
          el.style.left = `${ent.pos}px`;
          if (ent.top) el.style.top = `${ent.top}px`;
          const img = el.querySelector("img");
          if (img && ent.imgUrl) {
            img.src = ent.imgUrl;
          }
        }
      });
    }
    
    // Parse URL parameter to greet specific guests
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get("to") || urlParams.get("u");
    const guestNameEl = document.getElementById("guest-name");
    if (guestNameEl) {
      guestNameEl.innerText = guestParam ? decodeURIComponent(guestParam) : config.cover.guestNameFallback;
    }
  }

  // --- Dynamic Bulletin Board for Guest Wishes ---
  function populateBulletinBoard() {
    const wishesBoard = document.getElementById("wishes-bulletin-board");
    if (!wishesBoard) return;
    
    let stored = JSON.parse(localStorage.getItem("wedding_rsvps")) || [];
    if (stored.length === 0) {
      stored = [
        { name: "Andi Saputra", count: 2, status: "hadir", msg: "Selamat menempuh hidup baru Laras & Bimo! Semoga sakinah mawaddah warahmah!" },
        { name: "Dewi Lestari", count: 1, status: "hadir", msg: "Happy wedding ya! Lancar-lancar sampai hari H. Gak sabar mau dateng!" },
        { name: "Rian Hidayat", count: 1, status: "tidak-hadir", msg: "Selamat ya bro Bimo! Maaf berhalangan hadir. Doa terbaik untuk kalian!" }
      ];
      localStorage.setItem("wedding_rsvps", JSON.stringify(stored));
    }
    
    wishesBoard.innerHTML = "";
    // Show top 4 wishes on the scrollable bulletin board wall
    stored.slice(0, 4).forEach(item => {
      const el = document.createElement("div");
      el.className = "wish-item";
      el.innerHTML = `
        <div class="name">${item.name}</div>
        <div class="pesan">${item.msg}</div>
      `;
      wishesBoard.appendChild(el);
    });
  }

  // --- Viewport Resize & Dynamic Scrolling Width Setup ---
  function updateScrollBounds() {
    const W = gameContainer.clientWidth || window.innerWidth;
    const M = config.engine.mapWidth || 3200;
    // Set scrollForcer width so character can walk exactly from left end to right end
    if (scrollForcer) {
      scrollForcer.style.width = `${M + W * 0.64}px`;
    }
  }

  // --- Core Scroll Event Integration ---
  let lastScrollLeft = 0;
  let scrollTimeout = null;

  function handleScroll() {
    // If cover is open or modal is active, bypass character animation calculations
    if (gameContainer.classList.contains("onStart") || modalOverlay.classList.contains("active")) {
      return;
    }

    const scrollLeft = gameContainer.scrollLeft;
    
    // Deactivate welcome speech bubble once player starts walking/scrolling
    if (scrollLeft > 10) {
      hasStartedWalking = true;
    }

    const W = gameContainer.clientWidth || window.innerWidth;
    const virtualPlayerX = scrollLeft + W * 0.36;
    
    // Apply exact translate3d offset to map elements
    if (landscapeFrame) {
      landscapeFrame.style.transform = `translate3d(${-scrollLeft}px, 0, 0)`;
    }
    
    // Apply parallax offset to the sky/background image
    if (bgSkyImg) {
      const skyParallaxSpeed = config.engine.parallaxSpeeds.sky || 0.1;
      bgSkyImg.style.transform = `translate3d(${-scrollLeft * skyParallaxSpeed}px, 0, 0)`;
    }
    
    // Activate walk animation gif
    if (mainPlayer) {
      mainPlayer.classList.add("active");
      
      // Determine walking orientation direction
      if (scrollLeft > lastScrollLeft + 0.5) {
        mainPlayer.classList.remove("back");
        mainPlayer.classList.add("forward");
      } else if (scrollLeft < lastScrollLeft - 0.5) {
        mainPlayer.classList.remove("forward");
        mainPlayer.classList.add("back");
      }
      
      // Bridge Arc Logic
      const bridgeStart = 880;
      const bridgeEnd = 1090;
      if (virtualPlayerX > bridgeStart && virtualPlayerX < bridgeEnd) {
        const bridgeCenter = (bridgeStart + bridgeEnd) / 2;
        const bridgeWidth = bridgeEnd - bridgeStart;
        const normalizedDist = (virtualPlayerX - bridgeCenter) / (bridgeWidth / 2);
        const maxHeight = 30; // Pixels to move up
        const offsetY = maxHeight * (1 - normalizedDist * normalizedDist);
        mainPlayer.style.transform = `translateY(-${offsetY}px)`;
      } else {
        mainPlayer.style.transform = `translateY(0px)`;
      }
    }
    
    // Evaluate proximity in real-time during scroll
    checkMilestoneProximity(virtualPlayerX);
    
    lastScrollLeft = scrollLeft;
    
    // Halt character walking animation when scrolling halts for 150ms
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (mainPlayer) {
        mainPlayer.classList.remove("active");
      }
      // Re-evaluate proximity only when scrolling stops!
      checkMilestoneProximity(virtualPlayerX);
    }, 150);
  }

  // Proximity collision detection between player character and milestones
  function checkMilestoneProximity(virtualPlayerX) {
    let currentActive = null;
    
    // Prioritize mempelai (bride & groom) at the end of the map so its bubble shows early and doesn't get overridden by easel
    const thresholdMempelai = (config.engine.mapWidth || 2175) - 125;
    if (virtualPlayerX >= thresholdMempelai) {
      currentActive = config.milestones.find(m => m.id === "mempelai");
    }
    
    if (!currentActive) {
      const threshold = 160;
      config.milestones.forEach(m => {
        if (m.id !== "mempelai") {
          const dist = Math.abs(virtualPlayerX - m.pos);
          if (dist < threshold) {
            currentActive = m;
          }
        }
      });
    }

    if (currentActive) {
      if (activeMilestone !== currentActive) {
        // Deactivate previous milestone glow drops
        if (activeMilestone) {
          const oldEl = document.querySelector(`[data-milestone-id="${activeMilestone.id}"]`);
          if (oldEl) oldEl.classList.remove("active");
        }
        
        const wasActive = speechBubble && speechBubble.classList.contains("active");
        activeMilestone = currentActive;
        
        // Activate current milestone glow outline
        const el = document.querySelector(`[data-milestone-id="${activeMilestone.id}"]`);
        if (el) el.classList.add("active");
        
        // Show interactive Speech dialogue box above character
        if (speechBubble && speechText) {
          if (activeMilestone.dialogText) {
            const updateBubbleContent = () => {
              speechText.innerHTML = activeMilestone.dialogText;
              
              const clickIndicator = speechBubble.querySelector(".click-indicator");
              if (clickIndicator) {
                if (activeMilestone.action === "openModal") {
                  clickIndicator.style.display = "block";
                  clickIndicator.innerText = isMobile ? "TAP bubble" : "TEKAN SPASI / KLIK";
                } else {
                  clickIndicator.style.display = "none";
                }
              }
              speechBubble.classList.add("active");
            };

            if (wasActive) {
              // Hide first for a smooth scale-down transition
              speechBubble.classList.remove("active");
              // Wait for scale-down transition, then update and show new text
              setTimeout(() => {
                if (activeMilestone === currentActive) {
                  updateBubbleContent();
                }
              }, 150);
            } else {
              updateBubbleContent();
            }
          } else {
            speechBubble.classList.remove("active");
          }
        }
        
        // Set matching quest item objective to finished state
        markQuestItemDone(activeMilestone.id);
      }
    } else {
      // Out of bounds: deactivate dialogue speech box and milestone glows
      if (activeMilestone) {
        const oldEl = document.querySelector(`[data-milestone-id="${activeMilestone.id}"]`);
        if (oldEl) oldEl.classList.remove("active");
        activeMilestone = null;
      }
      if (speechBubble) {
        speechBubble.classList.remove("active");
      }
    }
  }

  // Mark Quest objectives list items as done with checkmarks
  function markQuestItemDone(milestoneId) {
    let itemId = "";
    let iconId = "";
    
    if (milestoneId === "rsvp") {
      itemId = "quest-item-mailbox";
      iconId = "quest-icon-mailbox";
    } else if (milestoneId === "event") {
      itemId = "quest-item-event";
      iconId = "quest-icon-event";
    } else if (milestoneId === "mempelai") {
      itemId = "quest-item-mempelai";
      iconId = "quest-icon-mempelai";
    } else if (milestoneId === "gift") {
      itemId = "quest-item-gift";
      iconId = "quest-icon-gift";
    }
    
    if (itemId) {
      const itemEl = document.getElementById(itemId);
      const iconEl = document.getElementById(iconId);
      if (itemEl) itemEl.classList.add("done");
      if (iconEl) iconEl.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16' style='image-rendering:pixelated;shape-rendering:crispEdges;'><rect x='0' y='0' width='16' height='16' rx='3' fill='%232b1b11' stroke='%23ffa0ae' stroke-width='2'/><path d='M4 8L7 11L12 5' fill='none' stroke='%232ecc71' stroke-width='2' stroke-linecap='square'/></svg>";
    }
  }

  // Smooth scroll camera view port directly to selected landmark
  function scrollToMilestone(milestone) {
    const W = gameContainer.clientWidth || window.innerWidth;
    const targetScrollLeft = Math.max(0, Math.min(milestone.pos - W * 0.36, config.engine.mapWidth - W * 0.36));
    
    gameContainer.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth"
    });
    
    // Open modal programmatically once scrolling completes if it's a modal action
    if (milestone.action === "openModal") {
      setTimeout(() => {
        triggerMilestoneAction(milestone);
      }, 700);
    }
  }

  // --- Input & Controls Event Listeners ---
  function setupEventListeners() {
    // 1. Cover Buka Undangan Click
    if (btnBuka) {
      btnBuka.addEventListener("click", () => {
        if (coverPage) coverPage.classList.add("fade-out");
        if (gameContainer) gameContainer.classList.remove("onStart");
        
        setTimeout(() => {
          if (coverPage) coverPage.style.display = "none";
        }, 800);
        
        // Initialize Background Music
        initAudio();
        
        // Calculate dynamic dimensions & offsets
        updateScrollBounds();
        handleScroll();
      });
    }

    // 2. Keyboard Scrolling & Spaces listener
    setupKeyboardScrolling();

    // 3. Mobile Touch Arrows Programmatic Scrolling
    setupTouchArrowScrolling();

    // 4. Music Controller Button Click
    if (musicToggle) {
      musicToggle.addEventListener("click", toggleMusic);
    }

    // 5. Speech Bubble trigger click actions
    if (speechBubble) {
      speechBubble.addEventListener("click", () => {
        if (activeMilestone && activeMilestone.action === "openModal") {
          triggerMilestoneAction(activeMilestone);
        }
      });
    }

    // 6. Milestone absolute nodes direct clicks
    config.milestones.forEach(m => {
      const el = document.querySelector(`[data-milestone-id="${m.id}"]`);
      if (el) {
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          if (m.action === "openModal") {
            triggerMilestoneAction(m);
          } else {
            scrollToMilestone(m);
          }
        });
      }
    });
  }

  // --- Programmatic Hold Scrolling arrows logic ---
  let isHolding = false;
  let holdDirection = 0;
  let holdScrollTimer = null;

  function startHoldScrolling(direction) {
    isHolding = true;
    holdDirection = direction;
    
    function loop() {
      if (!isHolding || modalOverlay.classList.contains("active")) {
        isHolding = false;
        return;
      }
      const scrollSpeed = 10; // Scroll speed in pixels per frame
      gameContainer.scrollLeft += holdDirection * scrollSpeed;
      
      // Explicitly trigger scroll updates to ensure immediate visual responsiveness and speech bubble hiding
      handleScroll();
      
      holdScrollTimer = requestAnimationFrame(loop);
    }
    cancelAnimationFrame(holdScrollTimer);
    holdScrollTimer = requestAnimationFrame(loop);
  }

  function stopHoldScrolling() {
    isHolding = false;
    cancelAnimationFrame(holdScrollTimer);
  }

  function setupTouchArrowScrolling() {
    if (btnLeft && btnRight) {
      // Left button events
      btnLeft.addEventListener("mousedown", (e) => {
        e.preventDefault();
        btnLeft.classList.add("onhold");
        startHoldScrolling(-1);
      });
      btnLeft.addEventListener("touchstart", (e) => {
        if (e.cancelable) e.preventDefault();
        btnLeft.classList.add("onhold");
        startHoldScrolling(-1);
      }, { passive: false });
      
      // Right button events
      btnRight.addEventListener("mousedown", (e) => {
        e.preventDefault();
        btnRight.classList.add("onhold");
        startHoldScrolling(1);
      });
      btnRight.addEventListener("touchstart", (e) => {
        if (e.cancelable) e.preventDefault();
        btnRight.classList.add("onhold");
        startHoldScrolling(1);
      }, { passive: false });
      
      // Stop events
      const releaseControls = (e) => {
        btnLeft.classList.remove("onhold");
        btnRight.classList.remove("onhold");
        stopHoldScrolling();
      };
      
      window.addEventListener("mouseup", releaseControls);
      window.addEventListener("touchend", releaseControls);
      btnLeft.addEventListener("mouseleave", releaseControls);
      btnRight.addEventListener("mouseleave", releaseControls);
    }
  }

  // --- Keyboard Scrolling Actions loop ---
  let isHoldingKey = false;
  let keyDirection = 0;
  const keysPressed = {};
  let keyScrollTimer = null;

  function updateKeyScroll() {
    const leftPressed = keysPressed.ArrowLeft || keysPressed.KeyA;
    const rightPressed = keysPressed.ArrowRight || keysPressed.KeyD;
    
    if (leftPressed && !rightPressed) {
      keyDirection = -1;
      isHoldingKey = true;
    } else if (rightPressed && !leftPressed) {
      keyDirection = 1;
      isHoldingKey = true;
    } else {
      isHoldingKey = false;
    }
    
    if (isHoldingKey) {
      startKeyScrollLoop();
    } else {
      stopKeyScrollLoop();
    }
  }

  function startKeyScrollLoop() {
    function loop() {
      if (!isHoldingKey || modalOverlay.classList.contains("active")) {
        isHoldingKey = false;
        return;
      }
      const keyboardScrollSpeed = 10;
      gameContainer.scrollLeft += keyDirection * keyboardScrollSpeed;
      
      // Explicitly trigger scroll updates to ensure immediate walk feedback and speech bubble hiding
      handleScroll();
      
      keyScrollTimer = requestAnimationFrame(loop);
    }
    cancelAnimationFrame(keyScrollTimer);
    keyScrollTimer = requestAnimationFrame(loop);
  }

  function stopKeyScrollLoop() {
    cancelAnimationFrame(keyScrollTimer);
  }

  function setupKeyboardScrolling() {
    window.addEventListener("keydown", (e) => {
      if (modalOverlay.classList.contains("active")) return;
      
      if (e.code === "ArrowLeft" || e.code === "KeyA" || e.code === "ArrowRight" || e.code === "KeyD") {
        keysPressed[e.code] = true;
        updateKeyScroll();
      }
      
      // Space or Enter hotkeys to trigger milestone modals
      if (e.code === "Space" || e.code === "Enter") {
        if (activeMilestone && activeMilestone.action === "openModal") {
          e.preventDefault();
          triggerMilestoneAction(activeMilestone);
        }
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.code === "ArrowLeft" || e.code === "KeyA" || e.code === "ArrowRight" || e.code === "KeyD") {
        delete keysPressed[e.code];
        updateKeyScroll();
      }
    });
  }

  // --- Audio System ---
  function initAudio() {
    if (!audioEl) return;
    audioEl.src = config.general.musicUrl;
    audioEl.play().then(() => {
      audioPlaying = true;
      if (musicToggle) musicToggle.classList.add("playing");
    }).catch(err => {
      console.log("Autoplay blocked by browser client policies. Awaiting click.");
      audioPlaying = false;
    });
  }

  function toggleMusic() {
    if (!audioEl) return;
    if (audioPlaying) {
      audioEl.pause();
      audioPlaying = false;
      if (musicToggle) musicToggle.classList.remove("playing");
    } else {
      audioEl.play().then(() => {
        audioPlaying = true;
        if (musicToggle) musicToggle.classList.add("playing");
      }).catch(err => console.error("Audio playback error:", err));
    }
  }

  // --- Trigger Modal Actions ---
  function triggerMilestoneAction(milestone) {
    if (milestone.action === "openModal" && milestone.modalId) {
      openModal(milestone.modalId);
    }
  }

  // --- Premium Glassmorphism Modals Renderer & HTML templates ---
  function openModal(modalId) {
    let contentHtml = "";
    if (modalContainer) {
      modalContainer.className = "modal-card";
    }
    
    if (modalId === "modal-welcome") {
      if (modalContainer) {
        modalContainer.classList.add("light-theme");
      }
      
      const urlParams = new URLSearchParams(window.location.search);
      const guestParam = urlParams.get("to") || urlParams.get("u");
      const guestName = guestParam ? decodeURIComponent(guestParam) : config.cover.guestNameFallback;
      
      let displayDate = config.general.weddingDateFormattedFull || "12 . 07 . 2026";
      
      contentHtml = `
        <div class="modal-welcome-content">
          <p class="modal-welcome-greeting">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <h2 class="modal-welcome-guest">${guestName}</h2>
          
          <div class="modal-welcome-verse">
            <div class="modal-welcome-arabic">${config.welcome?.arabic || ''}</div>
            <div class="modal-welcome-meaning">${config.welcome?.meaning || ''}</div>
          </div>
          
          <h3 class="modal-welcome-names">${config.general.brideNickname} & ${config.general.groomNickname}</h3>
          <p class="modal-welcome-date">${displayDate}</p>
          
          <button class="btn-welcome-ok" id="btn-welcome-close">Ok, Mengerti</button>
        </div>
      `;
    } 
    else if (modalId === "modal-mempelai") {
      if (modalContainer) {
        modalContainer.className = "modal-card mempelai-custom-modal";
      }
      
      const urlParams = new URLSearchParams(window.location.search);
      const guestParam = urlParams.get("to") || urlParams.get("u");
      const guestName = guestParam ? decodeURIComponent(guestParam) : config.cover.guestNameFallback;

      contentHtml = `
        <!-- Couple wrapper containing hearts and couple image -->
        <div class="mempelai-custom-couple-wrap">
          <!-- Hearts cluster -->
          <div class="mempelai-custom-hearts">
            <span class="heart-item heart-1">❤️</span>
            <span class="heart-item heart-2">❤️</span>
            <span class="heart-item heart-3">❤️</span>
          </div>
          <!-- Couple image -->
          <img src="https://cdn-uploads.owlink.id/contenful/game-java/couple.png" class="mempelai-custom-couple pixelated">
        </div>
        
        <!-- Overlapping white card -->
        <div class="mempelai-custom-card">
          <p class="mempelai-custom-greeting">Terima kasih, <strong>${guestName}</strong>!</p>
          <p class="mempelai-custom-text">kami tunggu kamu di acara pernikahan kami.<br>kamu juga bisa loh kasih kami doa & ucapan.</p>
          <div class="mempelai-custom-signature">
            <p class="signature-label">Yang berbahagia</p>
            <p class="signature-names">${config.mempelai.bride.name} & ${config.mempelai.groom.name}</p>
          </div>
          <div class="mempelai-custom-actions">
            <button class="action-link link-wish" id="btn-mempelai-wish">Kirim doa & Ucapan</button>
            <button class="action-link link-close" id="btn-mempelai-close">Mungkin lain kali</button>
          </div>
        </div>
        
        <!-- Ground floor path at bottom -->
        <div class="mempelai-custom-ground"></div>
      `;
    } 
    else if (modalId === "modal-event") {
      contentHtml = `
        <div class="modal-header">
          <h3 class="modal-title">Save The Date</h3>
        </div>
        <div class="modal-body">
          <div class="event-card">
            <div class="event-card-header">💍 ${config.event.akad.title}</div>
            <div class="event-details">
              <div class="event-row"><span class="event-label">Hari/Tgl:</span><span>${config.general.weddingDate}</span></div>
              <div class="event-row"><span class="event-label">Waktu:</span><span>${config.event.akad.time}</span></div>
              <div class="event-row"><span class="event-label">Tempat:</span><span>${config.event.akad.venue}</span></div>
              <div class="event-row"><span class="event-label">Alamat:</span><span>${config.event.akad.address}</span></div>
            </div>
          </div>
          <div class="event-card">
            <div class="event-card-header">🎉 ${config.event.resepsi.title}</div>
            <div class="event-details">
              <div class="event-row"><span class="event-label">Hari/Tgl:</span><span>${config.general.weddingDate}</span></div>
              <div class="event-row"><span class="event-label">Waktu:</span><span>${config.event.resepsi.time}</span></div>
              <div class="event-row"><span class="event-label">Tempat:</span><span>${config.event.resepsi.venue}</span></div>
              <div class="event-row"><span class="event-label">Alamat:</span><span>${config.event.resepsi.address}</span></div>
            </div>
          </div>
          <div class="map-wrapper">
            <iframe src="${config.event.mapEmbedUrl}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <a href="${config.event.mapLink}" target="_blank" class="btn-map">🧭 BUKA GOOGLE MAPS</a>
        </div>
      `;
    }
    else if (modalId === "modal-story") {
      if (modalContainer) {
        modalContainer.classList.add("story-light-theme");
      }
      
      const storyTitle = config.story?.title || "Our Love Story";
      const preciousTitle = config.story?.preciousMomentTitle || "Precious moment";
      const preciousText = config.story?.preciousMomentText || `"Creating memories is a priceless gift. Memories last a lifetime; objects last only a short time."`;
      
      let chaptersHtml = "";
      const chapters = config.story?.chapters || [
        {
          title: "The Beginning",
          description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, maxime dolor, dolorum recusandae odit quae nostrum cumque asperiores natus repellat",
          imgUrl: "https://cdn-uploads.owlink.id/acf11590-4e7f-11f1-b4e7-09dce495479a.jpg"
        },
        {
          title: "First Date",
          description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, maxime dolor, dolorum recusandae odit quae nostrum cumque asperiores natus repellat enim architecto",
          imgUrl: "https://cdn-uploads.owlink.id/acf11590-4e7f-11f1-b4e7-09dce495479a.jpg"
        },
        {
          title: "The Proposal",
          description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, maxime dolor, dolorum recusandae odit quae nostrum cumque asperiores natus repellat enim architecto",
          imgUrl: "https://cdn-uploads.owlink.id/acf11590-4e7f-11f1-b4e7-09dce495479a.jpg"
        },
        {
          title: "Our Wedding",
          description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, maxime dolor, dolorum recusandae odit quae nostrum cumque asperiores natus repellat enim architecto",
          imgUrl: "https://cdn-uploads.owlink.id/acf11590-4e7f-11f1-b4e7-09dce495479a.jpg"
        }
      ];
      
      chapters.forEach(ch => {
        chaptersHtml += `
          <div style="width: 100%;">
            <img src="${ch.imgUrl}" style="width: 100%; height: auto; display: block;" alt="${ch.title}">
            <div style="padding: 20px; text-align: center; background: white;">
              <h4 style="font-family: 'Great Vibes', cursive; font-size: 1.8rem; color: #555; margin-bottom: 10px;">${ch.title}</h4>
              <p style="color: #b89c65; font-size: 0.95rem; margin-bottom: 0; line-height: 1.5;">${ch.description}</p>
            </div>
          </div>
        `;
      });

      contentHtml = `
        <div class="modal-header">
          <h3 class="modal-title" style="font-family: 'Great Vibes', cursive; font-size: 2.2rem; color: #111111; margin: 0; padding-top: 10px;">${storyTitle}</h3>
        </div>
        <div class="modal-body" style="padding: 0; display: flex; flex-direction: column; overflow-y: auto;">
          ${chaptersHtml}
          <div style="padding: 30px 20px 40px; text-align: center; background: white; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;">
            <h4 style="font-family: 'Great Vibes', cursive; font-size: 2.2rem; color: #8c7335; margin-bottom: 15px;">${preciousTitle}</h4>
            <p style="color: #555; font-size: 0.9rem; margin-bottom: 20px; font-style: italic; line-height: 1.6;">${preciousText}</p>
          </div>
        </div>
      `;
    }
    else if (modalId === "modal-gallery") {
      const mGallery = config.milestones.find(m => m.id === "gallery");
      const images = mGallery ? (mGallery.galleryImages || []) : [];
      
      let slidesHtml = "";
      let dotsHtml = "";
      images.forEach((img, i) => {
        slidesHtml += `
          <div class="gallery-slide ${i === 0 ? 'active' : ''}" data-index="${i}">
            <img src="${img}">
          </div>
        `;
        dotsHtml += `<div class="gallery-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`;
      });

      contentHtml = `
        <div class="modal-header">
          <h3 class="modal-title">Our Sweet Moments</h3>
        </div>
        <div class="modal-body">
          <div class="gallery-container">
            <div class="gallery-viewer">
              ${slidesHtml}
              <button class="gallery-nav prev">◀</button>
              <button class="gallery-nav next">▶</button>
            </div>
            <div class="gallery-dots">
              ${dotsHtml}
            </div>
          </div>
        </div>
      `;
    }
    else if (modalId === "modal-rsvp") {
      if (modalContainer) {
        modalContainer.classList.add("light-theme");
      }
      
      const urlParams = new URLSearchParams(window.location.search);
      const guestParam = urlParams.get("to") || urlParams.get("u");
      const guestName = guestParam ? decodeURIComponent(guestParam) : config.cover.guestNameFallback;
      
      const getFormattedTime = (timeStr) => {
        if (!timeStr) return "";
        let clean = timeStr.replace(/pukul/i, "").trim();
        let timezone = "";
        if (clean.toUpperCase().includes("WIB")) { timezone = "WIB"; clean = clean.replace(/wib/i, "").trim(); }
        else if (clean.toUpperCase().includes("WITA")) { timezone = "WITA"; clean = clean.replace(/wita/i, "").trim(); }
        else if (clean.toUpperCase().includes("WIT")) { timezone = "WIT"; clean = clean.replace(/wit/i, "").trim(); }
        
        if (clean.includes("-")) {
          clean = clean.split("-")[0].trim();
        }
        return `${clean} ${timezone}`.trim();
      };
      
      contentHtml = `
        <div class="modal-welcome-content rsvp-welcome-container">
          <p class="rsvp-welcome-hi">Hi, <strong>${guestName}</strong>!</p>
          
          <p class="rsvp-welcome-intro">Selamat datang di acara pernikahan ${config.general.brideNickname} & ${config.general.groomNickname}.</p>
          
          <p class="rsvp-welcome-address-label">alamat: <a href="${config.event.mapLink}" target="_blank" class="rsvp-address-link">${config.event.resepsi.venue}, ${config.event.resepsi.address}</a></p>
          
          <div class="rsvp-welcome-schedule">
            <p class="schedule-label">jadwal acara:</p>
            <p class="schedule-item">marriage contract - ${config.general.weddingDate} (at ${getFormattedTime(config.event.akad.time)} - finish)</p>
            <p class="schedule-item">reception - ${config.general.weddingDate} (at ${getFormattedTime(config.event.resepsi.time)} - finish)</p>
          </div>
          
          <p class="rsvp-welcome-instruction">sebelum kamu menghadiri acara pernikahannya. kamu harus melakukan konfirmasi kehadiran terlebih dahulu. apakah kamu bersedia melakukannya?</p>
          
          <div class="rsvp-welcome-actions">
            <button class="btn-rsvp-agree" id="btn-rsvp-agree">Ya saya mau melakukan konfirmasi kehadiran</button>
            <button class="btn-rsvp-decline" id="btn-rsvp-decline">Nanti dulu deh</button>
          </div>
        </div>
      `;
    }
    else if (modalId === "modal-gift") {
      if (modalContainer) {
        modalContainer.classList.add("light-theme");
      }
      contentHtml = `
        <div class="modal-header">
          <h3 class="modal-title">${config.gifts.title}</h3>
        </div>
        <div class="modal-body">
          <!-- Loaded dynamically via bindModalFeatures -->
        </div>
      `;
    }

    // Set inside DOM Modal Overlay Card
    if (modalContainer) {
      modalContainer.innerHTML = contentHtml;
      
      // Inject Retro Modal Close Button (Except for custom mempelai modal)
      if (modalId !== "modal-mempelai") {
        const closeBtn = document.createElement("button");
        if (modalId === "modal-gift") {
          closeBtn.className = "btn-close-modal-gift";
        } else {
          closeBtn.className = "btn-close-modal";
        }
        closeBtn.innerText = "X";
        closeBtn.setAttribute("aria-label", "Close Modal Window");
        closeBtn.addEventListener("click", closeModal);
        modalContainer.appendChild(closeBtn);
      }
    }

    // Bind interaction event listeners inside current modal card context
    bindModalFeatures(modalId);

    // Show Overlay
    if (modalOverlay) {
      modalOverlay.classList.add("active");
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove("active");
    }
    // Set player character idle image
    if (mainPlayer) {
      mainPlayer.classList.remove("active");
    }
  }

  // Close modal when dark overlay itself clicked
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Fallback copy to clipboard logic for HTTP (insecure) or embedded Webview support
  function copyTextToClipboard(text, btnEl) {
    function success() {
      btnEl.innerText = "TERSALIN!";
      btnEl.classList.add("copied");
      setTimeout(() => {
        btnEl.innerText = "SALIN";
        btnEl.classList.remove("copied");
      }, 2500);
    }
    function fail(err) {
      console.error("Clipboard copy failed:", err);
      alert("Gagal menyalin otomatis. Silakan salin teks secara manual: " + text);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(success).catch(fail);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        const successful = document.execCommand("copy");
        if (successful) success();
        else fail();
      } catch (err) {
        fail(err);
      }
      document.body.removeChild(textarea);
    }
  }

  // Bind dynamic interactive components inside active Modal Cards
  function bindModalFeatures(modalId) {
    if (modalId === "modal-welcome") {
      const okBtn = document.getElementById("btn-welcome-close");
      if (okBtn) {
        okBtn.addEventListener("click", closeModal);
      }
    }
    if (modalId === "modal-mempelai") {
      const urlParams = new URLSearchParams(window.location.search);
      const guestParam = urlParams.get("to") || urlParams.get("u");
      const guestName = guestParam ? decodeURIComponent(guestParam) : config.cover.guestNameFallback;
      
      const cardContainer = modalContainer.querySelector(".mempelai-custom-card");
      
      const setupCardEvents = () => {
        const btnWish = document.getElementById("btn-mempelai-wish");
        const btnClose = document.getElementById("btn-mempelai-close");
        
        if (btnWish && cardContainer) {
          btnWish.addEventListener("click", () => {
            // Swap card content to the elegant form shown in user request
            cardContainer.innerHTML = `
              <h3 class="mempelai-form-title">Sampaikan doa & ucapan terbaikmu</h3>
              <form id="mempelai-wish-form" style="width: 100%; display: flex; flex-direction: column; align-items: stretch;">
                <div class="mempelai-form-group">
                  <input type="text" id="wish-name" class="mempelai-form-input" required placeholder="Your full name" value="${guestName}">
                </div>
                <div class="mempelai-form-group">
                  <input type="text" id="wish-address" class="mempelai-form-input" placeholder="Your address">
                </div>
                <div class="mempelai-form-group">
                  <textarea id="wish-message" class="mempelai-form-input message-textarea" required placeholder="ex: congrats for this event"></textarea>
                </div>
                <button type="submit" class="btn-wish-submit">submit now</button>
              </form>
              <button type="button" class="btn-wish-cancel" id="btn-wish-cancel">Batalkan</button>
            `;
            
            // Bind Form Submit
            const wishForm = document.getElementById("mempelai-wish-form");
            if (wishForm) {
              wishForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const name = document.getElementById("wish-name").value;
                const address = document.getElementById("wish-address").value || "";
                const message = document.getElementById("wish-message").value;
                
                // Keep msg formatted clean for wishes scroll bulletin
                const formattedMsg = address ? `${message} (Alamat: ${address})` : message;
                
                const newRsvp = {
                  name: name,
                  count: 1,
                  status: "hadir",
                  msg: formattedMsg
                };
                
                // Save locally
                let stored = JSON.parse(localStorage.getItem("wedding_rsvps")) || [];
                stored.unshift(newRsvp);
                localStorage.setItem("wedding_rsvps", JSON.stringify(stored));
                
                // Submit to Sheet API if available
                if (config.rsvp.submitUrl) {
                  fetch(config.rsvp.submitUrl, {
                    method: "POST",
                    body: JSON.stringify(newRsvp),
                    headers: { "Content-Type": "application/json" }
                  }).catch(err => console.log("Failed to post wish:", err));
                }
                
                alert("Terima kasih atas doa & ucapan Anda!");
                
                populateBulletinBoard();
                closeModal();
              });
            }
            
            // Bind Cancel Button to return to original state
            const btnCancel = document.getElementById("btn-wish-cancel");
            if (btnCancel) {
              btnCancel.addEventListener("click", () => {
                cardContainer.innerHTML = `
                  <p class="mempelai-custom-greeting">Terima kasih, <strong>${guestName}</strong>!</p>
                  <p class="mempelai-custom-text">kami tunggu kamu di acara pernikahan kami.<br>kamu juga bisa loh kasih kami doa & ucapan.</p>
                  <div class="mempelai-custom-signature">
                    <p class="signature-label">Yang berbahagia</p>
                    <p class="signature-names">${config.mempelai.bride.name} & ${config.mempelai.groom.name}</p>
                  </div>
                  <div class="mempelai-custom-actions">
                    <button class="action-link link-wish" id="btn-mempelai-wish">Kirim doa & Ucapan</button>
                    <button class="action-link link-close" id="btn-mempelai-close">Mungkin lain kali</button>
                  </div>
                `;
                setupCardEvents();
              });
            }
          });
        }
        
        if (btnClose) {
          btnClose.addEventListener("click", closeModal);
        }
      };
      
      setupCardEvents();
    }
    // 1. Gallery Slide Carousel Controller
    if (modalId === "modal-gallery" && modalContainer) {
      const viewer = modalContainer.querySelector(".gallery-viewer");
      if (viewer) {
        const slides = viewer.querySelectorAll(".gallery-slide");
        const dots = modalContainer.querySelectorAll(".gallery-dot");
        const prevBtn = viewer.querySelector(".gallery-nav.prev");
        const nextBtn = viewer.querySelector(".gallery-nav.next");
        
        let currentIndex = 0;

        const showSlide = (index) => {
          slides.forEach(s => s.classList.remove("active"));
          dots.forEach(d => d.classList.remove("active"));
          
          slides[index].classList.add("active");
          dots[index].classList.add("active");
          currentIndex = index;
        };

        if (prevBtn) {
          prevBtn.addEventListener("click", () => {
            let index = currentIndex - 1;
            if (index < 0) index = slides.length - 1;
            showSlide(index);
          });
        }

        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            let index = currentIndex + 1;
            if (index >= slides.length) index = 0;
            showSlide(index);
          });
        }

        dots.forEach(d => {
          d.addEventListener("click", () => {
            const idx = parseInt(d.getAttribute("data-index"));
            showSlide(idx);
          });
        });
      }
    }

    // 2. RSVP submissions and localStorage Guestbook sync
    if (modalId === "modal-rsvp") {
      const btnAgree = document.getElementById("btn-rsvp-agree");
      const btnDecline = document.getElementById("btn-rsvp-decline");
      
      if (btnDecline) {
        btnDecline.addEventListener("click", closeModal);
      }
      
      if (btnAgree) {
        btnAgree.addEventListener("click", () => {
          renderRsvpForm();
        });
      }

      function renderRsvpForm() {
        if (!modalContainer) return;
        
        modalContainer.classList.add("light-theme");
        
        const urlParams = new URLSearchParams(window.location.search);
        const guestParam = urlParams.get("to") || urlParams.get("u");
        const guestName = guestParam ? decodeURIComponent(guestParam) : config.cover.guestNameFallback;

        modalContainer.innerHTML = `
          <div class="rsvp-form-container">
            <h3 class="rsvp-form-title">Silahkan mengisi data konfirmasi kehadiran anda</h3>
            <form id="rsvp-form">
              <div class="rsvp-form-group">
                <label for="rsvp-name" class="rsvp-form-label">Full Name</label>
                <input type="text" id="rsvp-name" class="rsvp-form-input" required placeholder="Your full name" value="${guestName}">
              </div>
              <div class="rsvp-form-group">
                <input type="text" id="rsvp-whatsapp" class="rsvp-form-input" placeholder="Whatsapp number ex: 6289666613131">
              </div>
              <div class="rsvp-form-group">
                <input type="text" id="rsvp-address" class="rsvp-form-input" placeholder="Address/Company">
              </div>
              <div class="rsvp-form-radio-group">
                <label class="rsvp-form-radio-label">
                  <input type="radio" name="rsvp-status" value="hadir" checked>
                  <span class="custom-radio"></span>
                  Yes, I'll be there
                </label>
                <label class="rsvp-form-radio-label">
                  <input type="radio" name="rsvp-status" value="absen">
                  <span class="custom-radio"></span>
                  Sorry, I can't
                </label>
              </div>
              <button type="submit" class="btn-rsvp-submit">Submit confirmation</button>
            </form>
            <button type="button" class="btn-rsvp-cancel" id="btn-rsvp-cancel">Batalkan</button>
          </div>
        `;

        // Bind form controls
        setupRsvpFormHandling();
      }

      function setupRsvpFormHandling() {
        const form = document.getElementById("rsvp-form");
        const btnCancel = document.getElementById("btn-rsvp-cancel");

        if (btnCancel) {
          btnCancel.addEventListener("click", () => {
            openModal("modal-rsvp");
          });
        }

        if (form) {
          form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const name = document.getElementById("rsvp-name").value;
            const whatsapp = document.getElementById("rsvp-whatsapp").value || "";
            const address = document.getElementById("rsvp-address").value || "";
            
            const statusEl = document.querySelector('input[name="rsvp-status"]:checked');
            const status = statusEl ? statusEl.value : "hadir";
            const statusText = status === "hadir" ? "Yes, I'll be there" : "Sorry, I can't";
            
            // Concatenate address and whatsapp for wishes wall & local storage compatibility
            const msg = `Alamat/Instansi: ${address || '-'} | WA: ${whatsapp || '-'}`;

            const newRsvp = { name, count: 1, status, msg };
            
            // Save locally
            let stored = JSON.parse(localStorage.getItem("wedding_rsvps")) || [];
            stored.unshift(newRsvp);
            localStorage.setItem("wedding_rsvps", JSON.stringify(stored));
            
            // Format WhatsApp template
            const waText = `Halo ${config.general.brideNickname} & ${config.general.groomNickname}! \n\nSaya ingin konfirmasi kehadiran di acara pernikahan kalian:\nNama: ${name}\nWhatsApp: ${whatsapp || '-'}\nAlamat/Instansi: ${address || '-'}\nKonfirmasi: ${statusText}\n\nTerima Kasih!`;
            const waUrl = `https://api.whatsapp.com/send?phone=${config.rsvp.whatsappNumber}&text=${encodeURIComponent(waText)}`;
            
            // Post to Sheet endpoint integration if provided
            if (config.rsvp.submitUrl) {
              fetch(config.rsvp.submitUrl, {
                method: "POST",
                body: JSON.stringify(newRsvp),
                headers: { "Content-Type": "application/json" }
              }).catch(err => console.log("Failed to post RSVP to cloud database API:", err));
            }

            // Visual check
            alert("Terima kasih atas konfirmasi kehadiran Anda! Anda akan diarahkan ke WhatsApp untuk mengirimkan konfirmasi.");
            window.open(waUrl, "_blank");

            closeModal();
            
            // Dynamically refresh the background wishing board entries
            populateBulletinBoard();
          });
        }
      }
    }

    // 3. Gift modal form handling, tab selection, step transition, local storage saving and bank transfer copy utility
    if (modalId === "modal-gift" && modalContainer) {
      let selectedMethod = "qris";

      function renderStep1() {
        const modalBody = modalContainer.querySelector(".modal-body");
        if (!modalBody) return;

        const urlParams = new URLSearchParams(window.location.search);
        const guestParam = urlParams.get("to") || urlParams.get("u");
        const guestName = guestParam ? decodeURIComponent(guestParam) : config.cover.guestNameFallback;

        modalBody.innerHTML = `
          <div class="gift-form-container">
            <div class="gift-form-title">${config.gifts.description}</div>
            <ul class="gift-form-tabs">
              <li class="gift-tab-item ${selectedMethod === 'qris' ? 'tab-gold' : 'tab-blue'}" data-method="qris">QRIS</li>
              <li class="gift-tab-item ${selectedMethod === 'transfer' ? 'tab-gold' : 'tab-blue'}" data-method="transfer">Direct Transfer</li>
              <li class="gift-tab-item ${selectedMethod === 'send' ? 'tab-gold' : 'tab-blue'}" data-method="send">Send Gift</li>
            </ul>
            <form id="gift-form">
              <div class="gift-form-group">
                <label for="gift-name" class="gift-form-label">Full Name</label>
                <input type="text" id="gift-name" class="gift-form-input" required placeholder="Your full name" value="${guestName}">
              </div>
              <div class="gift-form-group">
                <label for="gift-email" class="gift-form-label">Email Address</label>
                <input type="email" id="gift-email" class="gift-form-input" required placeholder="Your email address">
              </div>
              <div class="gift-form-group">
                <label for="gift-message" class="gift-form-label">Message</label>
                <textarea id="gift-message" class="gift-form-textarea" required placeholder="Your message"></textarea>
              </div>
              <button type="submit" class="btn-gift-submit">make a gift now &rarr;</button>
            </form>
          </div>
        `;

        // Bind tabs
        const tabs = modalBody.querySelectorAll(".gift-tab-item");
        tabs.forEach(tab => {
          tab.addEventListener("click", () => {
            tabs.forEach(t => {
              t.classList.remove("tab-gold");
              t.classList.add("tab-blue");
            });
            tab.classList.remove("tab-blue");
            tab.classList.add("tab-gold");
            selectedMethod = tab.getAttribute("data-method");
          });
        });

        // Bind Form Submit
        const form = modalBody.querySelector("#gift-form");
        if (form) {
          form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("gift-name").value;
            const email = document.getElementById("gift-email").value;
            const message = document.getElementById("gift-message").value;

            // Save to local storage
            const newGift = { name, email, message, method: selectedMethod, date: new Date().toISOString() };
            let stored = JSON.parse(localStorage.getItem("wedding_gifts")) || [];
            stored.unshift(newGift);
            localStorage.setItem("wedding_gifts", JSON.stringify(stored));

            // Render Step 2
            renderStep2(name, selectedMethod);
          });
        }
      }

      function renderStep2(name, method) {
        const modalBody = modalContainer.querySelector(".modal-body");
        if (!modalBody) return;

        let detailsHtml = "";
        if (method === "qris") {
          detailsHtml = `
            <div class="gift-details-container">
              <div class="gift-details-thanks">Terima Kasih, ${name}!</div>
              <p style="font-size: 0.95rem; color: #4b5563; margin-bottom: 10px;">Silakan pindai kode QRIS di bawah ini untuk mentransfer kado:</p>
              <div class="qris-image-wrapper">
                <img src="qris_mock.png" alt="QRIS QR Code">
              </div>
              <div class="gift-details-back-link">&larr; Kembali</div>
            </div>
          `;
        } else if (method === "transfer") {
          let accountsHtml = "";
          config.gifts.accounts.forEach(acc => {
            accountsHtml += `
              <div class="gift-card">
                <div class="gift-header">
                  <span>${acc.logo} ${acc.bankName}</span>
                  <span>Atas Nama: ${acc.accountHolder}</span>
                </div>
                <div class="gift-account-number">
                  <span class="acc-num" id="acc-${acc.accountNumber}">${acc.accountNumber}</span>
                  <button class="btn-copy" data-clipboard="${acc.accountNumber}">SALIN</button>
                </div>
              </div>
            `;
          });

          detailsHtml = `
            <div class="gift-details-container">
              <div class="gift-details-thanks">Terima Kasih, ${name}!</div>
              <p style="font-size: 0.95rem; color: #4b5563; margin-bottom: 10px;">Silakan melakukan transfer ke rekening di bawah ini:</p>
              <div class="gift-accounts-list" style="width: 100%; display: flex; flex-direction: column; gap: 12px; margin: 15px 0;">
                ${accountsHtml}
              </div>
              <div class="gift-details-back-link">&larr; Kembali</div>
            </div>
          `;
        } else if (method === "send") {
          detailsHtml = `
            <div class="gift-details-container">
              <div class="gift-details-thanks">Terima Kasih, ${name}!</div>
              <p style="font-size: 0.95rem; color: #4b5563; margin-bottom: 10px;">Silakan kirimkan kado fisik Anda ke alamat penerima di bawah ini:</p>
              <div class="gift-address-card">
                <div class="gift-address-title">Alamat Pengiriman (Kado Fisik)</div>
                <div class="gift-address-detail">
                  <strong>Penerima:</strong> ${config.general.brideNickname} & ${config.general.groomNickname}<br>
                  <strong>Alamat:</strong> ${config.event.resepsi.venue}, ${config.event.resepsi.address}
                </div>
              </div>
              <div class="gift-details-back-link">&larr; Kembali</div>
            </div>
          `;
        }

        modalBody.innerHTML = detailsHtml;

        // Bind Copy Buttons (if method is transfer)
        if (method === "transfer") {
          const copyButtons = modalBody.querySelectorAll(".btn-copy");
          copyButtons.forEach(btn => {
            btn.addEventListener("click", () => {
              const textToCopy = btn.getAttribute("data-clipboard");
              copyTextToClipboard(textToCopy, btn);
            });
          });
        }

        // Bind Kembali Link
        const backLink = modalBody.querySelector(".gift-details-back-link");
        if (backLink) {
          backLink.addEventListener("click", () => {
            renderStep1();
          });
        }
      }

      // Initial render of Step 1 form when modal opens
      renderStep1();
    }
  }
});
