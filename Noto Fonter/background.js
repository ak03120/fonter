chrome.runtime.onInstalled.addListener(() => {
  chrome.fontSettings.setFont({ genericFamily: "standard", fontId: "Noto Sans JP" });
  chrome.fontSettings.setFont({ genericFamily: "sansserif", fontId: "Noto Sans JP" });
});
