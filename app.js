const output = document.getElementById('output');
const input = document.getElementById('user-input');

// Función para imprimir en pantalla
function print(text, type = 'default') {
  const p = document.createElement('p');
  p.textContent = `> ${text}`;
  if (type === 'system') p.style.fontWeight = 'bold';
  output.appendChild(p);
  output.scrollTop = output.scrollHeight;
}

// Manejador de comandos
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = input.value.toLowerCase().trim();
    print(cmd, 'user');
    processCommand(cmd);
    input.value = '';
  }
});

function processCommand(cmd) {
  if (cmd === 'help') {
    print('Comandos disponibles: help, status, clear, deploy');
  } else if (cmd === 'status') {
    print('Sistema: ONLINE | Agentes: 0 | Inferencia: LOCAL_READY', 'system');
  } else if (cmd === 'clear') {
    output.innerHTML = '';
  } else if (cmd === 'deploy') {
    print('Iniciando despliegue de agente alfa...', 'system');
    setTimeout(() => print('Error: No se ha configurado un modelo de IA aún.'), 1000);
  } else {
    print('Comando no reconocido. Escribe "help".');
  }
}

// Mensaje de inicio
window.onload = () => {
  print('CORE-HUD RED v1.0.0 cargado.', 'system');
  print('Bienvenido, Mensajero. Escribe "help" para comenzar.');
};
