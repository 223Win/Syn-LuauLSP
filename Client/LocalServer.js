const Express = require("express")()
const Path = require("path")
const Port = 7844

Express.get("/sourcemap.json", (req, res) => {
	res.sendFile(Path.join(__dirname, "Data", "sourcemap.json"))
})

Express.get("/info.d.luau", (req, res) => {
	res.sendFile(Path.join(__dirname, "Data", "info.d.luau"))
})

Express.get("/Docs.json", (req, res) => {
	res.sendFile(Path.join(__dirname, "Data", "Docs.json"))
})

Express.listen(Port, () => {})

module.exports = { 
	Express,
	Port,
}