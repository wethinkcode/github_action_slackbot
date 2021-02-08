const { apiPost } = require("../api/slack_api");
const { prettify_JSON } = require("../common/common");
const { buildMessage } = require("./build-message");
const context = require('../common/context')

async function postMessage() {
    try {
        const token = context.getRequired("slack-bot-user-oauth-access-token");
        const channel = context.getRequired("slack-channel");
        const file = context.getRequired('slack-file')


        const payload = buildMessage(channel, file);
        await apiPost(token, payload)

        context.setOutput("message", "Success!");
    } catch (error) {
        console.log(error)
        context.setFailed(prettify_JSON(error));
    }
}

module.exports = {
    postMessage
}
