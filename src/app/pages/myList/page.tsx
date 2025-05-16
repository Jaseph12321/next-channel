'use client'
import React from 'react'
import Navbar from '../../components/Navbar'
import '../../style/globals.scss'
import { getUser } from '../../controller/userController';
import MyChannelCard from '../../components/MyChannelCard';

const myList = () => {

  const [channelList, setChannelList] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchUserChannels = async () => {
      const userString = localStorage.getItem('user');
      console.log("My list userString", userString);
      const user = userString ? JSON.parse(userString) : null;
      if (user) {
        const userData = await getUser({ id: user.id, name: user.name });
        if (userData && userData.channels) {
          setChannelList(userData.channels);
        }
      }
    };
    fetchUserChannels();
  }, []);

  return (
    <>

    <section className="all-channels">
               <h2>My channels</h2>
               <div className="cards">
              {
                 channelList.map((channel) => (
                        <MyChannelCard key={channel.channelId} channel={channel}/>
                 ))
              }
               </div>
               
           </section>
    </>
  )
}

export default myList