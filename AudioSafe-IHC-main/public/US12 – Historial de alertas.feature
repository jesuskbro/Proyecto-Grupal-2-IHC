Feature: US12 - Historial de alertas
Descripción:
COMO usuario,
QUIERO consultar el historial de alertas generadas
PARA revisar mis exposiciones anteriores al ruido.

Escenario: 01 - Visualización exitosa del historial
Given el usuario se encuentra en la sección "Historial de Alertas"
And existen alertas previamente registradas
When selecciona la opción "Ver Historial"
Then el sistema muestra la lista de alertas ordenadas por fecha y hora.

Escenario: 02 - Historial vacío
Given el usuario se encuentra en la sección "Historial de Alertas"
When no existen alertas registradas
Then el sistema muestra el mensaje "No existen alertas registradas".

Examples:
| Fecha | Nivel de riesgo | Estado |
| 20/06/2026 | Alto | Mostrado | 
| 19/06/2026 | Moderado | Mostrado |
| Sin registros | Ninguno | Mensaje de historial vacío |
