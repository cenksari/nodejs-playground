String.prototype.nameLength = function() {
    return this.valueOf().length;
};

const name = "Cenk SARI";
const getLength = name.nameLength();

console.log(getLength);