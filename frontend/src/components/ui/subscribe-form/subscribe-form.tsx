import {useState, type ChangeEvent, type FC, type FormEvent} from 'react';
import { IconButtonUI } from '../icon-button';
import { ButtonUI } from '../button';
import styles from './subscribe-form.module.css'

type SubscribeFormUIProps ={
  onClear: ()=>void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  email: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}


export const SubscribeFormUI: FC<SubscribeFormUIProps> = ({
  email,
  onChange,
  onClear,
  onSubmit
}) =>{

  return (
    <form onSubmit={onSubmit} name={'subscribe'} className={styles['subscribe-form']}>
      <input className={styles['subscribe-input']} onChange={onChange} name={'email'} value={email} type="email" />
      <IconButtonUI onClick={onClear} type={'reset'} isActive={false} iconClass={'close'}/>
      <div>
        {/* Масштабирование кнопки */}
        <ButtonUI type={'submit'} onClick={()=>{}} color={'secondary'}>Подписаться</ButtonUI>
      </div>
    </form>
  )
}

