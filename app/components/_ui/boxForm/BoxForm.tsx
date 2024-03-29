'use client'
import './index.scss'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { formSchema } from '@/app/schemas/formSchema'
import { useForm } from 'react-hook-form'
import usePost from '@/app/hooks/usePost'
import { MdKeyboardBackspace } from 'react-icons/md'
import { VscError, VscLoading } from 'react-icons/vsc'
import { SlCheck } from 'react-icons/sl'
// import Link from 'next/link'

export interface FormTypes {
  name: string,
  telephone: string,
  email?: string | undefined
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

  const resetPage = () => {
    window.location.reload()
  }

  if (error){
    handleVisibleForm(false)
    return (
      <>
        <div className="boxform">
          <VscError size={30}/>
          <h1>Opa!!</h1>
          <p>estamos enfrentando problemas aqui, tente novamente em alguns instantes.</p>
          <span className='spanTratado' onClick={() => resetPage()}>Recarregar página</span>
        </div>
      </>
    )
  }

  if (isPosting){
    handleVisibleForm(false)
    return (
      <>
        <div className="boxform">
          <VscLoading id='loading' size={30} />
          <p className='pTratado'>Enviando formulário...</p>
        </div>
      </>
    )
  }

  if (isPosted){
    handleVisibleForm(false)
    return (
      <>
        <div className="boxform">
          <SlCheck id='success' size={50} />
          <h1>Formulário enviado!!</h1>
          <p className='pTratado'>Confira nossos produtos</p>
          <div className='boxform__btnTratado'>
            {/* <Link href='https://www.omegascreen.com.br/produtos/Linha%20Base%20%C3%81gua'><button className='button'>Site Oficial</button></Link> */}
            <button className='button' onClick={resetPage}>Novo cadastro</button>
          </div>
        </div>
      </>
    )
  }

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
                {/* {errors.email && (<span>{errors.email.message}</span>)} */}
              </div>
            </div>
            <input className='button' type="submit" value="enviar" />
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
        <button className='button' onClick={() => handleStatusForm()}>Formulário</button>
      </div>
    </>
  )
}