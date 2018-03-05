//Include DB methods
var db_handler = require('../app/db_handler');

module.exports = function (app) {

    // API Coordinate with front on on the request url names ('api/...')

    //GET - search database
    app.get('/api/items', db_handler.retrieveListSQL)
    app.get('/api/itemsOcc', db_handler.retrieveListSQLOcc);
    app.get('/api/itemsList', db_handler.retrieveListSQLList);

    // Create item and send back all items after creation
    app.post('/api/items', db_handler.createItem);

    // Create new occasion and send back all items after creation
    app.post('/api/occ', db_handler.createOcc);

    // Create new wish list item and send back all items after creation
    app.post('/api/wish', db_handler.createWish);

    // Delete an item
    app.delete('/api/items/:items_id', db_handler.deleteItem);

    // Delete an occasion
    app.delete('/api/occ/:items_id', db_handler.deleteItemOcc);

    // Delete an item from the wish list
    app.delete('/api/wish/:items_id', db_handler.deleteItemWish);

    // Main application loaded  -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile('./index.html', {root: __dirname}); // load the single view file (angular will handle the page changes on the front-end)
    });
};