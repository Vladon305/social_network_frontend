import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import Dialogs from '../Dialogs/Dialogs'
import Friends from '../Friends/Friends'
import Navbar from '../Navbar/Navbar'
import News from '../News/News'
import Settings from '../Settings/Settings'
import UserProfile from '../UserProfile/UserProfile'

const ContentLayout: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const { user } = useTypedSelector((state) => state.user)
  const { userProfile } = useTypedSelector((state) => state.userProfile)

  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
      </div>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={<News />} />
          <Route path='/Profile/:profileId' element={<UserProfile userId={user._id} userProfile={userProfile} />} />
          <Route path='/Dialogs' element={<Dialogs />} />
          <Route path='/Friends' element={<Friends />} />
          <Route path='/Settings' element={<Settings />} />
        </Routes>
      </div>
    </div>
  )
}

export default ContentLayout
