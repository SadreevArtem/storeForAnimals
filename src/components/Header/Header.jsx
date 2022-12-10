/* eslint-disable linebreak-style */
import { Link } from 'react-router-dom'
import stylesHeader from './styles.module.scss'
import dogLogo from './new_logo.png'
import { Authorization } from '../Authorization/Authorization'

export function Header() {
  return (
    <header className={stylesHeader.header}>
      <Link to="/">
        <div className={stylesHeader.logo_container}>
          <img className={stylesHeader.img} src={dogLogo} alt="Dog_logo" />
          <span className={stylesHeader.span}>BOBIK KING</span>
        </div>
      </Link>
      <div className="search_bar">
        <input type="text" className={stylesHeader.input} placeholder="🔎 Search..." />
      </div>
      <div className="link_container">
        <Authorization />
      </div>
    </header>
  )
}
