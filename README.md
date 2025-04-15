# Why?

I made this becuase... becuase... okay, I have no idea why I made this.

## Usage

To use this run the command:

```Bash
node index.js
```

Then paste the files in the out directory into your project and use the module like this:

```JavaScript
import isOdd from './isOdd.js';

(async () => {
    console.log(await isOdd(1)); // true
    console.log(await isOdd(1048576)); // false
    console.log(await isOdd(17321)); // true
})();
```
