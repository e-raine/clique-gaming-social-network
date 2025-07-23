import Feed from '@/app/feed/page'
import React from 'react'

const MainFeed = () => {
  return (
    <div className="feed-container">
        <div className="posts-container">
            <div className="navbar">
                <a href="">For you</a>
                <a href="">Following</a>
                <a href="">Friends</a>
            </div>

            <hr />
            
            <Feed />

        </div>
        
        <div className="others-container">
            <div className="controls"></div>
            <div className="friends-suggestions"></div>
        </div>
    </div>
  )
}

export default MainFeed