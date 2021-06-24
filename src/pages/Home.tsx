
import {useHistory} from 'react-router-dom'
import illustration from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import {Button} from '../components/Button'
import { UseAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'



export function Home() {
  const {SignInWitdhGoogle,user} = UseAuth()
   const history = useHistory()
   const [RoomCode, setRoomCode] = useState('')

   async function handleJoinRoom(event:FormEvent){
        event.preventDefault()
        if(RoomCode.trim() === '')return

      const RoomRef = await database.ref(`rooms/${RoomCode}`).get()

      if(!RoomRef.exists()){
        alert('Room does not exist')
        return
      }

      if(RoomRef.val().endedAt){
        alert('Room is closed.')
        return
      }

      history.push(`/rooms/${RoomCode}`)

   }

   async function HandleCreateRoom(){
     if(!user){
       await SignInWitdhGoogle()
     }
    history.push('/rooms/new')
     
   }
   return(
     <div id="page-auth">
       <aside>
         <img src={illustration} alt="ilustração" />
         <h2><strong>Crie salas de Q&amp;A ao-vivo</strong></h2>
         <p>Tire dúvidas da sua audiência em tempo-real</p>
       </aside>
       <main>
         <div className="main-content">
          <img src={logoImg} alt="" />
          <button onClick={HandleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="logo do google" />
            Crie sua sala com a Google
          </button>
          <div className="separator">Ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
             type="text"
             placeholder="digite o código da sala"
             onChange={event => setRoomCode(event.target.value)}
             value={RoomCode}
             />
             <Button type="submit">
               Entrar na sala
             </Button>
          </form>
         </div>
       </main>
     </div>
   )
}