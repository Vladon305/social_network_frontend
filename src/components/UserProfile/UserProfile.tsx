import React, { useEffect } from 'react'
import { urlFor } from '../../client'
import { User } from '../../types/types'
import photo from '../../assets/user.webp'
import Spinner from '../Spinner/Spinner'
import ProfileStatus from '../ProfileStatus/ProfileStatus'
import { getUserProfile, updateUserStatus } from '../../store/userProfile/reducers'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useActions } from '../../hooks/useActions'
import styles from './UserProfile.module.scss'

type Props = {
  userId: User['_id']
  userProfile: User
}

const UserProfile: React.NamedExoticComponent<Props> = React.memo(({ userId, userProfile }) => {
  const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology'

  const { profileId } = useParams()
  const dispatch = useAppDispatch()
  const { setStatus } = useActions()

  const updateStatus = () => {
    dispatch(updateUserStatus(userId))
  }

  if (!profileId) {
    throw new Error('param not found')
  }
  useEffect(() => {
    dispatch(getUserProfile(profileId))
  }, [profileId, dispatch])

  if (!userProfile) return <Spinner message='Loading profile' />

  return (
    <div className={styles.profile}>
      <div className={styles.profile_inner}>
        <div className={styles.profile__banner}>
          <div className={styles.banner}>
            <img className={styles.banner__image} src={randomImage} alt='banner-pic' />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.leftPart}>
            <div className={styles.settings}>
              <img
                className={styles.ava}
                src={userProfile.ava ? urlFor(userProfile?.ava)?.width(50)?.url() : photo}
                alt='user-pic'
              />
              <button className={styles.settings__button}>Edit</button>
            </div>
            <div className={styles.friends}>
              <div className={styles.important}></div>
              <div className={styles.online}></div>
            </div>
          </div>
          <div className={styles.rightPart}>
            <div className={styles.rightPart__header}>
              <h1 className={styles.name}>
                {userProfile.userName}
                <div className={styles.whenOnline}></div>
              </h1>
              <ProfileStatus
                status={userProfile.status}
                updateUserStatus={updateStatus}
                setStatus={setStatus}
                userId={userId}
                profileId={userProfile._id}
              />
            </div>
            <div className={styles.rightPart__main}>
              <div className={styles.birthDate}></div>
              <div className={styles.city}></div>
            </div>
            <div className={styles.rightPart__footer}></div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default UserProfile
