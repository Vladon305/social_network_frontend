import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import styles from './ProfileStatus.module.scss'

type Props = {
  status: string
  setStatus: ActionCreatorWithPayload<string, string>
  updateUserStatus: () => void
  userId: string
  profileId: string
}

const ProfileStatus: React.FC<Props> = ({ status, setStatus, updateUserStatus, userId, profileId }) => {
  const [editMode, setEditMode] = useState(false)

  return (
    <>
      {userId === profileId ? (
        !editMode ? (
          <div className={styles.profile__status}>
            <span onClick={() => setEditMode(true)}>{status || 'Set status'}</span>
          </div>
        ) : (
          <div className={styles.profile__status}>
            <input
              autoFocus={true}
              onBlur={() => {
                setEditMode(false)
                updateUserStatus()
              }}
              onChange={(e) => setStatus(e.currentTarget.value)}
              type='text'
              value={status}
            />
          </div>
        )
      ) : (
        <div className={styles.profile__status}>
          <span>{status || ''}</span>
        </div>
      )}
    </>
  )
}

export default ProfileStatus
