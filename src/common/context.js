const core = require("@actions/core")

const getRequired = (name) => core.getInput(name, {required: true})

const getEnv = () => process.env;

const setOutput = (name, value) => core.setOutput(name, value)

const setFailed = (msg) => core.setFailed(msg)

module.exports = {
    getRequired,
    getEnv,
    setOutput,
    setFailed
}
