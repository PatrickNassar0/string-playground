# string-playground

String utility functions for clean and consistent text handling in TypeScript and JavaScript.

---

## 🚀 Features

- Convert strings to `slug`, `camelCase`, `snack_case` or `dot.case`.
- Capitalize the first word or every word.
- Clean the string form strings that are provided in the blacklist.
- Remove numbers, symbols, or extra whitespace.
- Count words accurately.
- Zero dependencies, easy to use anywhere.

---

## 📦 Installation

```bash
npm install string-playground
# or
pnpm install string-playground
# or
yarn add string-playground
```

---

## 🛠️ Usage

### modifyString (str, operation, blacklist, caseSensitive)
```bash
import { modifyString } from 'string-playground';
modifyString({ str: "Hello World!", operation: "toSlug" }); // "hello-world"
modifyString({ str: "hello world", operation: "capitalizeFirstWord" }); // "Hello world"
modifyString({ str: "hello world", operation: "capitalizeWords" }); // "Hello World"
modifyString({ str: "hello world", operation: "camelCase" }); // "helloWorld"
modifyString({ str: "hello world", operation: "snackCase" }); // "hello_world"
modifyString({ str: "hello world", operation: "countWords" }); // 2
modifyString({ str: "hello123 world456", operation: "removeNumbers" }); // "hello world"
modifyString({ str: "hello! world#", operation: "onlyLetters" }); // "hello world"
modifyString({ str: "hello    world", operation: "removeExtraSpaces" }); // "hello world"
modifyString({ str: "hello world", operation: "dotCase" }); // "hello.world"
modifyString({ str: "This is a test", operation: "removeWords", blacklist: ["is", "a"] }); // "This test" 
```
---

## 🧪 Run Tests

```bash
npm test
```

---

## 📄 License

MIT © Patrick Nassar
### Have fun :)
