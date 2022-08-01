import React, { useEffect, useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Routes, Route } from 'react-router-dom'
import styles from './Home.module.scss'

import Sidebar from '../Sidebar/Sidebar'
// import logo from '../../assets/logo.png'
import { fetchUser } from '../../utils/fetchUser'
import { getUser } from '../../store/user/reducers'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { User } from '../../types/types'
import UserProfileContainer from '../UserProfile/UserProfileContainer'

type Props = {
  user: User
}

const Home: React.FC<Props> = ({ user }) => {

  const [toggleSidebar, setToggleSidebar] = useState(false)
  const dispatch = useAppDispatch()

  const userInfo = fetchUser()

  useEffect(() => {
    dispatch(getUser(userInfo?.sub))
  }, [userInfo?.sub, dispatch])


  return (
    <div className={styles.parent}>
      <div className={styles.closedSidebar}>
        <Sidebar user={user && user} />
      </div>
      <div className={styles.layout}>
        <div className={styles.header}>
          <HiMenu fontSize={40} onClick={() => setToggleSidebar(true)} />
          {/* <Link to='/'>
            <img src={logo} alt="logo" className={styles.logo} />
          </Link> */}
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.ava?.asset?._ref} alt="user-profile" className={styles.logo} />
          </Link>
        </div>
        {toggleSidebar && (
          <div className={styles.openedSidebar}>
            <div className={styles.closeButton}>
              <AiFillCloseCircle fontSize={40} className={styles.closeButtonContent} onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar user={user && user} closeSidebar={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className={styles.main}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfileContainer />} />
          {/* <Route path='/*' element={<News />} /> */}
        </Routes>
      </div>
    </div>
  )
}

export default Home