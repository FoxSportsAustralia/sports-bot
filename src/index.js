const {Wit, log} = require('node-wit');

const RtmClient = require('@slack/client').RtmClient;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

const {getEnvSetting} = require('./util/env');

const slackbotToken = getEnvSetting('slackbotToken');
// const slackbotName = getEnvSetting('slackbotName');
// const slackbotChannel = getEnvSetting('slackbotChannel');

// const witAiAppId = getEnvSetting('witAiAppId');
const witAiToken = getEnvSetting('witAiToken');

const rtm = new RtmClient(slackbotToken, {logLevel: 'error'});

const witClient = new Wit({
    accessToken: witAiToken,
    logger: new log.Logger(log.ERROR), // optional
    actions: {
        send(request, response) {
            const {sessionId, context, entities} = request;
            const {text, quickreplies} = response;

            return new Promise(function(resolve, reject) {
                console.log('sending...', JSON.stringify(response));

                rtm.sendMessage(text, context.slackChannel);

                return resolve();
            });
        },
        getScore: require('./actions/get-score'),
        getFixture: require('./actions/get-fixture'),
        getStatForPlayer: require('./actions/get-stat-for-player'),
        // getStatForPlayerBetween: require('./actions/get-stat-for-player-between'),
        getTopStats: require('./actions/get-top-stats')
    }
});

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
    const bot = rtm.dataStore.getUserById(rtm.activeUserId);

    if (message.user == bot.id) {
        console.log('message from me');

        return;
    }

    if (message.subtype) {
        console.log('ignored noise', message);

        return;
    }

    console.log(`Finding action for ${message.text}`);

    rtm.sendTyping(message.channel);

    witClient.runActions(
        message.user, // session
        message.text, // input
        {slackChannel: message.channel, slackUser: message.user} // context
    )
        .then(() => {
            console.log('all done');
        })
        .catch((e) => {
            console.log('');
            console.log('Oops! Got an error: ' + e);
            console.log('');

            rtm.sendMessage('Sorry, I got confused. Try again with different words.', message.channel);
        });
});

rtm.start();
