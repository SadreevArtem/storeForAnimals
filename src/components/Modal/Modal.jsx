/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FaRegWindowClose } from 'react-icons/fa'
import modalStyles from './styles.module.scss'

export function ModalContent({ children, closeHandler }) {
  useEffect(() => {
    const listenerHandler = (e) => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    }

    document.addEventListener('keydown', listenerHandler)

    return () => {
      document.removeEventListener('keydown', listenerHandler)
    }
  }, [closeHandler])

  return (
    <div className={modalStyles.modalContent}>

      <FaRegWindowClose className={modalStyles.closeBtn} onClick={closeHandler} icon="fa-solid fa-xmark" />

      {children}
    </div>
  )
}

export function Modal({ closeHandler, isOpen = false, children }) {
  if (!isOpen) return null

  const clickHandler = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  return createPortal(
    <div onClick={clickHandler} className={modalStyles.modalWr}>
      <ModalContent closeHandler={closeHandler}>
        {children}
      </ModalContent>
    </div>,
    document.getElementById('modal-root'),
  )
}
