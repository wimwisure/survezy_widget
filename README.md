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
  <script defer="defer" src="https://api.survezy.in/survezy/1.0.26/survezy.js"></script>
</head>

<body>
  <button type="button"
    onClick="(function(){survezy.Show('eventId');})();">
    Open Survey
  </button>

</body>

</html>
```

### Android

> Install via gradle

```groovy
  allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```
> If your gradle version is higher than 6.5, add the below code in settings.gradle.

```groovy
dependencyResolutionManagement {
    ...
    repositories {
        ...
        maven{url 'https://jitpack.io'}
    }
}
```

> Add dependency in your app's build.gradle file
```groovy
defaultConfig {
    ....
    minSdkVersion 21
}

dependencies {
    implementation 'com.github.wimwisure:survezy_android:1.3'
}
```

> Uses

```kt
val survezy = Survezy(context)

survezy.show(eventId)
```
