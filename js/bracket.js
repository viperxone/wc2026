class BracketEngine {

  static generate(data) {

    const teams =
      data.qualified
      .map(x=>x.team);

    while(teams.length < 32){
      teams.push("TBD");
    }

    const matches=[];

    for(let i=0;i<32;i+=2){

      matches.push({
        home:teams[i],
        away:teams[i+1]
      });

    }

    return matches;

  }

}
