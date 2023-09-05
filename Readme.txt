La api se compila a js con npm run tsc
Para correrla usar npm start
Comandos utiles para interactuar con la bdd:
sqlite3 database.db
.tables
SELECT * FROM frutas;
SELECT * FROM agricultores;
.
.
.
DELETE FROM frutas;
.quit

cumple con los requisitos mencionados, se pueden ingresar las cosas en las distinats rutas por 
separado en cada tabla, y si se ingresa data desde un csv, se lanza el primer error encontrado por fila
si es que lo hay, y se cargan en las respectivas tablas los datos que se pueden cargar de la fila.
