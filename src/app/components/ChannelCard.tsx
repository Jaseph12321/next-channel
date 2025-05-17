'use client';
import React from 'react'
import { addChannelController } from '../controller/channelController';
import {channel} from '../model/model';


interface ChannelCardProps {
  channel: channel; // Adjust the type of 'channel' as needed
  userId: string;
}



const channelUrl = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL;

const ChannelCard: React.FC<ChannelCardProps> = ({ channel,userId}) => {
  

  const handleAddChannel = ()=>{
   channel.userId = userId; 
   console.log('inside the channel card', channel.userId);
   addChannelController(channel);
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
        <button onClick={handleAddChannel}>add to list</button>
    </div>
  )
}

export default ChannelCard