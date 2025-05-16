'use client';
import React from 'react'
import { addChannelController, deleteChannelController } from '../controller/channelController';
import {channel} from '../model/model';


interface ChannelCardProps {
  channel: channel; // Adjust the type of 'channel' as needed
}

const channelUrl = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL;

let userId: string | null = null;
if (typeof window !== 'undefined') {
  userId = localStorage.getItem('user');
}

const MyChannelCard: React.FC<ChannelCardProps> = ({ channel }) => {
  

  const handleUpdateChannel = ()=>{
   
  }

  const handleDeleteChannel = ()=>{
       deleteChannelController(channel.channelId,channel.userId);
       window.location.reload();
  }
  
  return (
    <div className='channel-card'>
        <img src={channel.photoUrl} alt="channel-user" />
        <div className='channel-title'>
          <a href={`${channelUrl}${channel.channelId}`} target='_blank' rel='noopener noreferrer'>
        {channel.channelTitle}
        </a>
        </div>
        <div className='channel-subscriber'>Subscriber Count: {channel.subscriberCount}</div> 
        {/* <button onClick={handleUpdateChannel}>edit</button> */}
        <button onClick={handleDeleteChannel}>remove</button>
    </div>
  )
}

export default MyChannelCard