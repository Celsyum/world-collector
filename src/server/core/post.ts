import { context, reddit } from "@devvit/web/server";

export const createPost = async () =>
{
  const { subredditName } = context;
  if (!subredditName)
  {
    throw new Error("subredditName is required");
  }

  return await reddit.submitCustomPost({
    splash: {
      appDisplayName: "World Collector",
    },
    subredditName: subredditName,
    title: "World Collector",
  });
};

//costomise splash screen
/*
const post = await reddit.submitCustomPost({
  subredditName: context.subredditName!,
  title: 'My Interactive Post',
  splash: {
    appDisplayName: 'My Amazing App', // only required field
    backgroundUri: 'background.png',
    buttonLabel: 'Start Playing',
    description: 'An exciting interactive experience',
    entryUri: 'index.html',
    heading: 'Welcome to the Game!'
  },
  postData: {
    gameState: 'initial',
    score: 0
  }
});
*/
