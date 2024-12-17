const API_KEY = 'cd552d3922mshb219b89bca3e32bp102a92jsn595b1d473a08'; // Replace with your YTStream RapidAPI Key
const API_HOST = 'ytstream-download-youtube-videos.p.rapidapi.com';

async function fetchDownloadLink(videoId, format) {
    console.log("Fetching download link for video ID:", videoId);

    try {
        // Request parameters
        const endpoint = `https://${API_HOST}/dl?id=${videoId}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': API_HOST
            }
        };

        // Fetch API response
        const response = await fetch(endpoint, options);
        const data = await response.json();
        console.log("API Response Data:", data);

        // Check if the API call was successful
        if (data.status !== 'ok') {
            throw new Error("API-respons inneholder ingen gyldige strømmer.");
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
        console.error("Error fetching download link:", error.message);
        throw error; // Re-throw the error to be caught in calling function
    }
}

// Convert to MP3 Function
async function convertToMp3() {
    console.log("convertToMp3 called");

    try {
        const videoId = extractVideoId();
        console.log("Extracted Video ID:", videoId);
        
        const downloadLink = await fetchDownloadLink(videoId, 'mp3');
        console.log("Download link for MP3:", downloadLink);

        // Trigger the download
        window.location.href = downloadLink;
    } catch (error) {
        alert("Kunne ikke hente nedlastingslenke. Prøv igjen!");
    }
}

// Convert to MP4 Function
async function convertToMp4() {
    console.log("convertToMp4 called");

    try {
        const videoId = extractVideoId();
        console.log("Extracted Video ID:", videoId);
        
        const downloadLink = await fetchDownloadLink(videoId, 'mp4');
        console.log("Download link for MP4:", downloadLink);

        // Trigger the download
        window.location.href = downloadLink;
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
