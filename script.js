document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get the file input
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please upload a PDF file.');
        return;
    }
    
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.innerText = 'Converting, please wait...';
    
    try {
        // Prepare form data for API request
        const formData = new FormData();
        formData.append('file', file);
        
        // Make API call to PDF.co or any other PDF-to-Word API
        const apiKey = 'YOUR_PDFCO_API_KEY'; // Replace with your API key
        const response = await fetch('https://api.pdf.co/v1/pdf/convert/to/doc', {
            method: 'POST',
            headers: {
                'x-api-key': apiKey
            },
            body: formData
        });
        
        const result = await response.json();
        
        if (result.error) {
            statusMessage.innerText = 'Conversion failed: ' + result.message;
            return;
        }
        
        // Show download link for the Word file
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = result.url;
        downloadLink.style.display = 'inline';
        downloadLink.innerText = 'Download Word File';
        statusMessage.innerText = 'Conversion successful!';
        
    } catch (error) {
        statusMessage.innerText = 'An error occurred during conversion.';
    }
});
