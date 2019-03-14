import BingSearch from "./BingSearch";
import Fighter from "../models/fighter";

let cheerio = require("cheerio");

class FightMatrix extends BingSearch{

    async getFighterInformation(fighterName: string): Promise<Fighter> {

        // Retrieve the HTML content for FightMatrix given the fighter name provided in the function parameter
        let html = await BingSearch.getHtmlFromUrl(await this.getFighterUrl(fighterName));
        const $ = cheerio.load(html.toString());

        let fighter: Fighter = new Fighter;
        // The fighter name
        fighter.name = fighterName;

        //TODO: Keep at this part and parse the data using Cheerio at this point!
        let mainTable = $(".tblRank");

        // Get Age
        let ageSearch = mainTable.text().search("Age:");
        if(ageSearch != -1) {
            // This implies that the fighter is in double digits of age. This is normal
            fighter.age = mainTable.text().substring(ageSearch + 5, ageSearch + 7);
        }

        // Get the number of wins in the last five matches
        let lastFiveSearch = mainTable.text().search("Last 5:");
        if(lastFiveSearch != -1) {
            let work = mainTable.text().substring(lastFiveSearch + 8, lastFiveSearch + 17).split(" ");
            fighter.winsInLastFiveMatches = 0;
            for(let letter of work) {
                if(letter == 'W') {
                    fighter.winsInLastFiveMatches += 1;
                }
            }
        }

        // Get the number of wins/losses/draws from their big league fights
        let winCount = mainTable.text().search("'Big League' Record: ");
        if(winCount != -1) {
            let work = mainTable.text().substring(winCount + 21, winCount + 27).split("-");

            //TODO: This needs fixed, it's not removing \n properly for some reason..
            for(let value in work) {
                // Remove any bad characters here
                value = value.replace("\D", "");
                value = value.replace("\n", "");
            }

            // Turn the indexes into the proper variable
            fighter.wins = work[0];
            fighter.losses = work[1];
            fighter.draws = work[2];
        }

        // Get FightMatrix's 540 metric. (Their own ranking system)
        let metric = mainTable.text().search("540 Metric: ");
        if(metric != -1) {
            fighter.fightMatrixMetric = mainTable.text().substring(metric + 12, metric + 16);
        }

        // Get the win finish %
        let winPercent = mainTable.text().search("Win Finish %");
        if(winPercent != -1) {
            let work = mainTable.text().substring(winPercent + 14, winPercent + 19);
            work = work.replace("%", "");
            fighter.winFinishPercent = work / 100;
        }

        // Get the Quality Perf. %
        let qualityPerf = mainTable.text().search("Quality Perf. %:");
        if(qualityPerf != -1) {
            let work = mainTable.text().substring(qualityPerf + 17, qualityPerf + 22);
            work = work.replace("%", "");
            fighter.qualityPerfPercent = work / 100;
        }

        // Number of losses/wins/draws in the last three years
        let threeYearWins = mainTable.text().search("Last 3 Years:");
        if(threeYearWins != -1) {
            let work = mainTable.text().substring(threeYearWins + 14, threeYearWins + 21).split("-");
            // Get rid of everything that isn't a character
            //TODO: This needs fixed, it's not removing \n properly for some reason..
            for(let value in work) {
                // Remove any bad characters here
                value = value.replace("\D", "");
                value = value.replace("\n", "");
            }

            fighter.winsLastThreeYears = work[0];
            fighter.lossesLastThreeYears = work[1];
            fighter.drawsLastThreeYears = work[2];
        }




        console.log(fighter);

        return fighter;

    }

}

export default FightMatrix;