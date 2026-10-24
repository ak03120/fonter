chrome.runtime.onInstalled.addListener(() => {
  chrome.fontSettings.setFont({ genericFamily: "standard", fontId: "Comic Sans MS" });
  chrome.fontSettings.setFont({ genericFamily: "sansserif", fontId: "Comic Sans MS" });
});
