// Function to fetch the download link using the YouTube Media Downloader API
async function fetchDownloadLink(videoId) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cd552d3922mshb219b89bca3e32bp102a92jsn595b1d473a08', // Replace with your valid API key
            'X-RapidAPI-Host': 'youtube-media-downloader.p.rapidapi.com',
        },
    };

    // Construct the API URL (using the correct API endpoint)
    const url = `https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${videoId}`;

    try {
        console.log("Fetching download link for video ID:", videoId);

        // Make the API request
        const response = await fetch(url, options);
        const data = await response.json();

        console.log("API Response Data:", data);

        // Check for the presence of a valid download URL
        if (data && data.streams && data.streams.length > 0) {
            // Retrieve the first valid stream with a URL
            const downloadStream = data.streams.find(stream => stream.url);
            if (downloadStream && downloadStream.url) {
                console.log("Download Link Found:", downloadStream.url);
                return downloadStream.url;
            } else {
                throw new Error('Ingen gyldige nedlastingslenker funnet i strømmer.');
            }
        } else {
            throw new Error('API-respons inneholder ingen gyldige strømmer.');
        }
    } catch (error) {
        console.error('Error fetching download link:', error.message);
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

// Function to handle MP3 conversion
async function convertToMp3() {
    console.log("convertToMp3 called");
    try {
        const urlInput = document.getElementById('mp3-url').value;
        const videoId = extractVideoId(urlInput);
        console.log("Video ID for MP3:", videoId);

        if (!videoId) {
            alert('Ugyldig YouTube URL. Vennligst prøv igjen.');
            return;
        }

        const downloadLink = await fetchDownloadLink(videoId);
        if (downloadLink) {
            console.log("Opening Download Link:", downloadLink);
            window.open(downloadLink, '_blank'); // Open download link
        } else {
            alert('Kunne ikke hente nedlastingslenke. Prøv igjen!');
        }
    } catch (error) {
        console.error('Error fetching MP3 link:', error);
        alert('Noe gikk galt! Prøv igjen.');
    }
}

// Function to handle MP4 conversion
async function convertToMp4() {
    console.log("convertToMp4 called");
    try {
        const urlInput = document.getElementById('mp4-url').value;
        const videoId = extractVideoId(urlInput);
        console.log("Video ID for MP4:", videoId);

        if (!videoId) {
            alert('Ugyldig YouTube URL. Vennligst prøv igjen.');
            return;
        }

        const downloadLink = await fetchDownloadLink(videoId);
        if (downloadLink) {
            console.log("Opening Download Link:", downloadLink);
            window.open(downloadLink, '_blank'); // Open download link
        } else {
            alert('Kunne ikke hente nedlastingslenke. Prøv igjen!');
        }
    } catch (error) {
        console.error('Error fetching MP4 link:', error);
        alert('Noe gikk galt! Prøv igjen.');
    }
}
