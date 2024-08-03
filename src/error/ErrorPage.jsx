import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  }
  const handleGoHome = () => {
    navigate('/');
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className='w-full max-w-md p-8 text-center bg-white rounded-lg shadow-lg'>
        <h1 className='mb-4 text-4xl font-bold text-red-600'>Oops!</h1>
        <p>You don't have permission to access this page.</p>
        <div className='mt-4 space-y-4'>
          <button onClick={handleGoBack}
          className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-inner'>
            Go Back
          </button>
          <button className="w-full px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:shadow-inner" onClick={handleGoHome}>
            Go To Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage