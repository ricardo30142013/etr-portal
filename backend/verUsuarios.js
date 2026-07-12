const db = require("./database/database");

db.all("SELECT * FROM usuarios", [], (err, rows) => {

    if(err){

        console.log(err);

    }else{

        console.table(rows);

    }

});