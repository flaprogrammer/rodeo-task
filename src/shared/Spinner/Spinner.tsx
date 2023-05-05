import styles from './Spinner.module.css';

const Spinner = () => {
  return (
      <div className={styles.Spinner}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
    )
}

export default Spinner;