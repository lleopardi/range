import React from 'react'
import './Line.scss'

interface LineProps {
    children?: React.ReactNode,
    setup: (event: HTMLDivElement) => void
}

function Line({children, setup}: LineProps) {
  return (
    <div className='line' ref={setup}>{children}</div>
  )
}

export default Line