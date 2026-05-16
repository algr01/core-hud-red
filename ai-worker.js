self.onmessage = function(e) {
  const { command, payload } = e.data;

  if (command === 'PROCESS_TASK') {
    self.postMessage({ type: 'log', data: 'Escaneando intención del comando...' });
    
    setTimeout(() => {
      const response = analyzeIntent(payload);
      self.postMessage({ type: 'result', data: response });
    }, 1200);
  }
};

function analyzeIntent(input) {
  const text = input.toLowerCase();
  
  // Matriz de Intenciones
  const intents = [
    { keywords: ['quien', 'eres'], res: "Soy la interfaz de red del CORE-HUD. Tu extensión digital." },
    { keywords: ['sistema', 'info'], res: "Kernel: WebKit/Blink | Memoria: LocalDB activa | Estado: Estable." },
    { keywords: ['hacker', 'seguridad', 'red'], res: "Protocolos de auditoría listos. No detecto intrusiones externas." },
    { keywords: ['borrar', 'limpiar'], res: "Usa el comando 'clear' para limpiar la interfaz visual." }
  ];

  for (let intent of intents) {
    if (intent.keywords.some(k => text.includes(k))) return intent.res;
  }

  return `Procesando: "${input}". Sin coincidencias en base local. ¿Deseas registrar este patrón?`;
}
