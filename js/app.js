async function init() {
  const matches =
    await ESPNProvider.getMatches();

  renderMatches(matches);
}

init();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .catch(console.error);
}
