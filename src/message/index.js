const { apiPost } = require("../api/slack_api");
const { prettify_JSON } = require("../common/common");
const { buildMessage } = require("./build-message");
const context = require('../common/context')

async function postMessage() {
    try {
        const token = context.getRequired("slack-bot-user-oauth-access-token");
        const channel = context.getRequired("slack-channel");
        const func = context.getOptional('slack-bot-function') || 'message-send';
        let file = context.getOptional('slack-file')
        const text_header = context.getOptional('slack-message-header') || ""
        const text_body = context.getOptional('slack-message-body') || ""
        const text = get_text(text_header, text_body)

        if (text.length > 0 || func == 'file-upload') {
            await execute(channel, file, text, token, func)
            context.setOutput("message", "Success!")
        } else {
            context.setOutput("message", "Nothing done")
        }
    } catch (error) {
        console.log(error)
        context.setFailed(prettify_JSON(error))
    }
}

async function execute(channel, file, text, token, func) {
    const payload = buildMessage(channel, file, text, optional = getOptional())
    await apiPost(token, payload, func)
}

function get_text(header, body) {
    if (body.length > 0) {
        if (header.length > 0) {
            return header + "\n" + body
        } else {
            return body
        }
    }
    return ""
}

function getOptional() {
    const string_match = "SLACK_OPTIONAL_INPUT_"
    let ret = {}
    const env = context.getEnv()
    Object.keys(env)
        .filter((key) => !!env[key])
        .filter((key) => key.toUpperCase().startsWith(string_match))
        .forEach( async (key) => {
            const s_key = key.replace(string_match, "")
            ret[s_key] = env[key]
        })
    return ret
}

module.exports = {
    postMessage, getOptional
}
