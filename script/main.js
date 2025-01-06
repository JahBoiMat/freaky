const SonicImg = [''];
const KnucklesImg = [''];
const TailsImg = [''];
const ShadowImg = [''];

let currentImageIndex = 0;
let currentImageGroup = SonicImg;

const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const stopButton = document.getElementById('stop');
const soundSelect = document.getElementById('sound-select');
const progressBar = document.getElementById('progress-bar');
const timeDisplay = document.getElementById('time-display');
const carousel = document.getElementById('carousel');

let isPaused = true;
let startX = 0;
let endX = 0;

carousel.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
carousel.addEventListener('touchmove', (e) => { endX = e.touches[0].clientX; });
carousel.addEventListener('touchend', () => {
    const diffX = endX - startX;
    if (diffX > 50) currentImageIndex = (currentImageIndex - 1 + currentImageGroup.length) % currentImageGroup.length;
    else if (diffX < -50) currentImageIndex = (currentImageIndex + 1) % currentImageGroup.length;
    updateImage();
    startX = endX = 0;
});

function updateImage() {
    carousel.innerHTML = `<img src="${currentImageGroup[currentImageIndex]}" alt="Image ${currentImageIndex + 1}">`;
}

document.getElementById('prev').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + currentImageGroup.length) % currentImageGroup.length;
    updateImage();
});
document.getElementById('next').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % currentImageGroup.length;
    updateImage();
});
document.getElementById('button1').addEventListener('click', () => {
    currentImageGroup = SonicImg;
    currentImageIndex = 0;
    updateImage();
});
document.getElementById('button2').addEventListener('click', () => {
    currentImageGroup = KnucklesImg;
    currentImageIndex = 0;
    updateImage();
});
document.getElementById('button3').addEventListener('click', () => {
    currentImageGroup = TailsImg;
    currentImageIndex = 0;
    updateImage();
});
document.getElementById('button4').addEventListener('click', () => {
    currentImageGroup = ShadowImg;
    currentImageIndex = 0;
    updateImage();
});
soundSelect.addEventListener('change', (e) => {
    audio.src = e.target.value;
    if (!isPaused) audio.play();
});
playPauseButton.addEventListener('click', () => {
    if (isPaused) {
        audio.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseButton.textContent = 'Play';
    }
    isPaused = !isPaused;
});
stopButton.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    playPauseButton.textContent = 'Play';
    isPaused = true;
});
audio.addEventListener('timeupdate', () => {
    const { currentTime, duration } = audio;
    progressBar.value = (currentTime / duration) * 100 || 0;
    timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
});
progressBar.addEventListener('input', (e) => {
    audio.currentTime = (audio.duration * e.target.value) / 100 || 0;
});
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}
