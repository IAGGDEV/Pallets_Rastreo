// ==========================================
// GOOGLE APPS SCRIPT - CONEXIÓN DIRECTA CON FRONTEND
// ==========================================
// Instrucciones de despliegue:
// 1. Ve a tu Google Sheet.
// 2. Haz clic en Extensiones > Apps Script.
// 3. Borra el código existente y pega completamente este código.
// 4. Guarda el proyecto (ej: "API Rastreo Directo").
// 5. Haz clic en el botón azul "Implementar" (arriba a la derecha) > "Nueva implementación".
// 6. Configuración de la implementación:
//    - Selecciona tipo: "Aplicación web" (haciendo clic en la rueda dentada).
//    - Descripción: "API v1"
//    - Aplicación web:
//        Ejecutar como: "Yo" (tu email)
//        Quién tiene acceso: "Cualquier persona" (¡MUY IMPORTANTE PARA QUE FUNCIONE!)
// 7. Haz clic en el botón "Implementar" y autoriza los permisos si te los pide.
// 8. Copia la "URL de la aplicación web" generada (suele terminar en /exec).
// 9. Ve a Vercel a la configuración de tu proyecto > Environment Variables y pega esta URL en "VITE_N8N_WEBHOOK_URL" (O pégala en tu .env local).
//
// Estructura obligatoria requerida de tu Google Sheet (Debe llamarse 'Tracker'):
// Columna A: tracking_number (Ej: 801868820503993)
// Columna B: status_master (Sólo puede ser: RECEIVED, IN_TRANSIT, OUT_FOR_DELIVERY, DELIVERED)
// Columna C: service_type (Ej: Día Sig.)
// Columna D: estimated_delivery (Ej: 2024-12-15T18:00:00Z)
// Columna E: receiver_name (Ej: SOE: ANGELINA)
// Columna F: origin (Ej: Los Ángeles, California)
// Columna G: destination (Ej: Ciudad de México)
// Columna H: history (JSON Array de eventos)
//  Ejemplo para Columna H:
//  [{"date": "2024-11-18T14:30:00Z", "status": "En tránsito", "location": "Querétaro", "note": "En ruta"}]

function doGet(e) {
    const SHEET_NAME = "Tracker"; // Asegúrate de que la hoja (pestaña) dentro de tu Excel se llama Tracker
    const COLUMN_ID = 0; // Columna A es el Tracking ID

    // Plantilla de respuesta base cuando NO se encuentra
    let result = {
        success: false,
        message: "No se encontró el envío. Verifica que el número de rastreo esté correcto.",
        error: "Not Found",
        tracking_number: null
    };

    try {
        // 1. Obtener ID a buscar
        if (!e || !e.parameter || !e.parameter.trackingNumber) {
            throw new Error("Falta el parámetro 'trackingNumber'.");
        }
        const trackingId = String(e.parameter.trackingNumber).trim().toUpperCase();

        // 2. Conectar a la hoja (Spreadsheet)
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        if (!ss) throw new Error("No se pudo acceder al documento activo. Verifica permisos.");
        const sheet = ss.getSheetByName(SHEET_NAME);
        if (!sheet) throw new Error(`La hoja nombrada '${SHEET_NAME}' no existe. Por favor creala o renombra la pestaña actual.`);

        // 3. Buscar datos
        const data = sheet.getDataRange().getValues();
        const rows = data.slice(1); // Ignorar la fila 1 (si asumes que son los encabezados)

        // Buscar la fila cuyo Columna A coincida
        const foundRow = rows.find(row =>
            String(row[COLUMN_ID] || '').trim().toUpperCase() === trackingId
        );

        if (foundRow) {
            // Mapear lo encontrado en base a las columnas especificadas en la cabecera
            result = {
                success: true,
                tracking_number: foundRow[0] ? String(foundRow[0]) : trackingId, // A
                status_master: foundRow[1] ? String(foundRow[1]) : "IN_TRANSIT", // B
                service_type: foundRow[2] ? String(foundRow[2]) : "",            // C
                estimated_delivery: foundRow[3] ? String(foundRow[3]) : "",      // D
                receiver_name: foundRow[4] ? String(foundRow[4]) : "",           // E
                origin: foundRow[5] ? String(foundRow[5]) : "",                  // F
                destination: foundRow[6] ? String(foundRow[6]) : "",             // G
                history: []                                                      // H
            };

            // Intentar procesar el JSON en la columna de historial
            const rawHistory = String(foundRow[7] || '').trim();
            if (rawHistory) {
                try {
                    result.history = JSON.parse(rawHistory);
                } catch (jsonError) {
                    result.history = [
                        {
                            date: new Date().toISOString(),
                            status: "Error de Formato",
                            note: "El historial de este envío tiene un formato JSON inválido en la hoja de cálculo."
                        }
                    ];
                }
            }
        }
    } catch (error) {
        result.success = false;
        result.message = error.message;
        result.error = error.toString();
    }

    // Retornar la respuesta con el formato exacto que pide el Frontend de TrackingResults
    return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
}

// Función exclusiva para hacer pruebas DIRECTAMENTE en la consola de Google Apps Script. 
function probarFuncionamiento() {
    const eMock = { parameter: { trackingNumber: "801868820503993" } };
    Logger.log("Probando con número de rastreo falso...");
    const respuesta = doGet(eMock).getContent();
    Logger.log(respuesta);
}
