# Decisiones

## 2026-10-04: n8n con npx en vez de Docker
Mi laptop tiene poca RAM libre (1.4 GB al empezar) y Docker se la come. `npx n8n` corre en el mismo Node que ya uso. Contra: la primera descarga es lenta (más de 10 minutos) y los datos viven en `~/.n8n`, no en el repo; por eso lo único que guardo aquí son los JSON exportados.

## 2026-10-04: HTTP Request a Gemini en vez del nodo de IA de n8n
Ya uso la API de Gemini en otro proyecto (AgendaBot) y quería ver la llamada completa: cuerpo, header y qué hacer si la respuesta viene mal formada. El nodo de IA esconde eso. Si el flujo creciera a varios pasos con memoria o herramientas, ahí sí usaría el nodo de agente.

## 2026-10-04: sin Power Automate por ahora
Necesita una cuenta de trabajo o escuela de Microsoft 365 para los conectores que importan (SharePoint, por ejemplo) y no tengo una. Cuando tenga acceso lo agrego con su propio flujo.
