import { Outlet } from 'react-router-dom'
import stylesMain from './styles.module.scss'

export function Main() {
  return (
    <div className={stylesMain.wr}>
      <Outlet />
    </div>
  )
}
