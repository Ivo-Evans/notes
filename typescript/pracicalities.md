
## Links

TS in 5 minutes: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

crash course
- part 1: React https://medium.com/@richardprasad42/typescript-with-react-crash-course-7a81013a8f64
- part 2: Express https://medium.com/better-programming/create-an-express-server-using-typescript-dec8a51e7f8d

Docs on types: https://www.typescriptlang.org/docs/handbook/basic-types.html

## Installation

```
npm i -g typescript
```

## Compilation and quickly testing ts code

The best thing to do is to create an empty directory, put a .ts file in it, and then run `tsc <filename> -w`. If you have a tsconfig.json, you can omit the filename.  If you're testing React-specific typescript, you can run ```yarn create react-app --template typescript```, then yarn start as normal (or `npx create-react-app --template typescript` and `npm start`)
