var connectionProvider = require('./mySqlConnectionProvider.js');
var contactDao = {
    getAllContacts: function (callback) {
    
        var connection = connectionProvider.mySqlConnectionProvider.getSqlConnection();
        var sql = "SELECT * FROM CONTACTLIST";
        var contacts = [];
        if (connection) {
            connection.query(sql, function (err, rows, fields) {
            
                rows.forEach(function (row) {
                    contacts.push(row);
                });
                 
                callback(contacts);
            });
        }
        connectionProvider.mySqlConnectionProvider.closeSqlConnection(connection);
    },
    createContact: function (contacts,callback){
         
        var connection = connectionProvider.mySqlConnectionProvider.getSqlConnection();
        
       
        if (connection) {
            connection.query('INSERT INTO ContactList SET ?', contacts, function (err, res) {
                if (err)
                    console.log('errror');
                else
                    console.log('done');
                callback(res);
            });
        }
        connectionProvider.mySqlConnectionProvider.closeSqlConnection(connection);
    },
    readContact: function (id, callback) {
        
        var connection = connectionProvider.mySqlConnectionProvider.getSqlConnection();
        
        if (connection) {
            connection.query('SELECT * FROM ContactList WHERE ID = ?', [id], function (err, res) {
                if (err)
                    console.log('errror');
                else
                    console.log('ok ');
                callback(res);
            });
        }
        connectionProvider.mySqlConnectionProvider.closeSqlConnection(connection);
    },
 
 updateContact: function (contacts,id, callback) {
    
    var connection = connectionProvider.mySqlConnectionProvider.getSqlConnection();
    
    if (connection) {
        connection.query('UPDATE ContactList SET ContactName=?,Mobile=?,IsActive=? WHERE ID = ?', [contacts.ContactName, contacts.Mobile,contacts.IsActive,id], function (err, res) {
            if (err)
                console.log('errror');
            else
                console.log('Changed ' + res.changedRows + ' rows');
            callback(res);
        });
    }
    connectionProvider.mySqlConnectionProvider.closeSqlConnection(connection);
},
    deleteContact: function (id, callback) {
        
        var connection = connectionProvider.mySqlConnectionProvider.getSqlConnection();
 
        if (connection) {
            connection.query('DELETE FROM ContactList WHERE id = ?', [id], function (err, res) {
                if (err)
                    console.log('errror');
                else
                    console.log('Deleted ' + res.affectedRows + ' rows');
                callback(res);
            });
        }
        connectionProvider.mySqlConnectionProvider.closeSqlConnection(connection);
    }
 
};

module.exports.contactDao = contactDao;