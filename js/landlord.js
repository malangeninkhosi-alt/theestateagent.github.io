document.addEventListener("DOMContentLoaded", () => {
  renderApartments();
});

function renderApartments() {
  const grid = document.getElementById("apartmentGrid");
  grid.innerHTML = "";

  for (let i = 1; i <= 10; i++) {
    const tenant = getTenant(i);
    const div = document.createElement("div");
    div.className = "apartment-card";
    div.innerHTML = `
      <h3>Apartment ${i}</h3>
      ${tenant ? `<p><strong>${tenant.name}</strong></p>` : `<p>No tenant</p>`}
    `;
    div.onclick = () => openTenantModal(i);
    grid.appendChild(div);
  }
}

function openTenantModal(aptNumber) {
  const tenant = getTenant(aptNumber);

  document.getElementById("aptNumber").value = aptNumber;
  document.getElementById("aptDisplay").textContent = aptNumber;
  document.getElementById("name").value = tenant?.name || "";
  document.getElementById("contact").value = tenant?.contact || "";
  document.getElementById("work").value = tenant?.work || "";
  document.getElementById("kin").value = tenant?.kin || "";

  // Show uploaded payment proofs
  const payments = getPayments(aptNumber);
  const list = document.getElementById("paymentList");
  list.innerHTML = "";
  payments.forEach(file => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${file.url}" target="_blank">${file.name}</a>`;
    list.appendChild(li);
  });

  document.getElementById("tenantModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("tenantModal").style.display = "none";
}

// Save tenant info
document.getElementById("tenantForm").addEventListener("submit", e => {
  e.preventDefault();
  const apt = document.getElementById("aptNumber").value;
  const tenant = {
    name: document.getElementById("name").value,
    contact: document.getElementById("contact").value,
    work: document.getElementById("work").value,
    kin: document.getElementById("kin").value
  };

  localStorage.setItem(`tenant_${apt}`, JSON.stringify(tenant));
  alert("Tenant info saved.");
  closeModal();
  renderApartments();
});

function getTenant(apt) {
  return JSON.parse(localStorage.getItem(`tenant_${apt}`));
}

function getPayments(apt) {
  return JSON.parse(localStorage.getItem(`payments_${apt}`)) || [];
}

function logout() {
  window.location.href = "index.html";
}
