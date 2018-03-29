# create-react-redux-pack
> react + redux + webpack boilerplate

## Install
```
$ npm i create-react-redux-pack -g
```

```
$ create-react-redux-pack
```

## Usage
* Just type like this

```
$ npm start

──────────────
🛫  Webpack Dev Server (PORT: 3000)                                     // Running Webpack Dev Server(PORT 3000).
🛫  Webpack Dev Server (PORT 3000) -> UI SERVER (PORT 8088) (PROXY)     // Running Webpack Dev Server(PORT 3000) -> UI SERVER (PORT 8088) (PROXY).
🚀  Build JS(Production)                                                // Build JS(Production)
──────────────
😢  Exit
──────────────
```

* How To API proxy setting

```
//whitelist.js
module.exports = {
    /** 
     *  "domain": [
     *      "uri1",
     *      "uri2",
     *      "uri3",
     *      ...
     *  ]
     */
};
```

```
//example.jsx
...
componentDidMount() {
    axios.get('/uri1')   // proxy
    .then(res => {
        // Do something...
    });
}
...
```
