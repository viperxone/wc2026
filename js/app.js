async function init() {

  const matches =
    await ESPNProvider.getMatches();

  renderMatches(matches);

  const standings =
    StandingsEngine.build(matches);

  renderGroups(standings);

  const qualified =
    QualificationEngine
    .getQualified(standings);

  const bracket =
    BracketEngine
    .generate(qualified);

  renderBracket(bracket);

}

init();

if ("serviceWorker" in navigator) {

  navigator.serviceWorker
    .register("./sw.js");

}
