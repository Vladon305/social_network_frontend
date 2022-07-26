import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.scss'
import jwt_decode from 'jwt-decode'
import { GoogleLogin } from '@react-oauth/google'
import { IdentifiedSanityDocumentStub } from '@sanity/client'
import { DecodedResponseData } from '../../types/types'
import { createUserIfNotExistsAPI } from '../../api/api'

const Login: React.FC = () => {

  const navigate = useNavigate()

  const responseGoogle = async (response: any) => {
    const decoded: DecodedResponseData = jwt_decode(response.credential)
    localStorage.setItem('user', JSON.stringify(decoded))

    const { name, sub, picture } = decoded

    const doc: IdentifiedSanityDocumentStub = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    }

    createUserIfNotExistsAPI(doc).then(() => {
      navigate('/', { replace: true })
    })
  }
  return (
    <div className={styles.parent}>
      <div className={styles.inner}>
        <video
          // src={shareVideo}
          loop
          controls={false}
          muted
          autoPlay
          className={styles.video}
        />

        <div className={styles.logo}>
          <div className={styles.inner_logo}>
            {/* <img src={logo} width='130px' alt="logo" /> */}
          </div>

          <div className={styles.google_button}>
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => console.log('Error in googleLogin component')
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login