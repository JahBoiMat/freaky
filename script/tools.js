const API_KEY = 'cd552d3922mshb219b89bca3e32bp102a92jsn595b1d473a08'; // Replace with your YTStream RapidAPI Key
const API_HOST = 'ytstream-download-youtube-videos.p.rapidapi.com';

async function fetchDownloadLink(videoId, format) {
    console.log("Fetching download link for video ID:", videoId);

    try {
        console.log("Fetching download link for video ID:", videoId); // Debugging line

        // Fetch API response
        const response = await fetch(endpoint, options);
        const data = await response.json();

        console.log("API Response Data:", data); // Debugging line to check response content

        // Search for the video download link in adaptiveFormats or formats
        const formats = data.adaptiveFormats || data.formats;
        if (formats && formats.length > 0) {
            // Extract the first valid URL
            const downloadLink = formats[0].url;
            console.log("Download Link Found:", downloadLink);
            return downloadLink;
        } else {
            throw new Error('Kunne ikke finne en gyldig nedlastingslenke.');
        }

        // Find the proper audio or video format URL
        if (format === 'mp3') {
            const audioStream = data.links.audio?.[0]?.url; // Get the first audio URL
            if (audioStream) return audioStream;
        } else if (format === 'mp4') {
            const videoStream = data.links.mp4?.[0]?.url; // Get the first MP4 URL
            if (videoStream) return videoStream;
        }

        throw new Error("Kunne ikke hente nedlastingslenke. Ingen gyldige strømmer funnet.");
    } catch (error) {
        console.error('Error fetching download link:', error);
        return null;
    }
}

// Convert to MP3 Function
async function convertToMp3() {
    console.log("convertToMp3 called"); // Debugging line
    try {
        const urlInput = document.getElementById('mp3-url').value;
        const videoId = extractVideoId(urlInput);
        console.log("Video ID for MP3:", videoId); // Debugging line

        if (!videoId) {
            alert('Ugyldig YouTube URL. Vennligst prøv igjen.');
            return;
        }

        const downloadLink = await fetchDownloadLink(videoId);
        if (downloadLink) {
            window.open(downloadLink, '_blank'); // Opens download link in a new tab
        } else {
            alert('Kunne ikke hente nedlastingslenke. Prøv igjen!');
        }
    } catch (error) {
        alert("Kunne ikke hente nedlastingslenke. Prøv igjen!");
    }
}

// Convert to MP4 Function
async function convertToMp4() {
    console.log("convertToMp4 called"); // Debugging line
    try {
        const urlInput = document.getElementById('mp4-url').value;
        const videoId = extractVideoId(urlInput);
        console.log("Video ID for MP4:", videoId); // Debugging line

        if (!videoId) {
            alert('Ugyldig YouTube URL. Vennligst prøv igjen.');
            return;
        }

        const downloadLink = await fetchDownloadLink(videoId);
        if (downloadLink) {
            window.open(downloadLink, '_blank'); // Opens download link in a new tab
        } else {
            alert('Kunne ikke hente nedlastingslenke. Prøv igjen!');
        }
    } catch (error) {
        alert("Kunne ikke hente nedlastingslenke. Prøv igjen!");
    }
}

// Helper Function to Extract Video ID from URL
function extractVideoId() {
    const videoUrl = document.getElementById('videoUrl').value;
    const urlParams = new URLSearchParams(new URL(videoUrl).search);
    const videoId = urlParams.get('v');
    return videoId;
}
