function renderMatches(matches) {

  const container =
    document.getElementById("liveContainer");

  if (!container) return;

  if (!matches || !matches.length) {

    container.innerHTML = `
      <p>No matches available.</p>
    `;

    return;
  }

  container.innerHTML =
    matches
      .slice(0, 20)
      .map(match => `
        <div class="match-card">

          <div class="teams">
            <strong>${match.homeTeam || "TBD"}</strong>
            ${match.homeScore ?? "-"}
            -
            ${match.awayScore ?? "-"}
            <strong>${match.awayTeam || "TBD"}</strong>
          </div>

          <div class="status">
            ${match.status || ""}
          </div>

          <div class="venue">
            ${match.venue || ""}
          </div>

          <div class="group">
            ${match.group || ""}
          </div>

        </div>
      `)
      .join("");

}

function renderGroups(groups) {

  const container =
    document.getElementById("groupContainer");

  if (!container) return;

  container.innerHTML = "";

  Object.entries(groups)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([group, teams]) => {

      const sorted =
        Object.entries(teams)
          .sort((a, b) => {

            const ta = a[1];
            const tb = b[1];

            if (tb.pts !== ta.pts)
              return tb.pts - ta.pts;

            return tb.gd - ta.gd;
          });

      const rows =
        sorted
          .map(([team, stats]) => `
            <tr>
              <td>${team}</td>
              <td>${stats.played}</td>
              <td>${stats.won}</td>
              <td>${stats.drawn}</td>
              <td>${stats.lost}</td>
              <td>${stats.gf}</td>
              <td>${stats.ga}</td>
              <td>${stats.gd}</td>
              <td><strong>${stats.pts}</strong></td>
            </tr>
          `)
          .join("");

      const block =
        document.createElement("div");

      block.className = "match-card";

      block.innerHTML = `
        <h3>${group}</h3>

        <table width="100%">
          <thead>
            <tr>
              <th>Team</th>
              <th>P</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>Pts</th>
            </tr>
          </thead>

          <tbody>
            ${rows}
          </tbody>
        </table>
      `;

      container.appendChild(block);

    });

}

function renderBracket(matches) {

  const container =
    document.getElementById("bracketContainer");

  if (!container) return;

  if (!matches || !matches.length) {

    container.innerHTML =
      "<p>No knockout data yet.</p>";

    return;
  }

  container.innerHTML =
    matches
      .map(match => `
        <div class="match-card">

          <strong>
            ${match.home || "TBD"}
          </strong>

          <div style="margin:8px 0;">
            vs
          </div>

          <strong>
            ${match.away || "TBD"}
          </strong>

        </div>
      `)
      .join("");

}
