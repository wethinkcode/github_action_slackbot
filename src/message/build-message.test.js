const { buildMessage } = require("./build-message")

describe("build message", () => {
    test("With Channel and Text", () => {

        const message = buildMessage("channel", "text", "file")

        expect(message).toEqual({
            channel: "channel",
            text: "text",
            file: "file",
        })
    })
})
