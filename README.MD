## Projet
Projet de BDR réalisé par Lucas ELISEI, Dany TCHENTE et David TRUAN.

L'application permet de gérer différents centres commerciaux et afficher/modifier des informations utiles.

L'application est disponible à [cette adresse](http://bdr-project.mfvhkwdptv.eu-central-1.elasticbeanstalk.com/).

## Installation
1. Pré-requis :
    * [Node.js](https://nodejs.org/en/)
    * [MySQL](https://www.mysql.com/)
2. Installation des submodules : `cd path/to/app && npm install`
3. Changer les informations de connexion à la base de données MySQL si besoin. Les fichiers à modifier sont `config/config.js` et `sql/sql.sh`.
4. Exécuter le script `sql/sql.sh`. Attention, `bash` est requis.

## Exécution

    node server.js
