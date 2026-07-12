const express = require("express");
const supabase = require("../supabase");

const router = express.Router();

/* ==========================
   LISTAR MIEMBROS
========================== */
router.get("/", async (req, res) => {

    try {

        const { data, error } = await supabase
            .from("miembros")
            .select("*")
            .order("apellidos", { ascending: true });

        if (error) {
            console.error(error);
            return res.status(500).json(error);
        }

        res.json(data);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false
        });

    }

});

/* ==========================
   TOTAL DE MIEMBROS
========================== */

router.get("/total/registros", async (req, res) => {

    const { count, error } = await supabase
        .from("miembros")
        .select("*", { count: "exact", head: true });

    if (error) {

        return res.status(500).json(error);

    }

    res.json({
        total: count
    });

});

/* ==========================
   OBTENER UN MIEMBRO
========================== */

router.get("/:id", async (req, res) => {

    const { data, error } = await supabase

        .from("miembros")

        .select("*")

        .eq("id", req.params.id)

        .single();

    if(error){

        return res.status(500).json(error);

    }

    res.json(data);

});

/* ==========================
   ACTUALIZAR MIEMBRO
========================== */

router.put("/:id", async (req,res)=>{

    const {

        nombres,

        apellidos,

        cedula,

        telefono,

        fecha_nacimiento

    } = req.body;

    const { error } = await supabase

        .from("miembros")

        .update({

            nombres,

            apellidos,

            cedula,

            telefono,

            fecha_nacimiento

        })

        .eq("id",req.params.id);

    if(error){

        console.log(error);

        return res.json({

            success:false

        });

    }

    res.json({

        success:true

    });

});

/* ==========================
   GUARDAR MIEMBRO
========================== */
router.post("/", async (req, res) => {

    try {

        const {
            nombres,
            apellidos,
            cedula,
            telefono,
            fecha_nacimiento
        } = req.body;

        const fechaNacimiento = fecha_nacimiento || null;

        // Verificar cédula duplicada
        const { data: existe } = await supabase
            .from("miembros")
            .select("id")
            .eq("cedula", cedula)
            .maybeSingle();

        if (existe) {

            return res.json({
                success: false,
                mensaje: "La cédula ya existe."
            });

        }

        const { error } = await supabase
            .from("miembros")
            .insert([
                {
                    nombres,
                    apellidos,
                    cedula,
                    telefono,
                    fecha_nacimiento: fechaNacimiento,
                    estado: "ACTIVO"
                }
            ]);

        if (error) {

            console.error(error);

            return res.json({
                success: false,
                mensaje: error.message
            });

        }

        res.json({
            success: true
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            mensaje: err.message
        });

    }

});

/* ==========================
   ELIMINAR MIEMBRO
========================== */

router.delete("/:id", async (req, res) => {

    try {

        const { error } = await supabase
            .from("miembros")
            .delete()
            .eq("id", req.params.id);

        if (error) {

            console.error(error);

            return res.json({
                success: false,
                mensaje: error.message
            });

        }

        res.json({
            success: true
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false
        });

    }

});

module.exports = router;