import React, { useEffect } from 'react'
import { Routes,Route, useNavigate } from 'react-router-dom'
import LandingPage from './CommonPages/LandingPage'
import Login from './AuthPages/Login'
import Signup from './AuthPages/Signup'
import HomePage from './Pages/HomePage'
import ProtectRouting from './AuthPages/ProtectRouting'
import ProfilePage from './Pages/ProfilePage'
import AskPage from './Pages/AskPage'
import QuestionsAsked from './Pages/QuestionsAsked'
import DetailedQuestion from './Pages/DetailedQuestion'
import EditQuestion from './Pages/EditQuestion'
import ManageFriendShip from './Pages/ManageFriendShip'
import Chat from './Pages/Chat'

const App = () => {
  const Navigate = useNavigate()

  
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route element={<ProtectRouting/>}>
            <Route path="/content/home" element={<HomePage/>}/>
            <Route path="/content/profile" element={<ProfilePage/>}/>
            <Route path="/content/ask" element={<AskPage/>}/>
            <Route path="/content/friends" element={<ManageFriendShip/>}/>
            <Route path="/content/history" element={<QuestionsAsked/>}/>
            <Route path="/content/question/:id" element={<DetailedQuestion/>}/>
            <Route path="/content/question/edit/:id" element={<EditQuestion/>}/>
            <Route path="/content/chat" element={<Chat/>}/>
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
