import React, { FC } from 'react'
import { urlFor } from '../../client'
import { User } from '../../types/types'
import photo from '../../assets/user.webp'
import styles from './Friend.module.scss'

type Props = {
  friend: User
}

const Friend: FC<Props> = ({ friend }) => {
  return (
    <div className={styles.friend}>
      <div className={styles.ava}>
        <img className={styles.image} src={friend?.ava ? urlFor(friend?.ava)?.width(50)?.url() : photo} alt="ava" />
      </div>
      <div className={styles.name}>{friend.userName}</div>
    </div>
  )
}

export default Friend
