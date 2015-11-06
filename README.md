## scratch-www
#### Standalone web client for Scratch

[![Build Status](https://magnum.travis-ci.com/LLK/scratch-www.svg?token=xzzHj4ct3SyBTpeqxnx1)](https://magnum.travis-ci.com/LLK/scratch-www)

### To Build
```bash
npm install
npm run build
```

During development, you can use `npm run watch` to cause any update you make to files in either `./static` or `./src` to trigger a rebuild of the project.

### To Run
```bash
npm start
```

or to start and watch at once
```bash
npm run dev
```

Once running, open `http://localhost:8333` in your browser. If you wish to have the server reload automatically, you can install either [nodemon](https://github.com/remy/nodemon) or [forever](https://github.com/foreverjs/forever).

### To stop
```bash
# Stops all `start` and `watch` processes
npm stop
```

#### Configuration

`npm start` and `npm run watch` can be configured with the following environment variables

| Variable      | Default                               | Description                                    |
| ------------- | ------------------------------------- | ---------------------------------------------- |
| `API_HOST`    | `https://api.scratch.mit.edu`         | Hostname for API requests                      |
| `NODE_ENV`    | `null`                                | If not `production`, app acts like development |
| `PORT`        | `8333`                                | Port for devserver (http://localhost:XXXX)     |
| `PROXY_HOST`  | `https://scratch.mit.edu`             | Pass-through location for scratchr2            |

### To Test
```bash
npm test
```
