import { useEffect, useRef } from 'react'

export function TheoryDialog({ onClose, children }) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    const trigger = document.activeElement
    dialog.showModal()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      trigger?.focus()
    }
  }, [])
  return (
    <dialog ref={ref} className="solid-modal-card" aria-labelledby="theory-title"
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => { if (event.target === ref.current) {
        const bounds = ref.current.getBoundingClientRect()
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
      } }}>
      {children}
    </dialog>
  )
}
