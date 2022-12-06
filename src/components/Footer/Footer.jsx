/* eslint-disable linebreak-style */
import dogLogo from './dog_logo.png'
import footerStyles from './styles.module.scss'

export function Footer() {
  return (
    <div className={footerStyles.wr}>
      <div>
        <div className={footerStyles.logo_container}>
          <img src={dogLogo} alt="Dog_logo" />
          <span className="">DogFood</span>
        </div>
        <div>
          <p> &reg; Интернет магазин DogFood.ru</p>
        </div>
      </div>
      <div>
        <p>Каталог</p>
        <p>Акции</p>
        <p>Новости</p>
        <p>Отзывы</p>
      </div>
      <div>
        <p>Оплата и доставка</p>
        <p>Часто спрашивают</p>
        <p>Обратная связь</p>
        <p>Контакты</p>
      </div>
      <div>
        <p>Мы на связи</p>
        <p>8(999)00-00-00</p>
        <p>dogfood@gmail.com</p>
        <p>Социальные сети</p>
      </div>
    </div>
  )
}
