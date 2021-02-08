const Slack = require('slack')
const fs = require('fs')

async function postFile(token, file, channels) {
    const web = new Slack({token: token})
    const result = await web.files.upload({
        channels: channels,
        file: fs.createReadStream(file)
    })
    return result['ok']
}

async function apiPost(token, payload) {
    const result = await postFile(token, payload['content'], payload['channels'])

    if (result !== true) {
        throw `Error! ${JSON.stringify(result)}`
    }
    return result
}

module.exports = {
    apiPost
}
