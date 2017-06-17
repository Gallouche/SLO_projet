var config = require('../config/config');
var express = require('express');
var mysql = require('mysql');

var connection = mysql.createConnection(config.mysql_conn);
var router = express.Router();

router.post('/:id/addShop', function(req, res, next) {
    var shop = req.body;
    shop.horaire = 1;
    shop.filename_image = 'shop_default.png';

    var query = 'INSERT INTO enseigne (id_centre, nom, emplacement_local, horaire, filename_image) ' +
                'VALUES (' + shop.id_centre + ', "' + shop.nom + '", "' + shop.local + '", ' + shop.horaire + ', "' + shop.filename_image + '")';

    connection.query(query,
        function(err, result, fields) {
            if(err) return next(err);

            var query = '';
            var id = result.insertId;

            switch(shop.type) {
                case '0':
                    query = 'INSERT INTO magasin VALUES ("' + shop.type_enseigne + '", ' + id + ')';
                    break;

                case '1':
                    query = 'INSERT INTO restaurant VALUES ("' + shop.type_enseigne + '", ' + shop.nb_places + ', ' + id + ')';
                    break;

                case '2':
                    query = 'INSERT INTO service VALUES ("' + shop.type_enseigne + '", ' + id + ')';
                    break;
            }

            connection.query(query,
                function(err, new_result, fields) {
                    if(err) return next(err);

                    res.status(200).json(shop);
                }
            );
        }
    );
});

router.delete('/deleteShop/:id', function(req, res, next) {
    var id_shop = req.params.id;

    var query = 'DELETE FROM enseigne WHERE id_enseigne = ' + id_shop;

    connection.query(query,
        function(err, result, fields) {
            if(err) return next(err);

            res.status(200).json(result[0]);
        }
    );
});

router.get('/:id/view/:view', function(req, res, next) {
    var id = req.params.id;
    var view = req.params.view;

    connection.query('SELECT * FROM ' + view + ' WHERE id_centre = ' + id,
        function(err, results, fields) {
            if (err) return next(err);

            res.status(200).json(results);
        }
    );
});

router.put('/:id_centre/local/:id_local/cost/:cost', function(req, res, next) {
    var id_centre = req.params.id_centre;
    var id_local = req.params.id_local;
    var cost = req.params.cost;

    var query = 'UPDATE local SET cout = ' + cost + ' WHERE emplacement = "' + id_local + '" AND id_centre = ' + id_centre;

    connection.query(query,
        function(err, results, fields) {
            if(err) return next(err);

            res.status(200).json(cost);
        }
    );
});

module.exports = router;
