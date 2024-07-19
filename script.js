let trackingIds;

const createPackage = async () => {
  // Input Fields
  const createTrackingId = document.getElementById("create-trackingId").value;
  const createPackageName = document.getElementById("create-packageName").value;
  const createPickup = document.getElementById("create-pickup").value;
  const createDestination = document.getElementById("create-destination").value;
  const createCurrentLocation = document.getElementById("create-current").value;
  const createCheckpoint1 = document.getElementById(
    "create-checkpoints-1"
  ).value;
  const createCheckpoint2 = document.getElementById(
    "create-checkpoints-2"
  ).value;
  const createCheckpoint3 = document.getElementById(
    "create-checkpoints-3"
  ).value;
  const createCheckpoint4 = document.getElementById(
    "create-checkpoints-4"
  ).value;
  const createPackageDescription = document.getElementById(
    "create-packageDescription"
  ).value;
  const createPackageStatus = document.getElementById(
    "create-packageStatus"
  ).value;

  if (
    createTrackingId == "" ||
    createPackageName == "" ||
    createPickup == "" ||
    createDestination == "" ||
    createCurrentLocation == "" ||
    createPackageDescription == "" ||
    createPackageStatus == ""
  ) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Important fields are missing",
    });
  }

  // Form data
  const createPackageData = {
    trackingId: createTrackingId,
    packageName: createPackageName,
    destination: createDestination,
    pickup: createPickup,
    currentLocation: createCurrentLocation,
    checkpoints: [
      createCheckpoint1,
      createCheckpoint2,
      createCheckpoint3,
      createCheckpoint4,
    ],
    packageDescription: createPackageDescription,
    packageStatus: createPackageStatus,
  };

  try {
    const response = await axios.post(
      `https://consignmentserver.onrender.com/package/create`,
      createPackageData
    );
    console.log("Package created successfully:", response.data);
  } catch (error) {
    console.log("Error creating package:", error);
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message,
    });
  }
};

// Function to fetch package details and populate the edit form
const fetchPackageDetails = async (trackingId) => {
  try {
    const response = await axios.get(
      `https://consignmentserver.onrender.com/package/single/${trackingId}`
    );
    const packageData = response.data;

    // Populate the edit form fields
    document.getElementById("trackingId").value = packageData.trackingId;
    document.getElementById("packageName").value = packageData.packageName;
    document.getElementById("pickup").value = packageData.pickup;
    document.getElementById("destination").value = packageData.destination;
    document.getElementById("current").value = packageData.currentLocation;
    document.getElementById("checkpoints-1").value =
      packageData.checkpoints[0] || "";
    document.getElementById("checkpoints-2").value =
      packageData.checkpoints[1] || "";
    document.getElementById("checkpoints-3").value =
      packageData.checkpoints[2] || "";
    document.getElementById("checkpoints-4").value =
      packageData.checkpoints[3] || "";
    document.getElementById("packageDescription").value =
      packageData.packageDescription;
    document.getElementById("packageStatus").value = packageData.packageStatus;

    return packageData;
  } catch (error) {
    console.log("Error fetching package details:", error);
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message,
    });
  }
};

const updatePackage = async () => {
  // Input Fields
  const editTrackingId = document.getElementById("trackingId").value;
  const editPackageName = document.getElementById("packageName").value;
  const editPickup = document.getElementById("pickup").value;
  const editDestination = document.getElementById("destination").value;
  const editCurrentLocation = document.getElementById("current").value;
  const editCheckpoint1 = document.getElementById("checkpoints-1").value;
  const editCheckpoint2 = document.getElementById("checkpoints-2").value;
  const editCheckpoint3 = document.getElementById("checkpoints-3").value;
  const editCheckpoint4 = document.getElementById("checkpoints-4").value;
  const editPackageDescription =
    document.getElementById("packageDescription").value;
  const editPackageStatus = document.getElementById("packageStatus").value;

  // Form data
  const updatePackageData = {
    packageName: editPackageName,
    destination: editDestination,
    pickup: editPickup,
    currentLocation: editCurrentLocation,
    checkpoints: [
      editCheckpoint1,
      editCheckpoint2,
      editCheckpoint3,
      editCheckpoint4,
    ],
    packageDescription: editPackageDescription,
    packageStatus: editPackageStatus,
  };

  try {
    const response = await axios.post(
      `https://consignmentserver.onrender.com/package/update/${editTrackingId}`,
      updatePackageData
    );
    console.log("Package updated successfully:", response.data);
  } catch (error) {
    console.log("Error updating package:", error);
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message,
    });
  }
};

function populateTable(data) {
  const tbody = document.getElementById("package-table-body");

  data.forEach((item) => {
    const tr = document.createElement("tr");
    tr.className =
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted";

    tr.innerHTML = `
      <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        <a class="font-medium hover:underline tracking-id" href="#" rel="ugc">${
          item.trackingId
        }</a>
      </td>
      <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">${
        item.packageName
      }</td>
      <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        <div class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
          item.packageStatus === "In transit"
            ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            : "border-transparent"
        }">
          ${item.packageStatus}
        </div>
      </td>
      <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">${
        item.currentLocation
      }</td>
    `;

    tbody.appendChild(tr);
  });

  trackingIds = document.querySelectorAll(".tracking-id");
}

const listPackages = async () => {
  try {
    const response = await axios.get(
      `https://consignmentserver.onrender.com/package/packages`
    );
    console.log("Packages:", response.data);

    populateTable(response.data);
  } catch (error) {
    console.log("Error getting packages:", error);
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message,
    });
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await listPackages();
  const modal = document.getElementById("edit-modal");
  const createModal = document.getElementById("create-modal");
  const closeModal = document.getElementsByClassName("close")[0];
  const closeCreateModal = document.getElementsByClassName("close")[1];

  const createPackageBtn = document.getElementById("create-package");

  createPackageBtn.addEventListener("click", (event) => {
    event.preventDefault();
    createModal.classList.remove("hidden");

    window.onclick = function (event) {
      if (event.target == createModal) {
        createModal.classList.add("hidden");
      }
    };

    closeCreateModal.onclick = function () {
      createModal.classList.add("hidden");
    };

    document
      .getElementById("submitCreateForm")
      .addEventListener("click", (event) => {
        event.preventDefault();
        createPackage();
        createModal.classList.add("hidden");
      });
  });

  trackingIds.forEach((trackingId) => {
    trackingId.addEventListener("click", async (event) => {
      event.preventDefault();
      const id = trackingId.innerHTML;

      // Fetch and populate the edit form with existing data
      await fetchPackageDetails(id);

      modal.classList.remove("hidden");
    });
  });

  closeModal.onclick = function () {
    modal.classList.add("hidden");
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.classList.add("hidden");
    }
  };

  document.getElementById("submitForm").addEventListener("click", (event) => {
    event.preventDefault();
    updatePackage();
    modal.classList.add("hidden");
  });
});
