const readline = require('readline');

class AbortError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'AbortError';
    this.cause = options.cause;
  }
}

function validateAbortSignal(signal, paramName) {
  if (!signal || typeof signal !== 'object' || typeof signal.aborted !== 'boolean') {
    throw new TypeError(`${paramName} must be an AbortSignal object.`);
  }
}

let addAbortListener = (signal, listener) => {
  signal.onabort = listener;
  return { [Symbol.dispose]: () => { signal.onabort = null; } };
};

class UserInput {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  question(query, options = {}) {
    return new Promise((resolve, reject) => {
      let cb = resolve;

      if (options?.signal) {
        validateAbortSignal(options.signal, 'options.signal');
        if (options.signal.aborted) {
          reject(new AbortError(undefined, { cause: options.signal.reason }));
          return;
        }

        const onAbort = () => {
          // Handle abort signal
          reject(new AbortError(undefined, { cause: options.signal.reason }));
        };

        const disposable = addAbortListener(options.signal, onAbort);

        cb = (answer) => {
          // Clean up abort listener
          disposable[Symbol.dispose]();
          resolve(answer);
        };
      }

      // Implement your input logic here
      this.getUserInput(query, cb);
    });
  }

  // Placeholder for your custom logic to obtain user input

  // functions to take input

  getInt(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, (input) => {
        try {
          const intValue = parseInt(input);
          if (!isNaN(intValue)) {
            resolve(intValue);
          } else {
            throw new Error('Invalid input. Please enter a valid integer.');
          }
        } catch (error) {
          console.log(`Error: ${error.message}`);
          // Clean up after validation error
          this.getInt(prompt);
        }
      });
    });
  }

 
  getBool(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, (input) => {
        try {
          const lowerCaseInput = input.toLowerCase();
          if (lowerCaseInput === 'true' || lowerCaseInput === 'false') {
            resolve(lowerCaseInput === 'true');
          } else {
            throw new Error('Invalid input. Please enter either "true" or "false".');
          }
        } catch (error) {
          console.log(`Error: ${error.message}`);
          // Clean up after validation error
          this.getBool(prompt);
        }
      });
    });
  }

  getBigInt(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, (input) => {
        try {
          const bigIntValue = BigInt(input);
          resolve(bigIntValue);
        } catch (error) {
          console.log(`Error: ${error.message}`);
          // Clean up after validation error
          this.getBigInt(prompt);
        }
      });
    });
  }

  getString(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, (input) => {
        resolve(input);
      });
    });
  }


  close() {
    this.rl.close();
  }
}

function createUserInput() {
  return new UserInput();
}

module.exports = {
  UserInput,
  createUserInput,
  AbortError,
  validateAbortSignal,
};
