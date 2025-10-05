## Devvit Hello World Starter

A starter to build web applications on Reddit's developer platform

- [Devvit](https://developers.reddit.com/): A way to build and deploy immersive games on Reddit
- [Express](https://expressjs.com/): For backend logic
- [Typescript](https://www.typescriptlang.org/): For type safety

## Getting Started

> Make sure you have Node 22 downloaded on your machine before running!

1. Run `npm create devvit@latest --template=hello-world`
2. Go through the installation wizard. You will need to create a Reddit account and connect it to Reddit developers
3. Copy the command on the success page into your terminal

## Commands

- `npm run dev`: Starts a development server where you can develop your application live on Reddit.
- `npm run build`: Builds your client and server projects
- `npm run deploy`: Uploads a new version of your app
- `npm run launch`: Publishes your app for review
- `npm run login`: Logs your CLI into Reddit
- `npm run check`: Type checks, lints, and prettifies your app

## Development

open two terminals
1.First used for reddit client/server compilation and uploads
`npm run dev`

2. Second used to build openfl project (in collector folder) to client version
`cd collector && npm run build:webpack`

runnig second terminal will build files into client/public folder and first terminal will upload these files to reddit dev subredit once something is triggered from first terminal

`cd collector && npm run start:dev` used for local only game part development (enpoint will be needed to simulate)


## Scheduler /cron jobs
in devvit.json

```json
"scheduler": {
  "tasks": {
    "regular-interval-example-task": {
      "endpoint": "/internal/scheduler/regular-interval-task-example",
      "cron": "*/1 * * * *"
    }
  }
}
```

in server:

```ts
router.post('/internal/scheduler/regular-interval-task-example', async (req, res) => {
  console.log(`Handle event for cron example at ${new Date().toISOString()}!`);
  // Handle the event here
  res.status(200).json({ status: 'ok' });
});
```

## Triggers

some events:
    onPostSubmit
    onPostCreate
    onPostUpdate
    onPostReport
    onPostDelete
    onPostFlairUpdate
    onCommentCreate
    onCommentDelete
    onCommentReport
    onCommentSubmit
    onCommentUpdate
    onPostNsfwUpdate
    onPostSpoilerUpdate
    onAppInstall
    onAppUpgrade
    onModActions
    onModMail
    onAutomoderatorFilterPost
    onAutomoderatorFilterComment

  all events: [Events](https://developers.reddit.com/docs/api/public-api/@devvit/namespaces/EventTypes/)

in devvit.json

```json
 "triggers": {
  "onAppUpgrade": "/internal/on-app-upgrade",
  "onCommentCreate": "/internal/on-comment-create",
  "onPostSubmit": "/internal/on-post-submit"
}
```

in server (check evens docs to find which event what body content has):

```ts
router.post('/internal/on-app-upgrade', async (req, res) => {
  console.log(`Handle event for on-app-upgrade!`);
  const installer = req.body.installer;
  console.log('Installer:', JSON.stringify(installer, null, 2));
  res.status(200).json({ status: 'ok' });
});
```

## Database REDIS



config devvit.json

do we need this ? works without this config
```json
{
  "permissions": {
    "redis": true
  }
}
```


more details about @devvit/redis client you can find in [RedditDoc](https://redis.io/docs/latest/commands/)

in server

```ts

import { redis } from '@devvit/redis';

  const key = 'hello';
  await redis.set(key, 'world');
  const value = await redis.get(key);
  

```

## Reddit API

[Reddit API](https://developers.reddit.com/docs/api/redditapi/RedditAPIClient/classes/RedditAPIClient)