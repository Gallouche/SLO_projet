module.exports = {
    api_route: '/api',
    jwt: {
        exp: 60 * 60,
        secret_key: process.env.JWT_SECRET_KEY || 'IAMASECRETKEY'
    },
    mysql_conn: {
        host: process.env.RDS_HOSTNAME || '127.0.0.1',
        user: process.env.RDS_USERNAME || 'slo_user',
        password: process.env.RDS_PASSWORD || 'pass',
        database: process.env.RDS_DATABASE || 'slo_schema',
        port: process.env.RDS_PORT || 3306
    },
    port: process.env.PORT || 9000
};
