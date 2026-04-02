// ===================================================
// MODAL
// ===================================================
const modal    = document.getElementById("myModal");
const openBtn  = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModal");

if (openBtn) {
    openBtn.onclick = () => {
        document.querySelector(".modal-header h2").textContent = "Ajouter une association";
        document.getElementById("formAssociation").reset();
        document.getElementById("formAssociation").onsubmit = null;
        modal.style.display = "block";
    };
}

if (closeBtn) {
    closeBtn.onclick = () => modal.style.display = "none";
}

window.onclick = (event) => {
    if (modal && event.target === modal) modal.style.display = "none";
};

// ===================================================
// FORMULAIRE AJOUT ASSOCIATION
// ===================================================
const form = document.getElementById("formAssociation");

if (form) {  // ✅ vérifie que l'élément existe avant d'ajouter le listener
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            nom:         document.getElementById("nom").value,
            adresse:     document.getElementById("adresse").value,
            telephone:   document.getElementById("telephone").value,
            email:       document.getElementById("email").value,
            description: document.getElementById("description").value
        };

        try {
            const response = await fetch('/api/associations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result);
            showToast("Association ajoutée avec succès !");
            form.reset();
            modal.style.display = "none";

        } catch (error) {
            console.error(error);
            showToast("Erreur lors de l'ajout");
        }
    });
}

// ===================================================
// FORMULAIRE CONTACT
// ===================================================
const contactForm = document.getElementById("contactForm");

if (contactForm) {  // ✅ vérifie que l'élément existe avant d'ajouter le listener
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            nom:       contactForm.nom.value,
            email:     contactForm.email.value,
            telephone: contactForm.telephone.value,
            sujet:     contactForm.sujet.value,
            message:   contactForm.message.value
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                showToast("Message envoyé !");
                contactForm.reset();
            } else {
                showToast("Erreur lors de l'envoi");
            }

        } catch (error) {
            console.error(error);
            showToast("Erreur serveur");
        }
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

// ===================================================
// MODIFIER UNE ASSOCIATION
// ===================================================
function modifier(id, nom, adresse, telephone, email, description) {
    document.querySelector(".modal-header h2").textContent = "Modifier une association";

    document.getElementById("nom").value         = nom         || "";
    document.getElementById("adresse").value     = adresse     || "";
    document.getElementById("telephone").value   = telephone   || "";
    document.getElementById("email").value       = email       || "";
    document.getElementById("description").value = description || "";

    modal.style.display = "block";

    form.onsubmit = (e) => {
        e.preventDefault();

        const data = {
            nom:         document.getElementById("nom").value,
            adresse:     document.getElementById("adresse").value,
            telephone:   document.getElementById("telephone").value,
            email:       document.getElementById("email").value,
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

document.getElementById('formAssociation').addEventListener('submit', async (e) => {
  e.preventDefault(); // empêche le rechargement de la page

  // Récupère les valeurs du formulaire
  const data = {
    nom:       document.getElementById('nom').value,
    telephone: document.getElementById('telephone').value
  };

  // Envoie au serveur en POST
  await fetch('/api/associations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  e.target.reset();       // vide le formulaire
  chargerAssociations();  // recharge le tableau
});