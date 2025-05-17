import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    await yourScheduledFunction();
    res.status(200).json({message: 'Cron job executed'});
}

async function yourScheduledFunction(){
    console.log("Cron function ran at:", new Date().toISOString());
}