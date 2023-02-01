import { Link } from 'react-router-dom'
import { useState } from 'react'
import stylesHeader from './styles.module.scss'
import dogLogo from './new_logo.png'
import { Authorization } from '../Authorization/Authorization'
import { SearchBar } from '../SearchBar/SearchBar'
import { BasicMenu } from '../mobile/Menu/Menu'
import { MobileFooter } from '../mobile/MobileFooter/MobileFooter'

export function Header() {
  const [width, setWidth] = useState(document.body.clientWidth)

  window.addEventListener('resize', () => {
    setWidth(document.body.clientWidth)
  })

  return (
    <header className={stylesHeader.header}>
      <Link to="/">
        <div className={stylesHeader.logo_container}>
          <img className={stylesHeader.img} src={dogLogo} alt="Dog_logo" />
          <span className={stylesHeader.span}>DOOG FOOD</span>
        </div>
      </Link>
      <SearchBar />
      {
        width > 650 ? (
          <div className="link_container">
            <Authorization />
          </div>
        ) : (
          <>
            <div className={stylesHeader.basicMenu}>
              <BasicMenu />
            </div>
            <div>
              <MobileFooter />
            </div>
          </>
        )
      }
      {/* <div className="link_container">
        <Authorization />
      </div>
      <div className={stylesHeader.basicMenu}>
        <BasicMenu />
      </div> */}
    </header>
  )
}
