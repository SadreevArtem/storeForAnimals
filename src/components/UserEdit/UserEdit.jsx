import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import {
  ErrorMessage, Field,
  Form, Formik,
} from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { REQUIRED_ERROR_MESSAGE, USER_INFO } from '../../utils/constants'
import { Loader } from '../Loader/Loader'
import stylesUserEdit from './styles.module.scss'
import { api } from '../../API/api'

export function UserEdit() {
  const token = useSelector((store) => store.token.value)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const updateUserInfo = (input) => api.updateUserRequest(input, token)

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_INFO })
    },
  })

  if (isLoading) return <Loader />
  return (
    <div>
      <div className={stylesUserEdit.login}>
        <h2>Изменить данные пользователя</h2>
        <div>
          <Formik
            initialValues={{
              name: '',
              about: '',
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .max(20, 'не более 20 символов')
                .required(REQUIRED_ERROR_MESSAGE),
              about: Yup.string()
                .max(20, 'не более 20 символов')
                .required(REQUIRED_ERROR_MESSAGE),
            })}
            onSubmit={async (values) => {
              await mutateAsync(values)
              navigate('/useraccount')
            }}
          >
            <Form className={stylesUserEdit.login}>
              <Field name="name" type="text" placeholder="Имя пользователя" />
              <ErrorMessage component="span" className={stylesUserEdit.error} name="name" />

              <Field name="about" type="text" placeholder="О пользователе" />
              <ErrorMessage component="span" className={stylesUserEdit.error} name="about" />
              <button type="submit">СОХРАНИТЬ</button>
              <Link to="/">
                <button type="button">ОТМЕНА</button>
              </Link>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}
