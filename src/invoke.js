const { prettify_JSON } = require('./common/common')
const { postMessage } = require('./message')
const context = require('./common/context')

async function invoke() {
    try {
        await postMessage()
    } catch (err) {
        context.setFailed(`invoke failed ${err} : ${prettify_JSON(err)}`)
    }
}

module.exports = invoke
