exports.firstEntityValue = function (entities, entity) {
    const val = entities && entities[entity] &&
        Array.isArray(entities[entity]) &&
        entities[entity].length > 0 &&
        entities[entity][0].value;

    if (!val) {
        return null;
    }

    return typeof val === 'object' ? val.value : val;
};

exports.normaliseStatForAPI = function (originalSearchTerm = '') {
    const searchTerm = originalSearchTerm.toLowerCase();

    switch (searchTerm) {
        case 'attacking kicks':
            return 'attackingKicks';

        case 'bombs caught':
            return 'bombsCaught';

        case 'bombs dropped':
            return 'bombsDropped';

        case 'charged down':
            return 'chargedDown';

        case 'charges down':
            return 'chargesDown';

        case 'drop outs':
            return 'dropOuts';

        case 'dummy half runs':
            return 'dummyHalfRuns';

        case 'effective offloads':
            return 'effectiveOffloads';

        case 'errors':
            return 'errors';

        case 'fantasy points':
            return 'fantasyPoints';

        case 'field goal attempts':
            return 'fieldGoalAttempts';

        case 'field goal misses':
            return 'fieldGoalMisses';

        case 'field goal percentage':
            return 'fieldGoalPercentage';

        case 'field goals':
            return 'fieldGoals';

        case 'forced drop outs':
            return 'forcedDropOuts';

        case 'games':
            return 'games';

        case 'general play pass':
            return 'generalPlayPass';

        case 'goal attempts':
            return 'goalAttempts';

        case 'goal percentage':
            return 'goalPercentage';

        case 'goals misses':
            return 'goalsMissed';

        case 'goals':
            return 'goals';

        case 'in goal escapes':
            return 'inGoalEscapes';

        case 'ineffective tackles':
            return 'ineffectiveTackles';

        case 'intercept':
            return 'intercepts';

        case 'intercepted':
            return 'intercepted';

        case 'intercepts':
            return 'intercepts';

        case 'interchanges off':
            return 'interchangesOff';

        case 'interchanges on':
            return 'interchangesOn';

        case 'kick errors':
            return 'kickErrors';

        case 'kick metres':
            return 'kickMetres';

        case 'kick return metres':
            return 'kickReturnMetres';

        case 'kick returns':
            return 'kickReturns';

        case 'kicks 40 20':
            return 'kicks4020';

        case 'kicks dead':
            return 'kicksDead';

        case 'kicks':
            return 'kicks';

        case 'last touch try assists':
            return 'lastTouchTryAssists';

        case 'lbassists':
            return 'lbAssists';

        case 'lbcauses':
            return 'lbCauses';

        case 'linebreaks':
            return 'lineBreaks';

        case 'long kicks':
            return 'longKicks';

        case 'metres per run':
            return 'metresPerRun';

        case 'mins played':
            return 'minsPlayed';

        case 'missed tackles':
            return 'missedTackles';

        case 'offloads':
            return 'offloads';

        case 'one pass runs':
            return 'onePassRuns';

        case 'penalties conceded':
            return 'penaltiesConceded';

        case 'play the balls':
            return 'playTheBalls';

        case 'points':
            return 'points';

        case 'possessions':
            return 'possessions';

        case 'run metres':
            return 'runMetres';

        case 'runs 7 less metres':
            return 'runs7LessMetres';

        case 'runs 8 plus metres':
            return 'runs8PlusMetres';

        case 'runs':
            return 'runs';

        case 'send offs':
            return 'sendOffs';

        case 'sin bins':
            return 'sinBins';

        case 'starts':
            return 'starts';

        case 'steals 1 on 1':
            return 'steals1On1';

        case 'stolen 1 on 1':
            return 'stolen1On1';

        case 'tackle busts':
            return 'tackleBusts';

        case 'tackle efficiency percentage':
            return 'tackleEfficiencyPercentage';

        case 'tackled opp 20':
            return 'tackledOpp20';

        case 'tackled opp half':
            return 'tackledOppHalf';

        case 'tackles 1 on 1':
            return 'tackles1On1';

        case 'tackles':
            return 'tackles';

        case 'tries':
            return 'tries';

        case 'try assists':
            return 'tryAssists';

        case 'try causes':
            return 'tryCauses';

        case 'try contributions':
            return 'tryContributions';

        case 'try involvements':
            return 'tryInvolvements';

        case 'try':
            return 'try';

        case 'twenty metre restarts':
            return 'twentyMetreRestarts';

        case 'weighted kicks':
            return 'weightedKicks';

        case 'wins':
            return 'wins';

        default:
            return originalSearchTerm;
    }
};
