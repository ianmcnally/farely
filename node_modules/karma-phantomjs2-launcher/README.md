karma-phantomjs2-launcher
=========================

> Launcher for [PhantomJS 2]. As for now it is temporary solution, until default karma-phantomjs-launcher is not support of the PhantomJS 2. PhantomJS 2 is not stable [PhantomJS-2](https://github.com/ariya/phantomjs/wiki/PhantomJS-2) Loading PhantomJS from custom ULR can be done by setting the `PHANTOMJS2_DOWNLOAD_URL` environment variable.
>
> Installation
> ------------

The easiest way is to keep `karma-phantomjs-launcher` as a devDependency in your `package.json`.

```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-phantomjs2-launcher": "~0.1"
  }
}
```

You can simple do it by:

```bash
npm install karma-phantomjs2-launcher --save-dev
```

Configuration
-------------

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS2', 'PhantomJS2_custom'],

    // you can define custom flags
    customLaunchers: {
      'PhantomJS2_custom': {
        base: 'PhantomJS2',
        options: {
          windowName: 'my-window',
          settings: {
            webSecurityEnabled: false
          },
        },
        flags: ['--load-images=true'],
        debug: true
      }
    },

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    }
  });
};
```

You can pass list of browsers as a CLI argument too:

```bash
karma start --browsers PhantomJS2_custom
```

---

For more information on Karma see the [homepage](http://karma-runner.github.com).
