import { useEffect, useState } from 'react'

// True on coarse-pointer / touch devices. Used to disable the custom cursor,
// magnetic buttons, and heavy mouse interactions where they don't make sense.
export default function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const update = () => setIsTouch(mq.matches || 'ontouchstart' in window)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return isTouch
}
