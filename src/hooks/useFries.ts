import { useContext } from 'react'
import { Context } from '../contexts/FriesProvider'

const useFries = () => {
  const { fries } = useContext(Context)
  return fries
}

export default useFries
