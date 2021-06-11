import React, { useCallback, useEffect, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ref } from 'yup'
import Chat from '../Chat/Chat'

const compareDocumentPositionExitCodes = [0, 20, 37, 35]

const ChatContainer = props => {
  const { user, isShow } = useSelector(({ auth, chatStore }) => ({
    user: auth.user,
    isShow: chatStore.isShow
  }))
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    if (window.screen.availWidth <= 768) {
      const chatRef = document.querySelector('#chatContainer')
      const handler = ({ target }) => {
        if (
          isShow &&
          !compareDocumentPositionExitCodes.includes(
            chatRef.compareDocumentPosition(target)
          )
        ) {
          dispatch({ type: 'CHANGE_CHAT_SHOW', data: false })
        }
      }
      document.addEventListener('click', handler)
      return () => {
        document.removeEventListener('click', handler)
      }
    }
  }, [isShow])

  return user && <Chat />
}

export default ChatContainer
