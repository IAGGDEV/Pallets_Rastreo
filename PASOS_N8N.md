# 🚀 PASOS PARA ACTIVAR EL WEBHOOK EN N8N

## ⚠️ PROBLEMA ACTUAL:
El webhook responde pero el workflow no está activado o configurado.

**Error actual**: `Workflow could not be started!`

---

## ✅ SOLUCIÓN RÁPIDA (Si ya tienes el workflow):

1. **Abre n8n**: https://devwebhook.palletsy.com
2. **Busca tu workflow** de rastreo
3. **Actívalo**: Clic en el toggle "Active" (arriba derecha)
4. **Guarda los cambios**: Ctrl + S
5. **Prueba de nuevo** desde la app

---

## 📋 CREAR WORKFLOW DESDE CERO (Paso a Paso):

### PASO 1: Crear Nuevo Workflow

1. En n8n, clic en **"New Workflow"**
2. Nombre: `Pallets Premium - Rastreo`

---

### PASO 2: Agregar Webhook (Trigger)

1. **Clic en "+"** para agregar nodo
2. Busca: **"Webhook"**
3. Configura:
   - HTTP Method: `POST`
   - Path: `palletsrastreo`
   - Response Mode: `Using 'Respond to Webhook' Node`

4. **Copia la URL del webhook** (debe ser la misma que ya tienes)

---

### PASO 3: Agregar Google Sheets

1. **Clic en "+"** después del Webhook
2. Busca: **"Google Sheets"**
3. Configura:
   - Operation: `Lookup`
   - Document: `[Selecciona tu hoja]`
   - Sheet: `Hoja1` (o el nombre que uses)
   - Lookup Column: `trackingNumber`
   - Lookup Value: `{{ $json.body.trackingNumber }}`

4. **Autoriza Google Sheets** si es primera vez

---

### PASO 4: Agregar IF (Validación)

1. **Clic en "+"** después de Google Sheets
2. Busca: **"IF"**
3. Configura:
   - Condition Type: `String`
   - Value 1: `{{ $json.trackingNumber }}`
   - Operation: `is not empty`

---

### PASO 5: Formatear Respuesta Exitosa (TRUE)

1. **Clic en "+"** en la salida TRUE del IF
2. Busca: **"Code"** o **"Function"**
3. Pega este código:

```javascript
const statusHistory = JSON.parse($input.item.json.statusHistory || '[]');

return {
  json: {
    success: true,
    data: {
      trackingNumber: $input.item.json.trackingNumber,
      currentStatus: $input.item.json.currentStatus,
      customerName: $input.item.json.customerName,
      lastUpdate: $input.item.json.lastUpdate,
      estimatedDelivery: $input.item.json.estimatedDelivery,
      statusHistory: statusHistory,
      externalTrackingLink: $input.item.json.externalLink || null
    }
  }
};
```

---

### PASO 6: Formatear Respuesta Error (FALSE)

1. **Clic en "+"** en la salida FALSE del IF
2. Busca: **"Code"** o **"Function"**
3. Pega este código:

```javascript
return {
  json: {
    success: false,
    error: 'No encontrado',
    message: 'No se encontró el número de rastreo. Verifica que esté correcto.'
  }
};
```

---

### PASO 7: Respond to Webhook

1. **Conecta AMBOS** nodos (éxito y error) a un nuevo nodo
2. Busca: **"Respond to Webhook"**
3. Configura:
   - Respond With: `JSON`
   - No cambies nada más

---

### PASO 8: ACTIVAR EL WORKFLOW

1. **Clic en el toggle "Inactive"** (arriba derecha)
2. Debe cambiar a **"Active"** (verde)
3. **Guarda**: Ctrl + S o botón "Save"

---

## ✅ VERIFICAR QUE FUNCIONA

### Opción 1: Desde n8n
1. En el nodo Webhook, clic en **"Listen for Test Event"**
2. Ejecuta la prueba desde la app
3. Deberías ver los datos llegar

### Opción 2: Con cURL
```bash
curl -X POST https://devwebhook.palletsy.com/webhook/palletsrastreo \
  -H "Content-Type: application/json" \
  -d '{"trackingNumber":"PP-12345"}'
```

### Opción 3: Desde la App React
1. Abre http://localhost:5173
2. Escribe "PP-12345"
3. Clic en "Rastrear"
4. Deberías ver el resultado

---

## 📊 ESTRUCTURA DE GOOGLE SHEETS NECESARIA:

Tu hoja debe tener estas columnas (en orden):

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| trackingNumber | currentStatus | lastUpdate | customerName | statusHistory | estimatedDelivery | externalLink | notes |

### Ejemplo de fila:

```
A: PP-12345
B: En tránsito
C: 2024-11-14T10:00:00Z
D: Juan Pérez
E: [{"status":"Pedido recibido","date":"2024-11-10T09:00:00Z","location":"Los Ángeles, CA","note":"Paquete recolectado"}]
F: 2024-11-20T00:00:00Z
G: https://paqueteria.com/track/12345
H: OK
```

**IMPORTANTE**: La columna E (statusHistory) DEBE ser un JSON válido.

---

## 🆘 PROBLEMAS COMUNES:

### Error: "Workflow could not be started"
✅ **Solución**: Activa el workflow (toggle verde)

### Error: "Google Sheets not found"
✅ **Solución**: Reautoriza Google Sheets en n8n

### Error: "Invalid JSON"
✅ **Solución**: Verifica que statusHistory sea JSON válido

### Error: "Column not found"
✅ **Solución**: Verifica nombres exactos de columnas

---

## 📞 SIGUIENTE PASO:

1. ✅ Sigue estos pasos en n8n
2. ✅ Activa el workflow
3. ✅ Ejecuta: `node test-webhook.js`
4. ✅ Deberías ver respuesta exitosa

**Avísame cuando lo tengas activado para probarlo juntos.** 🚀

