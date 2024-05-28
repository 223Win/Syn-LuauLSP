
const path = require("path")
const vscode = require("vscode")




new Promise((resolve, reject) => {
	vscode.commands.getCommands().then(() => {
		resolve()
	})
}).then(() => {
	console.log("VS CODE IS READY")
})