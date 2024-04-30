let ultimoDatoAnterior = null; 
var cortinasAbiertas = false;

// Llamar a recibirDatos una vez al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    recibirPrimerosDatos();
});


async function recibirPrimerosDatos() {
    try {
        const opciones = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const url = 'https://6630830dc92f351c03da0ee6.mockapi.io/examen';
        const response = await fetch(url, opciones);

        if (!response.ok) {
            throw new Error('Error en la solicitud GET a la URL');
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);
        datosRecibidos = data;

        // Ejecutar la acción según el valor de focoRecamara
        if (data.focoRecamara === "0") {
            document.getElementById('focoRecamara').src = 'Imagenes/FocoOffC.png';
        } else if (data.focoRecamara === "1") {
            document.getElementById('focoRecamara').src = 'Imagenes/FocoOnC.png';
        }
        if (data.focoSala === "0") {
            document.getElementById('focoSala').src = 'Imagenes/FocoOffS.png';
        } else if (data.focoSala === "1") {
            document.getElementById('focoSala').src = 'Imagenes/FocoOnS.png';
        }

        if (data.focoJardin === "0") {
            var elementos = document.getElementsByClassName('focoJardin');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'Imagenes/FocoOffJ.png';
            }
        } else if (data.focoJardin === "1") {
            var elementos = document.getElementsByClassName('focoJardin');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'Imagenes/FocoOnJ.png';
            }
        }

        if (data.ventilador === "0") {
            var imagen = document.getElementById('ventilador');
            imagen.src = 'Imagenes/VenOff.png';
        } else if (data.ventilador === "1") {
            var imagen = document.getElementById('ventilador');
            imagen.src = 'Imagenes/venOn.gif';
        }

        if (data.cortinas === "0") {
            cortinasAbiertas = false;
            var elementos = document.getElementsByClassName('cortinas');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'Imagenes/Cortina_cerrada.png';
            }
        } else if (data.cortinas === "1") {
            cortinasAbiertas = true;
            var elementos = document.getElementsByClassName('cortinas');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'Imagenes/Cortina_abierta.png';
            }

        }

        if (data.alarma === "0") {
            document.getElementById('alarma').src = 'Imagenes/alarmaApagada.png';
        } else if (data.alarma === "1") {
            document.getElementById('alarma').src = 'Imagnes/alarmaEncendida.png';
        }

        if (data.camaras === "0") {
            var elementos = document.getElementsByClassName('camaras');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'Imagenes/camaraOff.png';
            }
        } else if (data.camaras === "1") {
            var elementos = document.getElementsByClassName('camaras');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'Imagenes/camaraOn.png';
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


setInterval(recibirDatos, 2000);

async function recibirDatos() {
    try {
        // Opciones de la solicitud
        const opciones = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const url = 'https://6630830dc92f351c03da0ee6.mockapi.io/examen';
        // Recibir los datos de la URL proporcionada
        const response = await fetch(url, opciones);

        if (!response.ok) {
            throw new Error('Error en la solicitud GET a la URL');
        }

        const data = await response.json();
        console.log('Datos:', Dato);
        // Arreglo
        datosRecibidos = data;
        // Último dígito del arreglo
        const UltimoDato = datosRecibidos.pop();
        console.log('Último dato:', UltimoDato);

        // Verifica si el último dato ha cambiado
        if (!esIgual(UltimoDato, ultimoDatoAnterior)) {
            // Sustitución en los párrafos
      
           
            manejarAccion(UltimoDato.orden);
            ultimoDatoAnterior = UltimoDato;
        }

        
        

    } catch (error) {
        console.error('Error:', error);
    }
}

function esIgual(objA, objB) {
    return JSON.stringify(objA) === JSON.stringify(objB);
}

function manejarAccion(ultimoDato) {
    //switch (ultimoDato.instruccion.toLowerCase()) {
    switch (ultimoDato) {
        case 'enciende la luz de la recámara':
            document.getElementById('focoRecamara').src = "Imagenes\FocoOnC.png";
            break;
        case 'apaga la luz de la recámara':
            document.getElementById('focoRecamara').src = 'Imagenes\FocoOffC.png';
            break;
        case 'enciende la luz de la sala':
            document.getElementById('focoSala').src = "Imagen\FocoOnS.png";
            break;
        case 'apaga la luz de la sala':
            document.getElementById('focoSala').src = 'Imagenes\FocoOffS.png';
            break;
        case 'enciende las luces del jardín':
            var elementos = document.getElementsByClassName('focoJardin');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'Imagenes/focoOnJ.png';
            }
            break;
        case 'apaga las luces del jardín':
            var elementos = document.getElementsByClassName('focoJardin');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'Imagnes\FocoOffJpng';
            }
            break;
        case 'enciende el ventilador':
            var imagen = document.getElementById('ventilador');
            imagen.src = 'Imagenes/VenON.gif';

            break;
        case 'apaga el ventilador':
            var imagen = document.getElementById('ventilador');
            imagen.src = 'Imagenes\VenOff.png';
            break;
        case 'abre las cortinas':
            if (!cortinasAbiertas){
                cambiarImagenCortinas();
                cortinasAbiertas = true;
            }
            break;
        case 'cierra las cortinas':
            if (cortinasAbiertas){
                cortinasAbiertas = false;
                cierraImagenCortinas();
            }
            break;
        case 'enciende las cámaras de seguridad':
            var elementos = document.getElementsByClassName('camaras');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'Imagenes/camaraOn.png';
            }
            break;
        case 'apaga las cámaras de seguridad':
            var elementos = document.getElementsByClassName('camaras');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = "Imagenes\camaraOff.png";
            }
            break;
        case 'enciende la alarma':
            document.getElementById('alarmaEncendida').play();     
            document.getElementById('alarma').src = 'imágenes/alarmaEncendida.png';
            break;
        case 'apaga la alarma':
            document.getElementById('alarma').src = 'imágenes/alarmaApagada.png';
            document.getElementById('sonidoApagado').play(); 
            break;
        default:
            // Instrucción no reconocida
            console.log('Instrucción no reconocida');
    }
}

//var cortinasAbiertas = false;

function cambiarImagenCortinas() {
    // Obtener todas las imágenes de cortinas
    var elementos = document.getElementsByClassName('cortinas');

    // Iterar sobre cada imagen de cortinas
    for (var i = 0; i < elementos.length; i++) {
        // Utilizamos una función de cierre para mantener el contexto de la variable cortina
        (function (cortina) {
            // Verificar si la imagen actual ya ha mostrado el gif de abrirCortinas.gif
            if (!cortinasAbiertas) {
                // Mostrar abrirCortinas.gif si aún no se ha mostrado
                cortina.src = 'Imagenes/Cortina_abierta.gif';

                // Cambiar a la imagen cortinasAbiertas.png después de 1 segundo
                setTimeout(function () {
                    cortina.src = 'Imagenes/Cortina_abierta.png';
                }, 1016); // 1000 milisegundos = 1 segundo
            }
        })(elementos[i]); // Pasamos la imagen actual como argumento a la función de cierre
    }
}



var cortinasCerradas = false;

function cierraImagenCortinas() {
    // Obtener todas las imágenes de cortinas
    var elementos = document.getElementsByClassName('cortinas');

    // Iterar sobre cada imagen de cortinas
    for (var i = 0; i < elementos.length; i++) {
        // Utilizamos una función de cierre para mantener el contexto de la variable cortina
        (function (cortina) {
            // Verificar si la imagen actual ya ha mostrado el gif de abrirCortinas.gif
            if (!cortinasCerradas) {
                // Mostrar abrirCortinas.gif si aún no se ha mostrado
                cortina.src = 'Imagenes/Cortina_abierta.gif';

                // Cambiar a la imagen cortinasAbiertas.png después de 1 segundo
                setTimeout(function () {
                    cortina.src = 'Imagenes/Cortina_abierta.png';
                }, 1016); // 1000 milisegundos = 1 segundo
            }
        })(elementos[i]); // Pasamos la imagen actual como argumento a la función de cierre
    }
}

