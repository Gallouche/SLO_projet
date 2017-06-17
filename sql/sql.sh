#!/bin/bash

if [ -z "$RDS_HOSTNAME" ]; then
    RDS_HOSTNAME=127.0.0.1
fi

if [ -z "$RDS_USERNAME" ]; then
    RDS_USERNAME=root
fi

if [ -z "$RDS_PASSWORD" ]; then
    RDS_PASSWORD=toor
fi

if [ -z "$RDS_DATABASE" ]; then
    RDS_DATABASE=slo_schema
fi

SCHEMA_FILE=sql/schema.sql
DATA_FILE=sql/data.sql
VIEWS_FILE=sql/triggers_views.sql

echo -n "Applying database schema... "
mysql --host=$RDS_HOSTNAME --user=$RDS_USERNAME --password=$RDS_PASSWORD < $SCHEMA_FILE
echo "Schema applied!"

echo -n "Applying data... "
mysql --host=$RDS_HOSTNAME --user=$RDS_USERNAME --password=$RDS_PASSWORD --database=$RDS_DATABASE < $VIEWS_FILE
mysql --host=$RDS_HOSTNAME --user=$RDS_USERNAME --password=$RDS_PASSWORD --database=$RDS_DATABASE < $DATA_FILE
echo "Data applied!"
