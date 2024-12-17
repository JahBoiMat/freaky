const API_KEY = 'cd552d3922mshb219b89bca3e32bp102a92jsn595b1d473a08'; // Replace this with your YTStream RapidAPI key
const API_HOST = 'ytstream-download-youtube-videos.p.rapidapi.com';

// Function to extract video ID from a full YouTube URL
function extractVideoId() {
    const videoUrl = document.getElementById('videoUrl').value;

    try {
        const urlParams = new URLSearchParams(new URL(videoUrl).search);
        const videoId = urlParams.get('v');

        if (!videoId) throw new Error("Video ID could not be extracted. Check the YouTube URL format.");
        
        console.log("Extracted Video ID:", videoId);
        return videoId;
    } catch (error) {
        console.error("Error extracting video ID:", error.message);
        alert("Invalid YouTube URL. Please enter a correct URL.");
    }
}

// Function to fetch and return download links from YTStream API
async function fetchDownloadLink(videoId, format) {
    console.log("Fetching download link for:", videoId, "| Format:", format);

    const endpoint = `https://${API_HOST}/dl?id=${videoId}`;
    const headers = {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
    };

    try {
        const response = await fetch(endpoint, { method: 'GET', headers });
        const data = await response.json();

        console.log("YTStream API Response:", data);

        if (data.status !== 'ok') {
            throw new Error("API response status not OK. Could not fetch stream links.");
        }

        // Find the right format link (audio for MP3, mp4 for video)
        if (format === 'mp3') {
            const audioLink = data.links.audio?.[0]?.url; // Prioritize first MP3 link
            if (audioLink) return audioLink;
        } else if (format === 'mp4') {
            const videoLink = data.links.mp4?.[0]?.url;
            if (videoLink) return videoLink;
        }

        throw new Error(`No valid ${format} stream found.`);
    } catch (error) {
        console.error("Error fetching download link:", error.message);
        alert("Failed to retrieve the download link. Please try again.");
        return null;
    }
}

// Trigger MP3 Download
async function convertToMp3() {
    console.log("convertToMp3 called");

    const videoId = extractVideoId();
    if (!videoId) return;

    const downloadLink = await fetchDownloadLink(videoId, 'mp3');
    if (downloadLink) {
        console.log("MP3 Download Link:", downloadLink);
        window.open(downloadLink, "_blank"); // Trigger download in a new tab
    }
}

// Trigger MP4 Download
async function convertToMp4() {
    console.log("convertToMp4 called");

    const videoId = extractVideoId();
    if (!videoId) return;

    const downloadLink = await fetchDownloadLink(videoId, 'mp4');
    if (downloadLink) {
        console.log("MP4 Download Link:", downloadLink);
        window.open(downloadLink, "_blank"); // Trigger download in a new tab
    }
}