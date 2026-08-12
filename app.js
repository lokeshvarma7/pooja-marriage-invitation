/**
 * Pooja & Durga Prasadh Wedding Invitation Script
 * Controls countdown, music player, interactive RSVP, flower shower, lightbox, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. MOBILE NAVIGATION MENU
  // ==========================================
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const closeMenuBtn = document.querySelector('.close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleMobileMenu = () => {
    mobileMenu.classList.toggle('hidden');
    document.body.style.overflow = mobileMenu.classList.contains('hidden') ? '' : 'hidden';
  };

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    });
  });


  // ==========================================
  // 2. COUNTDOWN TIMER
  // ==========================================
  // Target: 23 August 2026, 10:00:00 AM IST (UTC +5:30)
  const targetDate = new Date('August 23, 2026 10:00:00').getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const daysVal = document.getElementById('days');
    const hoursVal = document.getElementById('hours');
    const minutesVal = document.getElementById('minutes');
    const secondsVal = document.getElementById('seconds');

    if (difference < 0) {
      // Event has passed or is active
      if (daysVal) {
        document.querySelector('.countdown-title').textContent = "The Ceremony has Begun! 🎉";
        document.querySelector('.countdown-grid').innerHTML = `
          <div class="gold-text font-display" style="font-size: 2.2rem; font-weight: 700; width: 100%;">
            Congratulations Pooja & Durga Prasadh!
          </div>
        `;
      }
      return;
    }

    // Calculations
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Update DOM
    if (daysVal) daysVal.textContent = days.toString().padStart(2, '0');
    if (hoursVal) hoursVal.textContent = hours.toString().padStart(2, '0');
    if (minutesVal) minutesVal.textContent = minutes.toString().padStart(2, '0');
    if (secondsVal) secondsVal.textContent = seconds.toString().padStart(2, '0');
  };

  // Run immediately and then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);


  // ==========================================
  // 3. BACKGROUND MUSIC CONTROLLER & WELCOME ENTRANCE
  // ==========================================
  const bgMusic = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const welcomeOverlay = document.getElementById('welcome-overlay');
  const enterBtn = document.getElementById('enter-btn');
  
  let isPlaying = false;

  const playAudio = () => {
    bgMusic.play()
      .then(() => {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        isPlaying = true;
      })
      .catch(err => {
        console.log('Play blocked by browser permissions', err);
      });
  };

  const toggleMusic = () => {
    if (isPlaying) {
      bgMusic.pause();
      playIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
      isPlaying = false;
    } else {
      playAudio();
    }
  };

  // Welcome overlay handler
  if (enterBtn && welcomeOverlay) {
    enterBtn.addEventListener('click', () => {
      // Play Audio on click
      playAudio();

      // Unlock scrolling
      document.body.classList.remove('scroll-lock');

      // Fade out welcome screen
      welcomeOverlay.classList.add('fade-out');

      // Clean up DOM after transition
      setTimeout(() => {
        welcomeOverlay.remove();
      }, 1000);
    });
  }

  if (musicBtn && bgMusic) {
    musicBtn.addEventListener('click', toggleMusic);
    
    // Direct autoplay attempt
    bgMusic.play()
      .then(() => {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        isPlaying = true;
      })
      .catch(() => {
        // Autoplay blocked by browser. Set up background listener for any click/touch/keydown
        const autoPlayOnInteraction = () => {
          if (!isPlaying) {
            bgMusic.play()
              .then(() => {
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
                isPlaying = true;
                removeInteractionListeners();
              })
              .catch(() => {});
          }
        };

        const interactionEvents = ['click', 'touchstart', 'keydown'];
        
        const removeInteractionListeners = () => {
          interactionEvents.forEach(evt => {
            document.removeEventListener(evt, autoPlayOnInteraction);
          });
        };

        interactionEvents.forEach(evt => {
          document.addEventListener(evt, autoPlayOnInteraction, { passive: true });
        });
      });
  }


  // ==========================================
  // 4. FLOATING FLOWER SHOWER ANIMATION
  // ==========================================
  const flowerContainer = document.getElementById('flower-container');
  const maxPetals = 20;
  let activePetalsCount = 0;

  // Simple array of colors representing golden/yellow petals
  const petalColors = ['#FFFDD0', '#F3E5AB', '#D4AF37', '#AA771C', '#E6C229'];

  const createPetal = () => {
    if (activePetalsCount >= maxPetals) return;

    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    // Random styling
    const size = Math.random() * 15 + 8; // width/height between 8px and 23px
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 8 + 6; // fall duration 6s to 14s
    const color = petalColors[Math.floor(Math.random() * petalColors.length)];
    const opacity = Math.random() * 0.5 + 0.3; // opacity between 0.3 and 0.8
    
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${startX}px`;
    petal.style.backgroundColor = color;
    petal.style.opacity = opacity.toString();
    petal.style.animationDuration = `${duration}s`;
    
    // Random border radius to shape into petals
    const shape = Math.random() > 0.5 ? '50% 0 50% 50%' : '0 50% 50% 50%';
    petal.style.borderRadius = shape;

    flowerContainer.appendChild(petal);
    activePetalsCount++;

    // Remove when animation finishes
    petal.addEventListener('animationend', () => {
      petal.remove();
      activePetalsCount--;
    });
  };

  // Generate petals at intervals
  if (flowerContainer) {
    // Generate initial set
    for (let i = 0; i < 8; i++) {
      setTimeout(createPetal, Math.random() * 4000);
    }
    // Continuous loop
    setInterval(createPetal, 1200);
  }





  // ==========================================
  // 6. GALLERY LIGHTBOX SYSTEM
  // ==========================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');

  let currentImageIndex = 0;

  // Extract all gallery image sources and captions
  const imagesData = Array.from(galleryItems).map(item => {
    return {
      src: item.querySelector('img').src,
      caption: item.querySelector('.gallery-caption').textContent
    };
  });

  const openLightbox = (index) => {
    currentImageIndex = index;
    lightboxImg.src = imagesData[index].src;
    lightboxCaption.textContent = imagesData[index].caption;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
  };

  const showNextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % imagesData.length;
    lightboxImg.src = imagesData[currentImageIndex].src;
    lightboxCaption.textContent = imagesData[currentImageIndex].caption;
  };

  const showPrevImage = () => {
    currentImageIndex = (currentImageIndex - 1 + imagesData.length) % imagesData.length;
    lightboxImg.src = imagesData[currentImageIndex].src;
    lightboxCaption.textContent = imagesData[currentImageIndex].caption;
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.getAttribute('data-index'), 10);
      openLightbox(index);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

  // Close lightbox by clicking on background
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation inside lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('hidden')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNextImage();
      if (e.key === 'ArrowLeft') showPrevImage();
    }
  });


  // ==========================================
  // 7. SMOOTH SCROLL REVEAL EFFECT
  // ==========================================
  const scrollElements = document.querySelectorAll('.scroll-reveal');

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= 
      (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add('active');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.15)) {
        displayScrollElement(el);
      }
    });
  };

  // Add scroll listener with throttling/passive mode
  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  }, { passive: true });

  // Initial trigger to reveal visible elements
  handleScrollAnimation();

});
