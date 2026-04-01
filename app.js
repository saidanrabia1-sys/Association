// ==============================
// IMPORTS
// ==============================
const express = require('express');
const mysql2 = require('mysql2');
const myconnection = require('express-myconnection');

const app = express();

// ==============================
// MIDDLEWARE
// ==============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================
// CONFIG BASE DE DONNÉES
// ==============================
const dbConfig = {
    host: "localhost",
    user: "root",
    password: "Alma12.2025",
    database: "association",
    port: 3006 // ⚠️ vérifie ton port MySQL
};

// Connexion pool
app.use(myconnection(mysql2, dbConfig, "pool"));

// ==============================
// VIEW ENGINE
// ==============================
app.set('view engine', 'ejs');
app.set('views', './views');

// Fichiers statiques
app.use(express.static('public'));

// ==============================
// ROUTES FRONT
// ==============================

// Accueil
app.get('/', (req, res) => {
    res.render('accueil');
                        });

// ==============================
// API ACCUEIL (optionnelle)
// ==============================
app.get('/api/accueil', (req, res) => {
    res.json({ message: "Bienvenue sur l'API" });
});

// ==============================
// ASSOCIATIONS (CRUD)
// ==============================

// GET all
app.get('/api/associations', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return res.status(500).send("Erreur connexion DB");

        connection.query("SELECT * FROM association", (err, results) => {
                if (err) return res.status(500).send("Erreur SQL");
            res.json(results);
        });
    });
});

// GET by ID
app.get('/api/associations/:id', (req, res) => {
    const { id } = req.params;

    req.getConnection((err, connection) => {
        if (err) return res.status(500).send("Erreur connexion DB");

        connection.query(
            "SELECT * FROM association WHERE id_association = ?",
            [id],
            (err, results) => {
                if (err) return res.status(500).send("Erreur SQL");

                if (results.length === 0) {
                    return res.status(404).send("Association introuvable");
                }

                res.json(results[0]);
            }
        );
    });
});

// POST create
app.post('/api/associations', (req, res) => {
    const { nom, adresse } = req.body;

    if (!nom) {
        return res.status(400).send("Le nom est obligatoire");
    }

    req.getConnection((err, connection) => {
        if (err) return res.status(500).send("Erreur connexion DB");

        connection.query(
            "INSERT INTO association (nom, adresse) VALUES (?, ?)",
            [nom, adresse],
            (err, result) => {
                if (err) return res.status(500).send("Erreur SQL");

                res.json({
                    id_association: result.insertId,
                    nom,
                    adresse
                });
            }
        );
    });
});

// PUT update
app.put('/api/associations/:id', (req, res) => {
    const { id } = req.params;
    const { nom, adresse } = req.body;

    req.getConnection((err, connection) => {
        if (err) return res.status(500).send("Erreur connexion DB");

        connection.query(
            "UPDATE association SET nom = ?, adresse = ? WHERE id_association = ?",
            [nom, adresse, id],
            (err, result) => {
                if (err) return res.status(500).send("Erreur SQL");

                if (result.affectedRows === 0) {
                    return res.status(404).send("Association introuvable");
                }

                res.json({ message: "Association mise à jour" });
            }
        );
    });
});

// DELETE
app.delete('/api/associations/:id', (req, res) => {
    const { id } = req.params;

    req.getConnection((err, connection) => {
        if (err) return res.status(500).send("Erreur connexion DB");

        connection.query(
            "DELETE FROM association WHERE id_association = ?",
            [id],
            (err, result) => {
                if (err) return res.status(500).send("Erreur SQL");

                if (result.affectedRows === 0) {
                    return res.status(404).send("Association introuvable");
                }

                res.json({ message: "Association supprimée" });
            }
        );
    });
});

// ==============================
// RESERVATIONS
// ==============================
app.get('/api/reservations', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return res.status(500).send("Erreur connexion DB");

        connection.query("SELECT * FROM reservations", (err, results) => {
            if (err) return res.status(500).send("Erreur SQL");
            res.json(results);
        });
    });
});

// ==============================
// MJC
// ==============================
app.get('/api/mjc', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return res.status(500).send("Erreur connexion DB");

        connection.query("SELECT * FROM mjc", (err, results) => {
            if (err) return res.status(500).send("Erreur SQL");
            res.json(results);
        });
    });
});


// ==============================
// EXPORT
// ==============================
module.exports = app;