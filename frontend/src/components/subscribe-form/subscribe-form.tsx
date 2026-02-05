import { useState, type ChangeEvent, type FormEvent } from "react";
import { SubscribeFormUI } from "../ui/subscribe-form";



export const SubscribeForm = () => {
  const [emailVal, setEmailVal] = useState<string>('');
  const handleClearInput = () =>{
    setEmailVal('');
  }

  const hanldeChange =(e:ChangeEvent<HTMLInputElement>) => {
    setEmailVal(e.target.value);
    //  продумать валидацию поля
  }

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // const form  = e.currentTarget;
    // const email = (form.elements.namedItem('email') as HTMLInputElement).value
    console.log(emailVal)
    //  продумать? пока заглушка
  };

  return (
    <SubscribeFormUI email={emailVal} onChange={hanldeChange} onClear={handleClearInput} onSubmit={handleSubmit}/>
  )
}