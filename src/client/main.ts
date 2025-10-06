
import
{
  ApiResponse,
} from "../shared/types/api";

/*
  import { navigateTo } from "@devvit/web/client";
  navigateTo("https://developers.reddit.com/docs");
*/

let currentPostId: string | undefined = undefined;

(window as any).apiCall = async function apiCall(endpoint: string, method: "POST" | "GET")
{
  try
  {
    const response = await fetch(endpoint, { method: method });
    if (!response.ok)
    {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let resp: ApiResponse = (await response.json()) as ApiResponse;
    currentPostId = resp.data?.postId;
    (window as any).collectorApp.message(resp);
  } catch (error)
  {
    console.error(`Error during API call to ${endpoint}:`, error);
    (window as any).collectorApp.message({ status: "error", type: "error", message: (error as Error).message } as ApiResponse);
  }
}

/*
async function updateCounter(action: "increment" | "decrement")
{
  if (!currentPostId)
  {
    console.error("Cannot update counter: postId is not initialized.");
    // Optionally, you could try to re-initialize or show an error to the user.
    return;
  }

  try
  {
    const response = await fetch(`/api/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // The body can be an empty JSON object or include the postId if your backend expects it,
      // but based on your server code, postId is taken from req.devvit.
      body: JSON.stringify({}),
    });
    if (!response.ok)
    {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as
      | IncrementResponse
      | DecrementResponse;
    counterValueElement.textContent = data.count.toString();
  } catch (error)
  {
    console.error(`Error ${action}ing count:`, error);
    // Optionally, display an error message to the user in the UI
  }
}
*/
