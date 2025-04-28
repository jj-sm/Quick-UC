chrome.runtime.sendMessage({ greeting: "hello" }, (response) => {
    console.log("Received response: ", response);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
});