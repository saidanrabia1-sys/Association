 CREATE TABLE associations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    numero VARCHAR(50),
    siret VARCHAR(50),
    adresse VARCHAR(255),
    date_creation DATE,
    telephone VARCHAR(20),
    president VARCHAR(100)
);

INSERT INTO associations (nom, numero, siret, adresse, date_creation, telephone, president) VALUES

    ("Sport Club Ville", "A001", "12345678900011", "12 rue du Stade, Paris", "2015-06-12", "0612345678", "Jean Dupont"),

    ("Culture & Loisirs", "A002", "98765432100022", "8 avenue des Arts, Lyon", "2018-03-20", "0623456789", "Marie Martin"),

    ("Solidarité Plus", "A003", "45678912300033", "5 rue de la Paix, Marseille", "2020-01-15", "0634567890", "Paul Bernard"),

    ("Jeunesse Active", "A004", "32165498700044", "20 boulevard des Jeunes, Lille", "2019-09-10", "0645678901", "Sophie Leroy"),

    ("Eco Nature", "A005", "15975348600055", "3 rue Verte, Nantes", "2017-05-05", "0656789012", "Lucas Petit");