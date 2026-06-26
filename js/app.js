async function init() {
  const matches =
    await ESPNProvider.getMatches();

  renderMatches(matches);
}

init();
