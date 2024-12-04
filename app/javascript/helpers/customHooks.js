import { useEffect } from 'react'

export function useEffectOnMount(callback) {
  return useEffect(callback, [])
}