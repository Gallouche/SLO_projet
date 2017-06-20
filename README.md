# Projet SLO

## Configuration

Pour faire tourner l'application web, **Node.js** est requis, ainsi qu'une base de données **MySQL**.

Tout d'abord, il faut lancer la commande suivante dans un terminal :
```
npm install
```

Ensuite, il faut modifier les fichiers `config/config.js` et `sql/sql.sh` afin que ceux-ci concordent avec la configuration de la base de données MySQL.

Puis, exécuter le script `sql.sh` ou exécuter tous les scripts `.sql` un par un.

Une fois que cela fait, le serveur peut être lancé. Pour cela, il suffit de lancer la commande suivante depuis un terminal :
```
node server.js
```

Une adresse apparaîtra, c'est l'adresse à laquelle le site est disponible.

## Informations utiles

Si les scripts SQL ont été correctement exécutés, deux utilisateurs sont déjà présents dans la base de données :

* `admin`:`admin` -> Compte disposant des droits administrateur pour le site.
* `test`:`test` -> Compte utilisateur normal.
