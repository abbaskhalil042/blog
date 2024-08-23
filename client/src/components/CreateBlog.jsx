import React from 'react'

const CreateBlog = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <form className='flex flex-col gap-3'>
            <input type="text" placeholder="title" className='py-2 px-6 border border-cyan-700  rounded-lg focus:outline-none' />
            <input type="textarea" placeholder="description" className='py-2 px-6 border border-cyan-700  rounded-lg focus:outline-none' />
            <input type="file" className='py-2 px-6 border border-cyan-700  rounded-lg focus:outline-none' />
            <button type="submit" className='bg-cyan-700 text-white py-2 px-6 rounded-lg mt-4'>create</button>
        </form>
    </div>
  )
}

export default CreateBlog