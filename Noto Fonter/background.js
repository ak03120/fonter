chrome.runtime.onInstalled.addListener(() => {
  if (!chrome.fontSettings) return;
  chrome.fontSettings.setFont({ genericFamily: "standard", fontId: "Noto Sans JP" });
  chrome.fontSettings.setFont({ genericFamily: "sansserif", fontId: "Noto Sans JP" });
});
