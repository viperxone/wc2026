const ESPN_SCOREBOARD =
  "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard";

class ESPNProvider {

  static async getMatches() {

    const res =
      await fetch(ESPN_SCOREBOARD);

    const data =
      await res.json();

    return (data.events || [])
      .map(event=>{

        const comp =
          event.competitions?.[0];

        const competitors =
          comp?.competitors || [];

        const home =
          competitors.find(
            x=>x.homeAway==="home"
          );

        const away =
          competitors.find(
            x=>x.homeAway==="away"
          );

        const group =
          comp?.altGameNote
          ?.replace(
            "FIFA World Cup, ",
            ""
          );

        return {

          id:event.id,

          group,

          homeTeam:
            home?.team?.displayName,

          awayTeam:
            away?.team?.displayName,

          homeScore:
            Number(home?.score ?? null),

          awayScore:
            Number(away?.score ?? null),

          status:
            event.status?.type?.description,

          venue:
            comp?.venue?.fullName

        };

      });

  }

}
