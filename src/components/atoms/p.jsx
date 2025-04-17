import React from 'react'

export const P = ({classes, children}) => {
  return (
    <p className={`${classes}`}>
        {children}
    </p>
  )
}
