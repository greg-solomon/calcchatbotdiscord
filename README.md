# CalcChat Bot for Discord

Posts solutions to textbook questions in discord chat.

Currently only supports Calculus 11e

[Add to server](https://discord.com/oauth2/authorize?client_id=753420139541561395&permissions=19456&scope=bot)

## Commands

### Get Solution Image

`!a [chapter] [section] [exercise]`

### Set Book

`!setbook [index]`

### List Books

Get your appropriate book index with

`!listbooks`

### Check Current Book

`!currbook`

### Help

`!help`

#### Example

`!a 5 1 1`

Returns the solution image for Chapter 5, Section 1, Chapter 1

If you pass the bot an invalid chapter, section, or exercise, CalcChat will default to the first number in the invalid parameters set.

### Help

`!a help`

Shows calcbot commands and usage

## Running Your Own Instance

Register your bot on Discord on the [Discord Developer Portal](https://discord.com/developers/docs/topics/oauth2)

Copy down your Client ID from the General Information Tab and your Token from the Bot tab.

Your Client ID will be needed to create the invite link. The invite link will look like

`https://discord.com/oauth2/authorize?client_id=<CLIENT_ID>&permissions=19456&scope=bot`

Now you are ready to deploy.

## Heroku Deployment

On Heroku, create a new application.

Under the Deploy tab, find the command to add the remote repository that looks like

`heroku git:remote -a <appname>`

Add the Redis buildpack:

`heroku buildpacks:add https://github.com/heroku/heroku-buildpack-redis`
Then run the deploy commands.

```
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```

In Heroku, under your settings tab, click the `Reveal Config Vars` button to reveal environment variables and add a new one called `TOKEN` and set it to your token value from Discord.
