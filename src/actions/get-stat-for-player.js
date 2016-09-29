const superAgent = require('superagent');
const get = require('lodash/get');

const {firstEntityValue} = require('../util/helpers');
const AWESOME_API = require('../util/env').getEnvSetting('awesomeApi');

module.exports = function getStatForPlayer({context, entities}) {
    console.log('get stat for player', entities);
    const playerName = firstEntityValue(entities, 'contact');
    const statType = firstEntityValue(entities, 'statType');

    return new Promise(function(resolve, reject) {
        const url = AWESOME_API +
            '/playerstats/currentseason?' +
            'player=' + encodeURI(playerName) +
            '&statType=' + statType;

        context.playerName = playerName;
        context.statType = statType;

        console.log('Searching for ' + playerName + ' for stat ' + statType);
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

                if (values.length) {
                    if (values.length === 1) {
                        context.careerStat = get(values, '[0]value');
                        context.playerName = get(values, '[0]fullName');
                    } else {
                        context.multipleCareerStat = values.map((entry) => {
                            return get(entry, 'fullName', 'Unknown Player') + ': ' + get(entry, 'value', '-');
                        });
                    }
                } else {
                    context.noCareerStat = true;
                }

                console.log('returning context', context);

                return resolve(context);
            });
    });
};
