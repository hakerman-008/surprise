
document.addEventListener('DOMContentLoaded', () => {
    const mainHeart = document.getElementById('mainHeart');
    const surpriseSections = document.querySelector('.surprise-sections');
    const surprises = document.querySelectorAll('.surprise');
    const finalMessage = document.querySelector('.final-message');
    let currentSurprise = 0;

    // Create floating hearts background
    createHeartsBg();

    // Initial animations
    gsap.to('.title', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'back.out'
    });

    mainHeart.addEventListener('click', () => {
        surpriseSections.classList.remove('hidden');
        mainHeart.style.display = 'none';
        document.querySelector('.love-message').style.display = 'none';
        showNextSurprise();
    });

    function showNextSurprise() {
        if (currentSurprise < surprises.length) {
            surprises[currentSurprise].classList.add('visible');
            
            if (currentSurprise === 2) {
                // Animate promise texts
                const promises = document.querySelectorAll('.promise-container p');
                promises.forEach((promise, index) => {
                    setTimeout(() => {
                        promise.classList.add('visible');
                    }, index * 1000);
                });
            }
            
            currentSurprise++;
            
            if (currentSurprise === surprises.length) {
                setTimeout(showFinalMessage, 2000);
            }
        }
    }

    function showFinalMessage() {
        finalMessage.classList.remove('hidden');
        setTimeout(() => {
            finalMessage.classList.add('visible');
        }, 100);
    }

    // Scroll trigger for surprises
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + window.innerHeight;
        surprises.forEach(surprise => {
            const surprisePos = surprise.offsetTop + surprise.offsetHeight / 2;
            if (scrollPos > surprisePos) {
                surprise.classList.add('visible');
            }
        });
    });

    function createHeartsBg() {
        const heartsBg = document.querySelector('.hearts-bg');
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.opacity = '0.2';
            heart.style.fontSize = `${Math.random() * 20 + 10}px`;
            heart.style.animation = `float ${Math.random() * 3 + 2}s infinite`;
            heartsBg.appendChild(heart);
        }
    }

    // Add smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
