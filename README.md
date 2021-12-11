# nullstack-to-njs
Parser from something to the Nullstack **njs** file

[!nullstack-tsx-example video](https://user-images.githubusercontent.com/31557312/145647166-0f0e019b-ddc8-4ab9-9234-6b6d6daa885e.mp4)

## Use

[See the repository of the example project shown in video](https://github.com/GuiDevloper/nullstack-tsx-example)

This is a CLI that watches everything in current directory **src** folder, copying to a **out** folder and converting/cleaning **tsx** files into **njs** ones.

It takes the place of the `start` script, keeps the Nullstack own CLI running and re-compiles whenever a file inside **src** changes.

```diff
# package.json scripts
- "start": "npx nullstack start"
+ "start": "npx nullstack-to-njs"
```

> 💡 It even accepts whatever args you would pass to the Nullstack CLI

Then everything you need is to update whatever path that would point to **src**, but now to **out** folder (e.g. `Application` component called in **client.js**/**server.js**).

## Features

Writing code in TSX brings the known TS features in editor, and some are very fitting for Nullstack development experience:

### Typing of Component Props

![Typing of Component Props Example](https://github.com/GuiDevloper/nullstack-to-njs/blob/master/assets/component-props-typing.png?raw=true)

When declared in component `constructor`, editors understands which props it requires and their respective types.

```tsx
type Props = Context & {
  /**
   * The project name that Home needs
   */
  projectName: string
}

class Home extends Nullstack {
  constructor(_: Props) {
    super();
  }
  ...
}
```

After conversion to **njs**, the above code becomes:

```jsx
class Home extends Nullstack {
  constructor(_) {
    super();
  }
  ...
}
```

### Docs inside Context typings

![Docs inside Context typings Example](https://github.com/GuiDevloper/nullstack-to-njs/blob/master/assets/context-typing-docs.png?raw=true)

The Nullstack Team have been working in concepts like joining the docs and code, TS typing files came as the target to invest to best achieve this.

Currently in improvement, our typing files are ready for some tests in the [nullstack-types repo](https://github.com/GuiDevloper/nullstack-types) and as [npm package](https://npmjs.com/package/nullstack-types).

Typing files finally found it's perfect use inside TSX files, to use them, currently you should install as follows:

```
npm install nullstack-types -D
```

and add this reference line on top of files where you want to consume it:

```jsx
/// <reference types="nullstack-types"/>
```

### Example of Conversion

```diff
- App.tsx
+ App.njs
- /// <reference types="nullstack-types"/>
import Nullstack from 'nullstack';

- type Props = {};
- type myCtx = Context & Props;
- interface mineCtx extends Context {}

- const value1: string = '';
+ const value1 = '';
- const value2: Array<number> = [1, 2];
+ const value2 = [1, 2];
- const value3: number[] = [1, 2];
+ const value3 = [1, 2];

class App extends Nullstack {
- constructor(_: Props) {
+ constructor(_) {
    super();
  }

- componentValue: string = '';
+ componentValue = '';

- render(ctx: mineCtx) {}
+ render(ctx) {}
}
```

## Motivation

By default [Nullstack framework](https://nullstack.app) uses a **.njs** file  and specific syntax, which limits the recognition of it's scripts by file editors with strict rules (e.g. VSCode with TSServer).

There's many ways to implement this support, this project is an example of one that invests on converting and cleaning a file type (**.tsx**) for it to become a simple **njs** file understandable by Nullstack.

Making possible the use of TSX file features without even knowing deeply or messing with the framework insides.