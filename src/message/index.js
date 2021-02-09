const { apiPost } = require("../api/slack_api");
const { prettify_JSON } = require("../common/common");
const { buildMessage } = require("./build-message");
const context = require('../common/context')

async function postMessage() {
    try {
        const token = context.getRequired("slack-bot-user-oauth-access-token");
        const channel = context.getRequired("slack-channel");
        const func = context.getRequired('slack-bot-function')
        let file = context.getOptional('slack-file')
        const text = context.getOptional('slack-message')

        const payload = buildMessage(channel, file, text, getOptional());
        await apiPost(token, payload, func)

        context.setOutput("message", "Success!");
    } catch (error) {
        console.log(error)
        context.setFailed(prettify_JSON(error));
    }
}

function getOptional() {
    const string_match = "SLACK_OPTIONAL_INPUT_"
    let ret = {}
    const env = context.getEnv()
    Object.keys(env)
        .filter((key) => !!env[key])
        .filter((key) => key.toUpperCase().startsWith(string_match))
        .forEach((key) => {
            const s_key = key.replace(string_match, "").toLowerCase()
            ret[s_key] = env[key]
        })
    return ret
}

module.exports = {
    postMessage
}
