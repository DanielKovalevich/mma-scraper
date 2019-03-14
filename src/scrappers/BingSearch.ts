import Fighter from "../models/fighter";

const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;
const WebSearchAPIClient = require('azure-cognitiveservices-websearch');

const fetch = require('node-fetch');

abstract class BingSearch {

    /**
     * Ratelimiting variable which holds the number of requests made in the last second. This should never be above 3.
     */
    static queryCount = 0;

    private readonly websiteToQuery: String;

    /**
     * @param websiteToQuery the website which you would like this search to handle. (Eg: 'fightmatrix.com')
     */
    public constructor(websiteToQuery: String) {
        this.websiteToQuery = websiteToQuery;
    }

    abstract getFighterInformation(fighterName: String): Promise<Fighter>;

    /**
     * Function which handles pulling the URL for the fighter from the Bing search functions
     * Note that this will ALWAYS get the 1st url for the results, so you better hope that your fighter exists.
     */
    async getFighterUrl(fighterName: String) {

        // If we need to handle a ratelimit, delay this request.
        if(BingSearch.queryCount >= 3) {
            await this.sleepForRatelimit();
            BingSearch.queryCount = 0;
        }

        let credentials = new CognitiveServicesCredentials(process.env.BING_API);
        let webSearchApiClient = new WebSearchAPIClient(credentials);
        let searchResult = await webSearchApiClient.web.search("site:" + this.websiteToQuery + " " + fighterName);

        // @ts-ignore
        return searchResult.webPages.value[0].url;
    }

    /**
     * Function which sleeps for three and a half seconds to resolve the ratelimit on the BingAPI
     */
    private sleepForRatelimit() {
        return new Promise(resolve=>{
            setTimeout(resolve, 3500);
        });
    }

    /**
     * Function which pulls the HTML dom from a URL
     * @param url
     */
    protected static async getHtmlFromUrl(url: string) {

        return await fetch(url);

    }

}

export default BingSearch;