import React from 'react'
import ImagesList from './components/imageList/ImagesList'
import Sidebar from './components/Sidebar'

const Home = () => {
  return (
    <>
    <div style={{minHeight:"100vh"}} className="App">
      <div className='sidebarInApp' style={{}}>
         <Sidebar />
      </div>
      

      <div className='imageListInApp' style={{padding:'30px', marginTop:'100px'}}>
              <ImagesList />
     </div> 
   </div>

  
  </>
  )
}

export default Home