$(document).ready(function() {
    // Show the intro popup on page load
    $('#intro-popup').fadeIn();

    // Close the popup when the button is clicked
    $('#close-popup').on('click', function() {
        $('#intro-popup').fadeOut();
    });

    // Smooth Scroll to Sections
    $('.scroll-to-section').on('click', function(event) {
        if (this.hash !== '') {
            event.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });

    // Scroll animations (fade in as you scroll down)
    $(window).on('scroll', function() {
        $('.fade-in').each(function() {
            const bottomOfElement = $(this).offset().top + $(this).outerHeight();
            const bottomOfWindow = $(window).scrollTop() + $(window).height();
            if (bottomOfWindow > bottomOfElement / 1.5) {
                $(this).addClass('visible');
            }
        });

        $('.fade-in-up').each(function() {
            const bottomOfElement = $(this).offset().top + $(this).outerHeight();
            const bottomOfWindow = $(window).scrollTop() + $(window).height();
            if (bottomOfWindow > bottomOfElement / 1.5) {
                $(this).addClass('visible-up');
            }
        });

        // Add navbar scroll effect
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('navbar-scrolled');
        } else {
            $('.navbar').removeClass('navbar-scrolled');
        }

        // Parallax effect for hero section
        const scrolled = $(window).scrollTop();
        $('.hero').css('background-position-y', -(scrolled * 0.5) + 'px');
    });

    // Add counter animation for statistics
    $('.stat-item span').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

    // Start counter animations when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = document.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateValue(counter, 0, target, 2000);
                });
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(document.querySelector('.intro-stats'));

    // Smooth scroll for explore button
    $('#explore-btn').click(function() {
        $('html, body').animate({
            scrollTop: $('#about-sdg15').offset().top
        }, 1000);
    });

    // Particle effect
    particlesJS('particles', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });

    // Add hover effect for cards
    $('.goal-card, .ngo-card, .action-card').hover(
        function() {
            $(this).find('i').addClass('fa-bounce');
        },
        function() {
            $(this).find('i').removeClass('fa-bounce');
        }
    );

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    document.getElementById('submitReview').addEventListener('click', function() {
        const name = document.getElementById('reviewerName').value;
        const review = document.getElementById('reviewText').value;

        if (name && review) {
            const reviewList = document.getElementById('reviewList');
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.innerHTML = `<h4>${name}</h4><p>${review}</p>`;
            reviewList.appendChild(reviewItem);

            // Clear the input fields
            document.getElementById('reviewerName').value = '';
            document.getElementById('reviewText').value = '';
        } else {
            alert('Please fill in both fields.');
        }
    });
});

// Animate statistics value
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.fade-in-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        observer.observe(card);
    });
});

// Language switcher function
function switchLanguage(lang) {
    const translations = document.querySelectorAll('.translation');
    translations.forEach(trans => {
        trans.style.display = trans.classList.contains(lang) ? 'block' : 'none';
    });
}
