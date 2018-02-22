const Connection = require("tedious").Connection;
const Request = require("tedious").Request;
const TYPES = require("tedious").TYPES;

const config = {
    userName: "cenk",
    password: "p@assword",
    server: "CENKSARI",
    options: {
        database: "nodejsdatabase",
        encrypt: false // Set true if you're on Azure
    }
};

const connection = new Connection(config);

connection.on('connect', function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("connected");

        executeStatement();
    }
});

executeStatement = () => {
    request = new Request("SELECT * FROM users WHERE id=@id;", function(err) {
        if (err) {
            console.log(err);
        }
    });
    request.addParameter('id', TYPES.Int, 1);

    let result = "";

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log("NULL");
            }
            else {
                result += column.value + " ";
            }
        });
        console.log(result);

        result = "";
    });

    request.on('doneInProc', function(rowCount, more) {
        console.log(rowCount + ' row(s) returned');
    });

    request.on('requestCompleted', function() {
        connection.close();

        console.log("request completed. connection closed.");
    });

    connection.execSql(request);
}