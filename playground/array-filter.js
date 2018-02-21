const users = [
    {
        "id": 1,
        "name": "John",
        "lastName": "PETRUCCI"
    },
    {
        "id": 2,
        "name": "John",
        "lastName": "MYUNG"
    },
    {
        "id": 3,
        "name": "James",
        "lastName": "LABRIE"
    },
    {
        "id": 4,
        "name": "Jordan",
        "lastName": "RUDESS"
    }
];

// runs till the end of the array
const user = users.filter(function (user) {
    if (user.id == 3) {
        return user;
    }
});

console.log(JSON.stringify(user));