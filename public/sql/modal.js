 // Toast
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast show";

  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3006);
}


// Fonction modifier une association
function modifier(id, nom, adresse, telephone, email, description) {

  // Changer le titre du modal
  document.querySelector(".modal-header h2").textContent = "Modifier une association";

  // Pré-remplir le formulaire
  document.getElementById("nom").value = nom || "";
  document.getElementById("adresse").value = adresse || "";
  document.getElementById("telephone").value = telephone || "";
  document.getElementById("email").value = email || "";
  document.getElementById("description").value = description || "";

  // Ouvrir le modal
  modal.style.display = "block";

  // Gérer le submit
  const form = document.querySelector("form");

  form.onsubmit = (e) => {
    e.preventDefault();

    const data = {
      nom: document.getElementById("nom").value,
      adresse: document.getElementById("adresse").value,
      telephone: document.getElementById("telephone").value,
      email: document.getElementById("email").value,
      description: document.getElementById("description").value
    };

    fetch(`/api/associations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        showToast("Modification réussie !");
        setTimeout(() => location.reload(), 1200);
      } else {
        showToast("Erreur lors de la modification");
      }
    })
    .catch(() => showToast("Erreur lors de la modification"));
  };
}
