import React, { useEffect, useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import styles from './Home.module.scss'

import Sidebar from '../Sidebar/Sidebar'
import photo from '../../assets/user.webp'
import logo from '../../assets/logo2.svg'
import { fetchUser } from '../../utils/fetchUser'
import { urlFor } from '../../client'
import { getUser } from '../../store/user/reducers'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { User } from '../../types/types'
import ContentLayout from '../ContentLayout/ContentLayout'

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
          <Link to="/" className={styles.link__logo}>
            <img src={logo} alt="logo" className={styles.logo} />
          </Link>
          <Link to={`Profile/${user?._id}`} className={styles.link__ava}>
            <img src={user?.ava ? urlFor(user?.ava)?.width(50)?.url() : photo} alt="Profile" className={styles.ava} />
          </Link>
        </div>
        {toggleSidebar && (
          <div className={styles.openedSidebar}>
            <div className={styles.closeButton}>
              <AiFillCloseCircle
                fontSize={40}
                className={styles.closeButtonContent}
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={user && user} closeSidebar={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className={styles.main}>
        <ContentLayout />
      </div>
    </div>
  )
}

export default Home
