const palabras = ["pirlo", "palmer", "luis miguel", "jerusalen", "cafe", "hijole", "arepas", "estefania", "magno", "diogenes", "jesus", "messi", "merequetengue"];
let palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];

let intentosRestantes = 6;
let palabraMostrada = Array(palabraSeleccionada.length).fill('_');
let letrasUsadas = [];

document.querySelector('.word').textContent = palabraMostrada.join(' ');
document.getElementById('intentos').textContent = intentosRestantes;

// acutalizar el juego
function actualizarJuego(letra) {
  let acierto = false;

  // isertar palabra
  for (let i = 0; i < palabraSeleccionada.length; i++) {
    if (palabraSeleccionada[i] === letra) {
      palabraMostrada[i] = letra;
      acierto = true;
    }
  }

  // Si la letra no está en la palabra
  if (!acierto) {
    intentosRestantes--;
  }

  // Actualizar la texto
  document.querySelector('.word').textContent = palabraMostrada.join(' ');
  document.getElementById('intentos').textContent = intentosRestantes;
}

// verificar si ganó o nel
function verificarFinDelJuego() {
  if (!palabraMostrada.includes('_')) {
    const imagenUrl = "https://i.pinimg.com/564x/bc/17/f1/bc17f18b731258394538b18df123c133.jpg";
    agregarImg(imagenUrl, "¡Ganaste!");
    document.querySelector('.message').textContent = '¡Ganaste!';
    document.getElementById('submit').disabled = true;
  } else if (intentosRestantes === 0) {
    const imagenUrl = "https://i.pinimg.com/564x/d7/7f/be/d77fbe9d6d0993134f52572064565ef9.jpg";
    agregarImg(imagenUrl, "Perdiste");
    document.querySelector('.message').textContent = `Perdiste. La palabra era: ${palabraSeleccionada}`;
    document.getElementById('submit').disabled = true;
  }
}

// Función para agregar la imagen
function agregarImg(im, text) {
  const img = document.createElement('img');
  img.src = im;
  img.alt = text;
  document.getElementById('imagen').appendChild(img);
}


//ejecutar el juego :v
document.getElementById('submit').addEventListener('click', manejarEnvioLetra);
document.getElementById('texto').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    manejarEnvioLetra();
  }
});

// envio de la letra
function manejarEnvioLetra() {
  const input = document.getElementById('texto');
  const letra = input.value.toLowerCase();

  if (letra && !letrasUsadas.includes(letra)) {
    letrasUsadas.push(letra);
    actualizarJuego(letra);
    verificarFinDelJuego();
  } else {
    document.querySelector('.message').textContent = 'Letra inválida o ya utilizada';
  }

  // Limpiar el input
  input.value = '';
  input.focus();
}

// Limpiar imágenes al cargar
window.addEventListener('load', () => {
  const imagen = document.getElementById('imagen');
  if (imagen) {
    imagen.innerHTML = '';
  }
});