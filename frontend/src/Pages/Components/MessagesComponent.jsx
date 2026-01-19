import React from 'react'

const MessagesComponent = ({messages,activeFriend}) => {
  return (
    <>
        <p>{activeFriend.name}</p>
        <div>{messages.map((msg) => (
            <div key={msg._id} style={{ marginBottom: "8px" }}>
            {msg.text}
            </div>
        ))}
        </div>
    </>
  )
}

export default MessagesComponent