const core = require("@actions/core")

const getRequired = (name) => core.getInput(name, {required: true})

const setOutput = (name, value) => core.setOutput(name, value)

const setFailed = (msg) => core.setFailed(msg)

module.exports = {
    getRequired,
    setOutput,
    setFailed
}
