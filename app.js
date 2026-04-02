const express      = require('express');
const mysql2       = require('mysql2');
const myconnection = require('express-myconnection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const optionsConnexionBaseDeDonnees = {
    host:     "localhost",
    user:     "root",
    password: "Alma12.2025",
    database: "association_db",
    port:     3306
};

app.use(myconnection(mysql2, optionsConnexionBaseDeDonnees, "pool"));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

// ===================================================
// PAGES
// ===================================================
app.get('/',                      (req, res) => res.render('accueil'));
app.get('/accueil',               (req, res) => res.render('accueil'));
app.get('/association',           (req, res) => res.render('association'));
app.get('/commune',               (req, res) => res.render('commune'));
app.get('/mjc',                   (req, res) => res.render('mjc'));
app.get('/reservation',           (req, res) => res.render('reservation'));
app.get('/associations-commune',  (req, res) => res.render('associations-commune'));

// ===================================================
// API ASSOCIATIONS
// ===================================================
app.get('/api/associations', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Erreur connexion DB" });
        connection.query("SELECT * FROM association", (err, results) => {
            if (err) return res.status(500).json({ error: "Erreur SQL" });
            res.json(results);
        });
    });
});

app.post('/api/associations', (req, res) => {
    const data = req.body;
    req.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Erreur connexion DB" });
        connection.query("INSERT INTO association SET ?", data, (err, results) => {
            if (err) return res.status(500).json({ error: "Erreur SQL" });
            res.json({ id_association: results.insertId, ...data });
        });
    });
});

app.put('/api/associations/:id', (req, res) => {
    const { id } = req.params;
    const data   = req.body;
    req.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Erreur connexion DB" });
        connection.query(
            "UPDATE association SET ? WHERE id_association = ?", [data, id],
            (err) => {
                if (err) return res.status(500).json({ error: "Erreur SQL" });
                res.json({ message: "Association modifiée" });
            }
        );
    });
});

app.delete('/api/associations/:id', (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Erreur connexion DB" });
        connection.query(
            "DELETE FROM association WHERE id_association = ?", [id],
            (err) => {
                if (err) return res.status(500).json({ error: "Erreur SQL" });
                res.json({ message: "Association supprimée" });
            }
        );
    });
});

// ===================================================
// API COMMUNES
// ===================================================
app.get('/api/communes', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Erreur connexion DB" });
        connection.query("SELECT * FROM commune", (err, results) => {
            if (err) return res.status(500).json({ error: "Erreur SQL" });
            res.json(results);
        });
    });
});

app.post('/api/communes', (req, res) => {
    const data = req.body;
    req.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Erreur connexion DB" });
        connection.query("INSERT INTO commune SET ?", data, (err, results) => {
            if (err) return res.status(500).json({ error: "Erreur SQL" });
            res.json({ id: results.insertId, ...data });
        });
    });
});

app.put('/api/communes/:id', (req, res) => {
    const { id } = req.params;
    const data   = req.body;
    req.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Erreur connexion DB" });
        connection.query(
            "UPDATE commune SET ? WHERE id = ?", [data, id],
            (err) => {
                if (err) return res.status(500).json({ error: "Erreur SQL" });
                res.json({ message: "Commune modifiée" });
            }
        );
    });
});

app.delete('/api/communes/:id', (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Erreur connexion DB" });
        connection.query("DELETE FROM commune WHERE id = ?", [id], (err) => {
            if (err) return res.status(500).json({ error: "Erreur SQL" });
            res.json({ message: "Commune supprimée" });
        });
    });
});

// ===================================================
// API MJC
// ===================================================
app.get('/api/mjc', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Erreur connexion DB" });
        connection.query("SELECT * FROM mjc", (err, results) => {
            if (err) return res.status(500).json({ error: "Erreur SQL" });
            res.json(results);
        });
    });
});

app.post('/api/mjc', (req, res) => {
    const data = req.body;
    req.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Erreur connexion DB" });
        connection.query("INSERT INTO mjc SET ?", data, (err, results) => {
            if (err) return res.status(500).json({ error: "Erreur SQL" });
            res.json({ id_mjc: results.insertId, ...data });
        });
    });
});

app.put('/api/mjc/:id', (req, res) => {
    const { id } = req.params;
    const data   = req.body;
    req.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Erreur connexion DB" });
        connection.query(
            "UPDATE mjc SET ? WHERE id_mjc = ?", [data, id],
            (err) => {
                if (err) return res.status(500).json({ error: "Erreur SQL" });
                res.json({ message: "MJC modifiée" });
            }
        );
    });
});

app.delete('/api/mjc/:id', (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Erreur connexion DB" });
        connection.query("DELETE FROM mjc WHERE id_mjc = ?", [id], (err) => {
            if (err) return res.status(500).json({ error: "Erreur SQL" });
            res.json({ message: "MJC supprimée" });
        });
    });
});

// ===================================================
// API RESERVATIONS
// ===================================================
app.get('/api/reservations', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Erreur connexion DB" });
        connection.query(`
            SELECT r.id, a.nom AS association, m.nom AS mjc, r.date_reservation
            FROM reservations r
            JOIN association a ON r.id_association = a.id_association
            JOIN mjc m ON r.id_mjc = m.id_mjc
        `, (err, results) => {
            if (err) return res.status(500).json({ error: "Erreur SQL" });
            res.json(results);
        });
    });
});

app.post('/api/reservations', (req, res) => {
    const data = req.body;
    req.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Erreur connexion DB" });
        connection.query("INSERT INTO reservations SET ?", data, (err, results) => {
            if (err) return res.status(500).json({ error: "Erreur SQL" });
            res.json({ id: results.insertId, ...data });
        });
    });
});

app.delete('/api/reservations/:id', (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Erreur connexion DB" });
        connection.query("DELETE FROM reservations WHERE id = ?", [id], (err) => {
            if (err) return res.status(500).json({ error: "Erreur SQL" });
            res.json({ message: "Réservation supprimée" });
        });
    });
});

// ===================================================
// API ASSOCIATIONS PAR COMMUNE
// ===================================================
app.get('/api/associations-par-commune', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Erreur connexion DB" });
        connection.query(`
            SELECT
                a.id_association,
                a.id_commune,
                a.nom          AS nom_association,
                a.numero,
                a.telephone,
                a.president,
                a.adresse,
                a.date_creation,
                c.nom          AS nom_commune
            FROM association a
            JOIN commune c ON a.id_commune = c.id
            ORDER BY c.nom, a.nom
        `, (err, results) => {
            if (err) return res.status(500).json({ error: "Erreur SQL" });
            res.json(results);
        });
    });
});

// ===================================================
// API CONTACT
// ===================================================
app.post('/api/contact', (req, res) => {
    const { nom, email, telephone, sujet, message } = req.body;
    console.log("Nouveau message :", req.body);
    res.json({ message: "Message reçu" });
});

app.get('/test-db', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            console.error("Erreur connexion :", err);
            return res.status(500).json({ 
                error: "Connexion échouée", 
                details: err.message 
            });
        }
        connection.query("SHOW TABLES", (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ 
                message: "Connexion réussie !",
                tables: results 
            });
        });
    });
});

app.get('/api/associations', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Erreur connexion DB" });
        connection.query(`
            SELECT 
                a.*,
                c.nom AS nom_commune
            FROM association a
            LEFT JOIN commune c ON a.id_commune = c.id
            ORDER BY a.nom
        `, (err, results) => {
            if (err) return res.status(500).json({ error: "Erreur SQL" });
            res.json(results);
        });
    });
});

module.exports = app;