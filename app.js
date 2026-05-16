const output = document.getElementById('output');
const input = document.getElementById('user-input');
const aiAgent = new Worker('ai-worker.js');

aiAgent.onmessage = (e) => {
  if (e.data.type === 'log') print(e.data.data, 'system');
  else if (e.data.type === 'result') {
    const res = `RESPUESTA AGENTE: ${e.data.data}`;
    print(res, 'system');
    saveLog(res); // Guarda la respuesta del agente
  }
};

function print(text, type = 'default') {
  const p = document.createElement('p');
  p.textContent = `> ${text}`;
  if (type === 'system') p.style.color = '#ff4444';
  output.appendChild(p);
  output.scrollTop = output.scrollHeight;
}

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && input.value.trim() !== '') {
    const val = input.value;
    print(val, 'user');
    saveLog(`USUARIO: ${val}`); // Guarda el comando del usuario
    
    if (val.toLowerCase() === 'history') {
      getLogs((logs) => {
        print('--- HISTORIAL DE MEMORIA ---', 'system');
        logs.forEach(log => print(`[${log.timestamp}] ${log.text}`));
      });
    } else if (val.toLowerCase() === 'clear') {
      output.innerHTML = '';
    } else {
      aiAgent.postMessage({ command: 'PROCESS_TASK', payload: val });
    }
    input.value = '';
  }
});

window.onload = () => {
  print('CORE-HUD RED v1.2.0 (MEMORIA ACTIVA) ONLINE.', 'system');
};
