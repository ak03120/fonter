const base = chrome.runtime.getURL("fonts/");
if (!base.startsWith("chrome-extension:")) {
  for (const [file, weight] of [["KiwiMaru-Light.woff2", "300"], ["KiwiMaru-Regular.woff2", "400"], ["KiwiMaru-Medium.woff2", "500"]]) {
    document.fonts.add(new FontFace("Comic Fonter Kiwi Maru", `url("${base}${file}")`, { weight }));
  }
  for (const [file, weight] of [["ComicNeue-Regular.woff2", "400"], ["ComicNeue-Bold.woff2", "700"]]) {
    document.fonts.add(new FontFace("Comic Fonter Comic Neue", `url("${base}${file}")`, { weight }));
  }
}
