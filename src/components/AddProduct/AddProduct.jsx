import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import {
  INTEGER_ERROR_MESSAGE, POSITIVE_ERROR_MESSAGE,
  REQUIRED_ERROR_MESSAGE,
} from '../../utils/constants'
import { Modal } from '../Modal/Modal'
import stylesAddProduct from './styles.module.scss'

export function AddProduct() {
  const navigate = useNavigate()
  const { api } = useProductContext()

  const [isOpen, setIsOpen] = useState(false)

  const clickHandler = () => {
    setIsOpen(true)
  }

  const closeHandler = () => {
    setIsOpen(false)
  }

  const submitHandler = (values) => api.addProductRequest(values)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json()
      }
      throw Error('Error')
    })
    .then((product) => {
      console.log({ product })
      navigate('/')
      closeHandler()
    })
    .catch(alert)

  return (
    <div className={stylesAddProduct.wr}>
      <button onClick={clickHandler} type="button">Добавить товар</button>
      <Modal isOpen={isOpen} closeHandler={closeHandler}>
        <div>
          <h2>Добавление нового товара</h2>
          <Formik
            initialValues={{
              available: true,
              pictures: '',
              name: '',
              price: '',
              discount: '',
              stock: '',
              wight: '',
              description: '',
            }}
            validationSchema={Yup.object(
              {
                pictures: Yup.string()
                  .url('некорректный формат ссылки'),
                name: Yup.string()
                  .required(REQUIRED_ERROR_MESSAGE),
                price: Yup.number()
                  .positive(POSITIVE_ERROR_MESSAGE)
                  .integer(INTEGER_ERROR_MESSAGE)
                  .required(REQUIRED_ERROR_MESSAGE),
                discount: Yup.number()
                  .positive(POSITIVE_ERROR_MESSAGE)
                  .integer(INTEGER_ERROR_MESSAGE)
                  .required(REQUIRED_ERROR_MESSAGE),
                stock: Yup.number()
                  .positive(POSITIVE_ERROR_MESSAGE)
                  .integer(INTEGER_ERROR_MESSAGE)
                  .required(REQUIRED_ERROR_MESSAGE),
                wight: Yup.string()
                  .matches(/(кг|г|шт)/, 'Введите корректное значение(кг, г, шт.)')
                  .required(REQUIRED_ERROR_MESSAGE),
                description: Yup.string()
                  .required(REQUIRED_ERROR_MESSAGE),
              },
            )}
            onSubmit={submitHandler}
          >
            <Form className={stylesAddProduct.editForm}>
              <Field name="pictures" placeholder="Изображение товара" type="text" />
              <ErrorMessage component="span" className={stylesAddProduct.error} name="pictures" />

              <Field name="name" placeholder="Наименование товара" type="text" />
              <ErrorMessage component="span" className={stylesAddProduct.error} name="name" />

              <Field name="price" placeholder="Цена" type="number" />
              <ErrorMessage component="span" className={stylesAddProduct.error} name="price" />

              <Field name="discount" placeholder="Скидка" type="number" />
              <ErrorMessage component="span" className={stylesAddProduct.error} name="discount" />

              <Field name="stock" placeholder="Колличество товара" type="number" />
              <ErrorMessage component="span" className={stylesAddProduct.error} name="stock" />

              <Field name="wight" placeholder="Вес товара" type="text" />
              <ErrorMessage component="span" className={stylesAddProduct.error} name="wight" />

              <Field name="description" placeholder="Описание товара" type="text" />
              <ErrorMessage component="span" className={stylesAddProduct.error} name="description" />

              <button type="submit" className="btn btn-primary">Добавить товар</button>
            </Form>
          </Formik>
        </div>
      </Modal>
    </div>
  )
}
