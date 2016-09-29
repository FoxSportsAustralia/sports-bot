const superAgent = require('superagent');
const get = require('lodash/get');
const moment = require('moment');

const {firstEntityValue} = require('../util/helpers');
const AWESOME_API = require('../util/env').getEnvSetting('awesomeApi');

module.exports = function getFixture({context, entities}) {
    console.log('get fixture', entities);
    const team = firstEntityValue(entities, 'fsa_team');
    const intent = firstEntityValue(entities, 'intent');

    context.fsa_team = team;
    context.intent = intent;

    return new Promise(function(resolve, reject) {
        const url = AWESOME_API +
            '/schedule/upcomingmatches' +
            `?teamA=${team}`;

        console.log(`Search for ${team} next fixture`);
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
                    const teamB = get(match, 'teamB.name', 'Unknown team');
                    const venue = get(match, 'venue.name', 'Unknown location');

                    return `${matchHumanTime} for ${teamA} vs ${teamB} at ${venue}`;
                };

                if (values.length) {
                    if (values.length === 1) {
                        context.upcomingFixture = massageMatch(get(values, '[0]'));
                    } else {
                        context.upcomingFixture = '\n' + values.map(massageMatch).join('\n');
                    }
                } else {
                    context.noFixture = true;
                }

                console.log('returning context', context);

                return resolve(context);
            });
    });
};
