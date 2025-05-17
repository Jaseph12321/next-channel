'use client';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../../controller/userController';
import { userData } from '../../../model/model';
import '../../profile/profile.scss';


 interface ProfilePageProps{
    params:{
        id: string;
    },
 }

const ProfilePage: React.FC<ProfilePageProps> = ({params}) => {
    const [user, setUser] = useState<userData | null>(null);

    useEffect(()=>{
       getUser({id: params.id, name:''}).then(setUser);
    },[params.id]);
    
    console.log("update user: "+JSON.stringify(user));
    // Save username to localStorage for access on other pages
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
    };

    return (
        <>          
        <div className="login-container">
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
                <input
                    id="userid"
                    type="text"
                    value="userid"
                    readOnly
                />
                <label htmlFor="username">Name:</label>
                <input
                    id="username"
                    type="text"
                    value="name"
                />
                <label htmlFor="userAge">Age:</label>
                <input
                    id="userAge"
                    type="number"
                    min={0}
                    max={100}
                    value="25"
                />
                <label htmlFor="userEmail">UserEmail:</label>
                <input
                    id="userEmail"
                    type="text"
                    value="email@example.com"
                />
                <button type="submit">Submit</button>
            </form>
            {/* {message && <p style={{ marginTop: 16 }}>{message}</p>} */}
        </div>
        </>
    );
};

export default ProfilePage;