
let dailyContent;
const music = document.getElementById('pianoMusic');
const musicToggle = document.getElementById('musicToggle');
let isMusicPlaying = false;

async function fetchDailyContent() {
    try {
        const response = await fetch('/daily-content');
        dailyContent = await response.json();
        updateContent();
    } catch (error) {
        console.error('Error fetching content:', error);
    }
}

function updateContent() {
    document.getElementById('contentImage').src = dailyContent.image;
    document.getElementById('contentText').textContent = dailyContent.text;
}

function share(platform) {
    const text = encodeURIComponent(dailyContent.text);
    const url = encodeURIComponent(window.location.href);
    
    if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
    } else if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
    }
}

document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('#themeToggle i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        music.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        music.play();
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isMusicPlaying = !isMusicPlaying;
});

document.getElementById('submitToggle').addEventListener('click', () => {
    document.getElementById('submitForm').classList.toggle('hidden');
});

document.getElementById('submitForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
        const response = await fetch('/submit-content', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            alert('Thank you for your submission!');
            e.target.reset();
            e.target.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error submitting content:', error);
    }
});

fetchDailyContent();
