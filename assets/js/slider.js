/*=========================================
ETR PORTAL
Slider Hero v1.0
=========================================*/

const slides = document.querySelectorAll(".slide");
const indicadores = document.querySelectorAll(".indicador");
const btnIzquierda = document.querySelector(".flecha.izquierda");
const btnDerecha = document.querySelector(".flecha.derecha");

const informacionSlides = [

{
titulo:"Equipo Táctico de Rescate",
subtitulo:"La Vega · República Dominicana",
descripcion:"Siempre listos para servir a nuestra comunidad."
},

{
titulo:"Rescate Acuático",
subtitulo:"Operaciones Especializadas",
descripcion:"Preparados para responder en ríos, presas e inundaciones."
},

{
titulo:"Entrenamiento",
subtitulo:"Capacitación Continua",
descripcion:"Cada entrenamiento nos prepara para salvar más vidas."
},

{
titulo:"Unidad de Drones",
subtitulo:"Tecnología al Servicio del Rescate",
descripcion:"Reconocimiento aéreo y búsqueda desde el aire."
},

{
titulo:"Unidad K9",
subtitulo:"Búsqueda Especializada",
descripcion:"Nuestros binomios trabajan donde otros no pueden llegar."
},

{
titulo:"Rescate Vertical",
subtitulo:"Operaciones en Altura",
descripcion:"Especialistas en acceso por cuerdas y rescate técnico."
},

{
titulo:"Emergencias",
subtitulo:"Respuesta 24/7",
descripcion:"Siempre preparados para actuar cuando más se necesita."
},

{
titulo:"Compromiso",
subtitulo:"Equipo Táctico de Rescate",
descripcion:"Servimos con disciplina, pasión y profesionalismo."
}

];

let slideActual = 0;
let intervalo;

/*=========================
Mostrar Slide
=========================*/

function mostrarSlide(indice){

    slides.forEach(slide => slide.classList.remove("active"));
    indicadores.forEach(punto => punto.classList.remove("active"));

    slides[indice].classList.add("active");
    indicadores[indice].classList.add("active");

    document.querySelector(".hero-content h1").textContent =
        informacionSlides[indice].titulo;

    document.querySelector(".hero-content h2").textContent =
        informacionSlides[indice].subtitulo;

    document.querySelector(".hero-content p").textContent =
        informacionSlides[indice].descripcion;

    slideActual = indice;

}

/*=========================
Siguiente
=========================*/

function siguienteSlide(){

    slideActual++;

    if(slideActual >= slides.length){

        slideActual = 0;

    }

    mostrarSlide(slideActual);

}

/*=========================
Anterior
=========================*/

function anteriorSlide(){

    slideActual--;

    if(slideActual < 0){

        slideActual = slides.length - 1;

    }

    mostrarSlide(slideActual);

}

/*=========================
Cambio automático
=========================*/

function iniciarSlider(){

    intervalo = setInterval(() =>{

        siguienteSlide();

    },5000);

}

function reiniciarSlider(){

    clearInterval(intervalo);

    iniciarSlider();

}

/*=========================
Botones
=========================*/

btnDerecha.addEventListener("click",()=>{

    siguienteSlide();

    reiniciarSlider();

});

btnIzquierda.addEventListener("click",()=>{

    anteriorSlide();

    reiniciarSlider();

});

/*=========================
Indicadores
=========================*/

indicadores.forEach((punto,indice)=>{

    punto.addEventListener("click",()=>{

        mostrarSlide(indice);

        reiniciarSlider();

    });

});

/*=========================
Iniciar
=========================*/

mostrarSlide(0);

iniciarSlider();