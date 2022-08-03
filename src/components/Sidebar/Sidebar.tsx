import React from 'react'
import { Link } from 'react-router-dom'
import { BiNews } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineMessage } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'

import { User } from '../../types/types'
import styles from './Sidebar.module.scss'
import photo from '../../assets/user.webp'
import logo from '../../assets/logo.svg'
import { urlFor } from '../../client'
import SidebarLink from '../SidebarLink/SidebarLink'

type PropsType = {
  user: User | null
  closeSidebar?: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<PropsType> = ({ user, closeSidebar }) => {
  const handleCloseSidebar = () => {
    if (closeSidebar) closeSidebar(false)
  }

  return (
    <div className={styles.parent}>
      <div className={styles.header}>
        <Link to='/' className={styles.link__logo} onClick={handleCloseSidebar}>
          <img src={logo} alt='logo' className={styles.logo} />
        </Link>
        <div className={styles.link__container}>
          <SidebarLink title={'News'} path={'/'} Icon={BiNews} handleCloseSidebar={handleCloseSidebar} />
          <SidebarLink
            title={'Profile'}
            path={`/Profile/${user?._id}`}
            Icon={CgProfile}
            handleCloseSidebar={handleCloseSidebar}
          />
          <SidebarLink title={'Dialogs'} Icon={AiOutlineMessage} handleCloseSidebar={handleCloseSidebar} />
          <SidebarLink title={'Friends'} Icon={FaUserFriends} handleCloseSidebar={handleCloseSidebar} />
          <SidebarLink title={'Settings'} Icon={FiSettings} handleCloseSidebar={handleCloseSidebar} />
        </div>
      </div>
      {user && (
        <Link to={`Profile/${user._id}`} className={styles.footer} onClick={handleCloseSidebar}>
          <img
            src={user.ava ? urlFor(user?.ava)?.width(50)?.url() : photo}
            alt='Profile'
            className={styles.profile__logo}
          />
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  )
}

export default Sidebar
