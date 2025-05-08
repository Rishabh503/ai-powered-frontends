import React, { useEffect, useState } from 'react'

const CodeReviewer = () => {
  const [code, setCode] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit=async ()=>{
    try {
      const res=await fetch('http://localhost:3000/ai/get-review',{
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({code:code})
      })

      const response=await res.text()
      if(!response) throw new Error("error here converitng")
        console.log(response)
      setResponse(response)

    } catch (error) {
        console.log("error from data comig", error)
    }
  }
 
  return (
    <main className='min-w-full  min-h-screen'>
      <h3 className='text-center text-3xl'>
 Code Analyser
      </h3>
      <div className='p-5 flex gap-2 min-w-full min-h-[80%]'>
        <div className='w-1/2 p-10  bg-gray-700 text-white  h-[600px]'>
        <h1 className='text-center pb-5 text-3xl font-semibold'>Code input</h1>
        <textarea
        onChange={(e)=>setCode(e.target.value)}
        value={code}
            className='rounded-md w-full bg-gray-800 border h-[85%] p-2 resize-none'
            placeholder='Enter your code here...'
          />
           <br />

           <div className='flex justify-end w-full'>
            
            <button onClick={()=>handleSubmit()} className='px-5 border rounded-md shadow-md bg-slate-50 text-black justify-end'>
                Submit
            </button>
           </div>
        </div>
        <div className='w-1/2 p-10  bg-gray-700 text-white  h-[600px]'>
        <h1 className='text-center pb-5 text-3xl font-semibold'>Suggestions for the Code</h1>
        <div className="bg-white p-4 rounded-md shadow-md h-[85%] overflow-auto">
    <pre className="bg-gray-100 text-black p-2 rounded-md whitespace-pre-wrap">
      {response ? response : "Response will appear here..."}
    </pre>
  </div>
        
        
        </div>
        
      </div>
    </main>
  )
}

export default CodeReviewer