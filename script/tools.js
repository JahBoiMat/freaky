// Function to fetch the download link using the YT-API
async function fetchDownloadLink(videoId) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'cd552d3922mshb219b89bca3e32bp102a92jsn595b1d473a08', // Replace with your valid API key
            'x-rapidapi-host': 'yt-api.p.rapidapi.com',
        },
    };

    // Construct the API URL
    const url = `https://yt-api.p.rapidapi.com/dl?id=${videoId}`;

    try {
        console.log("Fetching download link for video ID:", videoId);

        // Make the API request
        const response = await fetch(url, options);
        const data = await response.json();

        console.log("API Response Data:", data);

        // Debug formats structure
        const formats = data.adaptiveFormats || data.formats;
        console.log("Available Formats:", formats);

        // Check if formats contain a valid URL
        if (formats && formats.length > 0) {
            for (let format of formats) {
                console.log("Checking format:", format);
                if (format.url) {
                    console.log("Download Link Found:", format.url);
                    return format.url; // Return the first valid link
                }
            }
            throw new Error('Fant ingen gyldige lenker i API-responsen.');
        } else {
            throw new Error('API-respons inneholder ingen nedlastbare formater.');
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
            window.open(downloadLink, '_blank'); // Open download link
        } else {
            alert('Kunne ikke hente nedlastingslenke. Prøv igjen!');
        }
    } catch (error) {
        console.error('Error fetching MP3 link:', error);
        alert('Noe gikk galt! Prøv igjen.');
    }
}

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
            window.open(downloadLink, '_blank'); // Open download link
        } else {
            alert('Kunne ikke hente nedlastingslenke. Prøv igjen!');
        }
    } catch (error) {
        console.error('Error fetching MP4 link:', error);
        alert('Noe gikk galt! Prøv igjen.');
    }
}
