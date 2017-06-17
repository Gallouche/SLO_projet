module.exports = {
    api_route: '/api',
    mysql_conn: {
        host: process.env.RDS_HOSTNAME || '127.0.0.1',
        user: process.env.RDS_USERNAME || 'root',
        password: process.env.RDS_PASSWORD || 'toor',
        database: process.env.RDS_DATABASE || 'slo_schema',
        port: process.env.RDS_PORT || 3306
    },
    port: process.env.PORT || 9000
};
