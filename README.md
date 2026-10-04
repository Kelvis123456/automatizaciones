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

- `flows/tasa-diaria.json`: cada día hábil a las 8am pide la tasa USD a DOP a open.er-api.com, la compara con la corrida anterior y arma una frase de resumen. Todavía no envía el resumen a ningún lado.
- `flows/clasificador-mensajes.json`: un webhook (`POST /webhook/clasificar` con `{"mensaje": "..."}`) manda el texto a Gemini y devuelve categoría (facturación, técnico, ventas u otro), urgencia y un resumen de una frase. Si el modelo responde algo fuera de esas opciones, el flujo cae a un valor seguro. Necesita una credencial "Header Auth" con el nombre `x-goog-api-key` y tu key gratuita de Google AI Studio; después de importar hay que volver a elegirla en el nodo "Preguntar a Gemini".
