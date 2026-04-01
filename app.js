// J'importe le framework Express.js
const express = require('express');

// J'importe le pilote Mysql2
const mysql2 = require("mysql2");

// J'importe express-myconnection pour la connexion à la BDD
const myconnection = require('express-myconnection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration de la connexion à MySQL
const optionsConnexionBaseDeDonnees = {
    host: "localhost",
    user: "root",
    password: "Alma12.2025", // ← ton mot de passe
    database: "association",  // ← ta base de données
    port: 3006
};

// Middleware de connexion à la BDD (stratégie pool)
app.use(myconnection(mysql2, optionsConnexionBaseDeDonnees, "pool"));

// Dossier des vues EJS
app.set('views', './views');
app.set('view engine', 'ejs');

// Dossier des fichiers statiques
app.use(express.static('public'));


// ===================================================
// ROUTE RACINE
// ===================================================
app.get('/', (req, res) => {
    res.redirect('/');
});


// ===================================================
// ACCUEIL
// ===================================================
app.get('/api/accueil', (req, res) => {
    console.log("Je passe dans /api/accueil");
    res.render('accueil');
});

// ===================================================
// ASSOCIATIONS
// ===================================================

app.get('/api/associations', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return res.status(500).send("Erreur DB");

        connection.query("SELECT * FROM associations", (err, results) => {
            if (err) return res.status(500).send("Erreur SQL");

            res.json(results);
        });
    });
});


// ===================================================
// RÉSERVATIONS
// ===================================================

app.get('/api/reservations', (req, res) => {
    req.getConnection((err, connection) => {
        connection.query("SELECT * FROM reservations", (err, results) => {
            if (err) return res.send("Erreur");

            res.json(results);
        });
    });
});

// GET MJC
app.get('/api/mjc', (req, res) => {
    req.getConnection((err, connection) => {
        connection.query("SELECT * FROM mjc", (err, results) => {
            if (err) return res.send("Erreur");
            res.json(results);
        });
    });
});

/*


// Récupérer toutes les associations
app.get('/api/associations', (req, res) => {
    console.log("Je passe dans /api/associations");

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log("Erreur de connexion :", erreur);
            return res.status(500).send("Erreur de connexion à la BDD");
        }

        connection.query("SELECT * FROM association", [], (err, resultatsAssociations) => {
            if (err) {
                console.log("Erreur SQL :", err);
                return res.status(500).send("Erreur SQL");
            }

            console.log("Associations :", resultatsAssociations);
            res.render('associations', { resultatsAssociations });
        });
    });
});

// Ajouter une association
app.post('/api/associations', (req, res) => {
    console.log("Ajout d'une association :", req.body);

    const { nom, numero, siret, adresse, date_creation, telephone, president } = req.body;

    const requeteSql = "INSERT INTO association (nom, numero, siret, adresse, date_creation, telephone, president) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const ordreChamps = [nom, numero, siret, adresse, date_creation, telephone, president];

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log("Erreur de connexion :", erreur);
            return res.status(500).send("Erreur de connexion à la BDD");
        }

        connection.query(requeteSql, ordreChamps, (err, resultat) => {
            if (err) {
                console.log("Erreur ajout association :", err);
                return res.status(500).send("Erreur SQL");
            }

            console.log("Association ajoutée !");
            res.status(200).redirect('/api/associations');
        });
    });
});

// Supprimer une association
app.delete('/api/associations/:id', (req, res) => {
    const idAssociation = req.params.id;
    const queryDelete = "DELETE FROM association WHERE id = ?";

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log("Erreur suppression association :", erreur);
            return res.status(500).send("Erreur de connexion à la BDD");
        }

        connection.query(queryDelete, [idAssociation], (err, resultat) => {
            if (err) {
                console.log("Erreur requête suppression :", err);
                return res.status(500).send("Erreur SQL");
            }

            console.log("Association supprimée !");
            res.status(200).json({ routeAccueil: "/api/associations" });
        });
    });
});

// Modifier une association
app.put('/api/associations/:id', (req, res) => {
    const idAssociation = req.params.id;
    const { nom, numero, siret, adresse, date_creation, telephone, president } = req.body;

    const requeteSql = "UPDATE association SET nom=?, numero=?, siret=?, adresse=?, date_creation=?, telephone=?, president=? WHERE id=?";
    const ordreChamps = [nom, numero, siret, adresse, date_creation, telephone, president, idAssociation];

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log("Erreur modification association :", erreur);
            return res.status(500).send("Erreur de connexion à la BDD");
        }

        connection.query(requeteSql, ordreChamps, (err, resultat) => {
            if (err) {
                console.log("Erreur requête modification :", err);
                return res.status(500).send("Erreur SQL");
            }

            console.log("Association modifiée !");
            res.status(200).json({ message: "Association modifiée" });
        });
    });
});


// ===================================================
// MJC
// ===================================================

// Récupérer toutes les MJC
app.get('/api/mjc', (req, res) => {
    console.log("Je passe dans /api/mjc");

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log("Erreur de connexion :", erreur);
            return res.status(500).send("Erreur de connexion à la BDD");
        }

        connection.query("SELECT * FROM mjc", [], (err, resultatsMjc) => {
            if (err) {
                console.log("Erreur SQL :", err);
                return res.status(500).send("Erreur SQL");
            }

            console.log("MJC :", resultatsMjc);
            res.render('mjc', { resultatsMjc });
        });
    });
});

// Ajouter une MJC
app.post('/api/mjc', (req, res) => {
    const { nom, adresse, telephone } = req.body;

    const requeteSql = "INSERT INTO mjc (nom, adresse, telephone) VALUES (?, ?, ?)";
    const ordreChamps = [nom, adresse, telephone];

    req.getConnection((erreur, connection) => {
        if (erreur) {
            return res.status(500).send("Erreur de connexion à la BDD");
        }

        connection.query(requeteSql, ordreChamps, (err, resultat) => {
            if (err) {
                console.log("Erreur ajout MJC :", err);
                return res.status(500).send("Erreur SQL");
            }

            console.log("MJC ajoutée !");
            res.status(200).redirect('/api/mjc');
        });
    });
});

// Supprimer une MJC
app.delete('/api/mjc/:id', (req, res) => {
    const idMjc = req.params.id;

    req.getConnection((erreur, connection) => {
        if (erreur) {
            return res.status(500).send("Erreur de connexion à la BDD");
        }

        connection.query("DELETE FROM mjc WHERE id = ?", [idMjc], (err, resultat) => {
            if (err) {
                console.log("Erreur suppression MJC :", err);
                return res.status(500).send("Erreur SQL");
            }

            console.log("MJC supprimée !");
            res.status(200).json({ routeAccueil: "/api/mjc" });
        });
    });
});


// ===================================================
// COMMUNES
// ===================================================

// Récupérer toutes les communes
app.get('/api/communes', (req, res) => {
    console.log("Je passe dans /api/communes");

    req.getConnection((erreur, connection) => {
        if (erreur) {
            return res.status(500).send("Erreur de connexion à la BDD");
        }

        connection.query("SELECT * FROM commune", [], (err, resultatsCommunes) => {
            if (err) {
                console.log("Erreur SQL :", err);
                return res.status(500).send("Erreur SQL");
            }

            console.log("Communes :", resultatsCommunes);
            res.render('communes', { resultatsCommunes });
        });
    });
});

// Ajouter une commune
app.post('/api/communes', (req, res) => {
    const { nom, adresse, telephone, president } = req.body;

    const requeteSql = "INSERT INTO commune (nom, adresse, telephone, president) VALUES (?, ?, ?, ?)";
    const ordreChamps = [nom, adresse, telephone, president];

    req.getConnection((erreur, connection) => {
        if (erreur) {
            return res.status(500).send("Erreur de connexion à la BDD");
        }

        connection.query(requeteSql, ordreChamps, (err, resultat) => {
            if (err) {
                console.log("Erreur ajout commune :", err);
                return res.status(500).send("Erreur SQL");
            }

            console.log("Commune ajoutée !");
            res.status(200).redirect('/api/communes');
        });
    });
});

// Supprimer une commune
app.delete('/api/communes/:id', (req, res) => {
    const idCommune = req.params.id;

    req.getConnection((erreur, connection) => {
        if (erreur) {
            return res.status(500).send("Erreur de connexion à la BDD");
        }

        connection.query("DELETE FROM commune WHERE id = ?", [idCommune], (err, resultat) => {
            if (err) {
                console.log("Erreur suppression commune :", err);
                return res.status(500).send("Erreur SQL");
            }

            console.log("Commune supprimée !");
            res.status(200).json({ routeAccueil: "/api/communes" });
        });
    });
});



// Récupérer toutes les réservations avec JOIN
app.get('/api/reservations', (req, res) => {
    console.log("Je passe dans /api/reservations");

    const sql = `
        SELECT 
            r.id,
            a.nom AS association,
            m.nom AS mjc,
            r.date_reservation
        FROM reservations r
        JOIN association a ON r.id_association = a.id
        JOIN mjc m ON r.id_mjc = m.id
    `;

    req.getConnection((erreur, connection) => {
        if (erreur) {
            return res.status(500).send("Erreur de connexion à la BDD");
        }

        connection.query(sql, [], (err, resultatsReservations) => {
            if (err) {
                console.log("Erreur SQL :", err);
                return res.status(500).send("Erreur SQL");
            }

            console.log("Réservations :", resultatsReservations);
            res.render('reservations', { resultatsReservations });
        });
    });
});

// Ajouter une réservation
app.post('/api/reservations', (req, res) => {
    const { id_association, id_mjc, date_reservation } = req.body;

    const requeteSql = "INSERT INTO reservations (id_association, id_mjc, date_reservation) VALUES (?, ?, ?)";
    const ordreChamps = [id_association, id_mjc, date_reservation];

    req.getConnection((erreur, connection) => {
        if (erreur) {
            return res.status(500).send("Erreur de connexion à la BDD");
        }

        connection.query(requeteSql, ordreChamps, (err, resultat) => {
            if (err) {
                console.log("Erreur ajout réservation :", err);
                return res.status(500).send("Erreur SQL");
            }

            console.log("Réservation ajoutée !");
            res.status(200).redirect('/api/reservations');
        });
    });
});

// Supprimer une réservation
app.delete('/api/reservations/:id', (req, res) => {
    const idReservation = req.params.id;

    req.getConnection((erreur, connection) => {
        if (erreur) {
            return res.status(500).send("Erreur de connexion à la BDD");
        }

        connection.query("DELETE FROM reservations WHERE id = ?", [idReservation], (err, resultat) => {
            if (err) {
                console.log("Erreur suppression réservation :", err);
                return res.status(500).send("Erreur SQL");
            }

            console.log("Réservation supprimée !");
            res.status(200).json({ routeAccueil: "/api/reservations" });
        });
    });
});
*/


// Fin du fichier — ne pas coder en dessous
module.exports = app;