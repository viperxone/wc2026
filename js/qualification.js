class QualificationEngine {

  static getQualified(standings) {

    const qualified = [];
    const thirdPlace = [];

    Object.entries(standings)
      .forEach(([group, teams]) => {

      const sorted =
        Object.entries(teams)
        .sort((a,b)=>{

          const ta=a[1];
          const tb=b[1];

          if(tb.pts!==ta.pts)
            return tb.pts-ta.pts;

          return tb.gd-ta.gd;

        });

      if(sorted[0]) {
        qualified.push({
          group,
          position:1,
          team:sorted[0][0]
        });
      }

      if(sorted[1]) {
        qualified.push({
          group,
          position:2,
          team:sorted[1][0]
        });
      }

      if(sorted[2]) {
        thirdPlace.push({
          group,
          team:sorted[2][0],
          ...sorted[2][1]
        });
      }

    });

    thirdPlace.sort((a,b)=>{

      if(b.pts!==a.pts)
        return b.pts-a.pts;

      return b.gd-a.gd;

    });

    const bestEight =
      thirdPlace.slice(0,8);

    return {
      qualified,
      bestEight
    };
  }

}
