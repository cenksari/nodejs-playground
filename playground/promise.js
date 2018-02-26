const asyncFn = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject("async error");
      resolve('async resolve');
    }, 3000);
  });

asyncFn()
  .then(output => output.toUpperCase())
  .then((upperCaseOutput) => {
    console.log(upperCaseOutput);
  })
  .then(() => {
    console.log('last then');
  })
  .catch(err => console.log(err));


const asyncFn1 = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('async resolve 1');
    }, 3000);
  });

const asyncFn2 = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('async resolve 2');
    }, 3000);
  });

Promise.all([asyncFn1(), asyncFn2(), 'sync data'])
  .then(values => console.log(values));
