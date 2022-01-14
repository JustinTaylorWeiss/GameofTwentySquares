import React from 'react';
import styled from 'styled-components';
import { Log } from '../log';

const TitleText = styled.h1`
    position : absolute;
    transform: translate(-50%, -50%);
    top: 8vh;
    left: 50vw;
    font-size: 4rem;
    margin: 0;
    letter-spacing: 0.1em;
    text-align: center;
    font-weight: 700;
    color: #7851A9;
`;


const TitleTextC = ({}) => (
    <TitleText>
        Game of Twenty Squares
    </TitleText>
);


export const AbsoluteAccesories = ({}) => <>
    <TitleTextC/>
    <Log/>
</>;
