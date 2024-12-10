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

// JavaScript to handle modal behavior
document.addEventListener("DOMContentLoaded", () => {
    const reviewsModal = document.getElementById("reviewsModal");
    const closeBtn = document.querySelector(".modal .close");
    const reviewButtons = document.querySelectorAll(".video-row button");
    const submitReview = document.getElementById("submitReview");
    const reviewsContainer = document.getElementById("reviewsContainer");
    const newReview = document.getElementById("newReview");

    // Open the modal when "Reviews" button is clicked
    reviewButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            reviewsModal.style.display = "block";
            reviewsContainer.innerHTML = `<h3>Anmeldelser for episode ${index + 1}</h3><p>Legg til anmeldelser med feltet under!</p>`;
        });
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener("click", () => {
        reviewsModal.style.display = "none";
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target === reviewsModal) {
            reviewsModal.style.display = "none";
        }
    });

    // Submit a new review
    submitReview.addEventListener("click", () => {
        const reviewText = newReview.value.trim();
        if (reviewText) {
            const review = document.createElement("p");
            review.textContent = reviewText;
            reviewsContainer.appendChild(review);
            newReview.value = ""; // Clear the textarea
        } else {
            alert("Please write a review before submitting.");
        }
    });
});