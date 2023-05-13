import React from 'react'
const Ul = ({className,list}) => {
  return (
      <ul className={className}>
          {list.map(li =>
              <React.Fragment>
              {li}
          </React.Fragment>)}
      </ul>
  )
}

export default Ul