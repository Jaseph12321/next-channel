import dotenv from "dotenv";
import cron from 'node-cron';
import getAllChannelId, { updateChannel } from '../app/api/channel/dbAction';
import { fetchChannelSubscriber } from '../app/api/fetchSubscriber';
import { channel } from "../app/model/model";
dotenv.config({ path: ".env.local" });

let initialized = false;

export const initCronJob = () =>{
    if(initialized) return;

    cron.schedule('*/10 * * * *',async ()=>{
        // "update subscriber every 10 minutes"
        const response = await getAllChannelId();
            console.log(response);
            let channelList: channel[] = [];
        
            for(const item of response){
               let channelData = await fetchChannelSubscriber(item.channelId);
               channelList.push(channelData);
            }
            
            const distinctChannelList = Array.from(
                new Map(channelList.map(item => [item.channelId,item])).values()
            );
            
            for(const channel of distinctChannelList){
               await updateChannel(channel);
            }
            
        
            // "finished"
    });

    initialized = true;
}

