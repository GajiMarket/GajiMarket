import React from 'react'
import '../../style/SerchBar.css'

const SerchBar:React.FC = () => {
  return (
    <div className='SerchBar'>
      <input
        type='text'
        className='SerchBar_SerchInput'
        placeholder='serch'
      />
    </div>
  )
}

export default SerchBar
