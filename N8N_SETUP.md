# 📋 Guía de Configuración n8n + Google Sheets

Esta guía te ayudará a configurar el workflow de n8n para conectarlo con Google Sheets y hacer funcional el sistema de rastreo.

---

## 📊 PASO 1: Estructura de Google Sheets

### Crea una hoja con estas columnas:

| Columna A | Columna B | Columna C | Columna D | Columna E | Columna F | Columna G | Columna H |
|-----------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|
| trackingNumber | currentStatus | lastUpdate | customerName | statusHistory | estimatedDelivery | externalLink | notes |

### Ejemplo de datos:

```
trackingNumber: PP-12345
currentStatus: En tránsito
lastUpdate: 2024-11-14T10:00:00Z
customerName: Juan Pérez
statusHistory: [{"status":"Pedido recibido","date":"2024-11-10T09:00:00Z","location":"Los Ángeles, CA","note":"Paquete recolectado"},{"status":"En tránsito a frontera","date":"2024-11-12T14:00:00Z","location":"En camino","note":"Transportando"}]
estimatedDelivery: 2024-11-20T00:00:00Z
externalLink: https://paqueteria.com/track/12345
notes: Todo correcto
```

---

## 🔧 PASO 2: Crear Workflow en n8n

### 1. Nodo Webhook (Trigger)
```
Nombre: Webhook - Rastreo
Método: POST
Ruta: /rastreo-pallets
Responder: Waiting For Webhook Call
```

### 2. Nodo Google Sheets (Buscar)
```
Nombre: Buscar en Google Sheets
Operación: Lookup
Documento: [Tu hoja de Google Sheets]
Hoja: Hoja1
Columna de búsqueda: trackingNumber
Valor de búsqueda: {{ $json.body.trackingNumber }}
```

### 3. Nodo IF (Validar resultado)
```
Nombre: ¿Se encontró?
Condición: {{ $json.trackingNumber }} is not empty
```

### 4. Nodo Function (Formatear respuesta exitosa)
```javascript
// Parsear el historial de estados
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

### 5. Nodo Function (Formatear respuesta error)
```javascript
return {
  json: {
    success: false,
    error: 'No encontrado',
    message: 'No se encontró el número de rastreo. Verifica que esté correcto.'
  }
};
```

### 6. Nodo Respond to Webhook (Respuesta)
```
Nombre: Responder
Conectar desde: Nodo Function (exitosa) Y Nodo Function (error)
```

---

## 🔐 PASO 3: Activar Webhook

1. Activa el workflow en n8n
2. Copia la URL del webhook (aparece en el nodo Webhook)
3. Ejemplo: `https://tu-instancia.app.n8n.cloud/webhook/rastreo-pallets`

---

## ⚙️ PASO 4: Configurar Variable de Entorno

### En desarrollo local:

1. Crea el archivo `.env` en la raíz del proyecto:
```bash
VITE_N8N_WEBHOOK_URL=https://tu-instancia.app.n8n.cloud/webhook/rastreo-pallets
```

2. Reinicia el servidor:
```bash
npm run dev
```

### En Vercel (producción):

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega:
   - Name: `VITE_N8N_WEBHOOK_URL`
   - Value: `https://tu-instancia.app.n8n.cloud/webhook/rastreo-pallets`
4. Redeploy el proyecto

---

## 🧪 PASO 5: Probar

### Prueba con cURL:

```bash
curl -X POST https://tu-instancia.app.n8n.cloud/webhook/rastreo-pallets \
  -H "Content-Type: application/json" \
  -d '{"trackingNumber":"PP-12345"}'
```

### Respuesta esperada:

```json
{
  "success": true,
  "data": {
    "trackingNumber": "PP-12345",
    "currentStatus": "En tránsito",
    "customerName": "Juan Pérez",
    "lastUpdate": "2024-11-14T10:00:00Z",
    "estimatedDelivery": "2024-11-20T00:00:00Z",
    "statusHistory": [
      {
        "status": "Pedido recibido",
        "date": "2024-11-10T09:00:00Z",
        "location": "Los Ángeles, CA",
        "note": "Paquete recolectado"
      }
    ],
    "externalTrackingLink": null
  }
}
```

---

## 🎯 Estados Recomendados

Usa estos estados en tu Google Sheets:

1. **Pedido recibido para recolección**
2. **En tránsito a frontera**
3. **En aduana**
4. **Proceso de importación**
5. **Pasó la frontera**
6. **En tránsito nacional**
7. **Transferido a paquetería local**
8. **En ruta de entrega**
9. **Entregado**

---

## 📝 Notas Importantes

- El `statusHistory` debe ser un JSON válido
- Las fechas deben estar en formato ISO 8601
- El `trackingNumber` debe ser único
- Prueba con datos reales antes de producción

---

¿Necesitas ayuda? Revisa los logs de n8n para debugging.

