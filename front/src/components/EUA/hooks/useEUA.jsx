import { useContext } from 'react'
import { EuaContext } from '../context/EUAContext'

export const useEUA = () => {
  const context = useContext(EuaContext)
  if (!context) {
    throw new Error('useEUA debe utilizarse dentro de un AuthProvider')
  }
  return context
}
