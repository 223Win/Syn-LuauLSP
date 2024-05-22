


class LSPClient {
	async GetInitLoop() {
		console.log(await this.RPC.Request("initialized", {}, "notification"))
		setTimeout(() => {
			this.GetInitLoop()
		}, 5000);
	}

	async ManageDocument(uri) {
		await this.RPC.Request("textDocument/didOpen", {
			textDocument: {
				uri: uri,
				languageId: "lua",
				version: 0,
				text: ""
			}
		}, "notification");
	}

	Initialize() {
		console.log("Initializing")
		console.log("Connecting to Port", Port)

		Client.sendRequest("initialize", {
			processId: 0,
			rootPath: Path.join(__dirname, 'Data'),
			rootUri: `file://${Path.join(__dirname, 'Data')}`,
			workspaceFolders: [
				{
					name: "Test",
					uri: `file://${Path.join(__dirname, 'Data')}`
				}

			],
			capabilities: {},

		}, "")
	}
	GetAutoCompletes() {

	}
	GetDefinition() {

	}
	GetHover() {

	}
	GetDebugInfo() {

	}
	GetReferences() {

	}
	async Main(Docs, Defs) {
		const DocsFile = Path.join(__dirname, "Data", Docs)
		const DefsFile = Path.join(__dirname, "Data", Defs)
		//"--docs", DocsFile, "--definitions", DefsFile
		let Args = ["lsp", "--docs", DocsFile, "--definitions", DefsFile]
		this.Lsp = ChildProcess.spawn("./Server/luau-lsp", Args);


		const CacheFile = DocumentCreator.CreateCacheFile()
		await Client.start()

		console.log(Client.initializeResult)

		this.Initialize() // Initialize the LSP Server //

		this.GetInitLoop()
	}
	constructor(Documentation, Definitions) {
		this.Main(Documentation, Definitions)

	}
}


async function Main() {
	await import("monaco-languageclient").then((module) => {
		console.log("LOADEDDDDDDDDDDDDDDDD ")
	})





	const { JsonRpc } = require("../Server/JsonRPC")
	const ChildProcess = require("child_process");

	const Client = new MonacoLanguageClient({
		name: "Syn-LSP",
		id: "Syn-Killer-LSP: V1",
		// create the language client connection from the JSON RPC connection on demand
		getLanguageClientConnection: (connection) => {
			return connection.createLanguageClient(
				"LSP",
				"V1",
				"Syn-Killer"
			)
		},
	})


	const { Port } = require("./LocalServer")
	const DocumentCreator = require("./DocumentCreator")
	const Path = require("path");



	//--// Saves you file space //--//
	DocumentCreator.ClearCache()
	new LSPClient("Docs.json", "info.d.luau")
}


Main()
