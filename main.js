function audio1() {
  const audio = document.getElementById('audio1');
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
}

function audio2() {
  const audio = document.getElementById('audio2');
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
}
function audio3() {
  const audio = document.getElementById('audio3');
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
}

const openPopupBtns = document.querySelectorAll('.open-popup-btn');
const closePopupBtns = document.querySelectorAll('.close-popup-btn');
const popupOverlays = document.querySelectorAll('.popup-overlay');

openPopupBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const popupId = btn.getAttribute('data-popup');
        const popup = document.getElementById(popupId);
        popup.classList.add('active');
    });
});

closePopupBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const popup = btn.closest('.popup-overlay');
        popup.classList.remove('active');
    });
});

popupOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
});
// BOOK ANIMATION

const {
    gsap,
    ScrollTrigger,
    gsap: { to, set },
} = window
  
  gsap.registerPlugin(ScrollTrigger)
  
  to('.book', {
    scrollTrigger: {
      scrub: 1,
      start: () => 0,
      end: () => window.innerHeight * 0.25,
    },
    scale: 1,
    left: '70%',
  })
  
  to('.gsap-logo', {
    scrollTrigger: {
      scrub: true,
      start: () => 13.5 * (window.innerHeight * 0.25),
      end: () => 14 * (window.innerHeight * 0.25),
    },
    opacity: 1,
  })
  
  const PAGES = [...document.querySelectorAll('.book__page')]
  PAGES.forEach((page, index) => {
    set(page, { z: index === 0 ? 13 : -index * 1 })
    if (index === 11) return false
    to(page, {
      rotateY: `-=${180 - index / 2}`,
      scrollTrigger: {
        scrub: 1,
        start: () => (index + 1) * (window.innerHeight * 0.25),
        end: () => (index + 2) * (window.innerHeight * 0.25),
      },
    })
    to(page, {
      z: index === 0 ? -13 : index,
      scrollTrigger: {
        scrub: 1,
        start: () => (index + 1) * (window.innerHeight * 0.25),
        end: () => (index + 1.5) * (window.innerHeight * 0.25),
      },
    })
  })

// Nuevo código para los mini-sliders
const miniSliders = document.querySelectorAll('.mini-slider');

miniSliders.forEach(slider => {
  const container = slider.querySelector('.mini-slider-container');
  const slides = slider.querySelectorAll('.mini-slide');
  const prevButton = slider.querySelector('.mini-prev');
  const nextButton = slider.querySelector('.mini-next');
  let currentSlide = 0;

  function updateMiniSlider() {
    container.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  function nextMiniSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateMiniSlider();
  }

  function prevMiniSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateMiniSlider();
  }

  prevButton.addEventListener('click', prevMiniSlide);
  nextButton.addEventListener('click', nextMiniSlide);
});

// Funcionalidad del botón de búsqueda
const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', () => {
  const selectedOptions = Array.from(miniSliders).map(slider => {
    const currentSlide = slider.querySelector('.mini-slider-container').style.transform;
    const slideIndex = parseInt(currentSlide.match(/-(\d+)%/)[1] / 100);
    return slideIndex + 1; // +1 porque los índices empiezan en 0
  });
  console.log('Opciones seleccionadas:', selectedOptions);
  // Aquí puedes añadir la lógica para buscar basada en las opciones seleccionadas
});


// AUDIO

// POPUP

const hoverItems = document.querySelectorAll('.hover-item');
const popupContainer = document.querySelector('.popup-container');

hoverItems.forEach(item => {
  const popup = item.querySelector('.popup');

  item.addEventListener('mouseenter', (e) => {  
    const rect = item.getBoundingClientRect();
    const popupContent = popup.cloneNode(true);
    
    popupContainer.innerHTML = '';
    popupContainer.appendChild(popupContent);
    popupContainer.style.display = 'block';
    
    const popupRect = popupContainer.getBoundingClientRect();
    
    let left = rect.right + 10;
    let top = rect.top;
    
    if (left + popupRect.width > window.innerWidth) {
      left = rect.left - popupRect.width - 10;
    }
    
    if (top + popupRect.height > window.innerHeight) {
      top = window.innerHeight - popupRect.height - 10;
    }
    
    popupContainer.style.left = `${left}px`;
    popupContainer.style.top = `${top}px`;
  });

  item.addEventListener('mouseleave', () => {
    popupContainer.style.display = 'none';
  });
});




// Slider

