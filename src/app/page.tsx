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
        const user = localStorage.getItem('user');
        console.log('the user', user);
        if (user) {
          try {
            const parsedUser = JSON.parse(user);
            console.log('the use Id', parsedUser.id);
            setUserId(parsedUser.id || '');
            console.log('inside the userid', userId);
          } catch (e) {
            setUserId('');
          }
        } else {
          setUserId('');
        }
      })
       
      
      // youtube channel fetch
      const handleSearch = async(query: string = '')=>{
        console.log("start fetching channel");
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