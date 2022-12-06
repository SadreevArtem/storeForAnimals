/* eslint-disable linebreak-style */
import { Link } from 'react-router-dom'
import account from './2527488.png'
import stylesAccount from './styles.module.scss'

export function Authorization() {
  return (
    <div className={stylesAccount.wr}>
      <button type="submit">SignUp</button>
      <Link to="signin" type="button">
        <button type="submit">SignIn</button>
      </Link>

      <img src={account} alt="Dog" className={stylesAccount.login} />
    </div>
  )
}
