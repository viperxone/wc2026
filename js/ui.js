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


function renderGroups(groups){

  const container =
    document.getElementById(
      "groupContainer"
    );

  container.innerHTML="";

  Object.entries(groups)
    .forEach(([group,teams])=>{

      const block =
        document.createElement("div");

      block.className =
        "match-card";

      const rows =
        Object.entries(teams)
        .map(([team,stats])=>`
          <tr>
            <td>${team}</td>
            <td>${stats.pts}</td>
          </tr>
        `)
        .join("");

      block.innerHTML=`
        <h3>${group}</h3>
        <table>
          ${rows}
        </table>
      `;

      container.appendChild(block);

    });

}

function renderBracket(matches){

  const container =
    document.getElementById(
      "bracketContainer"
    );

  container.innerHTML =
    matches
    .map(m=>`
      <div class="match-card">
        ${m.home}
        vs
        ${m.away}
      </div>
    `)
    .join("");

}
