"use client";
import React from "react";
import "./style/channelCard.scss";
import { deleteChannelController } from "../controller/channelController";
import { myChannel } from "../model/model";

interface ChannelCardProps {
  channel: myChannel; // Adjust the type of 'channel' as needed
}

const channelUrl = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL;

// let userId: string | null = null;
// if (typeof window !== 'undefined') {
//   userId = localStorage.getItem('user');
// }

const MyChannelCard: React.FC<ChannelCardProps> = ({ channel }) => {
  console.log("channel title: ", channel);
  const handleDeleteChannel = () => {
    deleteChannelController(channel.channelId, channel.userId);
    window.location.reload();
  };

  return (
    <div className="channel-card">
      <img src={channel.photoUrl} alt="channel-user" />
      <div className="channel-title">
        <a
          href={`${channelUrl}${channel.channelId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {channel.title}
        </a>
      </div>
      <div className="channel-subscriber">
        Subscriber Count: {channel.subscriberCount}
      </div>
      {/* <button onClick={handleUpdateChannel}>edit</button> */}
      <button onClick={handleDeleteChannel}>remove</button>
    </div>
  );
};

export default MyChannelCard;
