# github_action_slackbot
A Git hub action to use with slack bot to upload binaries with a message

## Inputs:
### slack-bot-user-oauth-access-token (Required)
This is your oauth token for your bot

### slack-channel (Required)
This requires the channel id

### slack-bot-function (Required)
You need to specify which function to call from the bot
# Fucntions
## file-upload
### slack-file
This is the file you want to send

## message-send
### slack-message
The test message you want to send


### Example usage for file upload
```
uses: wethinkcode/github_action_slackbot@v0.1
    with:
        slack-bot-oauth-access-token: ${{ secrets.SLACK_BOT_USER_OAUTH_TOKEN }}
        slack-channel: some-channel-id
        slack-bot-function: file-upload
        slack-file: filename
```

### Example usage for a message to send to a channel
```
uses: wethinkcode/github_action_slackbot@v0.1
    with:
        slack-bot-oauth-access-token: ${{ secrets.SLACK_BOT_USER_OAUTH_TOKEN }}
        slack-channel: some-channel-id
        slack-bot-function: message-send
        slack-message: /
            Some text that you may or may not want to send; up to you
```

#### Supports optionals params with the following syntax
```
SLACK_OPTIONAL_INPUT_filename
```
