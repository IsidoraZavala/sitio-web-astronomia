import { useEffect, useRef, useState } from 'react'

export function TypewriterTitle({
  text,
  highlightText = '',
  as: Tag = 'h1',
  className = '',
  speed = 28,
}) {
  const [displayedCount, setDisplayedCount] = useState(0)
  const [started, setStarted] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    setDisplayedCount(0)
    setStarted(false)
  }, [text])

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [text])

  useEffect(() => {
    if (!started) return
    if (displayedCount >= text.length) return

    const timer = setTimeout(() => {
      setDisplayedCount((prev) => prev + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [started, displayedCount, text, speed])

  const isTyping = started && displayedCount < text.length
  const highlightIndex = highlightText ? text.indexOf(highlightText) : -1

  const renderTypedContent = () => {
    if (highlightIndex === -1 || displayedCount <= highlightIndex) {
      return text.slice(0, displayedCount)
    }

    const before = text.slice(0, highlightIndex)
    const highlightEnd = highlightIndex + highlightText.length
    const highlighted = text.slice(highlightIndex, Math.min(displayedCount, highlightEnd))
    const after = displayedCount > highlightEnd ? text.slice(highlightEnd, displayedCount) : ''

    return (
      <>
        {before}
        <em>{highlighted}</em>
        {after}
      </>
    )
  }

  return (
    <Tag ref={elementRef} className={className} aria-label={text}>
      <span aria-hidden="true">
        {renderTypedContent()}
        <span className={`typewriter-cursor ${isTyping ? 'typing' : 'done'}`}>|</span>
      </span>
    </Tag>
  )
}
