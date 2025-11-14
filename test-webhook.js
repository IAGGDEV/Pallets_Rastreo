// Script de prueba para el webhook de n8n
const webhookUrl = 'https://devwebhook.palletsy.com/webhook/palletsrastreo';

const testData = {
  trackingNumber: 'PP-12345'
};

console.log('🚀 Probando webhook...');
console.log('📍 URL:', webhookUrl);
console.log('📦 Datos enviados:', JSON.stringify(testData, null, 2));
console.log('\n⏳ Esperando respuesta...\n');

fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData)
})
  .then(response => {
    console.log('📊 Status:', response.status, response.statusText);
    return response.text();
  })
  .then(text => {
    console.log('\n📥 Respuesta recibida:');
    console.log('─────────────────────────────────');
    try {
      const json = JSON.parse(text);
      console.log(JSON.stringify(json, null, 2));
    } catch (e) {
      console.log('⚠️ Respuesta no es JSON válido:');
      console.log(text);
    }
  })
  .catch(error => {
    console.error('\n❌ Error:', error.message);
  });

