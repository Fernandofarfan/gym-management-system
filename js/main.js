(function () {

  'use strict';

  // preloader
  $(window).on('load', function () {
    $('.loader').fadeOut('slow');
  });

  // smooth scroll
  // smooth scroll removed - using native CSS scroll-behavior for better performance

  // magnific popup
  $('.gallery').each(function () { // the containers for all your galleries
    $(this).magnificPopup({
      delegate: '.popup-image', // the selector for portfolio item
      type: 'image',
      gallery: {
        enabled: true
      },
    });
  });

  // swiper slider
  $(document).ready(function () {
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".next-slide",
        prevEl: ".prev-slide"
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        780: {
          slidesPerView: 1,
        }
      }
    });
  });

  // hide navbar on click
  $('.navbar-nav>li>a').on('click', function () {
    $('.navbar-collapse').collapse('hide');
  });

  // navbar on scroll
  $(window).on("scroll", function () {

    var onScroll = $(this).scrollTop();

    if (onScroll > 50) {
      $(".navbar").addClass("navbar-fixed");
    }
    else {
      $(".navbar").removeClass("navbar-fixed");
    }

  });

  // Custom Logic for Titanium Gym

  // Handle Contact Form Submission
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    $(this)[0].reset();
  });

  // Handle Join Form Submission
  $('#joinForm').on('submit', function (e) {
    e.preventDefault();
    var plan = $('#planSelect').val();
    alert('¡Solicitud recibida! Te contactaremos para finalizar tu inscripción al plan ' + plan + '.');
    $('#joinModal').modal('hide');
    $(this)[0].reset();
  });

  // Scroll Animation (IntersectionObserver)
  var observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  var observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(function (element) {
    observer.observe(element);
  });

  // BMI Calculator Logic
  $('#bmiForm').on('submit', function (e) {
    e.preventDefault();
    var weight = parseFloat($('#weight').val());
    var height = parseFloat($('#height').val());

    if (weight > 0 && height > 0) {
      var bmi = (weight / (height * height)).toFixed(1);
      var message = '';
      var colorClass = '';

      if (bmi < 18.5) {
        message = 'Bajo Peso - ¡Necesitas ganar masa muscular!';
        colorClass = 'text-info';
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        message = 'Peso Saludable - ¡Sigue así!';
        colorClass = 'text-success';
      } else if (bmi >= 25 && bmi <= 29.9) {
        message = 'Sobrepeso - ¡Vamos a quemar esas calorías!';
        colorClass = 'text-warning';
      } else {
        message = 'Obesidad - Tu salud es primero, ¡empieza hoy!';
        colorClass = 'text-danger';
      }

      $('#bmiValue').text(bmi).removeClass().addClass('display-4 fw-bold my-2 ' + colorClass);
      $('#bmiMessage').text(message).removeClass().addClass('fw-bold mb-0 ' + colorClass);
      $('#bmiResult').fadeIn();
    }
  });

})();

// Helper function to select plan (must be outside the IIFE to be accessible via onclick in HTML)
function selectPlan(planName) {
  // We need to wait for the modal to be potentially ready or just set the value
  // Using generic JS to find the element
  var select = document.getElementById('planSelect');
  if (select) {
    select.value = planName;
  }
}