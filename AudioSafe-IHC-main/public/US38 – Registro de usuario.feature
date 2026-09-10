Feature: US38 - Registro de usuario
Descripción:
COMO usuario,
QUIERO registrarme en la aplicación
PARA almacenar mi historial de exposición sonora y acceder a funcionalidades personalizadas.

Escenario: 01 - Registro exitoso
Given el usuario se encuentra en la pantalla de registro
And completa todos los campos obligatorios
When presiona el botón "Registrarse"
Then el sistema crea la cuenta del usuario
And muestra el mensaje "Registro realizado correctamente".

Escenario: 02 - Registro fallido
Given el usuario se encuentra en la pantalla de registro
When deja uno o más campos obligatorios vacíos
Then el sistema muestra el mensaje "Por favor, complete todos los campos requeridos".

Examples:
| Nombre | Correo | Contraseña | Resultado | 
| Aldighieri Farid | aldifg@gmail.com | 124432 | Registro exitoso | 
| Christofer Casas | crsa12@gmail.com | 165322 | Registro exitoso | 
| Jardel Andres |   - | sadsa12 | Campos incompletos | 
