import React from 'react'
// container is used for defining the styling properties, so that the children components can inherit them (height, width, padding, margin, etc)
function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
}

export default Container
