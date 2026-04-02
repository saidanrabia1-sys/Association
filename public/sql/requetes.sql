-- ===================================================
-- CRÉATION DE LA BASE
-- ===================================================
CREATE DATABASE IF NOT EXISTS association;
USE association_db;

-- ===================================================
-- TABLE MJC
-- ===================================================
CREATE TABLE IF NOT EXISTS mjc (
    id_mjc    INT AUTO_INCREMENT PRIMARY KEY,
    nom       VARCHAR(150) NOT NULL,
    adresse   VARCHAR(255),
    telephone VARCHAR(20)
);

INSERT INTO mjc (nom, adresse, telephone) VALUES
    ('MJC de Mamoudzou',     'Route Nationale 1, Mamoudzou',    '0269612100'),
    ('MJC de Koungou',       'Centre ville, Koungou',           '0269621234'),
    ('MJC de Bandraboua',    'Route principale, Bandraboua',    '0269625678'),
    ('MJC de Bouéni',        'Centre de Bouéni, Bouéni',        '0269639012'),
    ('MJC de Kani-Kéli',     'Village de Kani-Kéli, Kani-Kéli','0269633456'),
    ('MJC de Chirongui',     'Centre ville, Chirongui',         '0269637890'),
    ('MJC de Sada',          'Route de Sada, Sada',             '0269641234'),
    ('MJC de Tsingoni',      'Centre de Tsingoni, Tsingoni',    '0269645678'),
    ('MJC de M\'Tsangamouji','Village principal, M\'Tsangamouji','0269649012'),
    ('MJC de Bandélé',       'Quartier Bandélé, Petite-Terre',  '0269652345');

-- ===================================================
-- TABLE COMMUNE
-- ===================================================
CREATE TABLE IF NOT EXISTS commune (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    nom       VARCHAR(155) NOT NULL,
    adresse   VARCHAR(300),
    telephone VARCHAR(80),
    president VARCHAR(155)
);

INSERT INTO commune (nom, adresse, telephone, president) VALUES
    ('Mamoudzou',      'Place Mariage, Mamoudzou',           '0269611000', 'Ambdilwahedou Soumaila'),
    ('Koungou',        'Centre administratif, Koungou',      '0269620500', 'Assani Saindou Bamcolo'),
    ('Bandraboua',     'Mairie de Bandraboua, Bandraboua',   '0269620100', 'Ibrahim Idriss'),
    ('Bouéni',         'Mairie de Bouéni, Bouéni',           '0269639500', 'Said Omar Oili'),
    ('Kani-Kéli',      'Mairie de Kani-Kéli, Kani-Kéli',    '0269633000', 'Fadi Souf'),
    ('Chirongui',      'Mairie de Chirongui, Chirongui',     '0269637000', 'Said Mohamadi'),
    ('Sada',           'Mairie de Sada, Sada',               '0269640500', 'Ben Abdallah Mbae'),
    ('Tsingoni',       'Mairie de Tsingoni, Tsingoni',       '0269645000', 'Anchya Bamana'),
    ('M\'Tsangamouji', 'Mairie de M\'Tsangamouji',           '0269649000', 'Ibrahim Aboubacar'),
    ('Bandélé',        'Mairie de Bandélé, Petite-Terre',    '0269600200', 'Saïd Kambi');

-- ===================================================
-- TABLE ASSOCIATION
-- ===================================================
CREATE TABLE IF NOT EXISTS association (
    id_association INT AUTO_INCREMENT PRIMARY KEY,
    nom            VARCHAR(150) NOT NULL,
    numero         VARCHAR(50),
    siret          VARCHAR(50),
    adresse        VARCHAR(255),
    date_creation  DATE,
    telephone      VARCHAR(20),
    president      VARCHAR(150)
);

INSERT INTO association (nom, numero, siret, adresse, date_creation, telephone, president) VALUES
    ('Mama Africa Sport',            'M001', '12345678900011', 'Route Nationale 1, Mamoudzou', '2015-03-10', '0639610001', 'Ali Moussa'),
    ('Jeunesse de Koungou',          'M002', '98765432100022', 'Centre ville, Koungou',        '2018-07-22', '0639620002', 'Fatima Saïd'),
    ('Solidarité Mayotte',           'M003', '45678912300033', 'Quartier Kawéni, Mamoudzou',   '2016-01-15', '0639630003', 'Mohamed Bacar'),
    ('Culture & Traditions',         'M004', '32165498700044', 'Village de Sada, Sada',        '2019-05-08', '0639640004', 'Zouhoura Hamidi'),
    ('Eco Nature Mayotte',           'M005', '15975348600055', 'Route de Bandraboua',          '2017-11-20', '0639650005', 'Ibrahim Combo'),
    ('Femmes Actives 976',           'M006', '24681357900066', 'Centre de Tsingoni',           '2020-02-14', '0639660006', 'Ramlati Ali'),
    ('Association Sportive Chirongui','M007','13579246800077', 'Centre ville, Chirongui',      '2014-09-30', '0639670007', 'Saïd Abdou'),
    ('Jeunes de Petite-Terre',       'M008', '97531246800088', 'Dzaoudzi, Petite-Terre',       '2021-06-01', '0639680008', 'Naïma Houmadi'),
    ('Bouéni Environnement',         'M009', '86420135700099', 'Village de Bouéni',            '2018-04-17', '0639690009', 'Omar Soulé'),
    ('Kani-Kéli Avenir',             'M010', '75319024600010', 'Kani-Kéli village',            '2022-03-25', '0639600010', 'Anfaou Moussa');

-- ===================================================
-- TABLE RESERVATIONS
-- ===================================================
CREATE TABLE IF NOT EXISTS reservations (
    id               INT AUTO_INCREMENT PRIMARY KEY,
    id_association   INT,
    id_mjc           INT,
    date_reservation DATE,
    FOREIGN KEY (id_association) REFERENCES association(id_association),
    FOREIGN KEY (id_mjc)         REFERENCES mjc(id_mjc)
);

-- ===================================================
-- VÉRIFICATIONS
-- ===================================================
SHOW TABLES;
SELECT * FROM mjc;
SELECT * FROM commune;
SELECT * FROM association;
SELECT * FROM reservations;

