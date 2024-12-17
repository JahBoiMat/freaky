// Function to fetch the download link using the YT-API
async function fetchDownloadLink(videoId) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'cd552d3922mshb219b89bca3e32bp102a92jsn595b1d473a08', // Replace with your valid API key
            'x-rapidapi-host': 'yt-api.p.rapidapi.com'
        }
    };

    // Construct the API URL
    const url = `https://yt-api.p.rapidapi.com/dl?id=${videoId}`;

    try {
        // Make the API request
        const response = await fetch(url, options);
        const data = await response.json();

        // Check if the API returned a valid download link
        if (data && data.link) {
            return data.link;
        } else {
            throw new Error('Kunne ikke hente nedlastingslenke. Prøv igjen!');
        }
    } catch (error) {
        console.error('Error fetching download link:', error);
        return null;
    }
}

// Function to extract YouTube video ID from a given URL
function extractVideoId(url) {
    const regex = /(?:youtube\.com\/(?:.*[?&]v=|.*\/)|youtu\.be\/)([^#&?]*)/;
    const match = url.match(regex);
    const videoId = match ? match[1] : null;
    console.log("Extracted Video ID:", videoId); // Debugging line
    return videoId;
}

async function convertToMp3() {
    console.log("convertToMp3 called"); // Debugging line
    try {
        const videoId = extractVideoId(document.getElementById('mp3-url').value);
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
        console.error('Error fetching MP3 link:', error);
        alert('Noe gikk galt! Prøv igjen.');
    }
}

async function convertToMp4() {
    console.log("convertToMp4 called"); // Debugging line
    try {
        const videoId = extractVideoId(document.getElementById('mp4-url').value);
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
        console.error('Error fetching MP4 link:', error);
        alert('Noe gikk galt! Prøv igjen.');
    }
}