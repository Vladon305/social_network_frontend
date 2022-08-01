import React from 'react'
import { Link } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import { BiNews } from 'react-icons/bi'
import { AiOutlineMessage } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'

// import Logo from '../assets/logo.png'
import { User } from '../../types/types'
import styles from './Sidebar.module.scss'
import photo from '../../assets/user.webp'
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
        {/* <Link
          to='/'
          className={styles.link__logo}
          onClick={handleCloseSidebar}
        >
          <img src={Logo} alt="logo" className={styles.logo} />
        </Link> */}
        <div className={styles.link__container}>
          <SidebarLink title={'News'} path={'/'} Icon={RiHomeFill} handleCloseSidebar={handleCloseSidebar} />
          <SidebarLink title={'Profile'} Icon={BiNews} handleCloseSidebar={handleCloseSidebar} />
          <SidebarLink title={'Dialogs'} Icon={AiOutlineMessage} handleCloseSidebar={handleCloseSidebar} />
          <SidebarLink title={'Friends'} Icon={FaUserFriends} handleCloseSidebar={handleCloseSidebar} />
          <SidebarLink title={'Settings'} Icon={FiSettings} handleCloseSidebar={handleCloseSidebar} />
        </div>
      </div>
      {user && (
        <Link to={`user-profile/${user._id}`} className={styles.footer} onClick={handleCloseSidebar}>
          <img
            src={user.ava ? urlFor(user?.ava)?.width(50)?.url() : photo}
            alt='user-profile'
            className={styles.profile__logo}
          />
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  )
}

export default Sidebar
