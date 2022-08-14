# contextsearchy

search engines

## caveat / bug
Als je de extensie opnieuw installeert in een browser (Edge), dan krijg je de default engines en deze lijst
wordt dan gelijk gesynchronizeerd naar alle devices.

Dat is eigenlijk niet de bedoeling. Eerst kijken of er niet al engines zijn.
Er is wel controle in background.js, maar die komt misschien te vroeg.

Niet in background.js, maar in search.js gaan vragen of default waarden geladen moeten worden -
als er nog geen inhoud is.
