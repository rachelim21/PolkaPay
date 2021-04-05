# PolkaPay

## Run Node.js server
`npm install`  
`node app.js`  
Open http://localhost:8080/ to view the Express app in your browser

## Run local postgres database
`psql postgres`  
Check config/db.config.js for information on roles and database names

### Update postgresql
`brew upgrade postgresql`  
`brew postgresql-upgrade-database`

### Create new user or role in postgres locally
If encounter error: role "postgres" does not exist:
`/usr/local/opt/postgres/bin/createuser -s postgres`

### Create new database in postgres locally
If encounter error: database "testdb" does not exist:
`psql postgres`  
`# CREATE DATABASE testdb;`

## AWS RDS
polkapay-db  
postgres  
polkapay
