// =====================================================
// CONFIGURACIÓN GENERAL
// =====================================================

const API = "https://etr-backend-99u9.onrender.com/api";

const contenido = document.getElementById("contenidoPrincipal");

const menu = document.querySelectorAll(".sidebar ul li");

function activarMenu(indice){

    menu.forEach(item=>{

        item.classList.remove("activo");

    });

    menu[indice].classList.add("activo");

}

document.getElementById("usuario").textContent =
"Bienvenido Ricardo Rodríguez";

document.getElementById("cerrar").addEventListener("click",()=>{

    window.location.href="/login.html";

});

menu[0].addEventListener("click",()=>{

    activarMenu(0);

    mostrarInicio();

});

menu[1].addEventListener("click",()=>{

    activarMenu(1);

    mostrarMiembros();

});
// =====================================================
// DASHBOARD
// =====================================================

async function cargarDashboard(){

    try{

        const respuesta=await fetch(`${API}/miembros/total/registros`);

        const datos=await respuesta.json();

        document.getElementById("totalMiembros").textContent=datos.total;

    }catch(e){

        console.error(e);

        document.getElementById("totalMiembros").textContent=0;

    }

}

// =====================================================
// PANTALLA PRINCIPAL
// =====================================================

function mostrarInicio(){

    activarMenu(0);

contenido.innerHTML=`

<div class="modulo">

<h2>

Panel Administrativo

</h2>

<p>

Bienvenido al Portal Administrativo del Equipo Táctico de Rescate.

Desde este sistema podrá administrar los miembros,
consultar información y mantener actualizado el portal institucional.

</p>

</div>

`;

}

// =====================================================
// LISTAR MIEMBROS
// =====================================================

async function mostrarMiembros(){

activarMenu(1);

try{

const respuesta=await fetch(`${API}/miembros`);

const miembros=await respuesta.json();

let filas="";

if(miembros.length===0){

filas=`

<tr>

<td colspan="6" style="padding:40px;text-align:center;">

No existen miembros registrados.

</td>

</tr>

`;

}else{

miembros.forEach(m=>{

filas+=`

<tr>

<td>

<img
src="${m.foto || '../assets/img/dddss.png'}"
style="
width:55px;
height:55px;
border-radius:50%;
object-fit:cover;
border:2px solid #ddd;">

</td>

<td>${m.nombres} ${m.apellidos}</td>

<td>${m.rango ?? "-"}</td>

<td>${m.unidad ?? "-"}</td>

<td>${m.estado ?? "ACTIVO"}</td>

<td>

<button class="btn-editar"

data-id="${m.id}">

✏️

</button>

<button class="btn-eliminar"

data-id="${m.id}">

🗑️

</button>

</td>

</tr>

`;

});

}

contenido.innerHTML=`

<div class="cabecera">

<h2>

Gestión de Miembros

</h2>

<button id="nuevoMiembro">

➕

Nuevo Miembro

</button>

</div>

<div class="buscador">

<input
id="buscar"
placeholder="Buscar por nombre, apellido o cédula...">

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

}catch(error){

console.error(error);

alert("No fue posible cargar los miembros.");

}

}

// =====================================================
// INICIAR SISTEMA
// =====================================================

mostrarInicio();

cargarDashboard();

// =====================================================
// MODAL NUEVO MIEMBRO
// =====================================================

document.addEventListener("click",function(e){

    if(e.target.id==="nuevoMiembro"){

        abrirModalMiembro();

    }

    if(e.target.id==="cerrarModal"){

        document.querySelector(".modal").remove();

    }

});

function abrirModalMiembro(){

    const modal=document.createElement("div");

    modal.className="modal";

    modal.innerHTML=`

<div class="modal-contenido" style="width:1100px;max-height:92vh;overflow:auto;">

<h2>Registro de Miembro</h2>

<hr>

<div style="text-align:center;margin-bottom:25px;">

<label for="fotoMiembro">

<img
id="previewFoto"
src="../assets/img/dddss.png"
style="width:160px;
height:160px;
border-radius:50%;
object-fit:cover;
border:5px solid #ddd;
cursor:pointer;">

</label>

<input
type="file"
id="fotoMiembro"
accept="image/*"
style="display:none;">

</div>

<h3>Información Personal</h3>

<div class="form-grid">

<input id="nombre" placeholder="Nombres">

<input id="apellidos" placeholder="Apellidos">

<input id="cedula" placeholder="Cédula">

<input type="date" id="fecha_nacimiento">

<select id="sexo">

<option value="">Sexo</option>

<option>Masculino</option>

<option>Femenino</option>

</select>

<select id="tipo_sangre">

<option value="">Tipo de sangre</option>

<option>O+</option>
<option>O-</option>
<option>A+</option>
<option>A-</option>
<option>B+</option>
<option>B-</option>
<option>AB+</option>
<option>AB-</option>

</select>

<input id="telefono" placeholder="Teléfono">

<input id="correo" placeholder="Correo electrónico">

<input id="nacionalidad" placeholder="Nacionalidad">

<input id="estado_civil" placeholder="Estado civil">

</div>

<textarea
id="direccion"
placeholder="Dirección"
style="width:100%;height:90px;margin-top:15px;"></textarea>

<hr>

<h3>Información Institucional</h3>

<div class="form-grid">

<select id="rango">

<option value="">Seleccione rango</option>

<option>Comandante</option>
<option>Subcomandante</option>
<option>Mayor</option>
<option>Capitán</option>
<option>Teniente</option>
<option>Sargento</option>
<option>Cabo</option>
<option>Rescatista</option>
<option>Paramédico</option>
<option>Voluntario</option>

</select>

<select id="unidad">

<option value="">Seleccione unidad</option>

<option>Búsqueda y Rescate</option>
<option>Rescate Vertical</option>
<option>Rescate Acuático</option>
<option>Paramédicos</option>
<option>Operaciones</option>
<option>Logística</option>
<option>Comunicaciones</option>
<option>Administración</option>

</select>

<input id="cargo" placeholder="Cargo">

<input type="date" id="fecha_ingreso">

<select id="estado">

<option>ACTIVO</option>

<option>INACTIVO</option>

<option>SUSPENDIDO</option>

<option>PERMISO</option>

</select>

</div>

<hr>

<h3>Contacto de Emergencia</h3>

<div class="form-grid">

    <input
        id="contacto_emergencia"
        placeholder="Nombre del contacto">

    <input
        id="telefono_emergencia"
        placeholder="Teléfono de emergencia">

    <input
        id="parentesco"
        placeholder="Parentesco">

    <input
        id="ocupacion"
        placeholder="Ocupación">

</div>

<hr>

<h3>Información Médica</h3>

<div class="form-grid">

    <input
        id="seguro_medico"
        placeholder="Seguro médico">

    <input
        id="afiliacion"
        placeholder="Número de afiliación">

    <input
        id="alergias"
        placeholder="Alergias">

    <input
        id="enfermedades"
        placeholder="Enfermedades">

    <input
        id="medicamentos"
        placeholder="Medicamentos">

    <input
        id="licencia_conducir"
        placeholder="Licencia de conducir">

</div>

<hr>

<h3>Observaciones</h3>

<textarea

id="observaciones"

placeholder="Observaciones"

style="width:100%;
height:140px;">

</textarea>

<br><br>

<div
style="display:flex;
justify-content:flex-end;
gap:15px;">

<button
id="cerrarModal"
style="
padding:12px 30px;
background:#777;
color:white;
border:none;
border-radius:8px;
cursor:pointer;">

Cancelar

</button>

<button
id="guardarMiembro"
style="
padding:12px 30px;
background:#c60000;
color:white;
border:none;
border-radius:8px;
cursor:pointer;">

Guardar Miembro

</button>

</div>

</div>

`;
    

    document.body.appendChild(modal);

}

// =====================================================
// GUARDAR MIEMBRO
// =====================================================

document.addEventListener("click",async function(e){

    if(e.target.id!=="guardarMiembro") return;

    const datos={


    nombres:document.getElementById("nombre").value.trim(),

    apellidos:document.getElementById("apellidos").value.trim(),

    cedula:document.getElementById("cedula").value.trim(),

    fecha_nacimiento:document.getElementById("fecha_nacimiento").value,

    sexo:document.getElementById("sexo").value,

    tipo_sangre:document.getElementById("tipo_sangre").value,

    telefono:document.getElementById("telefono").value.trim(),

    correo:document.getElementById("correo").value.trim(),

    nacionalidad:document.getElementById("nacionalidad").value.trim(),

    estado_civil:document.getElementById("estado_civil").value.trim(),

    direccion:document.getElementById("direccion").value.trim(),

    rango:document.getElementById("rango").value,

    unidad:document.getElementById("unidad").value,

    cargo:document.getElementById("cargo").value.trim(),

    fecha_ingreso:document.getElementById("fecha_ingreso").value,

    estado:document.getElementById("estado").value,

    contacto_emergencia:document.getElementById("contacto_emergencia").value.trim(),

    telefono_emergencia:document.getElementById("telefono_emergencia").value.trim(),

    parentesco:document.getElementById("parentesco").value.trim(),

    ocupacion:document.getElementById("ocupacion").value.trim(),

    seguro_medico:document.getElementById("seguro_medico").value.trim(),

    afiliacion:document.getElementById("afiliacion").value.trim(),

    alergias:document.getElementById("alergias").value.trim(),

    enfermedades:document.getElementById("enfermedades").value.trim(),

    medicamentos:document.getElementById("medicamentos").value.trim(),

    licencia_conducir:document.getElementById("licencia_conducir").value.trim(),

    observaciones:document.getElementById("observaciones").value.trim(),

    foto:document.getElementById("previewFoto").src

};

    if(!datos.nombres || !datos.apellidos || !datos.cedula){

        alert("Complete los campos obligatorios.");

        return;

    }

    try{

        const id = e.target.dataset.id;

const url = id
    ? `${API}/miembros/${id}`
    : `${API}/miembros`;

const metodo = id ? "PUT" : "POST";

const respuesta = await fetch(url,{

    method: metodo,

    headers:{
        "Content-Type":"application/json"
    },

    body:JSON.stringify(datos)

});

        const resultado=await respuesta.json();

        if(resultado.success){

            alert("Miembro registrado correctamente.");

            document.querySelector(".modal").remove();

            cargarDashboard();

            mostrarMiembros();

        }else{

            alert(resultado.mensaje);

        }

    }catch(error){

        console.error(error);

        alert("No fue posible guardar el miembro.");

    }

});

// =====================================================
// EDITAR MIEMBRO
// =====================================================

document.addEventListener("click", async function(e){

    if(!e.target.classList.contains("btn-editar")) return;

    const id = e.target.dataset.id;

    try{

        const respuesta = await fetch(`${API}/miembros/${id}`);

        const miembro = await respuesta.json();

        abrirModalMiembro();

        document.getElementById("nombre").value = miembro.nombres || "";

        document.getElementById("apellidos").value = miembro.apellidos || "";

        document.getElementById("cedula").value = miembro.cedula || "";

        document.getElementById("fecha_nacimiento").value = miembro.fecha_nacimiento || "";

        document.getElementById("telefono").value = miembro.telefono || "";

        document.getElementById("correo").value = miembro.correo || "";

        document.getElementById("rango").value = miembro.rango || "";

        document.getElementById("unidad").value = miembro.unidad || "";

        document.getElementById("estado").value = miembro.estado || "ACTIVO";

        document.getElementById("direccion").value = miembro.direccion || "";

        document.getElementById("sexo").value = miembro.sexo || "";

        document.getElementById("tipo_sangre").value = miembro.tipo_sangre || "";

        document.getElementById("contacto_emergencia").value = miembro.contacto_emergencia || "";

        document.getElementById("telefono_emergencia").value = miembro.telefono_emergencia || "";

        document.getElementById("observaciones").value = miembro.observaciones || "";

        if(miembro.foto){

        document.getElementById("previewFoto").src = miembro.foto;

}

        document.getElementById("guardarMiembro").dataset.id = id;

        document.getElementById("guardarMiembro").textContent = "Guardar Cambios";

    }catch(error){

        console.error(error);

        alert("No fue posible cargar el miembro.");

    }

});

// =====================================================
// BUSCADOR
// =====================================================

document.addEventListener("input",function(e){

    if(e.target.id!=="buscar") return;

    const texto=e.target.value.toLowerCase();

    document.querySelectorAll("tbody tr").forEach(fila=>{

        fila.style.display =
            fila.innerText.toLowerCase().includes(texto)
            ? ""
            : "none";

    });

});

// =====================================================
// ELIMINAR MIEMBRO
// =====================================================

document.addEventListener("click", async function(e){

    if(!e.target.classList.contains("btn-eliminar")) return;

    const id = e.target.dataset.id;

    if(!confirm("¿Desea eliminar este miembro?")) return;

    try{

        const respuesta = await fetch(`${API}/miembros/${id}`,{

            method:"DELETE"

        });

        const resultado = await respuesta.json();

        if(resultado.success){

            alert("Miembro eliminado.");

            cargarDashboard();

            mostrarMiembros();

        }else{

            alert(resultado.mensaje);

        }

    }catch(error){

        console.error(error);

        alert("Error al eliminar.");

    }

});

// =====================================
// PREVISUALIZAR FOTO
// =====================================

document.addEventListener("change",function(e){

    if(e.target.id!=="fotoMiembro") return;

    const archivo=e.target.files[0];

    if(!archivo) return;

    const lector=new FileReader();

    lector.onload=function(evento){

        document.getElementById("previewFoto").src=evento.target.result;

    }

    lector.readAsDataURL(archivo);

});