    // แสดงชื่อไฟล์ที่เลือก
    function displayFileName() {
        const fileInput = document.getElementById('fileUpload');
        const fileName = fileInput.files[0] ? fileInput.files[0].name : "No file selected";
        const fileNameDisplay = document.getElementById('fileName');
        fileNameDisplay.textContent = `Selected file: ${fileName}`;
      }
  
      function confirmPayment() {
        // Get the file input element
        const fileInput = document.getElementById('fileUpload');
        const file = fileInput.files[0];
  
        if (!file) {
          alert('Please select a file to upload.');
          return;
        }
  
        // Prepare the form data
        const formData = new FormData();
        formData.append('file', file);
  
        // Send the data to the backend
        fetch('your-backend-endpoint', {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('Payment confirmed and file uploaded successfully.');
          } else {
            alert('Failed to confirm payment.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('There was an error processing your request.');
        });
      }