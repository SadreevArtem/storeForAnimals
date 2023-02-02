import dogLogo from './new_logo.png'
import footerStyles from './styles.module.scss'

export function Footer() {
  return (
    <div className={footerStyles.wr}>
      <div className={footerStyles.wr_container}>
        <div className={footerStyles.wr_logo}>
          <div className={footerStyles.logo_container}>
            <img src={dogLogo} alt="Dog_logo" />
            <span className={footerStyles.logo_text}>DOG FOOD</span>
          </div>
          <div className={footerStyles.txt}>
            <p> &reg; Интернет магазин dog-food.ru</p>
          </div>
        </div>
        <div className={footerStyles.catalog}>
          <p>Каталог</p>
          <p>Акции</p>
          <p>Новости</p>
          <p>Отзывы</p>
        </div>
        <div className={footerStyles.about}>
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
    </div>
  )
}
