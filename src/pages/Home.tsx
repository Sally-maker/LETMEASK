
import {useHistory} from 'react-router-dom'
import illustration from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import {Button} from '../components/Button'
import { UseAuth } from '../hooks/useAuth'



export function Home() {
  const {SignInWitdhGoogle,user} = UseAuth()
   const history = useHistory()

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
          <form>
            <input
             type="text"
             placeholder="digite o código da sala"
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