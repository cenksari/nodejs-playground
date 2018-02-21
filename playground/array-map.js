const array = [
    'John', 'Jack', 'Jordan', 'Mike'
];

const result = array.map(function(name) {
    return name.toUpperCase();
});

console.log(result);