class Fighter {
    private name: string;

    // ufc stats
    private sigStrikesLanded: number;
    private sigStrikesAttempted: number;
    private takedownsLanded: number;
    private takedownsAttempted: number;
    private sigStrLandedPerMin: number;
    private sigStrAbsorbedPerMin: number;
    private takedownAvgPer3Rounds: number;
    private submissionAvg: number;
    private sigStrDefense: number;
    private takedwownDefense: number;
    private knockdownRatio: number;

    public constructor(name?: string) {
        this.name = name || "";
    }

    public winsInLastFiveMatches = 0;
}

export default Fighter;