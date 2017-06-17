--
-- Database: centre_commercial
-- CREATION_TABLES_ELISEI_TCHENTE_TRUAN.sql
--

DROP DATABASE IF EXISTS slo_schema;

SET NAMES 'cp1250';
SET CHARSET 'utf8';

CREATE SCHEMA slo_schema;
USE slo_schema;


-- ------------------- --
-- Création des tables --
-- ------------------- --

-- Table structure for centre_commercial
CREATE TABLE centre_commercial (
	no_id int(10) NOT NULL UNIQUE AUTO_INCREMENT,
	nom varchar(30) NOT NULL,
	slogan varchar(50),
	id_adresse int(10) NOT NULL,
	horaire int(10) NOT NULL,
	PRIMARY KEY (no_id)
);

-- Table structure for parking
CREATE TABLE parking (
	id_parking int(10) NOT NULL AUTO_INCREMENT,
	id_centre int(10) NOT NULL,
	nb_places int(10) NOT NULL,
	nb_places_occupees int(10),
	prix_heure int(10),
	horaire int(10) NOT NULL,
	PRIMARY KEY (id_parking)
);

-- Table structure for personnel
CREATE TABLE personnel (
	no_secu varchar(10) NOT NULL,
	nom varchar(30) NOT NULL,
    prenom varchar (30) NOT NULL,
	adresse int(10) NOT NULL,
	salaire decimal(10, 2),
	telephone varchar(20),
	fonction varchar(20),
	travaille_pour_enseigne bool,
	date_naissance date NOT NULL,
	id_centre int(10) NOT NULL,
	id_enseigne int(10),
    email varchar(80),
	PRIMARY KEY (no_secu)
);


-- Table structure for enseigne
CREATE TABLE enseigne (
	id_enseigne int(10) NOT NULL UNIQUE AUTO_INCREMENT,
	id_centre int(10) NOT NULL,
    nom varchar(30) NOT NULL,
	emplacement_local varchar(3) NOT NULL,
	horaire int(10) NOT NULL,
    filename_image varchar(255) NOT NULL,
	PRIMARY KEY (id_enseigne)
);

-- Table structure for local_
CREATE TABLE local (
	emplacement varchar(3) NOT NULL,
    id_centre int(10) NOT NULL,
	superficie double NOT NULL,
	cout double NOT NULL,
    occupe boolean NOT NULL,
	PRIMARY KEY (emplacement)
);

-- Table structure for service
CREATE TABLE service (
	type_service varchar(30) NOT NULL,
	id_enseigne int(10) NOT NULL,
	PRIMARY KEY (id_enseigne)
);

-- Table structure for restaurant
CREATE TABLE restaurant (
	type_restaurant varchar(30) NOT NULL,
	nb_tables_dispo int(3),
	id_enseigne int(10) NOT NULL,
	PRIMARY KEY (id_enseigne)
);

-- Table structure for magasin
CREATE TABLE magasin (
	type_magasin varchar(30) NOT NULL,
	id_enseigne int(10) NOT NULL,
	PRIMARY KEY (id_enseigne)
);

-- Table structure for horaire
CREATE TABLE horaire (
	id_horaire int(10) NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id_horaire)
);

-- Table structure for horaire_jour
CREATE TABLE horaire_jour (
	jour varchar(8) NOT NULL,
	id_horaire int(10) NOT NULL,
	heure_debut time,
	heure_fin time,
	debut_pause_midi time,
	fin_pause_midi time,
	ouvert bool,
	PRIMARY KEY (jour, id_horaire)
);

-- Table structure for adresse
CREATE TABLE adresse (
	id_adresse int(10) NOT NULL AUTO_INCREMENT,
	rue varchar(30),
	no_rue varchar(10),
	ville varchar(30),
	npa int(10),
	pays varchar(20),
	PRIMARY KEY (id_adresse)
);


-- ----------------------------------------------- --
-- Création des clés étrangères et des contraintes --
-- ----------------------------------------------- --
ALTER TABLE centre_commercial
	ADD CONSTRAINT FOREIGN KEY (id_adresse) REFERENCES adresse (id_adresse),
	ADD CONSTRAINT FOREIGN KEY (horaire) REFERENCES horaire (id_horaire);

-- Si un centre commercial est supprimé, alors son parking l'est aussi.
ALTER TABLE parking
	ADD CONSTRAINT FOREIGN KEY (id_centre) REFERENCES centre_commercial (no_id) ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT FOREIGN KEY (horaire) REFERENCES horaire (id_horaire);

-- Si un centre commercial ou une enseigne est supprimée, son personnel l'est aussi.
ALTER TABLE personnel
	ADD CONSTRAINT FOREIGN KEY (id_centre) REFERENCES centre_commercial (no_id) ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT FOREIGN KEY (id_enseigne) REFERENCES enseigne (id_enseigne) ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT FOREIGN KEY (adresse) REFERENCES adresse (id_adresse);

-- Si un local est supprimé, alors l'enseigne qui y est reliée est aussi supprimée.
ALTER TABLE enseigne
	ADD CONSTRAINT FOREIGN KEY (id_centre) REFERENCES centre_commercial (no_id) ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT FOREIGN KEY (horaire) REFERENCES horaire (id_horaire),
	ADD CONSTRAINT FOREIGN KEY (emplacement_local) REFERENCES local (emplacement) ON DELETE CASCADE ON UPDATE CASCADE;

-- Si un centre commercial est supprimé, alors ses locaux le sont aussi.
ALTER TABLE local
	ADD CONSTRAINT FOREIGN KEY (id_centre) REFERENCES centre_commercial (no_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE service
	ADD CONSTRAINT FOREIGN KEY (id_enseigne) REFERENCES enseigne (id_enseigne) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE magasin
	ADD CONSTRAINT FOREIGN KEY (id_enseigne) REFERENCES enseigne (id_enseigne) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE restaurant
	ADD CONSTRAINT FOREIGN KEY (id_enseigne) REFERENCES enseigne (id_enseigne) ON DELETE CASCADE ON UPDATE CASCADE;

-- Si un horaire est supprimé, alors son horaire par jour est supprimé.
ALTER TABLE horaire_jour
	ADD CONSTRAINT FOREIGN KEY (id_horaire) REFERENCES horaire (id_horaire) ON DELETE CASCADE ON UPDATE CASCADE;
