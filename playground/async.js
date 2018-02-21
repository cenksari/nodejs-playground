const asyncFn1 = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve("async resolve 1");
        }, 3000);
    });

const asyncFn2 = () =>
    new Promise((resolve) => {
        setTimeout(() => {
              resolve("async resolve 2");
        }, 3000);
    });

const main = async () => {
    console.log("start");

    const data1 = await asyncFn1();

    console.log("waiting fn1");

    const data2 = await asyncFn2();

    console.log("waiting fn2");

    console.log(`data 1 : ${data1} - data 2 : ${data2}`);
};

main();