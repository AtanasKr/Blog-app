import mysql from 'mysql'

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"nasko99",
    database:"xblog-database"
})