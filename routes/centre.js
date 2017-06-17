var config = require('../config/config');
var express = require('express');
var moment = require('moment');
var mysql = require('mysql');

var connection = mysql.createConnection(config.mysql_conn);
var router = express.Router();

router.get('/list', function(req, res, next) {
    connection.query('SELECT * FROM centre_commercial',
        function(err, results, fields) {
            if (err) return next(err);

            res.status(200).json(results);
        }
    );
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;

    connection.query('SELECT * FROM centre_commercial WHERE no_id = ' + id + ' LIMIT 1',
        function(err, results, fields) {
            if(err) return next(err);

            res.status(200).json(results[0]);
        }
    );
});

router.get('/:id/adresse', function(req, res, next) {
    var id = req.params.id;

    connection.query('SELECT id_adresse FROM centre_commercial WHERE no_id = ' + id + ' LIMIT 1',
        function(err, results, fields) {
            if(err) return next(err);

            var id_adresse = results[0].id_adresse;

            connection.query('SELECT * FROM adresse WHERE id_adresse = ' + id_adresse + ' LIMIT 1',
                function(err, results, fields) {
                    if(err) return next(err);

                    res.status(200).json(results[0]);
                }
            );
        }
    );
});

router.get('/:id/horaires', function(req, res, next) {
    var id = req.params.id;

    var query = 'SELECT * FROM horaire_jour WHERE id_horaire = (' +
                'SELECT horaire FROM centre_commercial WHERE no_id = ' + id + ')';

    connection.query(query,
        function(err, results, fields) {
            if(err) return next(err);

            var new_horaires = new Array(7);

            for(var i in results) {
                if(results[i].ouvert === 1) {
                    results[i].heure_debut = moment(results[i].heure_debut, "HH:mm:ss").format("HH:mm");
                    results[i].heure_fin = moment(results[i].heure_fin, "HH:mm:ss").format("HH:mm");
                }

                switch(results[i].jour) {
                    case "Lundi": new_horaires[0] = results[i]; break;
                    case "Mardi": new_horaires[1] = results[i]; break;
                    case "Mercredi": new_horaires[2] = results[i]; break;
                    case "Jeudi": new_horaires[3] = results[i]; break;
                    case "Vendredi": new_horaires[4] = results[i]; break;
                    case "Samedi": new_horaires[5] = results[i]; break;
                    case "Dimanche": new_horaires[6] = results[i]; break;
                }
            }

            res.status(200).json(new_horaires);
        }
    );
});

router.get('/:id/parking', function(req, res, next) {
    var id = req.params.id;

    var query = 'SELECT * FROM parking WHERE id_centre = ' + id + ' LIMIT 1';

    connection.query(query,
        function(err, result, fields) {
            if(err) return next(err);

            res.status(200).json(result[0]);
        }
    );
});

router.put('/:id/parking/refresh', function(req, res, next) {
    var id = req.params.id;

    var rand = Math.floor(Math.random() * 50) + 1;

    var query = 'UPDATE parking SET nb_places_occupees = ' + rand + ' WHERE id_centre = ' + id;

    connection.query(query,
        function(err, result, fields) {
            if(err) return next(err);

            res.status(200).json(rand);
        }
    );
});

router.get('/:id/patron', function(req, res, next) {
    var id = req.params.id;

    var query = 'SELECT * FROM personnel WHERE fonction = "Patron" AND id_centre = ' + id + ' LIMIT 1';

    connection.query(query,
        function(err, result, fields) {
            if(err) return next(err);

            res.status(200).json(result[0]);
        }
    );
});

router.get('/:id/shop/list', function(req, res, next) {
    var id = req.params.id;

    var query = 'SELECT * FROM enseigne WHERE enseigne.id_centre = ' + id;

    connection.query(query,
        function(err, results, fields) {
            if(err) return next(err);

            res.status(200).json(results);
        }
    );
});

module.exports = router;
