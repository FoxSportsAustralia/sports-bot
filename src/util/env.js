const get = require('lodash/get');
const environmentSettings = require('../../env.json');

exports.getEnvSetting = function (settingName) {
    return get(environmentSettings, settingName);
};
