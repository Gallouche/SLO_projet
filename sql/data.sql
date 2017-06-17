-- File    : data.sql
-- Authors : Lucas ELISEI, Dany TCHENTE & David TRUAN
--
-- Données de la base de données du projet BDR 2016-2017.

USE BDR_ELISEI_TCHENTE_TRUAN;

SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET NAMES 'cp1250';
SET CHARSET 'utf8';

INSERT INTO adresse VALUES  (1, "Avenue du Mont d'Or", "1", "Lausanne", 1015, "Suisse"),
                            (2, "Cheminet", "24B", "Genève", 1345, "Suisse"),
                            (3, "Chemin du Ruisseau", "34", "Nyon", 2345, "Suisse"),
                            (4, "Ruchonnet", "56", "Lausanne", 1015, "Suisse"),
                            (5, "Petit Pieds", "44", "Frasne", 12345, "France");

INSERT INTO centre_commercial VALUES    (1, "Shopy", "Shoppy, shoppa!", 1, 1),
                                        (2, "Shoplala", "Hey la, shoplala!", 2, 1);

INSERT INTO horaire_jour VALUES ("Lundi", 1, "08:00:00", "19:00:00", "11:45:00", "12:45:00", 1),
                                ("Mardi", 1, "08:00:00", "19:00:00", "11:45:00", "12:45:00", 1),
                                ("Mercredi", 1, "08:00:00", "19:00:00", "11:45:00", "12:45:00", 1),
                                ("Jeudi", 1, "08:00:00", "19:00:00", "11:45:00", "12:45:00", 1),
                                ("Vendredi", 1, "08:00:00", "19:00:00", "11:45:00", "12:45:00", 1),
                                ("Samedi", 1, "09:00:00", "18:00:00", "11:45:00", "12:45:00", 1),
                                ("Dimanche", 1, NULL, NULL, NULL, NULL, 0),

								("Lundi", 2, "08:00:00", "19:00:00", NULL, NULL, 1),
                                ("Mardi", 2, "08:00:00", "19:00:00", NULL, NULL, 1),
                                ("Mercredi", 2, "08:00:00", "19:00:00", NULL, NULL, 1),
                                ("Jeudi", 2, "08:00:00", "19:00:00", NULL, NULL, 1),
                                ("Vendredi", 2, "08:00:00", "19:00:00", NULL, NULL, 1),
                                ("Samedi", 2, "09:00:00", "18:00:00", NULL, NULL, 1),
                                ("Dimanche", 2, NULL, NULL, NULL, NULL, 0);

INSERT INTO local VALUES    ("1A", 1, 120.0, 7100.0, false),
                            ("1B", 1, 180.0, 10200.0, false),
                            ("2A", 1, 150.0, 8000.0, false),
                            ("2B", 1, 120.0, 6700.0, false),
                            ("2C", 1, 60, 1800.0, false),
                            ("3A", 1, 80.0, 2000.0, false),
                            ("3B", 1, 100.0, 5000.0, false),
                            ("3C", 1, 93.0, 3400.0, false);

INSERT INTO enseigne VALUES (1, 1, "H&M", "3A", 1, "hm.png"),
							(2, 1, "McDonald's", "3B", 1, "mcdo.png"),
                            (3, 1, "UBS", "2A", 2, "ubs.png"),
                            (4, 1, "Migros", "2B", 1, "migros.png"),
                            (5, 1, "FNAC", "1A", 2, "fnac.png"),
                            (6, 1, "Salt", "3C", 1, "salt.png");

INSERT INTO horaire VALUES (1), (2);

INSERT INTO magasin VALUES  ("Vêtements", 1),
                            ("Alimentaire", 4),
                            ("Electronique", 5);

INSERT INTO restaurant VALUES ("Fast-food", 20, 2);

INSERT INTO service VALUES  ("Banque", 3),
                            ("Opérateur téléphonique", 6);

INSERT INTO parking VALUES (1, 1, 500, 0, 2.5, 2);

INSERT INTO personnel VALUES ("0100", "Girard", "Alban", 3, 15000.0, "+41 78 789 44 59", "Patron", 0, "1980-11-27", 1, NULL, "alban.girard@shopy.ch"),

							 ("1001", "Bertoux", "Guy", 5, 7000.0, "+33 6 29 36 58 46", "Gérant", 1, "1980-04-03", 1, 1, NULL),
                             ("1002", "Chassot", "Léa", 4, 3000.0, "+41 78 890 09 59", "Vendeur", 1, "1963-01-01", 1, 1, NULL),


							 ("1003", "Monte", "Léon", 2, 8000.0, "+41 78 783 44 59", "Gérant", 1, "1979-10-26", 1, 2, NULL),
                             ("1004", "Lejardin", "Marc", 4, 3000.0, "+41 78 890 09 49", "Vendeur", 1, "1973-02-11", 1, 2, NULL),
                             ("1005", "Bertoux", "Adeline", 5, 4000.0, "+33 6 29 36 58 46", "Cuisinière", 1, "1981-06-08", 1, 2, NULL),


							 ("1006", "LeGrand", "Patrick", 6, 9000.0, "+41 78 783 43 51", "Gérant", 1, "1975-03-25", 1, 3, NULL),
                             ("1007", "Lebois", "Jean", 4, 3000.0, "+41 78 890 09 39", "Vendeur", 1, "1983-03-21", 1, 4, NULL),
							 ("1008", "Bochard", "Alain", 3, 4000.0, "+41 21 865 98 78", "Caissier", 1, "1990-08-08", 1, 3, NULL),


							 ("1009", "Mauron", "Laurent", 1, 7500.0, "+41 787 83 43 53", "Gérant", 1, "1985-02-11", 1, 4, NULL),
                             ("1010", "Labise", "Marie", 4, 3000.0, "+41 78 890 09 29", "Vendeur", 1, "1993-01-01", 1, 5, NULL),
							 ("1011", "Lafleur", "Marcelle", 3, 4000.0, "+41 21 863 98 78", "Caissière", 1, "1980-09-06", 1, 2, NULL),


							 ("1012", "Sin", "Lee", 9, 10500.0, "+41 78 783 43 49", "Gérant", 1, "1986-04-21", 1, 5, NULL),
							 ("1013", "Labelle", "Pria", 4, 3000.0, "+41 78 890 09 19", "Vendeur", 1, "1997-06-01", 1, 6, NULL),


							 ("1014", "Garen", "Leblanc", 9, 9500.0, "+41 78 783 43 39", "Gérant", 1, "1976-04-21", 1, 6, NULL),
							 ("1015", "Labelle", "Pria", 4, 3000.0, "+41 78 890 09 09", "Vendeur", 1, "1992-06-01", 1, 4, NULL);
