const trackId = localStorage.getItem("trackId");
const trackbtn = document.getElementById("trackbtn");
const trackField = document.getElementById("track-field");

trackbtn.addEventListener("click", () => {
    console.log("clicked")
  const track = trackField.value;
  if (track != "") {
    localStorage.setItem("trackId", track);
  }
});

async function fetchPackageDetails(trackingId) {
  try {
    const response = await axios.get(
      `https://consignmentserver.onrender.com/package/single/${trackingId}`
    );
    const packageData = response.data;

    // Template for displaying package details
    const packageDetailsTemplate = `
        <div class="flex flex-col space-y-1.5 p-6">
          <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Package Details</h3>
        </div>
        <div class="p-6 grid gap-6">
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <div class="font-medium">Pickup Name</div>
              <div>${packageData.packageName}</div>
            </div>
            <div>
              <div class="font-medium">Pickup Location</div>
              <div>${packageData.pickup}</div>
            </div>
            <div>
              <div class="font-medium">Final Destination</div>
              <div>${packageData.destination}</div>
            </div>
          </div>
          <div>
            <div class="font-medium">Past Checkpoints</div>
            <div class="grid gap-4">
              ${packageData.checkpoints
                .map(
                  (checkpoint) => `
                <div class="flex items-center gap-2">
                  <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                      <path d="M15 18H9"></path>
                      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                      <circle cx="17" cy="18" r="2"></circle>
                      <circle cx="7" cy="18" r="2"></circle>
                    </svg>
                  </div>
                  <div>
                    <div>${checkpoint}</div>
                    <!-- Add any additional checkpoint details here -->
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
          <div>
            <div class="font-medium">Current Location</div>
            <div class="flex items-center gap-2">
              <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                  <path d="M15 18H9"></path>
                  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                  <circle cx="17" cy="18" r="2"></circle>
                  <circle cx="7" cy="18" r="2"></circle>
                </svg>
              </div>
              <div>
                <div>${packageData.currentLocation}</div>
                <!-- Add any additional current location details here -->
              </div>
            </div>
          </div>
        </div>
      `;

    // Insert the template into the HTML
    document.getElementById("package-details").innerHTML =
      packageDetailsTemplate;
  } catch (error) {
    console.log(error);
  }
}

// Example: Fetch details for a package with tracking ID 'QE34543'
fetchPackageDetails(trackId);
