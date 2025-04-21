import React from 'react'

export const Label = ({children,classes}) => {
  return (
    <label className={`text-2xl font-coordi font-bold text-black  ${classes}`}>
        {children}
    </label>
  )
}
