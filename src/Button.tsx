import React from 'react';
import styled from 'styled-components';

export interface ButtonProps {
    backgroundColor: string;
    color: string;
    width: string;
    height: string;
    onClick?: React.MouseEventHandler;
}


const ButtonCompo = styled.button<Omit<ButtonProps, 'onClick'>>`
    color: ${props => props.color};
    background-color: ${props => props.backgroundColor};
    width: ${props => props.width};
    height: ${props => props.height};
`;

export const Button:React.FC<ButtonProps> = ({ backgroundColor, color, children, width, height, onClick }) => 
    <ButtonCompo
        backgroundColor={backgroundColor}
        color={color}
        width={width}
        height={height}
        onClick={onClick}
    >
        {children}
    </ButtonCompo>;