import React, { useRef } from 'react'
import styles from './CheckoutForm.module.css'


export default function CheckoutForm(props) {
  const unameRef = useRef(null)
  const emailRef = useRef(null)
  const addressRef = useRef(null)
  const pCodeRef = useRef(null)

  function formSubmissionHandler(evnt) {
    evnt.preventDefault()
    const uname = unameRef.current.value
    const email = emailRef.current.value
    const address = addressRef.current.value
    const pCode = pCodeRef.current.value
    const userData = { name: uname, email, address, pCode }
    props.onCheckOut(userData)
  }

  return <form onSubmit={formSubmissionHandler} className={styles['checkout-form']}>
    <div className={styles['form-control']}>
      <label htmlFor='name'>Name :</label>
      <input ref={unameRef} id='name' type='text' />
    </div>
    <div className={styles['form-control']}>
      <label htmlFor='email'>Email :</label>
      <input ref={emailRef} id='email' type='email' />
    </div>
    <div className={styles['form-control']}>
      <label htmlFor='postal-code'>Postal Code :</label>
      <input ref={pCodeRef} id='postal-code' type='number' maxLength='6' />
    </div>
    <div className={styles['form-control']}>
      <label htmlFor='address'>Address :</label>
      <textarea ref={addressRef} id='address' />
    </div>
    <div className={styles['form-actions']}>
      <button onClick={props.onCancel} className={styles['btn-cancel']} type='button'>Cancel</button>
      <button className={styles['btn-confirm']} type='submit'>Confirm</button>
    </div>
  </form>
}
