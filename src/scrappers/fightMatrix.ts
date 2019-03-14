let cheerio = require("cheerio");

class Matrix {
    public constructor() {
        // stuff
    }

    /**
     * Function which handles pulling the URL for the fighter from the Bing search functions
     */
    public async getFighterUrl(fighterName: String) {
        let CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;
        let WebSearchAPIClient = require('azure-cognitiveservices-websearch');

        let credentials = new CognitiveServicesCredentials(process.env.BING_API);
        let webSearchApiClient = new WebSearchAPIClient(credentials);

        let searchResult: Promise<any> = await webSearchApiClient.web.search("site:fightmatrix.com" + fighterName);

        console.log(searchResult);
    }
}

export default Matrix;