function toggleVideo(videoId) {
    const videoPlayer = document.getElementById(videoId);
    const isVisible = videoPlayer.style.display === 'block';

    // Hide all video players
    const allPlayers = document.querySelectorAll('.video-player');
    allPlayers.forEach(player => {
        player.style.display = 'none';
        const video = player.querySelector('video');
        if (video) {
            video.pause(); // Pause any playing video
            video.currentTime = 0; // Reset playback
        }
    });

    // Toggle the clicked video player
    if (!isVisible) {
        videoPlayer.style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll("video");

    videos.forEach((video) => {
        video.addEventListener("play", () => {
            // Pause all other videos when one starts
            videos.forEach((v) => {
                if (v !== video) {
                    v.pause();
                }
            });
        });
    });
});
