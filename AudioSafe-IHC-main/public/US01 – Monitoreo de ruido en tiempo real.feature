Feature: US01 - Monitoreo de ruido en tiempo real
Descripcion:
COMO usuario,
QUIERO monitorear los niveles de ruido en tiempo real
PARA conocer si mi exposición sonora representa un riesgo para mi salud auditiva.

Escenario: 01-Monitoreo exitoso
Given el usuario se encuentra en la pantalla de monitoreo en tiempo real
And la aplicacion tiene acceso al micrófono del dispositivo
When se detecta un nivel de ruido ambiental 
Then el sistema muestra el valor de los decibeles en tiempo real
And actualiza el indicador de riesgo auditivo.

Escenario: 02-Monitoreo exitoso
Given el usuario se encuentra en la pantalla de monitoreo en tiempo real
When la aplicación no tiene permisos para acceder al micrófono
Then el sistema muestra el mensaje "No se pudo acceder al micrófono del dispositivo".

Examples:
| Nivel de ruido (dB) | estado |
| 45  | seguro | 
| 70  | moderado |
| 90  | Riesgo alto |
| 110 | Riesgo critico |
