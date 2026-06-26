const ESPN_SCOREBOARD =
  "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard";

class ESPNProvider {
  static async getMatches() {
    try {
      const res = await fetch(ESPN_SCOREBOARD);
      const data = await res.json();

      return data.events || [];
    } catch (err) {
      console.error("ESPN fetch failed", err);
      return [];
    }
  }
}
