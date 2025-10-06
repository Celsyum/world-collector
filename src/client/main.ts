
import
{
  ApiResponse,
} from "../shared/types/api";
//import { navigateTo } from "@devvit/web/client";

const counterValueElement = document.getElementById(
  "counter-value"
) as HTMLSpanElement;

/*
const incrementButton = document.getElementById(
  "increment-button"
) as HTMLButtonElement;
const decrementButton = document.getElementById(
  "decrement-button"
) as HTMLButtonElement;
*/

//const docsLink = document.getElementById("docs-link") as HTMLDivElement;

/*
docsLink.addEventListener("click", () =>
{
  navigateTo("https://developers.reddit.com/docs");
});
*/

//const titleElement = document.getElementById("title") as HTMLHeadingElement;

//let currentPostId: string | null = null;


async function fetchInit()
{
  try
  {
    const response = await fetch("/api/init");
    if (!response.ok)
    {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    const data = (await response.json()) as ApiResponse;
    (window as any).collectorApp.message(data);
  } catch (error)
  {
    console.error("Error fetching initial count:", error);
    counterValueElement.textContent = "Error";
  }
}

//@ts-ignore
function collectorMessage(data: any): void
{
  console.log("Collector message received: " + data);
  //swith ant test
}

(window as any).collectorMessage = collectorMessage;


async function apiCall(endpoint: string, method: "POST" | "GET", callback: (data: any, error?: string | null) => void)
{
  try
  {
    const response = await fetch(endpoint, { method: method });
    if (!response.ok)
    {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    callback(data);
  } catch (error)
  {
    console.error(`Error during API call to ${endpoint}:`, error);
    callback(null, (error as Error).message);
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

//incrementButton.addEventListener("click", () => updateCounter("increment"));
//decrementButton.addEventListener("click", () => updateCounter("decrement"));

// Fetch the initial count when the page loads
fetchInit();
