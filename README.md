 <!-- Title -->
 
<div align="center">
  <a href="https://github.com/Giogia/video-manager">
    <img alt="logo" src="https://user-images.githubusercontent.com/9254840/235371514-5a19d585-4da9-4435-977e-cee40c8abca7.png" height="96">
  </a>
  <h1> Video Manager </h1>
  <span> Synthesia Full Stack Developer Technical Challenge </span>
</div>

<br/>

 <!-- Tech Stack -->

<div align="center">
 <img src="https://user-images.githubusercontent.com/9254840/232627617-74388095-b8bc-4c73-b550-eb2362778a10.png" height="22" align="top">
 <a href="https://www.typescriptlang.org/">Typescript</a> 
 &nbsp
 <img src="https://user-images.githubusercontent.com/9254840/232625281-cc50795e-e848-4a4b-bf43-56c7ece6ca18.png" height="24" align="top"> 
 <a href="https://graphql.org">GraphQL</a> 
</div>

<br/>
<br/>

### Get Started

Clone git repository:
```bash
git clone https://github.com/Giogia/video-manager.git
```

<br/>

Then, install packages:

## Client

<div align="left">
  <b>Tech Stack:</b>
  &nbsp
  <img src="https://user-images.githubusercontent.com/9254840/236691098-41a20c83-ff5d-452e-bb39-49eb0db9bf9f.png" height="24" align="top">
  <a href="https://mui.com/">MUI</a>
  &nbsp
  <img src="https://user-images.githubusercontent.com/9254840/236691251-3cd72510-58d3-49b9-804c-073c2a86c96d.png" height="24" align="top">
  <a href="https://react.dev/">React</a>
  &nbsp
  <img src="https://user-images.githubusercontent.com/9254840/236691358-aa3f4d20-37d0-4e59-9c74-efb53a04fc87.png" height="24" align="top">
  <a href="https://relay.dev/">Relay</a>
</div>

<br/>

Move into package directory: 
```bash
cd video-manager-ui
```

### Installation

Install dependencies using [`Yarn`](https://yarnpkg.com/en/package/jest):
```bash
yarn install
```

### Usage

Start client:
```bash
yarn start
```
Then open http://localhost:3000 to see your app.

#### Storybook <img src="https://user-images.githubusercontent.com/9254840/235439558-81dbbafe-f269-41bf-bdb0-1d63099f7faf.png" align="top" height="20"/>

Explore client components: 
```bash
yarn storybook
```

#### Testing <img src="https://user-images.githubusercontent.com/9254840/235440034-650982d8-bd0d-466b-8bee-04027b81c0c2.png" align="center" height="20" /> <img src="https://user-images.githubusercontent.com/9254840/235439798-a784e1d8-69c9-4086-a73a-399e9149256b.png" align="center" height="24" />

Execute unit tests:
```bash
yarn test
```

Execute interaction tests using Storybook [`test runner`](https://storybook.js.org/docs/react/writing-tests/test-runner):
```bash
yarn test-components
```

Execute E2E Tests using [`Playwright`](https://playwright.dev/) runner tool:
```bash
yarn test-e2e
```

<br/>

## Server

<div align="left">
  <b>Tech Stack:</b>
  &nbsp
  <img src="https://user-images.githubusercontent.com/9254840/235509375-c35ae9ee-5fc5-474c-ab40-617bdc81e0a9.png" height="24" align="top">
  <a href="https://the-guild.dev/graphql/yoga-server">Yoga Server</a>
  &nbsp
  <img src="https://user-images.githubusercontent.com/9254840/232626853-a784deeb-069f-42d5-8d83-900ff705c8a1.png" height="24" align="top"> 
  <a href="https://typegraphql.com/">TypeGraphQL</a>
</div>
 
 <br/>

Move into package directory: 
```bash
cd video-manager-api
```

### Installation

Install dependencies using [`Yarn`](https://yarnpkg.com/en/package/jest):
```bash
yarn install
```

### Usage

Start Server:
```bash
yarn start
```
Then open http://localhost:4000 to interact with your server. 

#### GraphiQL

Visit `/graphql` to open the [`GraphiQL`](https://github.com/graphql/graphiql) editor.

#### Testing <img src="https://user-images.githubusercontent.com/9254840/235440034-650982d8-bd0d-466b-8bee-04027b81c0c2.png" align="center" height="20" /> 

Execute unit tests:
```bash
yarn test
```

<br/>

## Database

<div align="left">
  <b>Tech Stack:</b>
  &nbsp
  <img src="https://user-images.githubusercontent.com/9254840/235373041-37dd2269-49b9-4310-8fd3-b9ef66222bef.png" height="24" align="top">
  <a href="https://www.mongodb.com/">MongoDB</a>
  &nbsp-&nbsp
  <a href="https://www.mongodb.com/docs/drivers/node/current/fundamentals/gridfs/" />GridFS</a>
</div>

<br/>

Run a docker container:
```bash
docker run --name mongodb -d -p 27017:27017 mongo
```

### Connection

Use the following url to connect:
```bash
mongodb://localhost:27017
```

<br/>
