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
