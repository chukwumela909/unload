const trackId = localStorage.getItem("trackId");
const trackbtn = document.getElementById("trackbtn");
const trackField = document.getElementById("track-field");

trackbtn.addEventListener("click", () => {
  const track = trackField.value;
  if (track != "") {
    localStorage.setItem("trackId", track);
  }
});

async function fetchPackageDetails(trackingId) {
  const packageDetailsDiv = document.getElementById("package-details");

  // Show loading state
  packageDetailsDiv.innerHTML = `
    <div class="flex justify-center items-center">
      <svg class="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <span class="ml-2">Tracking...</span>
    </div>
  `;

  try {
    const response = await axios.get(
      `https://consignmentserver.onrender.com/package/single/${trackingId}`
    );
    const packageData = response.data;

    if (!packageData || Object.keys(packageData).length === 0) {
      // Handle case where package data is empty or null
      packageDetailsDiv.innerHTML = `<div class="text-red-500 text-center">Tracking ID not found. Please check the ID and try again.</div>`;
      return;
    }

    // Template for displaying package details
    const packageDetailsTemplate = `
      <div class="flex flex-col space-y-6 mt-10 /p-6">
        <div class="grid gap-6">
          <div class="grid grid-cols-2 gap-6">
            <div class="p-5 rounded-md border">
              <div class="text-black/50 text-2xl text-gray-700">Pickup Name</div>
              <div class="font-bold text-2xl mt-3">${packageData.packageName.toUpperCase()}</div>
            </div>
            <div class="p-5 rounded-md border">
              <div class="text-black/50 text-2xl text-gray-700">Pickup Location</div>
              <div class="font-bold text-2xl mt-3">${packageData.pickup.toUpperCase()}</div>
            </div>
            <div class="p-5 rounded-md border">
              <div class="text-black/50 text-2xl text-gray-700">Final Destination</div>
              <div class="font-bold text-2xl mt-3">${packageData.destination.toUpperCase()}</div>
            </div>
            <div class="p-5 rounded-md border">
              <div class="text-black/50 text-2xl text-gray-700">Delivery Status</div>
              <div class="font-bold text-2xl mt-3">${packageData.packageStatus.toUpperCase()}</div>
            </div>
          </div>
          <div>
            <div class="text-black/50 text-2xl mt-12 font-bold text-gray-700">Past Checkpoints</div>
            <div class="space-y-10 mt-6">
              ${packageData.checkpoints
                .map(
                  (checkpoint, index) => `
                    <div class="flex items-center space-x-4">
                       <div class="flex items-center relative justify-center p-4 rounded-full bg-[#FFB400] text-white">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-7">
                               <path fill-rule="evenodd" d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clip-rule="evenodd" />
                              </svg>

                             ${
                               index < packageData.checkpoints.length - 1
                                 ? `<div class="dottener absolute h-14 rounded-full w-1 border-dashed border border-[#FFB400] -bottom-12"></div>`
                                 : ""
                             }
                     
                      </div>
                      <div>
                        <div class="text-gray-900 text-2xl">${checkpoint}</div>
                      </div>
                    </div>
                  `
                )
                .join("")}
            </div>
          </div>
          <div>
            <div class="text-black/50 text-2xl font-bold text-gray-700 mt-5">Current Location</div>
            <div class="flex items-center space-x-4 mt-3">
              <div class="flex items-center justify-center p-4 rounded-full bg-primary text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-7">
  <path fill-rule="evenodd" d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clip-rule="evenodd" />
</svg>

              </div>
              <div>
                <div class="font-bold text-2xl">${packageData.currentLocation.toUpperCase()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Insert the template into the HTML
    packageDetailsDiv.innerHTML = packageDetailsTemplate;
  } catch (error) {
    // Handle error (e.g., network issues, server errors)
    packageDetailsDiv.innerHTML = `<div class="text-black/30 font-bold text-center">Enter a correct Tracking ID to track</div>`;
    console.log(error);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const trackingId = trackField.value;
  fetchPackageDetails(trackingId);
}

// Fetch details for the saved tracking ID when the page loads
if (trackId) {
  trackField.value = trackId;
  fetchPackageDetails(trackId);
}
