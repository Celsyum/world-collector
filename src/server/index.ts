import express from "express";
import
{
  InitResponse,
  IncrementResponse,
  DecrementResponse,
  ApiResponse,
} from "../shared/types/api";
import
{
  createServer,
  context,
  getServerPort,
  reddit,
  redis,
} from "@devvit/web/server";
import { createPost } from "./core/post";

const app = express();

// Middleware for JSON body parsing
app.use(express.json());
// Middleware for URL-encoded body parsing
app.use(express.urlencoded({ extended: true }));
// Middleware for plain text body parsing
app.use(express.text());

const router = express.Router();

router.get<
  { postId: string }, ApiResponse | { status: "error" | "ok", type: string, message?: string, data?: InitResponse }
>("/api/init", async (_req, res): Promise<void> =>
{
  const { postId } = context;

  if (!postId)
  {
    console.error("API Init Error: postId not found in devvit context");
    res.status(400).json({
      status: "error",
      type: "init",
      message: "postId is required but missing from context"
    });
    return;
  }

  try
  {
    const [exp, level, username] = await Promise.all([
      redis.get("exp"),
      redis.get("level"),
      reddit.getCurrentUsername(),
    ]);

    let initResp: InitResponse = {
      postId: postId,
      exp: exp ? parseInt(exp) : 1,
      level: level ? parseInt(level) : 0,
      next_level_exp: level ? (parseInt(level) + 1) * 100 : 100,
      username: username ?? "anonymous",
    };
    res.json({
      type: "init",
      status: "ok",
      data: initResp,
    });
  } catch (error)
  {
    console.error(`API Init Error for post ${postId}:`, error);
    let errorMessage = "Unknown error during initialization";
    if (error instanceof Error)
    {
      errorMessage = `Initialization failed: ${error.message}`;
    }
    res.status(400).json({ type: "init", status: "error", message: errorMessage });
  }
});

router.post<
  { postId: string }, ApiResponse | { status: "error" | "ok", type: string, message?: string, data?: IncrementResponse },
  unknown
>("/api/increment", async (_req, res): Promise<void> =>
{
  const { postId } = context;
  if (!postId)
  {
    res.status(400).json({
      type: "increment",
      status: "error",
      message: "postId is required",
    });
    return;
  }

  res.json({
    type: "increment",
    status: "ok",
    data: {

      count: await redis.incrBy("count", 1),
      postId,
    } as IncrementResponse,
  });
});

router.post<
  { postId: string }, ApiResponse | { status: "error" | "ok", type: string, message?: string, data?: DecrementResponse },
  unknown
>("/api/decrement", async (_req, res): Promise<void> =>
{
  const { postId } = context;
  if (!postId)
  {
    res.status(400).json({
      type: "decrement",
      status: "error",
      message: "postId is required",
    });
    return;
  }

  res.json({
    type: "decrement",
    status: "ok",
    data: {
      count: await redis.incrBy("count", -1),
      postId,
    } as DecrementResponse,
  });
});


// Internal Devvit routes for app installation and menu actions

router.post("/internal/on-app-install", async (_req, res): Promise<void> =>
{
  try
  {
    const post = await createPost();

    res.json({
      status: "success",
      message: `Post created in subreddit ${context.subredditName} with id ${post.id}`,
    });
  } catch (error)
  {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: "error",
      message: "Failed to create post",
    });
  }
});

router.post("/internal/menu/post-create", async (_req, res): Promise<void> =>
{
  try
  {
    const post = await createPost();

    res.json({
      navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`,
    });
  } catch (error)
  {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: "error",
      message: "Failed to create post",
    });
  }
});

app.use(router);

const server = createServer(app);
server.on("error", (err) => console.error(`server error; ${err.stack}`));
server.listen(getServerPort());
