const { getOptional } = require("./index")

describe("get optional", () => {
    test("Gets optional input", () => {
        env = process.env;
        env['slack_optional_input_link_names'] = 'true';
        expect(getOptional()).toEqual({
            link_names: 'true'
        })
    })
})
