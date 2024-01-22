const { createUserInput } = require('./lib/user-input');

(async () => {
  // Create a user input instance
  const userInput = createUserInput();

  // Get an integer from the user
  const a = await userInput.getInt('Enter an integer: ');
  console.log(a);

  // Get a boolean from the user
  const b = await userInput.getBool('Enter a boolean (true/false): ');
  console.log(b);

  // Get a bigint from the user
  const bigInt = await userInput.getBigInt('Enter a bigint: ');
  console.log(bigInt);

  // Get a string from the user
  const str = await userInput.getString('Enter a string: ');
  console.log(str);

  // Close the user input instance
  userInput.close();
})();
