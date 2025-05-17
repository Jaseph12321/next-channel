'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useUser } from '../UserContext';



const Navbar: React.FC = () => {

  const {user,logout} = useUser();
  const router = useRouter();

  const handleLogOut = () =>{
    logout();
    router.push('/');
  }
    

    return (
      
         <nav className='navbar'>
          <div className='nav-container'>
          <h1> youtube channel fetcher</h1>
          <ul className='nav-list'>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/pages/myList">MyList</Link></li>
            {user && user.id && user.name ? (
                <li>
                <details className='dropdown'>
                  <summary>{user.name}</summary>
                  <ul className='dropdown-menu'>
                  <li><Link href={`/pages/profile/${user.id}`}>Profile</Link></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); handleLogOut(); }}>Logout</a></li>
                  </ul>
                </details>
                </li>
            ) : (
               <li><Link href="/pages/login">Login</Link></li>
            )}
          </ul>
          </div>
          
        </nav>        
    );
};



export default Navbar;