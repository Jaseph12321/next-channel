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
- DATABASE_URL=your_postgresql_drizzle_database_url
- YOUTUBE_API_KEY=your_youtube_data_v3_api_key
- YOUTUBE_CHANNEL_URL=your_default_youtube_channel_url




## Architecture Overview
This project follows a simple MVC-style architecture:

Frontend Pages: Located in the app/ directory.

Backend Logic: API routes and business logic in pages/api/.

Modular Pages: Each page is self-contained for easy maintainability.

Features
Home Page

Search for any YouTube channel.

Add channels to your personalized MyList.

Requires login before adding channels.

MyList Page

Displays the list of your saved channels.

Login Page

Log in using your ID and name.

Option to register a new user.

## How to run tests (if any)
To test the channel function,  
please run the test in the terminal:

``` bash
npm run test
```

Test scripts are located in src/channel.test.ts

## Deployment

This project is deployment-ready and works best with Verce,the platform create by the Next.js team

1. Fork/clone this repository.
2. Create a .env.local file in the root directory to store environment keys
3. Push your code to Github
4. Login to cercel .com and import your GitHub repo
5. During setup: 
Select Next.js as the framework.

Add environment variables.

Click Deploy.

Be aware of using 

``` bash
npm run lint
```

to make sure there are no errors


