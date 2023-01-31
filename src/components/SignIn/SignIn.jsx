import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ErrorMessage, Field,
  Form, Formik,
} from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import stylesSignIn from './styles.module.scss'
import { REQUIRED_ERROR_MESSAGE, USER_SIGN_IN } from '../../utils/constants'
import { setToken } from '../../redux/slices/tokenSlice/tokenSlice'
import { Loader } from '../Loader/Loader'
import { api } from '../../API/api'

export function SignIn() {
  const token = useSelector((store) => store.token.value) || ''
  const navigate = useNavigate()
  useEffect(() => {
    if (token) navigate('/')
  }, [token])
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const signInFunc = (input) => api.signInRequest(input)
    .then((res) => {
      if (res.status !== 200) { throw Error('Ошибка авторизации') }
      return res.json()
    })
    .then((result) => {
      dispatch(setToken(result.token))
    })
    .catch(alert)

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: signInFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_SIGN_IN })
    },
  })

  if (isLoading) return <Loader />
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string().email('некорректный формат электронной почты').required(REQUIRED_ERROR_MESSAGE),
          password: Yup.string()
            .max(20, 'не более 20 символов')
            .required(REQUIRED_ERROR_MESSAGE),
        })}
        onSubmit={async (values) => {
          await mutateAsync(values)
          navigate('/')
        }}
      >
        <Form className={stylesSignIn.login}>
          <Field name="email" type="email" placeholder="Адрес электронной почты" />
          <ErrorMessage component="span" className={stylesSignIn.error} name="email" />

          <Field name="password" type="password" placeholder="Пароль" />
          <ErrorMessage component="span" className={stylesSignIn.error} name="password" />
          <button type="submit">Войти</button>
          <h3>Нет аккаунта? </h3>
          <Link to="/signup">
            <button type="button">Зарегистрироваться</button>
          </Link>
        </Form>
      </Formik>
    </div>
  )
}
