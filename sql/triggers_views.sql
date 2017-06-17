-- File    : triggers_views.sql
-- Authors : Lucas ELISEI, Dany TCHENTE & David TRUAN
--
-- Triggers et views du projet BDR 2016-2017.

USE slo_schema;

SET NAMES 'cp1250';
SET CHARSET 'utf8';

DROP TRIGGER IF EXISTS email_insert;
DROP TRIGGER IF EXISTS liberation_local_enseigne;
DROP TRIGGER IF EXISTS attribution_local_enseigne;
DROP VIEW IF EXISTS gerant_employes;
DROP VIEW IF EXISTS infos_enseigne_gerant;
DROP VIEW IF EXISTS vue_client;
DROP VIEW IF EXISTS locaux_libres;

-- Trigger qui permet d'affecter un email à la création d'un membre du personnel.
-- L'email est composé comme suit : prenom.nom@enseigne.com
DELIMITER //
CREATE TRIGGER email_insert
BEFORE INSERT ON personnel
FOR EACH ROW
BEGIN
    IF NEW.email IS NULL OR NEW.email = '' THEN
        SET NEW.email = CONCAT(LOWER(NEW.prenom), '.', LOWER(NEW.nom), '@', (SELECT DISTINCT LOWER(enseigne.nom) FROM enseigne  WHERE enseigne.id_enseigne = NEW.id_enseigne), '.com');
    END IF;
END
//
DELIMITER ;

-- Trigger qui permet de passer le statut d'un local de "libre" à "occupé" lorsqu'une
-- nouvelle enseigne est créée.
DELIMITER //
CREATE TRIGGER attribution_local_enseigne
AFTER INSERT ON enseigne
FOR EACH ROW
BEGIN
	UPDATE local
	SET occupe = true
	WHERE local.emplacement = NEW.emplacement_local;
END
//
DELIMITER ;

-- Trigger qui permet de passer le statut d'un local de "occupé" à "libre" lorsque
-- l'enseigne qui l'occupait est supprimée du centre commercial.
DELIMITER //
CREATE TRIGGER liberation_local_enseigne
BEFORE DELETE ON enseigne
FOR EACH ROW
BEGIN
    UPDATE local
    SET occupe = false
    WHERE local.emplacement = OLD.emplacement_local;
END
//
DELIMITER ;

-- Vue qui permet de retourner la liste des employés selon l'enseigne pour laquelle
-- ils travaillent.
CREATE VIEW gerant_employes
AS
    SELECT
        personnel.id_centre,
        personnel.id_enseigne,
		personnel.nom,
		personnel.prenom,
		personnel.salaire,
		personnel.fonction,
		personnel.email,
		personnel.telephone,
		personnel.date_naissance
    FROM enseigne
		INNER JOIN personnel ON personnel.id_enseigne = enseigne.id_enseigne
        INNER JOIN local ON local.emplacement = enseigne.emplacement_local;


-- Vue  qui permet de connaître les informations privées des enseignes du centre
-- commercial.
CREATE VIEW infos_enseigne_gerant
AS
    SELECT
        enseigne.id_centre,
        enseigne.id_enseigne,
		enseigne.nom AS nom_enseigne,
		enseigne.emplacement_local,
        local.superficie,
        local.cout,
        enseigne.horaire,
        SUM(personnel.salaire) AS somme_salaires
	FROM enseigne
	INNER JOIN local ON enseigne.emplacement_local = local.emplacement
    LEFT OUTER JOIN personnel ON personnel.id_enseigne = enseigne.id_enseigne
    GROUP BY enseigne.id_centre, enseigne.id_enseigne, nom_enseigne, enseigne.emplacement_local, enseigne.horaire;

-- Vue qui permet de connaître les informations publiques des enseignes du centre
-- commercial.
CREATE VIEW vue_client
AS
    SELECT
        enseigne.id_centre,
        enseigne.id_enseigne,
		enseigne.nom,
        personnel.no_secu,
        personnel.nom as nom_gerant,
        personnel.prenom as prenom_gerant,
        horaire
	FROM enseigne
    INNER JOIN personnel ON enseigne.id_enseigne = personnel.id_enseigne
    WHERE personnel.fonction LIKE 'gerant';

-- Vue qui permet de connaître les locaux libres.
CREATE VIEW locaux_libres
AS
    SELECT
        id_centre,
        emplacement
    FROM local
    WHERE occupe = 0;
