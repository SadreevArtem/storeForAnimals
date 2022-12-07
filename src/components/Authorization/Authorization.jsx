/* eslint-disable linebreak-style */
import { Link } from 'react-router-dom'
import account from './2527488.png'
import stylesAccount from './styles.module.scss'

export function Authorization() {
  return (
    <div className={stylesAccount.wr}>
      <Link to="/signup">
        <button type="button">SignUp</button>
      </Link>

      <Link to="signin" type="button">
        <button type="button">SignIn</button>
      </Link>
      <Link to="/useraccount">
        <img src={account} alt="Dog" className={stylesAccount.login} />
      </Link>

    </div>
  )
}
