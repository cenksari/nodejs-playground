const users = [
  {
    id: 1,
    name: 'John',
    lastName: 'PETRUCCI',
  },
  {
    id: 2,
    name: 'John',
    lastName: 'MYUNG',
  },
  {
    id: 3,
    name: 'James',
    lastName: 'LABRIE',
  },
  {
    id: 4,
    name: 'Jordan',
    lastName: 'RUDESS',
  },
];

// runs till the end of the array
const filterUser = users.filter((user) => {
  if (user.id === 3) {
    return user;
  }

  return undefined;
});

console.log(JSON.stringify(filterUser));
