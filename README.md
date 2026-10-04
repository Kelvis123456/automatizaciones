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
