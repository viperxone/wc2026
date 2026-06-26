class StandingsEngine {

  static createEmptyTable() {
    return {
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      pts: 0
    };
  }

  static build(matches) {

    const groups = {};

    matches.forEach(match => {

      const group =
        match.group || "Unknown";

      if (!groups[group]) {
        groups[group] = {};
      }

      const home = match.homeTeam;
      const away = match.awayTeam;

      if (!home || !away) return;

      if (!groups[group][home]) {
        groups[group][home] =
          this.createEmptyTable();
      }

      if (!groups[group][away]) {
        groups[group][away] =
          this.createEmptyTable();
      }

      if (
        match.homeScore === null ||
        match.awayScore === null
      ) {
        return;
      }

      const h = groups[group][home];
      const a = groups[group][away];

      h.played++;
      a.played++;

      h.gf += match.homeScore;
      h.ga += match.awayScore;

      a.gf += match.awayScore;
      a.ga += match.homeScore;

      h.gd = h.gf - h.ga;
      a.gd = a.gf - a.ga;

      if (match.homeScore > match.awayScore) {
        h.won++;
        a.lost++;
        h.pts += 3;
      }
      else if (match.homeScore < match.awayScore) {
        a.won++;
        h.lost++;
        a.pts += 3;
      }
      else {
        h.drawn++;
        a.drawn++;
        h.pts++;
        a.pts++;
      }

    });

    return groups;
  }

}
