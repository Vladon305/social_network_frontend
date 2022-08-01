import React from 'react'
import { IconType } from 'react-icons'
import { NavLink } from 'react-router-dom'
import styles from './SidebarLink.module.scss'

type Props = {
  title: string
  path?: string
  Icon: IconType
  handleCloseSidebar: () => void
}

const SidebarLink: React.FC<Props> = ({ title, path = `/${title}`, Icon, handleCloseSidebar }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? styles.link__active : styles.link)}
      onClick={handleCloseSidebar}
    >
      <Icon />
      {title}
    </NavLink>
  )
}

export default SidebarLink
