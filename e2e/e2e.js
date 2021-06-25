const { apiPost } = require("../src/api/slack_api");
const { getOptional } = require("../src/message");
const { buildMessage } = require("../src/message/build-message");

(async () => {
    try {
        if (
            !process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN ||
            !process.env.SLACK_CHANNEL
        ) {
            console.log("Missing values in env")
            return;
        }

        const token = process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN;
        const channel = process.env.SLACK_CHANNEL;
        const func = process.env.SLACK_BOT_FUNCTION || 'message-send';
        let file = process.env.SLACK_FILE || ""
        const text_body = process.env.SLACK_MESSAGE_BODY || ""
        const text_header = process.env.SLACK_MESSAGE_HEADER || ""
        const text = get_text(text_header, text_body)

        if (text.length > 0 || func == 'file-upload') {
            await execute(channel, file, text, token, func)
            console.log("message: Success!")
        } else {
            console.log("message: Nothing done!")
        }
    } catch(err) {
        console.error(err)
    }
})();


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

async function execute(channel, file, text, token, func) {
    const payload = buildMessage(channel, file, text, optional = getOptional())
    console.log("payload: ", payload)
    await apiPost(token, payload, func)
}
