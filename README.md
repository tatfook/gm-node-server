# gm-node-server

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

新建config.local.js, 并配置gmClientManager

rebuild proto

```bash
$ node_modules/protobufjs/bin/pbjs --keep-case proto/**/*.proto > proto/bundle.json
```


```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

新建config.prod.js, 并配置gmClientManager

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org
