const { prettify_JSON } = require('./common/common')
const { postMessage } = require('./message')
const context = require('./common/context')

async function invoke() {
    try {
        const message = context.getRequired("send-message")

        if (message) {
            await postMessage(message)
        } else {
            context.setFailed("No message passed")
        }
    } catch (err) {
        context.setFailed(`invoke failed ${err} : ${prettify_JSON(err)}`)
    }
}

module.exports = invoke
