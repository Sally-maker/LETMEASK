import {Link} from 'react-router-dom'
import {FormEvent, useState} from 'react'
import illustration from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import '../styles/auth.scss'
import {Button} from '../components/Button'
import { database } from '../services/firebase'
import { UseAuth } from '../hooks/useAuth'



export function NewRoom() {
    const { user } = UseAuth()
  const [newRoom, setNewRoom] = useState('')


  async function handleCreateRoom(event:FormEvent){
     event.preventDefault()
     
     if(newRoom.trim() === ' '){
       return
     }

     const roomRef = database.ref('rooms')

     const firebaseRoom = await roomRef.push({
       title:newRoom,
       authorId:user?.id
     })
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
          <img src={logoImg} alt="Logo" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
            type="text"
            placeholder="Nome da sala"
            value={newRoom}
            onChange={event => setNewRoom(event.target.value)}
             />
             <Button type="submit">
               Criar sala
             </Button>
          </form>
             <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
         </div>
       </main>
     </div>
   )
}