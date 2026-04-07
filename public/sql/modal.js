// ===================
// MODAL
// ===================
const modal = document.getElementById("myModal");

if (modal) {
  document.getElementById("openModalBtn").onclick = () => {
    modal.style.display = "block";
  };

  document.getElementById("closeModal").onclick = () => {
    modal.style.display = "none";
  };
}

// ===================
// AJOUT ASSOCIATION
// ===================
const form = document.getElementById("formAssociation");

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

    await fetch('/api/associations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    alert("Ajout réussi !");
    location.reload();
  };
}

// ===================
// AFFICHER ASSOCIATIONS
// ===================
async function chargerAssociations() {
  const res = await fetch('/api/associations');
  const data = await res.json();

  const table = document.getElementById("tableAssociations");
  if (!table) return;

  table.innerHTML = "";

  data.forEach(a => {
    table.innerHTML += `
      <tr>
        <td>${a.id_association}</td>
        <td>${a.nom}</td>
        <td>${a.adresse || ''}</td>
        <td>${a.telephone || ''}</td>
        <td>${a.email || ''}</td>
        <td>
          <button onclick="supprimer(${a.id_association})">🗑️</button>
        </td>
      </tr>
    `;
  });
}

async function supprimer(id) {
  await fetch('/api/associations/' + id, { method: 'DELETE' });
  chargerAssociations();
}

chargerAssociations();


// ===================
// CONTACT
// ===================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.onsubmit = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(contactForm));

    await fetch('/api/contact', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    alert("Message envoyé !");
    contactForm.reset();
  };
}