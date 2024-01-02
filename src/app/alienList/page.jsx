'use client'
import { fetchAliens } from '@/redux/features/alienListSlice'
import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AlienCard } from '../components/alienCard'
import { AllAliens } from '../components/AllAliens'




function HomePage() {
  let aliens = useSelector((state)=>state.alienList.list)
  let dispatch = useDispatch()
  let [aliensList,setAliensList] = useState([])
  
  useEffect(() => {
    dispatch(fetchAliens())  

}, [])

  useEffect(()=>{
    setAliensList(aliens)
  },[aliens])
   
 
  return (
    <div>
      {aliens && <AllAliens allAliens={aliens}/>}
      <AlienCard/>

    </div>
  )
}

export default HomePage 