const TConnection = require('tedious').Connection;
const TRequest = require('tedious').Request;
const TTYPES = require('tedious').TYPES;

const config = {
  userName: 'cenk',
  password: 'p@assword!',
  server: 'CENKSARI',
  options: {
    database: 'nodejsdatabase',
    encrypt: false, // Set true if you're on Azure
  },
};

const connection = new TConnection(config);

function executeStatement() {
  const request = new TRequest('SELECT * FROM users WHERE id=@id;', ((err) => {
    if (err) {
      console.log(err);
    }
  }));
  request.addParameter('id', TTYPES.Int, 1);

  let result = '';

  request.on('row', (columns) => {
    columns.forEach((column) => {
      if (column.value === null) {
        console.log('NULL');
      } else {
        result += `${column.value} `;
      }
    });
    console.log(result);

    result = '';
  });

  request.on('doneInProc', (rowCount) => {
    console.log(`${rowCount} row(s) returned`);
  });

  request.on('requestCompleted', () => {
    connection.close();

    console.log('request completed. connection closed.');
  });

  connection.execSql(request);
}

connection.on('connect', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected');

    executeStatement();
  }
});
