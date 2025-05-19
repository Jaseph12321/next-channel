"use client";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { useEffect, useState } from "react";
import ChannelCard from "./components/ChannelCard";
import { fetchChannel } from "./api/fetchChannel";
import { getChannelController } from "./controller/channelController";
import type { channel } from "./model/model";




const Home = () => {
      
      
      const [searchResult, setSearchResult] = useState<string>('');
      const [channelList,setChannelList] = useState<channel[]>([]);
      const [userId,setUserId] = useState<string>('');

      useEffect(()=>{
        fetch('/api/cron-init');
      }, []);

      useEffect(()=>{
        const user = localStorage.getItem('user');
        if (user) {
          try {
            const parsedUser = JSON.parse(user);
            setUserId(parsedUser.id || '');
          } catch (e) {
            setUserId('');
          }
        } else {
          setUserId('');
        }
      })
       
      
      // youtube channel fetch
      const handleSearch = async(query: string = '')=>{
        setChannelList(await getChannelController(query));
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