const { apiPost } = require("../api/slack_api");
const { prettify_JSON } = require("../common/common");
const { buildMessage } = require("./build-message");
const context = require('../common/context')

async function postMessage() {
    try {
        const token = context.getRequired("slack-bot-user-oauth-access-token");
        const channel = context.getRequired("slack-channel");
        const file = context.getRequired('slack-file')
        const message = context.getRequired("send-message")

        const payload = buildMessage(channel, message, get_optional());
        const result = await apiPost(token, payload, file)

        context.setOutput("message", prettify_JSON(result));
    } catch (error) {
        context.setFailed(prettify_JSON(error));
    }
}

function get_optional() {
    let opt = {};

    const env = context.getEnv();
    Object.keys(env)
        .filter((key) => !!env[key])
        .filter((key) => key.toUpperCase().startsWith("SLACK-OPTIONAL-"))
        .forEach((key) => {
            const slackKey = key.replace("SLACK-OPTIONALL-", "").toLowerCase();
            opt[slackKey] = env[key];
        });

    return opt;
}

module.exports = {
    postMessage
}
