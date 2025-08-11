/**
* Template Name: Delicious
* Template URL: https://bootstrapmade.com/delicious-free-restaurant-bootstrap-theme/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


// Pricing Script


function cartesianToPolar(x, y) {
  // Calculate r (magnitude)
  const r = Math.sqrt(x*x + y*y);

  // Calculate theta (angle)
  let theta = Math.atan2(y, x);

  // Convert theta to degrees
  theta = theta * 180 / Math.PI;

  // Adjust theta to be between 0 and 360 degrees
  if (theta < 0) {
      theta = 360 + theta;
  }

  // Return polar coordinates
  return { r, theta };
}

function findAngle(mouseX, mouseY, element) {
  const elementRect = element.getBoundingClientRect();
  const elementCenterX = elementRect.left + elementRect.width / 2;
  const elementCenterY = elementRect.top + elementRect.height / 2;

  const dx = mouseX - elementCenterX;
  const dy = mouseY - elementCenterY;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  return angle;
}
function findDistance(mouseX, mouseY, element) {
  const elementRect = element.getBoundingClientRect();
  const elementCenterX = elementRect.left + elementRect.width / 2;
  const elementCenterY = elementRect.top + elementRect.height / 2;

  const dx = mouseX - elementCenterX;
  const dy = mouseY - elementCenterY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance;
}


function calcBlur(r){
  if (r > 100){
      return .5;
  }else{
      return  10 - ( r * .07);
  }
}
const mainGlow = document.querySelector('#pricing');
mainGlow.addEventListener('mousemove', function(event) {
  document.querySelectorAll('#pricing .glow-outer').forEach(function (element) {

      let rect = element.getBoundingClientRect();
      let xDistance, yDistance;

      if (event.clientX < rect.left) {
          xDistance = rect.left - event.clientX;
      } else if (event.clientX > rect.right) {
          xDistance = event.clientX - rect.right;
      } else {
          xDistance = 0;
      }

      if (event.clientY < rect.top) {
          yDistance = rect.top - event.clientY;
      } else if (event.clientY > rect.bottom) {
          yDistance = event.clientY - rect.bottom;
      } else {
          yDistance = 0;
      }

      let data = cartesianToPolar(xDistance,yDistance);
      element.querySelector('.before').style.filter = 'blur('+ calcBlur(data.r)+'px)';
      const angle = findAngle(event.clientX, event.clientY, element);


      const r = findDistance(event.clientX, event.clientY, element);
      element.querySelector('.before').style.backgroundImage = `
  conic-gradient(
                    from ${angle - 90}deg at 50% 50%,
                    rgba(0, 0, 0, 0) 0%,
                    rgba(0, 0, 0, 0) 33%,
                    red 50%,
                    rgba(0, 0, 0, 0) 66%,
                    rgba(0, 0, 0, 0) 100%)`;

      let rect2 = mainGlow.getBoundingClientRect();
      let rect3 = element.getBoundingClientRect();
      let mouseX = event.clientX - rect3.left ;
      let mouseY = event.clientY - rect3.top;
      // console.log(mouseX,mouseY);

      // Display the mouse coordinates inside the element

      element.querySelector('.glow-circle').style.left = (mouseX -135) +'px' ;
      element.querySelector('.glow-circle').style.top = (mouseY-135)+'px' ;
  });

});

const generateGlowButtons = () => {
  document.querySelectorAll(".glow-button").forEach((button) => {
      let gradientElem = button.querySelector('.gradient');

      if(!gradientElem) {
          gradientElem = document.createElement("div");
          gradientElem.classList.add("gradient");

          button.appendChild(gradientElem);
      }

      button.addEventListener("pointermove", (e) => {
          const rect = button.getBoundingClientRect();

          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          gsap.to(button, {
              "--pointer-x": `${x}px`,
              "--pointer-y": `${y}px`,
              duration: 0.6,
          });

          gsap.to(button, {
              "--button-glow": chroma
                  .mix(
                      getComputedStyle(button)
                          .getPropertyValue("--button-glow-start")
                          .trim(),
                      getComputedStyle(button).getPropertyValue("--button-glow-end").trim(),
                      x / rect.width
                  )
                  .hex(),
              duration: 0.2,
          });
      });
  });
}

// Set variables on loaded
document.addEventListener('DOMContentLoaded', generateGlowButtons);

// Set variables on resize
window.addEventListener('resize', generateGlowButtons);


// Pricing Script


$(document).on("click","#cust_btn",function(){
  
  $("#myModal").modal("toggle");
  
})