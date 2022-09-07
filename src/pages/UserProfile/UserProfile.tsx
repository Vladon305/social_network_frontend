import React, { useEffect } from 'react'
import { urlFor } from '../../client'
import { User } from '../../types/types'
import photo from '../../assets/user.webp'
import Spinner from '../../components/Spinner/Spinner'
import ProfileStatus from '../../components/ProfileStatus/ProfileStatus'
import { getUserProfile, updateUserStatus } from '../../store/userProfile/reducers'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useActions } from '../../hooks/useActions'
import styles from './UserProfile.module.scss'
import Friend from '../../components/Friend/Friend'

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

  if (!userProfile) return <Spinner message="Loading profile" />

  return (
    <div className={styles.profile}>
      <div className={styles.profile_inner}>
        <div className={styles.profile__banner}>
          <div className={styles.banner}>
            <img className={styles.banner__image} src={randomImage} alt="banner-pic" />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.leftPart}>
            <div className={`${styles.settings} ${styles.block}`}>
              <img
                className={styles.ava}
                src={userProfile?.ava ? urlFor(userProfile?.ava)?.width(50)?.url() : photo}
                alt="user-pic"
              />
              <button className={styles.settings__button}>Edit</button>
            </div>
            <div className={`${styles.friends} ${styles.block}`}>
              <div className={`${styles.friends__inner} ${styles.border}`}>
                <div className={styles.title}>
                  Friends <span>{userProfile.friends?.length}</span>
                </div>
                <div className={styles.friends__content}>
                  {userProfile?.friends &&
                    userProfile?.friends.map((friend) => <Friend friend={friend} key={friend._id} />)}
                </div>
              </div>

              <div className={styles.friends__inner}>
                <div className={styles.title}>
                  Friends online <span>{userProfile.friends?.filter((friend) => friend.isOnline).length}</span>
                </div>
                <div className={styles.friends__content}>
                  {userProfile?.friends &&
                    userProfile?.friends.map(
                      (friend) => friend.isOnline && <Friend friend={friend} key={friend._id} />
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightPart}>
            <div className={`${styles.info} ${styles.block}`}>
              <div className={styles.info__header}>
                <h1 className={styles.name}>
                  {userProfile.userName}
                  <div className={styles.whenOnline}>{userProfile.isOnline ? 'online' : userProfile.whenOnline}</div>
                </h1>
                <ProfileStatus
                  status={userProfile.status}
                  updateUserStatus={updateStatus}
                  setStatus={setStatus}
                  userId={userId}
                  profileId={userProfile._id}
                />
              </div>
              <div className={styles.info__main}>
                <div className={styles.birthDate}>
                  <h3>Berth date:</h3> <div>28.09.2004</div>
                </div>
                <div className={styles.city}>
                  <h3>City:</h3> <div>Usman</div>
                </div>
              </div>
              <div className={styles.info__footer}>
                <div className={styles.item}>
                  <div className={styles.top}>{userProfile.friends?.length ? userProfile.friends?.length : 0}</div>
                  <div className={styles.bot}>friends</div>
                </div>
                <div className={styles.item}>
                  <div className={styles.top}>400</div>
                  <div className={styles.bot}>subscribers</div>
                </div>
                <div className={styles.item}>
                  <div className={styles.top}>{userProfile.images?.length ? userProfile.images?.length : 0}</div>
                  <div className={styles.bot}>photos</div>
                </div>
                <div className={styles.item}>
                  <div className={styles.top}>{userProfile.posts?.length ? userProfile.posts?.length : 0}</div>
                  <div className={styles.bot}>posts</div>
                </div>
              </div>
            </div>
            <div className={`${styles.photos} ${styles.block}`}></div>
          </div>
        </div>
        {/* posts */}
      </div>
    </div>
  )
})

export default UserProfile
