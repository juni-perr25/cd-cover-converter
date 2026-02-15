// JavaScript code for handling file uploads, progress tracking, and download functionality

// Function to upload a file
function uploadFile(file) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);

    // Track progress
    xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            console.log(`Upload progress: ${percentComplete.toFixed(2)}%`);
        }
    };

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('File uploaded successfully:', xhr.responseText);
        } else {
            console.error('Error uploading file:', xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Error during the upload process.');
    };

    // Send the file
    const formData = new FormData();
    formData.append('file', file);
    xhr.send(formData);
}

// Function to initiate file upload
function initiateUpload() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        uploadFile(file);
    } else {
        console.log('No file selected.');
    }
}

// Function to download a file
function downloadFile(fileUrl) {
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = ''; // Optional: specify the filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Example usage: Add event listener to a button
// document.getElementById('uploadButton').addEventListener('click', initiateUpload);
// Example usage for download: downloadFile('path/to/file.mp3');
