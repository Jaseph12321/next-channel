"use server";
import dotenv from 'dotenv';
import { db } from './drizzle/db';
import { UserTable } from './drizzle/schema';
import { fetchChannel } from './app/api/fetchChannel';
import { getChannelController, updateChannelController } from './app/controller/channelController';
import { fetchChannelSubscriber } from './app/api/fetchSubscriber';
import { channel } from './app/model/model';
import getAllChannelId, { updateChannel } from './app/api/channel/dbAction';
dotenv.config({path: '.env.local'});

async function main(){
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
    

    console.log("finished");
}

main()