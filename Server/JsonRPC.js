class JsonRpc {
    /**
     * 
     * @param {{}} Table
     * @returns {string} 
     */
    static Encode(Table) {
        const str = JSON.stringify(Table)
        const ContentLength = str.length
        const Content = `Content-Length: ${ContentLength}\r\n\r\n${str}`
        return Content
    }
    static Decode(Content) {
        const ContentLength = Content.indexOf('\r\n\r\n')
        const str = Content.substring(ContentLength + 4)
        return JSON.parse(str)
    }
    static GetGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
    }
}
module.exports = { JsonRpc }