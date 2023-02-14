const express = require("express")
const sr = express()

sr.all('/', (rq, rs) => {
    rs.send("nose: w")
})

function keepAlive() {
    sr.listen(3000, () => {
        console.log(`Servidor listo - ${Date.now()}`)
    })
}

module.exports = keepAlive