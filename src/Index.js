import app from './Server.js'
import connection from "./Database.js"

connection()
app.listen(app.get('port'), () => {
    console.log(`Servidor en Linea en http://localhost:${app.get('port')}`)
})
