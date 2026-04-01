// Ouvrir modal
const modal = document.getElementById("myModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModal");

openBtn.onclick = () => {
    modal.style.display = "block";
};

closeBtn.onclick = () => {
    modal.style.display = "none";
};

// Fermer si on clique à l'extérieur
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

const form = document.getElementById("formAssociation");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        nom: form.nom.value,
        adresse: form.adresse.value,
        telephone: form.telephone.value,
        email: form.email.value,
        description: form.description.value
    };

    try {
        const response = await fetch('/api/associations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result);

        alert("Association ajoutée avec succès !");
        form.reset();

    } catch (error) {
        console.error(error);
        alert("Erreur lors de l'ajout");
    }
});

