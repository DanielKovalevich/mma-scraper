class Fighter {

    public name: string;
    public age = NaN;

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

    // Number of wins/loss/draws in the big league
    public wins = NaN;
    public losses = NaN;
    public draws = NaN;

    // FightMatrix's own metric (range between 0 and 1) -- Their 540 Metric
    public fightMatrixMetric = NaN;

    // Fighters win finish percentage (in decimal form, ranges from 0 to 1);
    public winFinishPercent = NaN;

    // FightMatrix's Quality Preference %
    public qualityPerfPercent = NaN;

    // Number of wins/loss/draws in the last 3 years
    public winsLastThreeYears = NaN;
    public lossesLastThreeYears = NaN;
    public drawsLastThreeYears = NaN;


    public constructor(name?: string) {
        this.name = name || "";
    }


}

export default Fighter;