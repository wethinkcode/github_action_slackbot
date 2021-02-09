function buildMessage (channel = "", file = "", text = "", optional = {}) {

    const message = {
        channel,
        "file-content": file,
        text
    }

    message.channel = restoreEscapedTab(message.channel)
    message.text = restoreEscapedNewLine(message.text)

    Object.keys(optional).forEach((name) => {
        message[name] = optional[name]
    })

    return message
}

function restoreEscapedTab(text){
    return text.replace(/\\t/g, "\t")
}

function restoreEscapedNewLine(text) {
    return text.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n")
}

module.exports = {
    buildMessage
}
