// Define the API endpoint for PDF to Word conversion
const apiEndpoint = "https://api.pdf.co/v1/pdf/convert/to/doc";
const apiKey = "hindihelphub3@gmail.com_A8eyMGHbK9ayQMxFiuFmh9nTtrY6URRDGK38mNDW3iLzi5IBoo3zp9yB0X18qljc";

// Get the file input and form elements
const fileInput = document.getElementById('fileInput');
const statusMessage = document.getElementById('statusMessage');
const downloadLink = document.getElementById('downloadLink');

// Listen for form submission
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Ensure a file is selected
    if (fileInput.files.length === 0) {
        statusMessage.textContent = "Please select a PDF file to convert.";
        return;
    }

    // Prepare the file for upload
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    // Show loading message while converting
    statusMessage.textContent = "Converting... Please wait.";

    // Make the request to PDF.co API
    fetch(apiEndpoint, {
        method: "POST",
        headers: {
            "x-api-key": apiKey // Add the API key in the header
        },
        body: formData
    })
    .then(response => response.json()) // Parse JSON response
    .then(data => {
        if (data.error) {
            // If there's an error in the response, show it
            statusMessage.textContent = `Conversion failed: ${data.message}`;
        } else {
            // If successful, show the download link for the converted Word document
            downloadLink.href = data.url;
            downloadLink.style.display = 'block';
            statusMessage.textContent = "Conversion successful! Click the link to download your Word file.";
        }
    })
    .catch(error => {
        // Handle any network or other errors
        statusMessage.textContent = `Error: ${error.message}`;
    });
});
