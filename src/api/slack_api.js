const https = require('https')

function getHeadersPostObj(token, path) {
    return {
        hostname: "slack.com",
        port: 443,
        path: path,
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            Authorization: `Bearer ${token}`
        }
    }
}

function post(token, path, message) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify(message)
        const options = getHeadersPostObj

        const req = https.request(options(token, path), (res) => {
            const chunks = [];

            res.on("data", (chunk) => {
                chunks.push(chunk)
            })

            res.on("end", () => {
                const result = Buffer.concat(chunks).toString()
                const response = JSON.parse(result);

                resolve({
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage,
                    ok: res.statusCode >= 200 && res.statusCode <= 299,
                    result: result,
                    response: response
                })
            })
        })

        req.on("error", (error) => {
            reject(error)
        })

        req.write(payload)
        req.end()
    })
}

async function apiPost(token, message, fileIncluded = false) {
    const path = "api/files.upload"
    const result = await post(token, path, message, fileIncluded)

    if (!result || result.ok) {
        throw `Error! ${JSON.stringify(result)}`
    }

    return result
}

module.exports = {
    apiPost
}
