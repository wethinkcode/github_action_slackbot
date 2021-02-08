# github_action_slackbot
A Git hub action to use with slack bot to upload binaries with a message

## Inputs:
### slack-bot-user-oauth-access-token
This is your oauth token for your bot

### slack-channel
This requires the channel name, seperated by ','

### slack-send-file
This is the file you want to send


### Example usage
```
uses: wethinkcode/github_action_slackbot@v0.1
    with:
        slack-bot-oauth-access-token: ${{ secrets.SLACK_BOT_USER_OAUTH_TOKEN }}
        slack-channel: some-channel-id
        slack-send-file: filename
```
