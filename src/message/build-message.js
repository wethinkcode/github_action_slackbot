function buildMessage (channel = "", text = "", file = "") {

    const message = {
        channel,
        text,
        file
    }

    message.text = restoreEscapedNewLine(message.text)
    message.channel = restoreEscapedTab(message.channel)

    return message
}

function restoreEscapedNewLine(text){
    return text.replace(/\\r\\n/g, "\n").replace(/\\n/g, "n")
}

function restoreEscapedTab(text){
    return text.replace(/\\t/g, "\t")
}

module.exports = {
    buildMessage
}
