/* eslint-env node */

'use-strict'

const promise = require('bluebird')
const cmd = require('node-cmd')
const url = require('is-url')
const Slack = require('slack-node')

const webhookUri = 'https://hooks.slack.com/services/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'
const getAsyncCmd = promise.promisify(cmd.get, { context: cmd })

// specify the slack channel to send to as a param to the script. Default is to
// @chris which is specified in the webhook config
const args = process.argv.slice(2)
const channel = args.length > 0 ? "#" + args : ""

getAsyncCmd('npx expo url:apk').then((data) => {
  // ensure a url. The call will return successfully even on an error.
  if (url(data.trim())) {
    return data.trim()
  } else {
      console.log('Error. npx expo url:apk did not return a url', data)
  }
}).then((apkUri) => {
  const slack = new Slack()
  const getAsyncSlack = promise.promisify(slack.webhook, { context: slack })

  slack.setWebhook(webhookUri)
  return getAsyncSlack(slackMsg(apkUri))
}).then((data) => {
  console.log('status code from slack: ', data)
}).catch((err) => {
  console.log('error calling npx expo url:apk :\n', err)
})

/*
For testing purposes
https://api.slack.com/docs/messages/builder

{
    "attachments": [
        {
            "fallback": "Required plain-text summary of the attachment.",
            "color": "#36a64f",
            "pretext": "A new apk is available",
            "author_name": "LevelPlay mobile pipeline",
            "title": "I want it now!",
            "title_link": "https://api.slack.com/",
            "image_url": "http://my-website.com/path/to/image.jpg",
            "thumb_url": "http://example.com/path/to/thumb.png",
            "footer": "Slack API",
            "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
            "ts": 123456789
        }
    ]
}
*/


const slackMsg = (uri) => {
  return {
    "username": "auto-build",
    "channel": channel,
    "attachments": [
      {
        "fallback": "A new APK is available. Get it now!",
        "color": "#36a64f",
        "pretext": "A new apk is available!",
        "author_name": "LevelPlay mobile pipeline",
        "title": "I want it now!",
        "title_link": uri,
        "footer": "LevelPlay Sports",
        "footer_icon": "http://seasonseatnetwork.com/LevelPlayDev/stage/levelplaydev/frontend/images/LPS-LOGO-WHITE-1024.png",
        "ts": Math.floor(Date.now() / 1000)
      }
    ]
  }
}
