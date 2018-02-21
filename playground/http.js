const http = require("http");
const queryString = require("querystring");

function postData() {
    const postData = queryString.stringify({
        'msg': 'Hello world!'
    });

    const options = {
        hostname: "www.google.com",
        method: "POST",
        path: "/upload",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(postData)
        }
    };

    const req = http.request(options, (res) => {
        console.log(`Status code : ${res.statusCode}`);
        console.log(`Headers : ${JSON.stringify(res.headers)}`);

        res.setEncoding("utf8");

        res.on('data', (chunk) => {
            console.log(`Body : ${chunk}`);
        });
    });

    req.on('error', (err) => {
        console.error(`Problem with request : ${err.message}`);
    });

    req.write(postData);
    req.end();
}

function getData() {
    http.get('http://jsonplaceholder.typicode.com/users/1', (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;

        if (statusCode !== 200) {
            error = new Error("Request failed.\n" +
            `Status code: ${statusCode}`);
        }
        else if (!/^application\/json/.test(contentType)) {
            error = new Error("Invalid content-type.\n" +
            `Expected application/json but received ${contentType}`);
        }

        if (error) {
            console.error(error.message);

            res.resume();

            return;
        }

        res.setEncoding("utf8");

        let rawData = '';

        res.on('data', (chunk) => { rawData += chunk });

        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(parsedData);
            }
            catch (err) {
                console.error(err);
            }
        }).on('error', (err) => {
            console.error(`Got error : ${err.message}`);
        });
    });
}

postData();