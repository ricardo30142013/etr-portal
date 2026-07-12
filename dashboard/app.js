const contenido = document.getElementById("contenidoPrincipal");

document.getElementById("usuario").innerHTML =
"Bienvenido Ricardo Rodríguez";

document.getElementById("cerrar").onclick = function(){

    window.location="../login.html";

};

const menu = document.querySelectorAll(".sidebar ul li");

menu[0].onclick = mostrarInicio;
menu[1].onclick = mostrarMiembros;

function mostrarInicio(){

contenido.innerHTML=`

<h2>Portal Administrativo ETR</h2>

<p>

Bienvenido al sistema administrativo del Equipo Táctico de Rescate La Vega.

</p>

`;

}

async function mostrarMiembros(){

    const respuesta = await fetch("/api/miembros");

    const miembros = await respuesta.json();

    let filas="";

    if(miembros.length===0){

        filas=`

        <tr>

            <td colspan="6"
            style="text-align:center;padding:40px;">

                No hay miembros registrados.

            </td>

        </tr>

        `;

    }else{

        miembros.forEach(m=>{

            filas+=`

            <tr>

                <td>📷</td>

                <td>${m.nombres} ${m.apellidos}</td>

                <td>${m.rango || "-"}</td>

                <td>---</td>

                <td>${m.estado}</td>

                <td>


                   <button class="btn-editar" data-id="${m.id}">✏️</button>

                   <button class="btn-eliminar" data-id="${m.id}">🗑️</button>

                

                </td>

            </tr>

            `;

        });

    }

    contenido.innerHTML=`

<div class="cabecera">

<h2>Miembros</h2>

<button id="nuevoMiembro">

➕ Nuevo Miembro

</button>

</div>

<div class="buscador">

<input
type="text"
placeholder="Buscar miembro...">

</div>

<table>

<thead>

<tr>

<th>Foto</th>

<th>Nombre</th>

<th>Rango</th>

<th>Unidad</th>

<th>Estado</th>

<th>Acciones</th>

</tr>

</thead>

<tbody>

${filas}

</tbody>

</table>

`;

}

document.addEventListener("click", function(e){

    if(e.target.id==="nuevoMiembro"){

        abrirModalMiembro();

    }

});

function abrirModalMiembro(){

    const modal = document.createElement("div");

    modal.className="modal";

    modal.innerHTML=`

    <div class="modal-contenido">

        <h2>Nuevo Miembro</h2>

        <div class="form-grid">

            <input id="nombre" placeholder="Nombre">

            <input id="apellidos" placeholder="Apellidos">

            <input id="cedula" placeholder="Cédula">

            <input id="telefono" placeholder="Teléfono">

            <input type="date" id="fecha_nacimiento">

            <input id="direccion" placeholder="Dirección">

        </div>

        <div class="acciones-modal">

            <button id="cerrarModal">

                Cancelar

            </button>

            <button id="guardarMiembro">

                Guardar

            </button>

        </div>

    </div>

    `;

    document.body.appendChild(modal);

}

document.addEventListener("click", function(e){

    if(e.target.id==="cerrarModal"){

        document.querySelector(".modal").remove();

    }

});

document.addEventListener("click", async function(e){

    if(e.target.id==="guardarMiembro"){

            const id = e.target.dataset.id;    
        
            const datos = {

            nombres: document.getElementById("nombre").value.trim(),

            apellidos: document.getElementById("apellidos").value.trim(),

            cedula: document.getElementById("cedula").value.trim(),

            telefono: document.getElementById("telefono").value.trim(),

            fecha_nacimiento: document.getElementById("fecha_nacimiento").value

        };

        if(
            !datos.nombres ||
            !datos.apellidos ||
            !datos.cedula
        ){

            alert("Complete los campos obligatorios.");

            return;

        }

        const respuesta = await fetch(
           id ? `/api/miembros/${id}` : "/api/miembros",
           {
           method: id ? "PUT" : "POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(datos)

        }
    );

        const resultado = await respuesta.json();

        if(resultado.success){

            alert("Miembro registrado correctamente.");

            document.querySelector(".modal").remove();

            mostrarMiembros();

        }else{

            alert(resultado.mensaje);

        }

    }

});

// EDITAR MIEMBRO
document.addEventListener("click", async function(e){

    if(!e.target.classList.contains("btn-editar")) return;

    const id = e.target.dataset.id;

    const respuesta = await fetch(`/api/miembros/${id}`);

    const miembro = await respuesta.json();

    abrirModalMiembro();

    document.getElementById("nombre").value = miembro.nombres || "";
    document.getElementById("apellidos").value = miembro.apellidos || "";
    document.getElementById("cedula").value = miembro.cedula || "";
    document.getElementById("telefono").value = miembro.telefono || "";
    document.getElementById("fecha_nacimiento").value =
        miembro.fecha_nacimiento || "";

    const boton = document.getElementById("guardarMiembro");

    boton.dataset.id = id;

    boton.textContent = "Guardar cambios";

});

async function cargarDashboard() {

    const respuesta = await fetch("/api/miembros/total/registros");

    const datos = await respuesta.json();

    document.getElementById("totalMiembros").textContent = datos.total;

}

// Iniciar Dashboard
mostrarInicio();
cargarDashboard();

// ELIMINAR MIEMBRO
document.addEventListener("click", async function(e){

    if(!e.target.classList.contains("btn-eliminar")) return;

    const id = e.target.dataset.id;

    const confirmar = confirm("¿Desea eliminar este miembro?");

    if(!confirmar) return;

    const respuesta = await fetch(`/api/miembros/${id}`,{

        method:"DELETE"

    });

    const resultado = await respuesta.json();

    if(resultado.success){

        mostrarMiembros();

        cargarDashboard();

        alert("Miembro eliminado correctamente.");

    }else{

        alert(resultado.mensaje);

    }

});