class Fighter {
    public name: string;
    public constructor(name?: string) {
        this.name = name || "";
    }

    public winsInLastFiveMatches = 0;
}

export default Fighter;