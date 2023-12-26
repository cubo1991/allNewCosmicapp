import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export const JoinMatch = ({ value, onChange }) => {
    
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
      setValue('id', value);
    }, [value, setValue]);

    const onSubmit = (data) => {
      console.log(data.id)
      onChange({ target: { value: data.id } });
    }
  
    return (
      <div>
        <h2>Unirse a una partida</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('id')} />
          <input type="submit" />
        </form>
      </div>
    )
  }
