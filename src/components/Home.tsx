import React, { useState } from 'react'

type PropsType = {}

const Home: React.FC<PropsType> = ({ }) => {

  const [toggleSidebar, setToggleSidebar] = useState(false)

  return (
    <div>Home</div>
  )
}

export default Home