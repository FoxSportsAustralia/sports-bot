module.exports = function getStatForPlayerBetween({context, entities}) {
    console.log('get stat for player between', entities);

    return new Promise(function(resolve, reject) {
        context.betweenstat = 'stat player between not implemented';

        return resolve(context);
    });
};
