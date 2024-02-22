import http from "http"

const server = http.createServer((req, res) => {
    res.end("Hello from http native module")
})

server.listen(8080, () => {
    console.log("listening 8080 port")
})
