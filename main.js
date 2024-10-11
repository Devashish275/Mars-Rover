document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("imageryForm");
  const imageDisplay = document.getElementById("imageDisplay");
  const modalContent = document.getElementById('modalContent');
  const modal = document.getElementById('imageModal');
  const closeModal = document.getElementById('closeModal');

  form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevents page from refreshing on submit

      // Get the values from the input fields
      const date = document.getElementById("date").value;
      const camera = document.getElementById("camera").value;

      // Define your NASA API key here
      const apiKey = "z5gNLtycMgQ2gyjeR4hGFG4LUnLGsWCguXgFkeU2";
      
      // Construct the API URL with the user input
      const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&camera=${camera}&api_key=${apiKey}`;

      // Fetch the images from the API
      fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
              console.log(data); // Check the data returned from the API
              if (data.photos.length > 0) {
                  // Clear any previous images
                  imageDisplay.innerHTML = '';
                  // Loop through the first 7 photos
                  const imageUrls = data.photos.slice(0, 7).map(photo => photo.img_src);
                  
                  // Populate the modal with the images
                  populateModal(imageUrls);
                  
                  // Show images in a designated area (optional)
                  imageUrls.forEach(src => {
                      const imgElement = document.createElement("img");
                      imgElement.setAttribute("src", src);
                      imgElement.setAttribute("alt", `Mars rover image taken on ${date} by ${camera}`);
                      imageDisplay.appendChild(imgElement);
                  });
              } else {
                  imageDisplay.innerHTML = '<p>No images available for this date and camera.</p>';
              }
          })
          .catch((error) => {
              console.error("Error fetching the imagery:", error);
              imageDisplay.innerHTML = '<p>Error fetching the imagery. Please try again.</p>';
          });
  });

  function populateModal(images) {
      modalContent.innerHTML = ''; // Clear previous images

      // Check if there are any images to display
      if (images.length > 0) {
          images.forEach(src => {
              const img = document.createElement('img');
              img.src = src; // Set the source of the image
              img.alt = 'Mars Image'; // Alternative text for the image
              modalContent.appendChild(img); // Append the image to the modal content
          });

          modal.style.display = 'block'; // Show the modal
      } else {
          alert('No images found!'); // Alert if no images
      }
  }

  // Close modal functionality
  closeModal.addEventListener('click', function() {
      modal.style.display = 'none'; // Hide the modal
  });

  // Close modal when clicking outside of the modal content
  window.addEventListener('click', function(event) {
      if (event.target === modal) {
          modal.style.display = 'none'; // Hide the modal
      }
  });
});
