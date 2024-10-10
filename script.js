// Define the API endpoint and API key for PDF to Word conversion
const apiEndpoint = "https://api.pdf.co/v1/pdf/convert/to/doc";
const apiKey = "hindihelphub3@gmail.com_A8eyMGHbK9ayQMxFiuFmh9nTtrY6URRDGK38mNDW3iLzi5IBoo3zp9yB0X18qljc";

// Get the necessary DOM elements
const fileInput = document.getElementById('fileInput');
const statusMessage = document.getElementById('statusMessage');
const downloadLink = document.getElementById('downloadLink');

// Listen for form submission
document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent form from reloading the page

    // Ensure a file is selected
    const file = fileInput.files[0];
    if (!file) {
        statusMessage.textContent = "Please select a PDF file to convert.";
        return;
    }

    // Prepare the file for upload
    const formData = new FormData();
    formData.append('file', file);

    // Show loading message while converting
    statusMessage.textContent = "Converting... Please wait.";

    try {
        // Make the request to PDF.co API
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'x-api-key': apiKey // Add the API key in the header
            },
            body: formData
        });

        const result = await response.json(); // Parse JSON response

        if (result.error) {
            // If there's an error in the response, show it
            statusMessage.textContent = `Conversion failed: ${result.message}`;
        } else {
            // If successful, show the download link for the converted Word document
            downloadLink.href = result.url;
            downloadLink.style.display = 'block';
            downloadLink.innerText = 'Download Word File';
            statusMessage.textContent = "Conversion successful! Click the link to download your Word file.";
        }
    } catch (error) {
        // Handle any network or other errors
        statusMessage.textContent = `An error occurred during conversion: ${error.message}`;
    }
});
