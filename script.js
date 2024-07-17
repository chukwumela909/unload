document.addEventListener('DOMContentLoaded', () => {
    console.log("working")
    const modal = document.getElementById('edit-modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const trackingIds = document.querySelectorAll('.tracking-id');
  
    trackingIds.forEach(trackingId => {
      trackingId.addEventListener('click', (event) => {
        event.preventDefault();
        const id = trackingId.innerHTML;
  
        // Populate the form with existing data
        document.getElementById('trackingId').value = id;
        // Fetch and populate other fields here as needed
  
        modal.classList.remove('hidden');
      });
    });
  
    closeModal.onclick = function() {
      modal.classList.add('hidden');
    }
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.classList.add('hidden');
      }
    }
  
    document.getElementById('submitForm').addEventListener('click', (event) => {
      event.preventDefault();

      document.getElementById('trackingId').value
      document.getElementById('trackingId').value
      document.getElementById('trackingId').value
      document.getElementById('trackingId').value
      document.getElementById('trackingId').value
      document.getElementById('trackingId').value
      document.getElementById('trackingId').value

      // Handle form submission, e.g., send data to server
      console.log("submitted")
      modal.classList.add('hidden');
    });
  });
  
  const trackingIdToUpdate = 'OE31b70H';
  const updatedPackageData = {
      trackingId: trackingId,
    packageName: 'Updated Package Name',
    destination: 'New Destination',
    currentLocation: 'Current Location',
    checkpoints: [
      {
        location: 'Location 1',
        description: 'Checkpoint 1 Description'
      }
    ],
    packageDescription: 'Updated Package Description',
    packageStatus: 'in transit'
  };


// Function to update a package based on tracking ID
const updatePackage = async (trackingId, updatedData) => {
  try {
    const response = await axios.put(`http://localhost:1200/`, updatedData);
    console.log('Package updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating package:', error.response ? error.response.data : error.message);
  }
};

// Example usage


updatePackage(trackingIdToUpdate, updatedPackageData);
