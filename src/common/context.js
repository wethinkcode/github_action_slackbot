const core = require("@actions/core")

const getEnv = () => process.env

const getRequired = (name) => core.getInput(name, {required: true})

const getOptional = (name) => core.getInput(name, {required: false})

const setOutput = (name, value) => core.setOutput(name, value)

const setFailed = (msg) => core.setFailed(msg)

module.exports = {
    getRequired,
    setOutput,
    getOptional,
    setFailed,
    getEnv
}
