document.addEventListener("DOMContentLoaded", () => {
  const apt = localStorage.getItem("tenantApartment");
  if (!apt) {
    alert("No apartment found. Please login again.");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("aptNumber").textContent = apt;

  // Load and show tenant profile
  const tenant = JSON.parse(localStorage.getItem(`tenant_${apt}`));
  const profile = document.getElementById("profileDetails");
  profile.innerHTML = "";

  if (!tenant) {
    profile.innerHTML = "<li>No tenant data found. Contact landlord.</li>";
  } else {
    for (const [key, value] of Object.entries(tenant)) {
      profile.innerHTML += `<li><strong>${capitalize(key)}:</strong> ${value}</li>`;
    }
  }

  // Show uploaded payments
  displayUploadedFiles(apt);
});

// Upload proof of payment
document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("paymentProof");
  const file = fileInput.files[0];
  const apt = localStorage.getItem("tenantApartment");

  if (!file) {
    alert("Please choose a file.");
    return;
  }

  // Simulate file upload by saving file name & object URL in localStorage
  const reader = new FileReader();
  reader.onload = function () {
    const payments = JSON.parse(localStorage.getItem(`payments_${apt}`)) || [];
    const newFile = {
      name: file.name,
      url: reader.result,
      timestamp: new Date().toISOString()
    };

    payments.push(newFile);
    localStorage.setItem(`payments_${apt}`, JSON.stringify(payments));
    alert("Payment proof uploaded successfully.");
    fileInput.value = "";
    displayUploadedFiles(apt);
  };

  reader.readAsDataURL(file); // store as base64
});

function displayUploadedFiles(apt) {
  const payments = JSON.parse(localStorage.getItem(`payments_${apt}`)) || [];
  const list = document.getElementById("uploadedFilesList");
  list.innerHTML = "";

  if (payments.length === 0) {
    list.innerHTML = "<li>No payments uploaded yet.</li>";
  } else {
    payments.forEach(p => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${p.url}" target="_blank">${p.name}</a> - <small>${formatDate(p.timestamp)}</small>`;
      list.appendChild(li);
    });
  }
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

function logout() {
  localStorage.removeItem("tenantApartment");
  window.location.href = "index.html";
}
