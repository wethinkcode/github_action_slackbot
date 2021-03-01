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
        const text = context.getOptional('slack-message')
        const ignore_empty = context.getOptional('ignore_if_empty') || false
        const line_character_limit = context.getOptional('limit_of_line_characters_to_ignore') || 1

        if (!ignore_empty) {
            await execute(channel, file, text, token, func)
        } else if (text.length > line_character_limit + 1) {
            await execute(channel, file, text, token, func)
        }
        context.setOutput("message", "Success!")
    } catch (error) {
        console.log(error)
        context.setFailed(prettify_JSON(error))
    }
}

async function execute(channel, file, text, token, func) {
    const payload = buildMessage(channel, file, text, optional = getOptional())
    await apiPost(token, payload, func)
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
