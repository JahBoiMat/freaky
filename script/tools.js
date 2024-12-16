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

async function convertToMp4() {
    try {
        const videoId = document.getElementById('videoIdInput').value; // Get video ID
        const apiUrl = `https://yt-api.p.rapidapi.com/dl?id=${videoId}`; // API endpoint

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'yt-api.p.rapidapi.com',
                'x-rapidapi-key': 'cd552d3922mshb219b89bca3e32bp102a92jsn595b1d473a08' // Replace with your valid API key
            }
        });

        const data = await response.json();

        if (data && data.link) {
            window.open(data.link, '_blank'); // Open MP4 link
        } else {
            alert('Kunne ikke hente nedlastingslenke. Prøv igjen!');
        }
    } catch (error) {
        console.error('Error fetching MP4 link:', error);
        alert('En feil oppstod! Sjekk API-innstillingene.');
    }
}


    async function convertToMp3() {
        try {
            const videoId = document.getElementById('videoIdInput').value; // Fetch video ID from input field
            const apiUrl = `https://yt-api.p.rapidapi.com/dl?id=${videoId}`; // Your API endpoint
    
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'yt-api.p.rapidapi.com',
                    'x-rapidapi-key': 'cd552d3922mshb219b89bca3e32bp102a92jsn595b1d473a08' // Replace with your valid API key
                }
            });
    
            const data = await response.json();
    
            if (data && data.link) {
                window.open(data.link, '_blank'); // Opens download link in a new tab
            } else {
                alert('Kunne ikke hente nedlastingslenke. Prøv igjen!');
            }
        } catch (error) {
            console.error('Error fetching MP3 link:', error);
            alert('Noe gikk galt! Prøv igjen.');
        }
    }
    
}
