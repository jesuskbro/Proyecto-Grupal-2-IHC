Feature: US25 - Comparación de niveles históricos
Descripción:
COMO usuario,
QUIERO comparar mis niveles históricos de exposición al ruido
PARA analizar mis hábitos de exposición sonora.

Escenario: 01 - Comparación exitosa
Given el usuario se encuentra en la sección "Comparación Histórica"
And selecciona dos periodos de tiempo
When presiona el botón "Comparar"
Then el sistema muestra gráficos y estadísticas comparativas de los niveles de ruido.

Escenario: 02 - Información insuficiente
Given el usuario se encuentra en la sección "Comparación Histórica"
When no existen datos suficientes para realizar la comparación
Then el sistema muestra el mensaje "No hay suficientes datos para generar la comparación".

Examples:
| Periodo 1 | Periodo 2 | Resultado |
| Semana 1 | Semana 2 | Comparación generada | 
| Mayo | Junio | Comparación generada | 
| Sin datos | Junio | Información insuficiente | 
