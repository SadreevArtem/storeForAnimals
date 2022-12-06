/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import { Outlet } from 'react-router-dom'
import stylesMain from './styles.module.scss'

export function Main() {
  return (
    <div className={stylesMain.wr}>
      <Outlet />
    </div>
  )
}
