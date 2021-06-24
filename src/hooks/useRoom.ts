import { useState, useEffect } from 'react';
import { database } from '../services/firebase';
import { UseAuth } from './useAuth';

type QuestionType = {
  id:string
  author:{ 
    name:string
    avatar:string
  }
  content:string
  isAnswered:boolean
  isHighlighted:boolean
  LikeCount:number
  LikeId:string | undefined
}

type FirebaseQuestionss = Record<string,{
  author:{
    name:string
    avatar:string
  }
  content:string
  isAnswered:boolean
  isHighlighted:boolean
  likes: Record<string,{
    authorId:string
  }>
}>

export function useRoom(roomId:string){
  const {user} = UseAuth()
  const [questions,setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState('')

  
  useEffect(()=>{
    const roomRef = database.ref(`rooms/${roomId}`)

     roomRef.on('value', room=>{
      const databaseRoom = room.val()
      const FirebaseQuestions:FirebaseQuestionss = databaseRoom.questions ?? {}
      const parsedQuestions = Object.entries(FirebaseQuestions).map(([key,value])=>{
        return {
          id:key,
          content:value.content,
          author:value.author,
          isHighlighted:value.isHighlighted,
          isAnswered:value.isAnswered, 
          LikeCount: Object.values(value.likes ?? {}).length,
          LikeId:Object.entries(value.likes ?? {}).find(([key,like])=> like.authorId === user?.id)?.[0]
        }
      })
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })
    return () =>{
      roomRef.off('value')
    }
  },[roomId, user?.id ])
  return {questions,title}
}