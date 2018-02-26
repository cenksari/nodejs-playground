process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Remove this line in production

const CDocumentClient = require('documentdb').DocumentClient;

const config = {
  host: 'https://localhost:8081',
  authKey: 'C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==',
  databaseId: 'NodeJS',
  collectionId: 'Users',
};

const client = new CDocumentClient(
  config.host,
  { masterKey: config.authKey },
);

const HttpStatusCodes = { NOTFOUND: 404 };
const databaseUrl = `dbs/${config.databaseId}`;
const collectionUrl = `${databaseUrl}/colls/${config.collectionId}`;

const user = {
  id: 'abcd-1234-defg-5678',
  name: 'Cenk',
  lastName: 'SARI',
  email: 'cenk@cenksari.com',
};

function getDatabase() {
  console.log(`Getting database: \n${config.databaseId}\n`);

  return new Promise((resolve, reject) => {
    client.readDatabase(databaseUrl, (err, result) => {
      if (err) {
        if (err.code === HttpStatusCodes.NOTFOUND) {
          client.createDatabase(config.databaseId, (error, created) => {
            if (error) {
              reject(error);
            } else {
              resolve(created);
            }
          });
        } else {
          reject(err);
        }
      } else {
        resolve(result);
      }
    });
  });
}

function getCollection() {
  console.log(`Getting collection: \n${config.collectionId}\n`);

  return new Promise((resolve, reject) => {
    client.readCollection(collectionUrl, (err, result) => {
      if (err) {
        if (err.code === HttpStatusCodes.NOTFOUND) {
          client.createCollection(databaseUrl, config.collectionId, { offerThroughput: 400 }, (error, created) => {
            if (error) {
              reject(error);
            } else {
              resolve(created);
            }
          });
        } else {
          reject(err);
        }
      } else {
        resolve(result);
      }
    });
  });
}

function createDocument(document) {
  const documentUrl = `${collectionUrl}/docs/${document.id}`;
  console.log(`Getting document: \n${document.id}\n`);

  return new Promise((resolve, reject) => {
    client.readDocument(documentUrl, (err, result) => {
      if (err) {
        if (err.code === HttpStatusCodes.NOTFOUND) {
          console.log(`Document not found. Creating document: \n${document.id}\n`);
          client.createDocument(collectionUrl, document, (error, created) => {
            if (error) {
              reject(error);
            } else {
              resolve(created);
            }
          });
        } else {
          reject(err);
        }
      } else {
        resolve(result);
      }
    });
  });
}

function queryCollection() {
  console.log(`Querying collection through index: \n${config.collectionId}\n`);

  return new Promise((resolve, reject) => {
    client.queryDocuments(
      collectionUrl,
      'SELECT * FROM users',
    ).toArray((err, results) => {
      if (err) {
        reject(err);
      } else {
        results.forEach((queryResult) => {
          const resultString = JSON.stringify(queryResult);
          console.log(`Query returned: \n${resultString}\n`);
        });

        console.log();
        resolve(results);
      }
    });
  });
}

function replaceDocument(document) {
  const replacedDocument = document;

  const documentUrl = `${collectionUrl}/docs/${replacedDocument.id}`;
  console.log(`Replacing document:\n${replacedDocument.id}\n`);

  replacedDocument.name = 'Cenk 1';
  replacedDocument.lastName = 'SARI 1';
  replacedDocument.email = 'cenk2@cenksari2.com';

  return new Promise((resolve, reject) => {
    client.replaceDocument(documentUrl, replacedDocument, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function deleteDocument(document) {
  const documentUrl = `${collectionUrl}/docs/${document.id}`;
  console.log(`Deleting document:\n${document.id}\n`);

  return new Promise((resolve, reject) => {
    client.deleteDocument(documentUrl, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

getDatabase()
  .then(() => getCollection())
  .then(() => createDocument(user))
  .then(() => queryCollection())
  .then(() => replaceDocument(user))
  .then(() => queryCollection())
  .then(() => deleteDocument(user))
  .then(() => { console.log('Completed successfully'); })
  .catch((error) => { console.log(`Completed with error: ${JSON.stringify(error)}`); });
