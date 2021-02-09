const Slack = require('slack')
const fs = require('fs')

async function postFile(token, payload) {
    payload['file'] = fs.createReadStream(payload['file-content'])
    payload['channels'] = payload['channel']
    const web = new Slack({token: token})
    const result = await web.files.upload(payload)
    return result['ok']
}

async function postMessage(token, payload) {
    const web = new Slack({token: token})
    const result = await web.chat.postMessage(payload);
    return result['ok']
}

async function apiPost(token, payload, func) {
    let result = false

    switch(func) {
        case "file-upload":
            result = await postFile(token, payload)
            break;
        case "message-send":
            result = await postMessage(token, payload)
            break;
    }

    if (result !== true) {
        throw `Error! ${JSON.stringify(result)}`
    }
    return result
}

module.exports = {
    apiPost
}
