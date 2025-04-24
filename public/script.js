
const shortsIds = [
    'jJPMnTXl63E',
    'FHgm89hKpXU',
    'XqZsoesa55w',
    '9bZkp7q19f0',
    'kJQP7kiw5Fk'
];

let currentIndex = 0;
const shortsFeed = document.getElementById('shorts-feed');

function createShortItem(videoId) {
    const div = document.createElement('div');
    div.className = 'short-item';
    div.innerHTML = `
        <iframe
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&loop=1&modestbranding=1&rel=0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>
    `;
    return div;
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
