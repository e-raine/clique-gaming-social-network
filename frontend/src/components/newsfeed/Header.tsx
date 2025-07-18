import React from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react';


const Header = () => {
  return (
    <div className="newsfeed-header">
      <Image src="/images/icon.png" className="logo-icon" alt="" width={400} height={400}/>
      <div className="search-wrapper">
        <input className="search-input" placeholder="Search here..." />
        <button className="search-btn">
            <Search size={20} strokeWidth={2.5}/>
        </button>
      </div>
    </div>
  )
}

export default Header