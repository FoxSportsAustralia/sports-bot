const superAgent = require('superagent');
const get = require('lodash/get');

const {firstEntityValue, normaliseStatForAPI} = require('../util/helpers');
const STATS_API = require('../util/env').getEnvSetting('statsApi');
const STATS_API_KEY = require('../util/env').getEnvSetting('statsApiKey');

// sort=tryAssists

module.exports = function getTopStats({context, entities}) {
    console.log('getTopStats', entities);
    const intent = firstEntityValue(entities, 'intent');
    const limit = firstEntityValue(entities, 'number') || 5;
    const statType = firstEntityValue(entities, 'statType');
    const sentiment = firstEntityValue(entities, 'sentiment') || 'Top';

    return new Promise(function(resolve, reject) {
        let url = STATS_API +
            '/sports/league/series/1/';

        if (intent == 'getTopTeams') {
            url += 'teamslabseriesseasonstats.json;startSeason=114;endSeason=114;page=1';
        } else {
            url += 'playerslabseriesseasonstats.json;startSeason=114;endSeason=114;page=1';
        }

        if (limit <= 10) {
            context.number = limit;
            url += `;pageSize=${limit}`;
        } else {
            context.number = 5;
            url += ';pageSize=5';
        }

        url += `;sort=${normaliseStatForAPI(statType)}`;

        if (sentiment != 'Top') {
            url += '|asc';
        }

        url += `?userkey=${STATS_API_KEY}`;

        context.intent = intent;
        context.statType = statType;
        context.sentiment = sentiment;

        console.log(`Searching ${context.number} ${context.sentiment} ${context.intent} stat ${context.statType}`);
        console.log('url', url);
        console.log();

        superAgent.get(url)
            .end((err, res) => {
                let values;

                if (intent == 'getTopTeams') {
                    values = get(res, 'body.teams', []);
                } else {
                    values = get(res, 'body.players', []);
                }

                if (err) {
                    console.error('Issue with API');
                    return reject();
                }

                console.log('VALUES!', values.length);

                if (intent == 'getTopTeams') {
                    if (values.length === 0) {
                        context.noTopTeamResults = true;
                    } else {
                        context.topTeamResults = '\n' +
                            values.map((entry) => {
                                return `* ${get(entry, 'display_name', 'Unknown Team')}: ` +
                                    get(entry, `stats.${normaliseStatForAPI(statType)}`, '-');
                            }).join('\n');
                    }
                } else {
                    if (values.length === 0) {
                        context.noTopPlayerResults = true;
                    } else {
                        context.topPlayerResults = '\n' +
                            values.map((entry) => {
                                return `* ${get(entry, 'full_name', 'Unknown Player')}: ` +
                                    get(entry, `stats.${normaliseStatForAPI(statType)}`, '-');
                            }).join('\n');
                    }
                }

                console.log('returning context', context);

                return resolve(context);
            });
    });
};
