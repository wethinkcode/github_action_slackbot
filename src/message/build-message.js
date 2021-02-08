function buildMessage (channels = "", content = "") {

    const message = {
        channels,
        content
    }

    message.channels = restoreEscapedTab(message.channels)

    return message
}

function restoreEscapedTab(text){
    return text.replace(/\\t/g, "\t")
}

module.exports = {
    buildMessage
}
