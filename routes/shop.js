var config = require('../config/config');
var express = require('express');
var moment = require('moment');
var mysql = require('mysql');

var connection = mysql.createConnection(config.mysql_conn);
var router = express.Router();

router.get('/:id', function(req, res, next) {
    var id = req.params.id;

    var query = 'SELECT * FROM enseigne ' +
                'LEFT OUTER JOIN magasin ON magasin.id_enseigne = enseigne.id_enseigne ' +
                'LEFT OUTER JOIN restaurant ON restaurant.id_enseigne = enseigne.id_enseigne ' +
                'LEFT OUTER JOIN service ON service.id_enseigne = enseigne.id_enseigne ' +
                'WHERE enseigne.id_enseigne = ' + id + ' LIMIT 1';

    connection.query(query, function(err, result, fields) {
            if(err) return next(err);

            var shop = result[0];

            shop.id_enseigne = id;
            if(shop.type_magasin) {
                shop.type = 0;
                shop.typeName = shop.type_magasin;
            }
            else if(shop.type_restaurant) {
                shop.type = 1;
                shop.typeName = shop.type_restaurant;
            }
            else if(shop.type_service) {
                shop.type = 2;
                shop.typeName = shop.type_service;
            }

            res.status(200).json(shop);
        }
    );
});

router.get('/:id/gerant', function(req, res, next) {
    var id = req.params.id;

    var query = 'SELECT * FROM personnel ' +
                'WHERE personnel.no_secu IN (' +
                'SELECT no_secu FROM vue_client WHERE id_enseigne = ' + id + ') ' +
                'LIMIT 1';

    connection.query(query,
        function(err, result, fields) {
            if(err) return next(err);

            res.status(200).json(result[0]);
        }
    );
});

router.get('/:id/horaires', function(req, res, next) {
    var id = req.params.id;

    var query = 'SELECT * FROM horaire_jour WHERE id_horaire = (' +
                'SELECT horaire FROM enseigne WHERE id_enseigne = ' + id + ')';

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

router.get('/:id/infos_personnel', function(req, res, next) {
    var id = req.params.id;

    var query = 'SELECT * FROM gerant_employes WHERE id_enseigne = ' + id;

    connection.query(query,
        function(err, results, fields) {
            if(err) return next(err);

            res.status(200).json(results);
        }
    );
});

router.get('/magasins', function(req, res, next) {
    connection.query('SELECT * FROM enseigne INNER JOIN magasin ON magasin.id_enseigne = enseigne.id_enseigne',
        function(err, results, fields) {
            if(err) return next(err);

            res.status(200).json(results);
        }
    );
});

router.get('/restaurants', function(req, res, next) {
    connection.query('SELECT * FROM enseigne INNER JOIN restaurant ON restaurant.id_enseigne = enseigne.id_enseigne',
        function(err, results, fields) {
            if(err) return next(err);

            res.status(200).json(result);
        }
    );
});

router.get('/services', function(req, res, next) {
    connection.query('SELECT * FROM enseigne INNER JOIN service ON service.id_enseigne = enseigne.id_enseigne',
        function(err, results, fields) {
            if(err) return next(err);

            res.status(200).json(results);
        }
    );
});

module.exports = router;
