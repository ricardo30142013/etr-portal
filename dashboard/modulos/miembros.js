// ======================================================
// MÓDULO DE MIEMBROS
// ======================================================

const API = "https://etr-backend-99u9.onrender.com/api";

const tabla = document.getElementById("tablaMiembros");

const modal = document.getElementById("modalMiembro");

const btnNuevo = document.getElementById("btnNuevoMiembro");

const btnCancelar = document.getElementById("btnCancelar");

const btnGuardar = document.getElementById("btnGuardar");

const buscador = document.getElementById("buscarMiembro");

let miembroEditando = null;

// ======================================================
// CARGAR MIEMBROS
// ======================================================

async function cargarMiembros(){

    try{

        const respuesta = await fetch(`${API}/miembros`);

        const miembros = await respuesta.json();

        tabla.innerHTML = "";

        miembros.forEach(m=>{

            tabla.innerHTML += `

            <tr>

                <td>

                    <img

                    src="${m.foto || '../assets/img/dddss.png'}"

                    style="width:50px;
                    height:50px;
                    border-radius:50%;
                    object-fit:cover;">

                </td>

                <td>${m.nombres} ${m.apellidos}</td>

                <td>${m.cedula}</td>

                <td>${m.rango || "-"}</td>

                <td>${m.unidad || "-"}</td>

                <td>${m.estado}</td>

                <td>

                    <button
                    class="editar"
                    data-id="${m.id}">

                    ✏️

                    </button>

                    <button
                    class="eliminar"
                    data-id="${m.id}">

                    🗑️

                    </button>

                </td>

            </tr>

            `;

        });

    }catch(error){

        console.error(error);

        alert("No fue posible cargar los miembros.");

    }

}

cargarMiembros();

