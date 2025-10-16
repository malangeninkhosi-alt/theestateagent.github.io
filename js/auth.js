document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const role = document.getElementById("role").value;
  const apt = document.getElementById("apartmentNumber").value;
  const password = document.getElementById("password").value;

  if (role === "landlord") {
    if (password === "admin123") {
      window.location.href = "landlord-dashboard.html";
    } else {
      alert("Invalid landlord password.");
    }
  } else {
    // Simulate login for tenants
    if (apt >= 1 && apt <= 10 && password === "tenant" + apt) {
      localStorage.setItem("tenantApartment", apt);
      window.location.href = "tenant-dashboard.html";
    } else {
      alert("Invalid tenant login.");
    }
  }
});
