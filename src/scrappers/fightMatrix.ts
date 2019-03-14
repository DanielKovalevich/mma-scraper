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

        return fighter;

    }

}

export default FightMatrix;