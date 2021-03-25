import React from 'react';
import styles from './styles/button.module.scss';

interface ButtonProps {
    type: 'button' |'reset'|'submit';
    onClick?:React.MouseEventHandler;
}
const Button:React.FC<ButtonProps> = ({
    children,
    type,
    onClick
}) => 
<button
    className={styles.button}
    type={type}
    onClick={onClick}
>
    {children}
</button>;

export default Button;