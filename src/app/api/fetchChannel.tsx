"use server";
import dotenv from 'dotenv';

dotenv.config({path: '.env.local'});
type channelSearch={
    channelId: string,
    photoUrl: string,
    channelTitle: string,
    subscriberCount: number
}

const apiKey = process.env.YOUTUBE_API_KEY;
const searchUrl = process.env.YOUTUBE_SEARCH_URL;
const channelUrl = process.env.YOUTUBE_CHANNEL_URL;

export async function fetchChannel(query: string): Promise<any> {
    try{
        console.log("Query: "+query);
        console.log({ apiKey, searchUrl, channelUrl });
        const youtubeData: channelSearch[] = [];
        const response = await fetch(
           `${searchUrl}?key=${apiKey}&part=snippet&maxResults=20&type=channel&q=${encodeURIComponent(query)}`
         );

         if(!response.ok){
           throw new Error("No such user");
         }
  
         const data = await response.json();
  
         const firstResult = data.items;
         if(firstResult){
           let d: channelSearch;
           for (const item of firstResult) {
           
           const channelResponse = await fetch(
               `${channelUrl}?key=${apiKey}&part=snippet,statistics&maxResults=5&type=channel&id=${item.id.channelId}`
             );
  
           const channelData = await channelResponse.json();
           if(channelData){
             d = {
               channelId: channelData.items[0].id,
               photoUrl: channelData.items[0].snippet.thumbnails.default.url,
               channelTitle: channelData.items[0].snippet.title,
               subscriberCount: channelData.items[0].statistics.subscriberCount
             };
           youtubeData.push(d);          
          }
         }
       }
  
        //  youtubeData.forEach((item:any, index: number)=>{
        //    console.log(`Index: ${index+1}`)
        //    console.log(item.channelId);
        //    console.log(item.photoUrl);
        //    console.log(item.channelTitle);
        //    console.log(item.subscriberCount);
        //    console.log("===============================");
        //  })

        console.log("youtube Data: ",youtubeData);
  
         return youtubeData;
        // Uncomment and define setChannelList if needed, or remove this line if unnecessary
        // setChannelList(youtubeData || []);
       }catch(err){
       console.error("Fetch error:",err);
    }
}



