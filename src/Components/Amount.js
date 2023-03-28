import styles from './Amount.module.css'

function Amount(props) {
  return <p className={styles['amount-container']}>
    <span className={styles['currency']}>{props.currency}</span>
    <span className={styles['amount']}>{(+props.amount).toFixed(2)}</span>
  </p>
}

export default Amount;