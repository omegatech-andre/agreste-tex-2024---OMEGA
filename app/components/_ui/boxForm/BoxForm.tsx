'use client'
import './index.scss'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { formSchema } from '@/app/schemas/formSchema'
import { useForm } from 'react-hook-form'
import usePost from '@/app/hooks/usePost'
import { MdKeyboardBackspace } from 'react-icons/md'

export interface FormTypes {
  name: string,
  telephone: string,
  email: string
}

type BoxContentProps = {
  statusForm: boolean,
  handleVisibleForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function BoxForm({ statusForm, handleVisibleForm }: BoxContentProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormTypes>({
    mode: 'onChange',
    resolver: yupResolver(formSchema)
  })
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [posted, setPosted] = useState(false)
  const [data, setData] = useState<FormTypes>({
    name: '',
    telephone: '',
    email: ''
  })

  const { isPosted, isPosting, error } = usePost({ url: `https://sheetdb.io/api/v1/${process.env.NEXT_PUBLIC_HASH}`, data, posted })

  const handleStatusForm = () => {
    setIsFormOpen(!isFormOpen)
    handleVisibleForm(!statusForm)
  }

  const submitForm = (data: FormTypes) => {
    setData(data)
    setPosted(true)
    reset()
  }

  console.log('data', data)
  console.log('err', error)

  if (isFormOpen) {
    return (
      <>
        <div className="boxform boxformopen">
          <div>
            <MdKeyboardBackspace id='btnback' size={24} onClick={() => handleStatusForm()} />
          </div>
          <h2>Preencha abaixo com as informações:</h2>
          <form onSubmit={handleSubmit(submitForm)}>
            <div>
              <div className='divInputs'>
                <label htmlFor="name">Nome:</label>
                <input
                  {...register('name')}
                  className='inputdata'
                  id='name'
                  type="text"
                />
                {errors.name && (<span>{errors.name.message}</span>)}
              </div>
              <div className='divInputs'>
                <label htmlFor="telephone">Telefone:</label>
                <input
                  {...register('telephone')}
                  className='inputdata'
                  id='telephone'
                  type="tel"
                  minLength={11}
                  maxLength={11}
                />
                {errors.telephone && (<span>{errors.telephone.message}</span>)}
              </div>
              <div className='divInputs'>
                <label htmlFor="email">Email:</label>
                <input
                  {...register('email')}
                  className='inputdata'
                  id='email'
                  type="email"
                />
                {errors.email && (<span>{errors.email.message}</span>)}
              </div>
            </div>
            <input type="submit" value="enviar" />
          </form>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="boxform">
        <h1>Quer conhecer os produtos mais intensos?</h1>
        <p>Preencha o formulário abaixo e conheça mais os nossos produtos</p>
        <button onClick={() => handleStatusForm()}>Formulário</button>
      </div>
    </>
  )
}