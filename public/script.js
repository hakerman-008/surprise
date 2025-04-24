
let currentIndex = 0;
const shortsFeed = document.getElementById('shorts-feed');

async function fetchYouTubeShorts() {
    // This would typically come from your backend API
    return [
        'shorts/jJPMnTXl63E',
        'shorts/FHgm89hKpXU',
        'shorts/XqZsoesa55w',
        'shorts/9bZkp7q19f0',
        'shorts/kJQP7kiw5Fk'
    ];
}

function createShortItem(videoUrl) {
    const div = document.createElement('div');
    div.className = 'short-item';
    const videoId = videoUrl.split('/')[1];
    
    div.innerHTML = `
        <div class="video-wrapper">
            <iframe
                src="https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&loop=1&modestbranding=1&rel=0&showinfo=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </div>
    `;
    return div;
}

let players = [];

function onYouTubeIframeAPIReady() {
    loadShorts();
}

function loadShorts() {
    shortsFeed.innerHTML = '';
    shortsIds.forEach((id, index) => {
        const short = createShortItem(id);
        short.style.transform = `translateY(${(index - currentIndex) * 100}vh)`;
        shortsFeed.appendChild(short);
    });
}

function updatePositions() {
    const shorts = document.querySelectorAll('.short-item');
    shorts.forEach((short, index) => {
        short.style.transform = `translateY(${(index - currentIndex) * 100}vh)`;
    });
}

document.getElementById('nextVideo').addEventListener('click', () => {
    if (currentIndex < shortsIds.length - 1) {
        currentIndex++;
        updatePositions();
    }
});

document.getElementById('prevVideo').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updatePositions();
    }
});

document.addEventListener('wheel', (e) => {
    if (e.deltaY > 0 && currentIndex < shortsIds.length - 1) {
        currentIndex++;
        updatePositions();
    } else if (e.deltaY < 0 && currentIndex > 0) {
        currentIndex--;
        updatePositions();
    }
});

loadShorts();
