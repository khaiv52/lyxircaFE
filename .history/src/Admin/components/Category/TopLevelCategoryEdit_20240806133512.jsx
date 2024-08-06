import React from 'react'
import { useLocation } from 'react-router-dom';

const TopLevelCategoryEdit = () => {

  const location = new useLocation();
  const searchParams = new URLSearchParams(location.search)
  const id = searchParams.get('id');
  const level = searchParams.get('level');
  console.log();
  

  return (
    <div>TopLevelCategoryEdit</div>
  )
}

export default TopLevelCategoryEdit