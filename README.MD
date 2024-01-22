# User Input

A utility for handling user input in Node.js.

## Installation

```bash
npm install user-input

### USAGE

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



API
createUserInput()
Creates a new instance of the UserInput class.

UserInput
getInt(prompt: string): Promise<number>
Prompts the user with the given message (prompt) and resolves with the entered integer.

getBigInt(prompt: string): Promise<bigint>
Prompts the user with the given message (prompt) and resolves with the entered BigInt.

getBool(prompt: string): Promise<boolean>
Prompts the user with the given message (prompt) and resolves with the entered boolean.

getString(prompt: string): Promise<string>
Prompts the user with the given message (prompt) and resolves with the entered string.

close()
Closes the user input instance.

License
This project is licensed under the MIT License - see the LICENSE file for details. 