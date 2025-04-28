chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);

    if (request.greeting === "hello") {
        sendResponse({ farewell: "goodbye" });
    }

    // Return true to indicate the response will be sent asynchronously
    return true;
});