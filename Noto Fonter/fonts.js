const base = chrome.runtime.getURL("fonts/");
if (!base.startsWith("chrome-extension:")) {
  document.fonts.add(new FontFace("Noto Fonter Sans JP", `url("${base}NotoSansJP.woff2")`, { weight: "100 900" }));
}
