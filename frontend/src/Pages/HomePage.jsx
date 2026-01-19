import React from 'react'
import Profile from './Components/Profile'
import Posts from './Components/Posts'
import Friends from './Components/Friends'

const HomePage = () => {
  return (
    <div>
      
      <div className='flex flex-row gap-3'>
        <Profile/>

        <Posts/>

        <Friends/>
      </div>

    </div>
  )
}

export default HomePage