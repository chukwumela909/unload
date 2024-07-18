const tracking_input = document.getElementById("tracking_id")
const tracking_btn = document.getElementById("track-btn")

console.log("console")

tracking_btn.addEventListener('click', (event) => {
    localStorage.setItem('trackId', tracking_input.value);
    console.log(tracking_input.value)
    if(tracking_input.value == ""){
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Missing field",
          });
    }
    window.location.href = 'track-package.html';
})
