import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const JoinMatch = ({ value, onChange }) => {
    
    const { register, handleSubmit, setValue } = useForm();
    let user;
    if (typeof window !== 'undefined') {
      user = JSON.parse(localStorage.getItem("user"));
    }
    const [partida, setPartida] = useState(user ? 'idPartida' in user : false);

    useEffect(() => {
      setValue('id', value);
      if (user && 'idPartida' in user) { 
        setPartida(true)
      }
    }, [value, setValue]);

    const eraseGame = () => {
      if (typeof window !== 'undefined') {
        let userToModify =  JSON.parse(localStorage.getItem('user'))
        delete userToModify.idPartida
        localStorage.setItem('user', JSON.stringify(userToModify))
        setPartida(false);
      }
    }

    const onSubmit = (data) => {
   
      onChange({ target: { value: data.id } });
    }
    console.log(value)
    return (
      <div>
        <h2>Unirse a una partida {value}</h2>
        {partida ? (
          <div>
            <p>Ya tienes una partida iniciada. ¿Querés borrarla?</p>
            <button onClick={eraseGame}>Sí</button>
            <button>No</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('id')} />
            <input type="submit" />
          </form>
        )}
      </div>
    )
  }