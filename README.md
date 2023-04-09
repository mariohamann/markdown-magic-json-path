# markdown-magic-json-path

A Markdown Magic plugin to extract and insert specific values from JSON files into your Markdown documents.

## Setup

```sh
pnpm install markdown-magic-json-path --save-dev
```

**(If you don't use pnpm, replace `pnpm` with `npm` or `yarn`. Or better switch to [pnpm](https://pnpm.io/).)**

```js
"use strict";

const path = require("path");
const markdownMagic = require("markdown-magic");

const config = {
	transforms: {
		JSONPATH: require("markdown-magic-json-path"),
	},
};

const markdownPath = path.join(__dirname, "README.md");
markdownMagic(markdownPath, config);
```

## Example

```json
{
	"string": "hello world",
	"nested": {
		"string": "hello nested world",
		"array": ["hello", "nested", "world"]
	}
}
```

```md
<!-- AUTO-GENERATED-CONTENT:START (JSONPATH:src=./data.json&path=string) -->

hello world

<!-- AUTO-GENERATED-CONTENT:END -->

<!-- AUTO-GENERATED-CONTENT:START (JSONPATH:src=./data.json&path=nested.string) -->

hello nested world

<!-- AUTO-GENERATED-CONTENT:END -->

<!-- AUTO-GENERATED-CONTENT:START (JSONPATH:src=./data.json&path=nested.array[2]) -->

array

<!-- AUTO-GENERATED-CONTENT:END -->
```

## Disclaimer

Concepted by a human and written together with A.I. Usage at your own risk.
