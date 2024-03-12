import axios from "axios"
import { useEffect, useState } from "react"
import { FormTypes } from "../components/_ui/boxForm/BoxForm"

interface usePostProps {
  url: string,
  data: FormTypes,
  posted: boolean
}

export default function usePost({ url, data, posted }: usePostProps) {
  const [isPosted, setIsPosted] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (posted){
      setIsPosting(true)
      axios.post(url, data)
      .then(res => {
        setIsPosted(true)
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        setIsPosting(false)
      })
    }
  }, [data])
  
  return { isPosted, isPosting, error }
}