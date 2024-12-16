const SonicImg = ['media/IMG/sonic.jpg', 'media/IMG/sonic2.jpg', 'media/IMG/sonic3.jpg', 'media/IMG/sonic4.jpg', 'media/IMG/sonic5.jpg', 'media/IMG/sonic6.jpg', 'media/IMG/sonic7.jpg'];
const KnucklesImg = ['media/IMG/kn.jpg', 'media/IMG/kn2.jpg', 'media/IMG/kn3.jpg', 'media/IMG/kn4.jpg', 'media/IMG/kn6.jpg', 'media/IMG/kn7.jpg', 'media/IMG/kn8.jpg'];
const TailsImg = ['media/IMG/tails.jpg', 'media/IMG/tails2.jpg', 'media/IMG/tails3.jpg', 'media/IMG/tails4.jpg', 'media/IMG/tails5.jpg', 'media/IMG/tails6.jpg', 'media/IMG/tails7.jpg'];
const ShadowImg = ['media/IMG/shad.jpg', 'media/IMG/shad2.jpg', 'media/IMG/shad3.jpg', 'media/IMG/shad5.jpg', 'media/IMG/shad6.jpg', 'media/IMG/shad7.jpg', 'media/IMG/shad8.jpg'];

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
