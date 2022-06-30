function scrollDown() {
  const { documentElement } = document;
  let time = setInterval(() => {
    if (window.scrollY < documentElement.scrollHeight - documentElement.clientHeight) {
      window.scrollBy(0, 1);
    } else {
      clearInterval(time);
    }
  }, 10);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "new_tab") {
    chrome.tabs.create({ url: message.url }, (newTab) => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, tab) {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);
          chrome.scripting.executeScript({
            target: { tabId },
            func: scrollDown,
          });
        }
      });
    });
  }
});
