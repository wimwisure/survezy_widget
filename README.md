# Survezy Widget

[![NPM](https://img.shields.io/npm/v/survezy_widget.svg)](https://www.npmjs.com/package/survezy_widget) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Usage

### React

```bash
> npm install survezy_widget
```

```jsx
import React, { Component } from 'react'

import { Survezy } from 'survezy_widget'
import 'survezy_widget/dist/index.css'

class Example extends Component {
  render() {
     <Survezy eventId={"eventId"} darkMode />
  }
}
```

### HTML

```html
<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <title>Survezy JS</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <script defer="defer" src="https://survezy.in//survezy/1.0.23/survezy.js"></script>
</head>

<body>
  <button type="button"
    onClick="(function(){survezy.Show('eventId');})();">
    Open Survey
  </button>

</body>

</html>
```
