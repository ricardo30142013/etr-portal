const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
    path.join(__dirname, "etr.db"),
    (err) => {
        if (err) {
            console.error("Error al conectar la base de datos", err);
        } else {
            console.log("Base de datos conectada.");
        }
    }
);

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            usuario TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            rol TEXT NOT NULL,
            estado TEXT DEFAULT 'ACTIVO'
        )
    `);

});

module.exports = db;