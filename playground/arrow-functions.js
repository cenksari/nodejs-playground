const fn1 = message => console.log(message);

fn1('message goes here');

const fn2 = (message1, message2) => {
  console.log(`${message1} : ${message2}`);
};

fn2('parameter1', 'parameter2');
