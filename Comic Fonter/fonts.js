const base = chrome.runtime.getURL("fonts/");
if (!base.startsWith("chrome-extension:")) {
  for (const [file, weight] of [["KiwiMaru-Light.woff2", "300"], ["KiwiMaru-Regular.woff2", "400"], ["KiwiMaru-Medium.woff2", "500"]]) {
    document.fonts.add(new FontFace("Comic Fonter Kiwi Maru", `url("${base}${file}")`, { weight }));
  }
  for (const [file, weight] of [["ComicNeue-Regular.woff2", "400"], ["ComicNeue-Bold.woff2", "700"]]) {
    document.fonts.add(new FontFace("Comic Fonter Comic Neue", `url("${base}${file}")`, { weight }));
  }
}

const iconText = /[-\u{F0000}-\u{10FFFD}]/u;
const pending = new Set([document.documentElement]);
const markIcons = () => {
  for (const root of pending) {
    if (!root.isConnected) continue;
    for (const el of [root, ...root.querySelectorAll("*")]) {
      if (el.hasAttribute("data-fonter-icon")) continue;
      if ([...el.childNodes].some(n => n.nodeType === 3 && iconText.test(n.data)) || iconText.test(getComputedStyle(el, "::before").content + getComputedStyle(el, "::after").content)) {
        el.setAttribute("data-fonter-icon", "");
      }
    }
  }
  pending.clear();
};
requestAnimationFrame(markIcons);
addEventListener("load", () => {
  pending.add(document.documentElement);
  markIcons();
});
new MutationObserver(records => {
  if (!pending.size) requestAnimationFrame(markIcons);
  for (const r of records) {
    for (const n of r.addedNodes) {
      if (n.nodeType === 1) pending.add(n);
      else if (n.parentElement) pending.add(n.parentElement);
    }
  }
}).observe(document.documentElement, { childList: true, subtree: true });
