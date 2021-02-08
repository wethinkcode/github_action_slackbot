const { buildMessage } = require("./build-message")

describe("build message", () => {
    test("With Channel and Text", () => {

        const message = buildMessage("channels", "text")

        expect(message).toEqual({
            channels: "channels",
            content: "text"
        })
    })
})
