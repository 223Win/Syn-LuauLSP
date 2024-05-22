const Http = require("http")
class Host {
    constructor(ServerContent,Port) {
        this.Content = ServerContent
        this.Server = Http.createServer((_,res) => {
            res.end(this.Content)
        })
        this.Server.listen(Port)
        return this
    }
}

class LocallyHostedFile {
    UpdateContent(Content) {
        this.Content = Content;
    }
    constructor(Content,Port) {
        this.Content = Content;
        this.Host = new Host(Content, Port);
        this.Location = `http://localhost:${this.Host.Server.address().port}`
        Object.defineProperty(this, 'Content', {
            get: function () {
                return this.Content;
            },
            set: function (New) {
                if (this.Content !== New) {
                    this.Content = New;
                    this.Host.Content = New;
                }
            }
        });
    }
}

module.exports = { LocallyHostedFile }