// Lista de palabras
const palabras = ["pirlo","palmer","luis miguel","jerusalen","azmqn","hijole"];
let palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];

let intentosRestantes = 6;
let palabraMostrada = Array(palabraSeleccionada.length).fill('_');
let letrasUsadas = [];

document.querySelector('.word').textContent = palabraMostrada.join(' ');

document.getElementById('intentos').textContent = intentosRestantes;

// Función para actualizar el estado del juego
function actualizarJuego(letra) {
    let acierto = false;

    // Revisar si la letra está en la palabra
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

    // Actualizar la interfaz
    document.querySelector('.word').textContent = palabraMostrada.join(' ');
    document.getElementById('intentos').textContent = intentosRestantes;
}

// Verificar si ganó o perdió
function verificarFinDelJuego() {
    if (!palabraMostrada.includes('_')) {
        const img = document.createElement('img');  
        img.src = "https://imgs.search.brave.com/BNq2-zWp2fnGB4D664PCXbqumEFCCtitvukwcn7oba4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaW5kZXBlbmRl/bnQuY28udWsvMjAy/NC8wMS8xMy8xNC9u/ZXdGaWxlLTUuanBn";  
        img.alt = 'win'; 
        document.getElementById('imagen').appendChild(img)
        document.querySelector('.message').textContent = '¡Ganaste!';
        document.getElementById('submit').disabled = true;
    } else if (intentosRestantes === 0) {
        document.querySelector('.message').textContent = `Perdiste. La palabra era: ${palabraSeleccionada}`;
        document.getElementById('submit').disabled = true;
    }
}

// Evento de adivinar
document.getElementById('submit').addEventListener('click', () => {
    const input = document.getElementById('texto');
    const letra = input.value.toLowerCase();

    if (letra && !letrasUsadas.includes(letra)) {
        letrasUsadas.push(letra);
        actualizarJuego(letra);
        console.log(letrasUsadas)
        verificarFinDelJuego();
    } else {
        document.querySelector('.message').textContent = 'Letra inválida o ya utilizada';
    }

    // Limpiar el input
    input.value = '';
    input.focus();
});

window.addEventListener('load', () => {
    const imagen = document.getElementById('imagen');
    if (imagen) {
        imagen.innerHTML = ''; 
    }
});