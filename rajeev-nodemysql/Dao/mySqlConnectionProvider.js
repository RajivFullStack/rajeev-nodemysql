var mysql = require('mysql');
var mySqlConnectionString = require('./mySqlConnectionString.js');
var mySqlConnectionProvider =
{
   
     getSqlConnection: function ()
     {
        console.log('calling');
        var connection = mysql.createConnection(mySqlConnectionString.mySqlconnectionString.connectionString);
        connection.connect(function (err) { 
            if (err)
                throw err;
            else
                console.log('connection open');
        });
        return connection;
    },
closeSqlConnection:function(currentConnection)
{
        currentConnection.end(function (err) {
        
            if (err)
                throw err;
            else
                console.log('connection closed');

        });
            
}
}
module.exports.mySqlConnectionProvider = mySqlConnectionProvider;