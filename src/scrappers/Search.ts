import Fighter from "../models/fighter";
const fetch = require('node-fetch');

abstract class Search {

    protected constructor(websiteToQuery: string) {

        this.websiteToSearch = websiteToQuery;
    }

    /**
     * The website which this search class is tasked with searching
     */
    protected websiteToSearch: string;

    /**
     * Function which should take in a fighter name, and return a {Fighter} object with all of the information
     * this website is tasked with handling
     * @param fighterName
     */
    abstract getFighterInformation(fighterName: String): Promise<Fighter>;

    /**
     * Function which should take a fighterName, and return a URL for that fighters information page
     * @param fighterName
     */
    abstract async getFighterUrl(fighterName: String): Promise<string>;

    /**
     * Function which pulls the HTML dom from a URL
     * @param url
     */
    protected static async getHtmlFromUrl(url: string) {

        const response = await fetch(url);
        return await response.text();

    }
}

export default Search;