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
### slack-message-header
'Message to send: header, used with conjuction of body (If there is content), header will always print

### slack-message-body
Message to send: If body is empty, nothing will print

## slack_optional_input_link_names
### Slack Link Names
This allows us to use the @User command

## slack_optional_input_username
### Slack Username
This allows us to set a username

## slack_optional_input_as_user
### Slack Input as User
This allows us to post as a user


### Example usage for file upload
```
uses: wethinkcode/github_action_slackbot@v0.1
    with:
        slack-bot-oauth-access-token: ${{ secrets.SLACK_BOT_USER_OAUTH_TOKEN }}
        slack-channel: some-channel-id
        slack-bot-function: file-upload
        slack-file: filename
        slack_optional_input_filename: file-name
```

### Example usage for a message to send to a channel
```
uses: wethinkcode/github_action_slackbot@v0.1
    with:
        slack-bot-oauth-access-token: ${{ secrets.SLACK_BOT_USER_OAUTH_TOKEN }}
        slack-channel: some-channel-id
        slack-bot-function: message-send
        slack-message-body: /
            Some text that you may or may not want to send; up to you
```

#### Will eventually Support optionals params with the following syntax
```
slack_optional_input_filename
```

# Testing
Integration testing can be done based on the `.env` file

Bash, ZSH
```bash
eval $(cat .env) node e2e/e2e.js
```

Fish
```bash
eval (cat .env) node e2e/e2e.js
```
