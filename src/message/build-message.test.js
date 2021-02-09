const { buildMessage } = require("./build-message")

describe("build message", () => {
    test("With Channel and Text", () => {

        const message = buildMessage("channels", "content", "text")

        expect(message).toEqual({
            channel: "channels",
            "file-content": "content",
            text: "text"
        })
    })
})

describe("build message with optionals", () => {
    test("With Channel and Text", () => {

        const message = buildMessage("channels", "content", "text", {name: "key"})

        expect(message).toEqual({
            channel: "channels",
            "file-content": "content",
            text: "text",
            name: "key"
        })
    })
})
