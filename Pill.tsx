import React from 'react'

interface PillProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'sun'
  children: React.ReactNode
}

export const Pill: React.FC<PillProps> = ({ variant = 'default', className = '', children, ...props }) => {
  const classes = `pill ${variant === 'sun' ? 's' : ''} ${className}`.trim()
  return (
    <a className={classes} {...props}>
      {children}
    </a>
  )
}
