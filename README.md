## Briefly Chrome Extension
This Chrome extension allows you to quickly summarize the text content of any web page using the experimental Browser Summarizer API.

### Features
- Extracts main text content from the active web page.

- Generates a concise summary (tldr; short, key-points) using the browser's built-in AI model.

- Displays the summary directly in the extension's popup window.

### Prerequisites
Before using or developing with this extension, you must enable the experimental Summarizer API flag in your Chrome browser:

1. Open Chrome and navigate to chrome://flags.

2. In the search bar, type "Summarization" or " Summarization API".

3. Locate the flag named `Summarization API for Gemini Nano` (the exact name may vary slightly across Chrome versions).

4. Set its value to Enabled.

5. Relaunch your Chrome browser when prompted.

**Note:** This API is experimental and may not be available in all Chrome versions or on all devices. It may also require a one-time download of an AI model by the browser upon first use.

### Installation for Developers
To load and test this extension in your Chrome browser:

1. **Clone the this repository:** Clone this repository into your local machine.

2. **Open Chrome Extensions Page:**
In your Chrome browser, type chrome://extensions in the address bar and press Enter.

3. **Enable Developer Mode:**
In the top-right corner of the Extensions page, toggle on the "Developer mode" switch.

4. **Load the Unpacked Extension:**
Click the "Load unpacked" button that appears on the left side.

5. **Select Your Extension Folder:**
Navigate to and select the `briefly` folder you created in step 1.

6. **Verify Installation:**
The "Briefly" extension icon should now appear in your Chrome toolbar.

### Usage
1. **Navigate to a Web Page:**
Open any web page that contains a significant amount of text you wish to summarize.

2. **Click the Extension Icon:**
Click on the "Briefly" icon in your Chrome toolbar. This will open the extension's popup window.

3. **Generate Summary:**
Click the "Summarize Page" button within the popup.

4. **View Summary:**
The summary of the web page content will be displayed in the summaryOutput area of the popup. If the AI model needs to download, you might see a brief message indicating that before the summary appears.

### Troubleshooting
- `NotAllowedError: Requires a user gesture...`: Ensure the Summarizer API flag (Summarization API for Gemini Nano) is enabled in `chrome://flags`. Also, confirm that your Chrome browser is up-to-date.

- **"Summarizer API not available...":** This means the API is not detected or supported by your current browser configuration. Double-check the flag and Chrome version.

- **No Summary / Empty Output:** The page might not have enough extractable text, or there might be an issue with the AI model. Check the extension's console for more detailed errors (see "Debugging" section below).

### Debugging
To debug the popup.js (and any related logic):

1. Go to chrome://extensions.

2. Ensure "Developer mode" is enabled.

3. Under the "Briefly" extension, click the link that says "Inspect views: popup.html".

4. This will open a dedicated Developer Tools window for your extension's popup, where you can view console logs, set breakpoints, and inspect elements.

Feel free to contribute or suggest improvements!