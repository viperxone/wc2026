function renderMatches(matches) {
  const container = document.getElementById("liveContainer");

  if (!matches.length) {
    container.innerHTML = "<p>No matches available.</p>";
    return;
  }

  container.innerHTML = matches
    .slice(0, 20)
    .map(match => {
      const comp = match.competitions?.[0];

      if (!comp) return "";

      const home = comp.competitors?.find(
        c => c.homeAway === "home"
      );

      const away = comp.competitors?.find(
        c => c.homeAway === "away"
      );

      return `
        <div class="match-card">
          <div class="teams">
            <strong>${home?.team?.displayName || "?"}</strong>
            ${home?.score || 0}
            -
            ${away?.score || 0}
            <strong>${away?.team?.displayName || "?"}</strong>
          </div>

          <div class="status">
            ${match.status?.type?.description || ""}
          </div>
        </div>
      `;
    })
    .join("");
}
