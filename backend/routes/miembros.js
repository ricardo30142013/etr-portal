const express = require("express");
const supabase = require("../supabase");

const router = express.Router();

/* =====================================================
   LISTAR TODOS LOS MIEMBROS
===================================================== */

router.get("/", async (req, res) => {

    try{

        const { data, error } = await supabase

            .from("miembros")

            .select("*")

            .order("apellidos",{ascending:true});

        if(error){

            console.error(error);

            return res.status(500).json({

                success:false,

                mensaje:error.message

            });

        }

        res.json(data);

    }catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            mensaje:"Error interno del servidor."

        });

    }

});

/* =====================================================
   TOTAL DE MIEMBROS
===================================================== */

router.get("/total/registros", async (req,res)=>{

    try{

        const { count, error } = await supabase

            .from("miembros")

            .select("*",{

                count:"exact",

                head:true

            });

        if(error){

            console.error(error);

            return res.status(500).json({

                success:false,

                mensaje:error.message

            });

        }

        res.json({

            total:count

        });

    }catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            mensaje:"Error interno del servidor."

        });

    }

});

/* =====================================================
   OBTENER MIEMBRO POR ID
===================================================== */

router.get("/:id", async (req,res)=>{

    try{

        const { data, error } = await supabase

            .from("miembros")

            .select("*")

            .eq("id",req.params.id)

            .single();

        if(error){

            console.error(error);

            return res.status(500).json({

                success:false,

                mensaje:error.message

            });

        }

        res.json(data);

    }catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            mensaje:"Error interno del servidor."

        });

    }

});

/* =====================================================
   REGISTRAR NUEVO MIEMBRO
===================================================== */

router.post("/", async (req,res)=>{

    try{

        const{

            nombres,
            apellidos,
            cedula,
            telefono,
            correo,
            direccion,

            nacionalidad,
            estado_civil,

            fecha_nacimiento,

            sexo,
            tipo_sangre,

            rango,
            unidad,
            cargo,
            fecha_ingreso,

            estado,

            contacto_emergencia,
            telefono_emergencia,
            parentesco,
            ocupacion,

            seguro_medico,
            afiliacion,
            alergias,
            enfermedades,
            medicamentos,
            licencia_conducir,

            observaciones,

            foto

        } = req.body;

        if(!nombres || !apellidos || !cedula){

            return res.json({

                success:false,

                mensaje:"Complete los campos obligatorios."

            });

        }

        const fechaNacimiento = fecha_nacimiento || null;
        const fechaIngreso = fecha_ingreso || null;

        const { data: existe } = await supabase

            .from("miembros")

            .select("id")

            .eq("cedula",cedula)

            .maybeSingle();

        if(existe){

            return res.json({

                success:false,

                mensaje:"Ya existe un miembro con esa cédula."

            });

        }

        const { error } = await supabase

            .from("miembros")

            .insert([{

                nombres,
                apellidos,
                cedula,
                telefono,
                correo,
                direccion,

                nacionalidad,
                estado_civil,

                fecha_nacimiento: fechaNacimiento,

                sexo,
                tipo_sangre,

                rango,
                unidad,
                cargo,
                fecha_ingreso: fechaIngreso,

                estado: estado || "ACTIVO",

                contacto_emergencia,
                telefono_emergencia,
                parentesco,
                ocupacion,

                seguro_medico,
                afiliacion,
                alergias,
                enfermedades,
                medicamentos,
                licencia_conducir,

                observaciones,

                foto

            }]);

        if(error){

            console.error(error);

            return res.json({

                success:false,

                mensaje:error.message

            });

        }

        res.json({

            success:true,

            mensaje:"Miembro registrado correctamente."

        });

    }catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            mensaje:"Error interno del servidor."

        });

    }

});

/* =====================================================
   ACTUALIZAR MIEMBRO
===================================================== */

router.put("/:id", async (req,res)=>{

    const fechaNacimiento = fecha_nacimiento || null;
    const fechaIngreso = fecha_ingreso || null;
    try{

        const{

            nombres,
            apellidos,
            cedula,
            telefono,
            correo,
            direccion,

            nacionalidad,
            estado_civil,

            fecha_nacimiento: fechaNacimiento,

            sexo,
            tipo_sangre,

            rango,
            unidad,
            cargo,
            fecha_ingreso,

            estado,

            contacto_emergencia,
            telefono_emergencia,
            parentesco,
            ocupacion,

            seguro_medico,
            afiliacion,
            alergias,
            enfermedades,
            medicamentos,
            licencia_conducir,

            observaciones,

            foto

        } = req.body;

        const { error } = await supabase

            .from("miembros")

            .update({

                nombres,
                apellidos,
                cedula,
                telefono,
                correo,
                direccion,

                nacionalidad,
                estado_civil,

                fecha_nacimiento: fechaNacimiento,

                sexo,
                tipo_sangre,

                rango,
                unidad,
                cargo,
                fecha_ingreso: fechaIngreso,

                estado,

                contacto_emergencia,
                telefono_emergencia,
                parentesco,
                ocupacion,

                seguro_medico,
                afiliacion,
                alergias,
                enfermedades,
                medicamentos,
                licencia_conducir,

                observaciones,

                foto

            })

            .eq("id",req.params.id);

        if(error){

            console.error(error);

            return res.json({

                success:false,

                mensaje:error.message

            });

        }

        res.json({

            success:true,

            mensaje:"Miembro actualizado correctamente."

        });

    }catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            mensaje:"Error interno del servidor."

        });

    }

});

/* =====================================================
   ELIMINAR MIEMBRO
===================================================== */

router.delete("/:id", async (req,res)=>{

    try{

        const { error } = await supabase

            .from("miembros")

            .delete()

            .eq("id",req.params.id);

        if(error){

            console.error(error);

            return res.status(500).json({

                success:false,

                mensaje:error.message

            });

        }

        res.json({

            success:true,

            mensaje:"Miembro eliminado correctamente."

        });

    }catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            mensaje:"Error interno del servidor."

        });

    }

});

/* =====================================================
   EXPORTAR ROUTER
===================================================== */

module.exports = router;