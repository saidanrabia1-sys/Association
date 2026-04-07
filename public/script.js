// ===================================================
// VARIABLES
// ===================================================
const modal = document.getElementById("myModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModal");
const form = document.getElementById("formAssociation");

let editId = null;


// ===================================================
// MODAL
// ===================================================
if (openBtn) {
  openBtn.onclick = () => {
    editId = null;

    document.querySelector(".modal-header h2").textContent = "Ajouter une association";
    form.reset();
    modal.style.display = "block";
  };
}

if (closeBtn) {
  closeBtn.onclick = () => modal.style.display = "none";
}

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};


// ===================================================
// AJOUT + MODIFICATION
// ===================================================
if (form) {
  form.onsubmit = async (e) => {
    e.preventDefault();

    const data = {
      nom: document.getElementById("nom").value,
      adresse: document.getElementById("adresse").value,
      telephone: document.getElementById("telephone").value,
      email: document.getElementById("email").value,
      description: document.getElementById("description").value
    };

    let url = "/api/associations";
    let method = "POST";

    if (editId) {
      url = `/api/associations/${editId}`;
      method = "PUT";
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        showToast(editId ? "Modifié !" : "Ajouté !");
        modal.style.display = "none";
        form.reset();
        chargerAssociations();
      } else {
        showToast("Erreur");
      }

    } catch (err) {
      console.error(err);
      showToast("Erreur serveur");
    }
  };
}


// ===================================================
// MODIFIER
// ===================================================
function modifier(asso) {

  editId = asso.id_association;

  document.querySelector(".modal-header h2").textContent = "Modifier une association";

  document.getElementById("nom").value = asso.nom || "";
  document.getElementById("adresse").value = asso.adresse || "";
  document.getElementById("telephone").value = asso.telephone || "";
  document.getElementById("email").value = asso.email || "";
  document.getElementById("description").value = asso.description || "";

  modal.style.display = "block";
}


// ===================================================
// SUPPRIMER
// ===================================================
async function supprimer(id) {
  if (!confirm("Supprimer ?")) return;

  await fetch(`/api/associations/${id}`, {
    method: "DELETE"
  });

  showToast("Supprimé !");
  chargerAssociations();
}


// ===================================================
// CHARGER TABLEAU
// ===================================================
async function chargerAssociations() {

  const res = await fetch("/api/associations");
  const data = await res.json();

  const table = document.getElementById("tableAssociations");
  if (!table) return;

  table.innerHTML = "";

  data.forEach(a => {

    const assoString = JSON.stringify(a).replace(/"/g, '&quot;');

    table.innerHTML += `
      <tr>
        <td>${a.id_association}</td>
        <td>${a.nom || '-'}</td>
        <td>${a.adresse || '-'}</td>
        <td>${a.telephone || '-'}</td>
        <td>${a.email || '-'}</td>
        <td>
          <button onclick="modifier(${assoString})">✏️</button>
          <button onclick="supprimer(${a.id_association})">🗑️</button>
        </td>
      </tr>
    `;
  });
}

chargerAssociations();


// ===================================================
// RECHERCHE
// ===================================================
const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll("#tableAssociations tr");

    rows.forEach(row => {
      row.style.display = row.innerText.toLowerCase().includes(value)
        ? ""
        : "none";
    });
  });
}


// ===================================================
// TOAST
// ===================================================
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.className = "toast show";

  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}