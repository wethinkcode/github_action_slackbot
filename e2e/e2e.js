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
        const text = process.env.SLACK_MESSAGE
        const ignore_empty = process.env.IGNORE_IF_EMPTY || false
        const line_character_limit = process.env.LIMIT_OF_LINE_CHARACTERS_TO_INGORE || 1

        console.log(func)
        if ( func === 'file-upload' || !ignore_empty) {
            await execute(channel, file, text, token, func)
            console.log("SUCCESS no import ignored")
            return
        } else if (text.length > +line_character_limit + 1) {
            console.log(`Length of ${line_character_limit}`)
            console.log(`Message: ${text}`)
            await execute(channel, file, text, token, func)
            console.log(`SUCCESS with ignored ${ignore_empty} and limit ${line_character_limit}`)
            return
        }
        console.log("Failure no function done")
    } catch(err) {
        console.error(err)
    }
})();


async function execute(channel, file, text, token, func) {
    console.log(`${channel}::${file}::${text}::${token}::${func}`)
    const payload = buildMessage(channel, file, text, optional = getOptional())
    console.log("payload: ", payload)
    await apiPost(token, payload, func)
}
