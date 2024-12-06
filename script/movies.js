function toggleVideo(videoId) {
    const videoPlayer = document.getElementById(videoId);
    const isVisible = videoPlayer.style.display === 'flex';
    
    // Hide all video players
    const allPlayers = document.querySelectorAll('.video-player');
    allPlayers.forEach(player => {
        player.style.display = 'none';
    });

    // Toggle the clicked video player
    videoPlayer.style.display = isVisible ? 'none' : 'flex';
}