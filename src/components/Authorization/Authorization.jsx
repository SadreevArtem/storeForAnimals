/* eslint-disable linebreak-style */
import account from './2527488.png'
import stylesAccount from './styles.module.scss'

export function Authorization() {
  return (
    <div className={stylesAccount.wr}>
      <button type="submit">SignUp</button>
      <button type="submit">SignIn</button>
      <img src={account} alt="Dog" className={stylesAccount.login} />
    </div>
  )
}
