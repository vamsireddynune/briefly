document.addEventListener("DOMContentLoaded", () => {
    const summarizeBtn = document.getElementById("summarizeBtn");
    const summaryOutput = document.getElementById("summaryOutput");
  
    // Listen for a click on the summarize button
    summarizeBtn.addEventListener("click", async () => {
      summaryOutput.innerText = "Extracting text, and summarizing...";
      summarizeBtn.disabled = true; // Disable button to prevent multiple clicks
  
      try {
        // 1. Get the current active tab
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
  
        // 2. Execute a function directly on the target page.
        // This function will extract text and then call the Summarizer API
        // within the page's context, maintaining the user gesture chain.
        const injectionResults = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: async () => {
            // This code runs inside the context of the target web page.
            const pageText = document.body.innerText;
  
            // Ensure the Summarizer API is available in this context
            if (
              "Summarizer" in window &&
              window.Summarizer &&
              typeof window.Summarizer.create === "function"
            ) {
              let summarizer;
              const options = {
                sharedContext:
                  "A general summary to help a user decide if the text is worth reading",
                type: "key-points", // or "key-points", "teaser", "headline"
                length: "long", // or "medium", "long"
                format: "plain-text", // or "markdown"
              };
              try {
                // Check API availability status more robustly
                const availability = await window.Summarizer.availability();
  
                if (availability === "unavailable") {
                  return "Summarizer API is not available on this device.";
                } else if (availability === "available") {
                  summarizer = await window.Summarizer.create(options);
                } else {
                  summarizer = await window.Summarizer.create(options);
                  summarizer.addEventListener("downloadprogress", (e) => {
                    console.log(`Downloaded ${e.loaded * 100}%`);
                  });
                  await summarizer.ready;
                }
                // Call the summarize method.
                const summary = await summarizer.summarize(pageText);
                return summary; // Return the summary to the popup script
              } catch (apiError) {
                // Catch errors specifically from the Summarizer API calls
                console.error("Summarizer API error in page context:", apiError);
                return `Summarization failed on page: ${apiError.message}. Ensure Chrome is updated and flags are enabled.`;
              }
            } else {
              return "Summarizer API not detected in page context. Make sure it's enabled in chrome://flags.";
            }
          },
        });
  
        // 3. Receive the result from the executed script (the summary or an error message)
        if (
          injectionResults &&
          injectionResults[0] &&
          typeof injectionResults[0].result === "string"
        ) {
          summaryOutput.innerText = injectionResults[0].result;
        } else {
          summaryOutput.innerText =
            "Failed to get summary from page (unexpected result).";
        }
      } catch (error) {
        // Handle errors that occur in the popup script itself (e.g., scripting API issues)
        console.error("Error in popup script executing content:", error);
        summaryOutput.innerText = `An extension error occurred: ${error.message}`;
      } finally {
        summarizeBtn.disabled = false; // Re-enable button
      }
    });
  });
  