import React, { Dispatch, SetStateAction } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import photo from '../../assets/user.webp'
import { User } from '../../types/types'
import { urlFor } from '../../client'
import { googleLogout } from '@react-oauth/google'
import { AiOutlineLogout } from 'react-icons/ai'
import { IoMdSearch } from 'react-icons/io'

type PropsType = {
  user?: User | null
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}

const Navbar: React.FC<PropsType> = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate()

  const logout = () => {
    googleLogout()
    localStorage.clear()
    navigate('/login')
  }

  if (!user) return null

  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
        <IoMdSearch fontSize={21} className='ml-1' />
        <input
          type='text'
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          placeholder='Search'
          value={searchTerm}
          onFocus={() => navigate('search')}
          className='p-2 w-full bg-white outline-none'
        />
      </div>
      <div className='flex gap-3'>
        <Link to={`Profile/${user?._id}`} className='hidden md:block'>
          <img
            src={user.ava ? urlFor(user?.ava)?.width(50)?.url() : photo}
            alt='user'
            className='w-14 h-12 rounded-lg'
          />
        </Link>
        <button
          type='button'
          className=' bg-white flex justify-center items-center w-12 h-12 md:w-14 md:h-12 p-2 rounded-full cursor-pointer outline-none shadow-md'
          onClick={logout}
        >
          <AiOutlineLogout color='red' fontSize={21} />
        </button>
      </div>
    </div>
  )
}

export default Navbar
