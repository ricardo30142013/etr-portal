const express = require("express");
const bcrypt = require("bcrypt");
const supabase = require("../supabase");

const router = express.Router();

router.post("/login", async (req, res) => {

    try {

        const { usuario, password } = req.body;

        const { data, error } = await supabase
            .from("usuarios")
            .select("*")
            .eq("usuario", usuario)
            .single();

            console.log("Usuario recibido:", usuario);
            console.log("Error Supabase:", error);
            console.log("Datos:", data);

            console.log("Usuario recibido:", usuario);
            console.log("Registro encontrado:", data);
            console.log("Error Supabase:", error);

if (data) {
    const valido = await bcrypt.compare(password, data.password);
    console.log("Contraseña válida:", valido);
}

        if (error || !data) {

            return res.json({
                success: false,
                mensaje: "Usuario no encontrado"
            });

        }

        const valido = await bcrypt.compare(
            password,
            data.password
        );

        if (!valido) {

            return res.json({
                success: false,
                mensaje: "Contraseña incorrecta"
            });

        }

        return res.json({
            success: true,
            usuario: data.nombre,
            rol: data.rol_id
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            mensaje: "Error interno"
        });

    }

});

module.exports = router;