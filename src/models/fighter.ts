class Fighter {
    
    public name: string;

    // ufc stats -- Initialize to NaN
    public sigStrikesLanded = NaN;
    public sigStrikesAttempted = NaN;
    public takedownsLanded = NaN;
    public takedownsAttempted = NaN;
    public sigStrLandedPerMin = NaN;
    public sigStrAbsorbedPerMin = NaN;
    public takedownAvgPer3Rounds = NaN;
    public submissionAvg = NaN;
    public sigStrDefense = NaN;
    public takedwownDefense = NaN;
    public knockdownRatio = NaN;
    public winsInLastFiveMatches = NaN;

    public constructor(name?: string) {
        this.name = name || "";
    }


}

export default Fighter;