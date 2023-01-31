import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ErrorMessage, Field,
  Form, Formik,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { api } from '../../API/api'
import { REQUIRED_ERROR_MESSAGE, SIGN_UP } from '../../utils/constants'
import stylesSignUp from './styles.module.scss'

export function SignUp() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const signUpFunc = (input) => api.signUpRequest(input)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json()
      }
      throw Error('Ошибка регистрации')
    })
    .catch(alert)

  const { mutateAsync } = useMutation({
    mutationFn: signUpFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SIGN_UP })
    },
  })

  return (
    <div className={stylesSignUp.login}>
      <h2>Регистрация пользователя</h2>
      <Formik
        initialValues={{
          email: '',
          group: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string().email('некорректный формат электронной почты').required(REQUIRED_ERROR_MESSAGE),
          group: Yup.string()
            .max(10, 'не более 10 символов')
            .required(REQUIRED_ERROR_MESSAGE),
          password: Yup.string()
            .max(20, 'не более 20 символов')
            .required(REQUIRED_ERROR_MESSAGE),
        })}
        onSubmit={async (values) => {
          await mutateAsync(values)
          navigate('/')
        }}
      >
        <Form className={stylesSignUp.login}>
          <Field name="email" type="email" placeholder="Адрес электронной почты" />
          <ErrorMessage component="span" className={stylesSignUp.error} name="email" />

          <Field name="group" type="text" placeholder="Группа" />
          <ErrorMessage component="span" className={stylesSignUp.error} name="group" />

          <Field name="password" type="password" placeholder="Пароль" />
          <ErrorMessage component="span" className={stylesSignUp.error} name="password" />
          <button type="submit">Зарегистрироваться</button>
        </Form>
      </Formik>
    </div>
  )
}
