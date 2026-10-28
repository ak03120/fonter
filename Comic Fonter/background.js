chrome.runtime.onInstalled.addListener(() => {
  if (!chrome.fontSettings) return;
  chrome.fontSettings.setFont({ genericFamily: "standard", fontId: "Comic Sans MS" });
  chrome.fontSettings.setFont({ genericFamily: "sansserif", fontId: "Comic Sans MS" });
});
