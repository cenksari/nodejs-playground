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

// Stops after found one
const user = users.find(function(user) {
    if (user.name == 'James') {
        return user;
    }
});

console.log(user);