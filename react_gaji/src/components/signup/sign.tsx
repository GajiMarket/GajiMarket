import React from 'react'

const {useState} = React;

const sign = () => {

  const auth = `http://localhost:3000`;
  
  const emailAuth = async(email: string) => {
    
    try {
      const response = await fetch(`${auth}/auth/emailSend`, {
        method: 'post',
        body: JSON.stringify({
          email: email,
        })

      });

      if(!response.ok) {

        console.log('값을 불러오지 못했습니다. :', response)

        throw new Error(`Http error: ${response.status}`);

      }

      return response.json();

    } catch(error) {

      console.error('Error sending email auth request:', error);

      throw error;
      

    }
  };

  const idCheck = async(id: string) => {

    const response = await fetch(`${auth}/auth/idCheck`, {
      method: 'post',
      body: JSON.stringify({
        id: id,
      })
    }) 
  }

  return (
    <div className="login">
      <div className="user_id">
        <input type="text" value="{userId}" />
        <button onClick={idCheck(userId)}></button>
      </div>

      <div className="user_pw">
        <input type="password" value="{userPw}" />
      </div>

      <div className="user_email">
        <input type="email" value="{userEmail}" />
        <button onClick={emailAuth}></button>
      </div>


      
    </div>
  )
}

export default sign
