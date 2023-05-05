import { Card as MuiCard, CardProps } from '@mui/material';
import styles from './Card.module.css';

const Card = (props: CardProps) => {
  return <MuiCard variant="outlined" className={styles.Card} {...props} />;
};

export default Card;
