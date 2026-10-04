# automatizaciones

Flujos de n8n que voy armando para practicar automatización de procesos. Cada flujo es un JSON en `flows/` que se importa tal cual en n8n.

Todavía estoy empezando. Lo que está aquí es lo que ya corrí de verdad.

## Cómo correrlo

Necesitas Node 24 o más nuevo.

```
npx n8n
```

Abre http://localhost:5678, crea la cuenta local, y en un workflow nuevo usa el menú de los tres puntos y "Import from file…" con el JSON que quieras probar.

## Flujos

- `flows/tasa-diaria.json`: cada día hábil a las 8am pide la tasa USD a DOP a open.er-api.com (con reintentos), la compara con la corrida anterior y con el promedio de las últimas 30, y arma una frase de resumen. Todavía no la envía a ningún lado: para eso necesito un SMTP o un bot, y prefiero no dejar credenciales de correo en un repo de práctica.
- `flows/clasificador-mensajes.json`: un webhook (`POST /webhook/clasificar` con `{"mensaje": "..."}`) manda el texto a Gemini y devuelve categoría (facturación, técnico, ventas u otro), urgencia y un resumen de una frase. Responde 400 si el mensaje falta, no es texto o pasa de 2000 caracteres, y 502 si Gemini falla después de 3 intentos. El mensaje va dentro de etiquetas y se trata como dato, y la salida se valida contra las opciones permitidas, así que un mensaje que intente dar órdenes al modelo no cambia el formato. Necesita una credencial Header Auth con el nombre `x-goog-api-key` y tu key gratuita de Google AI Studio; después de importar hay que volver a elegirla en el nodo "Preguntar a Gemini".

## Pruebas

Con n8n corriendo y el clasificador activo:

```
node --test tests/clasificador.test.mjs
```

Son 6 pruebas contra el webhook real (3 de clasificación, 3 de entrada inválida). Llaman a Gemini de verdad, así que no las corro en CI. La ruta del 502 todavía no la he probado.
