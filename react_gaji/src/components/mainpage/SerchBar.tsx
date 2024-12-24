import React from 'react'
import '../../style/SerchBar.css'

const SerchBar:React.FC = () => {
  return (
    <div className='SerchBar'>
      <input
        type='text'
        className='SerchInput'
        placeholder='serch'
      />
    </div>
  )
}

export default SerchBar
