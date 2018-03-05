var sql = require ("mssql");

// connect to your SQL database
var database = require('./config/database'); 			// load the database config
sql.connect(database.dbConfig, function (err) {
    if (err) console.log(err);
    console.log("SQL Database Connected!");
});

var request = new sql.Request();

//Return all members
function getWishList(res) {

    request.query('select * from Members ORDER BY fID', function(err,items){

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        // console.log(items);
        res.json(items); // return all items in JSON format
    });
};

//Return all occasions
function getWishListOcc(res) {

    request.query('select * from Occasions ORDER BY oID', function(err,itemsOcc){

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        // console.log(items);
        res.json(itemsOcc); // return all items in JSON format
    });
};

//Return all items on the wish list
function getWishListWish(res) {
    request.query('  SELECT iID, itemDescription, itemList.fID, itemList.oID, fName, occasion\n' +
        '  FROM itemList, Members, Occasions\n' +
        '  WHERE itemList.fID = Members.fID and itemList.oID = Occasions.oID\n' +
        '  ORDER BY iID', function(err,itemsList){

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        // console.log(itemsList);
        res.json(itemsList); // return all items in JSON format
    });
};

module.exports = {

    //All database logic resides here

    retrieveListSQL: function (req, res) {
        request.query('select * from Members ORDER BY fID', function(err,items){

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            console.log(items);
            res.json(items); // return all items in JSON format

        });
    },

    retrieveListSQLOcc: function (req, res) {
        request.query('select * from Occasions ORDER BY oID', function(err,itemsOcc){

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            console.log(itemsOcc);
            res.json(itemsOcc); // return all items in JSON format

        });
    },

    retrieveListSQLList: function (req, res) {
        request.query('  SELECT iID, itemDescription, itemList.fID, itemList.oID, fName, occasion\n' +
            '  FROM itemList, Members, Occasions\n' +
            '  WHERE itemList.fID = Members.fID and itemList.oID = Occasions.oID\n' +
            '  ORDER BY iID', function(err,itemsList){

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            console.log(itemsList);
            res.json(itemsList); // return all items in JSON format

        });
    },

    //create an item on the list, information comes from AJAX request from Angular
    createItem: function (req, res) {
        var listArr = [
            {
                name: req.body.text,
                bDay: req.body.birthday,
                hobbyList: req.body.hobbies,

            }];
        console.log(listArr);

        request.query("INSERT INTO Members (fName, birthday, hobbies) VALUES ('" + listArr[0].name + "','" + listArr[0].bDay + "','" + listArr[0].hobbyList + "')", function(err,items){

            if (err)
                res.send(err);
            console.log(err);
            getWishList(res);
        });
    },

    //create an item on the list, information comes from AJAX request from Angular
    createOcc: function (req, res) {
        var listArr = [
            {
                occ: req.body.text,

            }];
        console.log(listArr);

        request.query("INSERT INTO Occasions (occasion) VALUES ('" + listArr[0].occ + "')", function(err,itemsOcc){

            if (err)
                res.send(err);
            console.log(err);
            getWishListOcc(res);
        });
    },

    //create an item on the list, information comes from AJAX request from Angular
    createWish: function (req, res) {
        var listArr = [
            {
                name: req.body.fam,
                occasion: req.body.occ,
                wishItem: req.body.text,

            }];

        console.log(listArr);

        request.query("INSERT INTO itemList (itemDescription, fID, oID) VALUES ('" + listArr[0].wishItem + "','" + listArr[0].name + "','" + listArr[0].occasion + "')", function(err,itemsList){

            if (err)
                res.send(err);
            console.log(err);
            getWishListWish(res);

        });
    },

    //Delete an item Fam
    deleteItem: function (req, res) {

        var indexNum = req.params.items_id;
        console.log(indexNum);

        request.query("SELECT count(*) as numRecords FROM itemList WHERE fID = '" + indexNum + "'", function(err,fkResult){
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

                if (fkResult.recordset[0].numRecords === 0){
                    request.query("DELETE FROM Members WHERE fID = '" + indexNum + "'", function (err, items) {
                        if (err)
                            res.send(err);
                        console.log(err);
                        console.log("Member deleted!")
                        getWishList(res);
                    });
                }else{
                    console.log('FK constraint violation - no action taken')
                    getWishList(res);
                }
        });

    },

    //Delete an item occ
    deleteItemOcc: function (req, res) {

        var indexNum = req.params.items_id;
        console.log(indexNum);

        request.query("SELECT count(*) as numRecords FROM itemList WHERE oID = '" + indexNum + "'", function(err,fkResult){
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            if (fkResult.recordset[0].numRecords === 0){
                request.query("DELETE FROM Occasions WHERE oID = '" + indexNum + "'", function (err, itemsOcc) {
                    if (err)
                        res.send(err);
                    console.log(err);
                    console.log("Occasion deleted!")
                    getWishListOcc(res);
                });
            }else{
                console.log('FK constraint violation - no action taken')
                getWishListOcc(res);
            }
        });
    },

    //Delete an item from the list
    deleteItemWish: function (req, res) {

        var indexNum = req.params.items_id;
        console.log(indexNum);

        request.query("DELETE FROM itemList WHERE iID = '" + indexNum + "'", function(err,itemsList){
            if (err)
                res.send(err);
            console.log(err);
            console.log("Item deleted!")
            getWishListWish(res);
        });
    }
}


