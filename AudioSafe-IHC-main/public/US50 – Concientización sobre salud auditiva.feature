Feature: US50 - Concientización sobre salud auditiva
Descripción:
COMO usuario,
QUIERO recibir información y recomendaciones sobre salud auditiva
PARA prevenir posibles daños ocasionados por la exposición prolongada al ruido.

Escenario: 01 - Visualización de recomendaciones
Given el usuario se encuentra en la sección "Salud Auditiva"
When accede al módulo educativo
Then el sistema muestra recomendaciones y consejos preventivos sobre exposición al ruido.

Escenario: 02 - Generación de recomendaciones personalizadas
Given el usuario presenta exposiciones frecuentes a niveles de ruido elevados
And existe un historial de mediciones registrado
When el sistema analiza el historial de exposición sonora
Then la aplicación muestra recomendaciones personalizadas de prevención auditiva.

Examples:
| Nivel de exposición | Recomendación | 
| Moderado | Descansar los oídos cada hora | 
| Alto | Reducir el tiempo de exposición | 
| Crítico | Utilizar protección auditiva y abandonar la zona de ruido | 
