const express = require("express");
const multer = require("multer");
const supabase = require("../supabase");

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
});

router.post("/", upload.single("foto"), async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                mensaje: "No se recibió ninguna imagen."
            });

        }

        const nombreArchivo =
            Date.now() +
            "-" +
            req.file.originalname.replace(/\s+/g, "_");

        const { error } = await supabase.storage

            .from("miembros")

            .upload(nombreArchivo, req.file.buffer, {

                contentType: req.file.mimetype,

                upsert: false

            });

        if (error) {

            console.error(error);

            return res.json({

                success: false,

                mensaje: error.message

            });

        }

        const { data } = supabase.storage

            .from("miembros")

            .getPublicUrl(nombreArchivo);

        res.json({

            success: true,

            url: data.publicUrl

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            mensaje: err.message

        });

    }

});

module.exports = router;