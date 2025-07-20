import React from 'react'

const Title = ({text1,text2})=> {
  return (
    <div className='inline-flex gap-2 items-center  mb-3'>
        <p className='text-gray-500 dark:text-colorwhite'>{text1}<span className='text-gray-700 dark:text-colorwhite font-Terafik Bold.ttf'></span></p>      
    </div>
  )
}

export default Title
