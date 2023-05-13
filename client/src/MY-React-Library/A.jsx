import React from 'react'

const A = ({value,className,url,target}) => {
  return (
      <a href={url} target={target} className={className}>
          {value}
    </a>
  )
}

export default A