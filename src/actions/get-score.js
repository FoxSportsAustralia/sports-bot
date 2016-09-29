const superAgent = require('superagent');
const get = require('lodash/get');
const moment = require('moment');

const {firstEntityValue} = require('../util/helpers');
const AWESOME_API = require('../util/env').getEnvSetting('awesomeApi');

module.exports = function getScore({context, entities}) {
    console.log('get score', entities);
    const teamA = firstEntityValue(entities, 'home');
    const teamB = firstEntityValue(entities, 'away');

    return new Promise(function(resolve, reject) {
        const url = AWESOME_API +
            '/schedule/results' +
            `?teamA=${teamA}` +
            `&teamB=${teamB}`;

        console.log(`Search for ${teamA} vs ${teamB} score`);
        console.log('url', url);
        console.log();

        superAgent.get(url)
            .end((err, res) => {
                const values = get(res, 'body', []);

                if (err) {
                    console.error('Issue with API');
                    return reject();
                }

                console.log('VALUES!', values);

                let massageMatch = function (match) {
                    const matchHumanTime = moment(get(match, 'matchDateTime')).format('MMMM Do YYYY, h:mm a');
                    const teamA = get(match, 'teamA.name', 'Unknown team');
                    const teamAScore = get(match, 'teamA.score', '-');
                    const teamB = get(match, 'teamB.name', 'Unknown team');
                    const teamBScore = get(match, 'teamB.score', '-');

                    return `${teamA} (${teamAScore}) vs ${teamB} (${teamBScore}) on ${matchHumanTime}`;
                };

                if (values.length) {
                    if (values.length === 1) {
                        context.matchResult = massageMatch(get(values, '[0]'));
                    } else {
                        context.matchResult = '\n' + values.map(massageMatch).join('\n');
                    }
                } else {
                    context.nomatchResult = true;
                }

                console.log('returning context', context);

                return resolve(context);
            });
    });
};
