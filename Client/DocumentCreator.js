const FileSystem = require("fs")
const { JsonRpc } = require("../Server/JsonRPC")
const path = require("path")



function CreateCache() {
	if (FileSystem.existsSync("Client/Cache") == false) 
	{
		FileSystem.mkdirSync("Client/Cache")
	}

}

function ClearCache() {
	CreateCache()
	for (const File of FileSystem.readdirSync("Client/Cache")) {
		FileSystem.unlinkSync("Client/Cache/" + File)
	}
}

function CreateCacheFile() {
	CreateCache()
	const ID = JsonRpc.GetGUID()
	const Path = "Client/Cache/" + ID + ".lua"
	if (FileSystem.existsSync(Path) == true) {
		return CreateCacheFile()
	}
	else {
		FileSystem.appendFile(Path, "", function () { })
		return path.join(__dirname, "Cache", ID)+".lua"
	}
}
module.exports = { ClearCache, CreateCacheFile }