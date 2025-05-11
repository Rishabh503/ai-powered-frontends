import React, { useState } from 'react'

const MusicMoodGenerator = () => {
    const [mood, setMood] = useState('')
    const [description, setDescription] = useState('')
    const [playlistName, setPlaylistName] = useState('')
    const [songs, setSongs] = useState([])
    const [loading,setLoading]=useState(false)

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            const res=await fetch('http://localhost:4000/ai/get-music-playlist',{
                method:'POST',
                 headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({mood:mood})
            })

            const data=await res.json()
            console.log("data aya kya",data)
            setSongs(data.songs);
            setDescription(data.description);
            setPlaylistName(data.playlist_name)
        } catch (error) {
            console.log("errpr aua hai dekhlo ",error)
        }finally{
            setLoading(false)
        }
    }

    console.log(songs)
    console.log(description)

  return (
    <section className='min-h-screen min-w-full bg-gradient-to-br from-red-500 to-yellow-500 transition-all duration-500 ease-in-out'>
       <h1 className='w-full text-center text-4xl font-semibold mb-5'> MusicMoodGenerator</h1>
        <div className='pt-5'>
            
            <form className='px-10 w-full flex gap-5 items-center justify-center ' onSubmit={(e)=>handleSubmit(e)}>
                <input className='w-1/2 rounded-lg px-4 py-3 text-xl shadow-lg outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300'  value={mood} onChange={(e)=>setMood(e.target.value)} />
                <button className='px-5 py-2 bg-cyan-500 text-white font-semibold border-2 border-cyan-700 rounded-lg shadow-lg hover:bg-cyan-600 transition-all duration-300'>
                    Generate
                </button>
            </form>

            <div className='flex w-full flex-col px-24 gap-6 mt-8 justify-center items-center'> 
                <p className='text-lg font-medium text-white'>Your Songs are here </p>
                {
                    !loading ? songs.map((song,i)=>(
                        <div className='w-full px-10 py-4 border rounded-lg bg-cyan-300 flex flex-col gap-1 shadow-lg hover:bg-cyan-400 transition-all duration-300' key={i}>
                            <span><strong>Title:</strong> {song.title}</span>
                            <span><strong>Artist:</strong> {song.artist}</span>
                            <span><strong>Album:</strong> {song.album}</span>
                            <span><strong>Genre:</strong> {song.genre}</span>

                        </div>
                    )):
                    <div className='text-white text-lg'>
                        <p>YOUR SONGS ARE BEING LOADED HAVE PATIENCE</p>
                    </div>
                }
            </div>
        </div>
    </section>
  )
}

export default MusicMoodGenerator
