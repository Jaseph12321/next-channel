"use client";
import { useEffect, useState } from "react";
import ChannelCard from "./components/ChannelCard";
import Search from "./components/Search";
import { getChannelController } from "./controller/channelController";
import type { channel } from "./model/model";

const Home = () => {
      
      
      const searchResult : string = "";
      const [channelList,setChannelList] = useState<channel[]>([]);
      const [userId,setUserId] = useState<string>('');

      useEffect(()=>{
        const user = localStorage.getItem('user');
        console.log('the user', user);
        if (user) {
          try {
            const parsedUser = JSON.parse(user);
            console.log('the use Id', parsedUser.id);
            setUserId(parsedUser.id || '');
            console.log('inside the userid', userId);
          } catch (e) {
            console.log(e);
            setUserId('');
          }
        } else {
          setUserId('');
        }
      })
       
      
      // youtube channel fetch
      const handleSearch = async(query: string = '')=>{
        console.log("start fetching channel");
        const channels = await getChannelController(query) || [];
        // Ensure each channel has a userId property
        const channelsWithUserId = channels.map((ch: any) => ({
          ...ch,
          userId: ch.userId ?? userId
        }));
        setChannelList(channelsWithUserId);
      }
      
      return(
        <>           
           <Search searchResult={searchResult} onSearch={handleSearch}  placeholder="Enter your search....."/>
           <section className="all-channels">
               <h2>{searchResult}</h2>
               <div className="cards">
              {
                 channelList.map((channel) => (
                        <ChannelCard key={channel.channelId} channel={channel} userId={userId}/>
                 ))
              }
               </div>
               
           </section>
        </>
      )
}




export default Home