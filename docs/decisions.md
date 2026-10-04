# Decisiones

## 2026-10-04: n8n con npx en vez de Docker
Mi laptop tiene poca RAM libre (1.4 GB al empezar) y Docker se la come. `npx n8n` corre en el mismo Node que ya uso. Contra: la primera descarga es lenta (más de 10 minutos) y los datos viven en `~/.n8n`, no en el repo; por eso lo único que guardo aquí son los JSON exportados.

## 2026-10-04: HTTP Request a Gemini en vez del nodo de IA de n8n
Ya uso la API de Gemini en otro proyecto (AgendaBot) y quería ver la llamada completa: cuerpo, header y qué hacer si la respuesta viene mal formada. El nodo de IA esconde eso. Si el flujo creciera a varios pasos con memoria o herramientas, ahí sí usaría el nodo de agente.

## 2026-10-04: sin Power Automate por ahora
Necesita una cuenta de trabajo o escuela de Microsoft 365 para los conectores que importan (SharePoint, por ejemplo) y no tengo una. Cuando tenga acceso lo agrego con su propio flujo.

## 2026-10-04: Postgres en Docker para el historial, no SQL Server Express
Quería que la tasa diaria quedara guardada en SQL de verdad, no en el static data de n8n (que ni se guarda en pruebas manuales). Mi SQL Server Express solo acepta autenticación de Windows y el nodo de n8n pide usuario y contraseña; cambiarlo exige reiniciar el servicio como administrador y esa instancia la usan otros proyectos. Un Postgres chico en `docker-compose.yml` es reproducible para cualquiera que clone el repo. Contra: es otra base más corriendo (unos 40 MB).

## 2026-10-04: CI solo valida los JSON, no corre n8n
Las pruebas del clasificador llaman a Gemini de verdad y necesitan n8n y una key, así que no las pongo en CI. El workflow solo revisa la estructura de los flujos y que no se cuele un secreto; es barato (menos de un minuto) y atrapa lo que más probablemente rompa una importación.
