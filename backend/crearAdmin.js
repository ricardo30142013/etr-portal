const bcrypt = require("bcrypt");
const db = require("./database/database");

const password = "Admin123";

bcrypt.hash(password, 10, (err, hash) => {

    if (err) {

        console.log(err);
        return;

    }

    db.run(

        `INSERT INTO usuarios
        (nombre, usuario, password, rol)
        VALUES (?, ?, ?, ?)`,

        [

            "Ricardo Rodríguez",
            "ricardo",
            hash,
            "Administrador"

        ],

        function(err){

            if(err){

                console.log(err.message);

            }else{

                console.log("Administrador creado correctamente.");

            }

        }

    );

});