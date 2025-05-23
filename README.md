This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## Environment Keys
To create environment data file,
please create a .env.local file 
to store key parameters

Environment parameters for this project:
- Postgresql drizzle database URL
- Youtube channel URL
- Youtube Data V3 API Key



## Short explanation of your architecture decisions
The architecture is basically using mvc pattern.
Backend business service logics are in the api folder. 
Each webpage is independent.
## If you implement extra features, mention them.
The website has three parts

1. Home
   You can search any channel you want through the 
   search bar and add to your own MyList. Before 
   adding channels intoMyList, please login first.

2. MyList
   All of your preferable channels are in this list.

3. Login
   Login by enter your id and name.
   You can register if you don't have one.

## How to run tests (if any)
To test the channel function,  
please run the test in the terminal:

``` bash
npm run test
```

the test script is in src/channel.test.ts
