# gatsby-plugin-emoji-cursor

Gatsby plugin to add emjois which trail behind your cursor

![demo of plugin](https://user-images.githubusercontent.com/71047/71690111-a3ff2200-2d58-11ea-9f21-954d8aa68712.gif)


Demo: https://www.toomanyhams.com/

## Install

`npm install --save gatsby-plugin-emoji-cursor`


## How to use

```
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-emoji-cursor`,
   // These are the default options.
    options: {
      emoji: [`🐖`],
      fontSize: `80px`,
    },
  }
],
```
