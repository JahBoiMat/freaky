// Function to fetch the download link using the YT-API
async function fetchDownloadLink(videoId) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'cd552d3922mshb219b89bca3e32bp102a92jsn595b1d473a08',
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
    return match ? match[1] : null;
}

// Main function triggered on button click
async function convertToMp4() {
    const urlInput = document.getElementById('mp4-url').value; // Input YouTube URL
    const responseDiv = document.getElementById('mp4-response'); // Response container

    // Validate and extract the video ID
    const videoId = extractVideoId(urlInput);
    if (!videoId) {
        responseDiv.textContent = "Ugyldig YouTube-lenke. Skriv inn en gyldig lenke.";
        return;
    }

    responseDiv.textContent = "Henter nedlastingslenke...";

    // Fetch the download link using the API
    const downloadLink = await fetchDownloadLink(videoId);
    if (downloadLink) {
        // Display the download link
        responseDiv.innerHTML = `<a href="${downloadLink}" target="_blank">Klikk her for å laste ned videoen</a>`;
    } else {
        responseDiv.textContent = "Kunne ikke hente nedlastingslenke. Prøv igjen!";
    }
}
