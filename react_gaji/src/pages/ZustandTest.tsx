import React from 'react'
import store from '../utils/store'

const ZustandTest: React.FC = () => {

    const { count, increase, decrease, reset} = store();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increase}>증가</button>
      <button onClick={decrease}>감소</button>
      <button onClick={reset}>리셋</button>
    </div>
  )
}

export default ZustandTest
