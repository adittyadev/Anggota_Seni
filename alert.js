function showAlert(message) {
  const overlay = document.getElementById("customAlert");

  overlay.querySelector(".alert-message").textContent = message;

  overlay.classList.add("active");
}

function hideAlert() {
  document.getElementById("customAlert").classList.remove("active");
}

document.getElementById("alertOkBtn").onclick = hideAlert;

/* klik di luar kotak alert juga menutupnya */
document.getElementById("customAlert").addEventListener("click", (e) => {
  if (e.target.id === "customAlert") hideAlert();
});

/* tombol Esc menutup alert */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideAlert();
});
