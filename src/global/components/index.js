import styled, { css } from "styled-components";
import { Link } from 'react-router-dom';

export const Circle = ({className}) =>
<svg viewBox="0 0 512 512" className={className}>
    <g>
    	<path d="M256,0C115.39,0,0,115.39,0,256s115.39,256,256,256s256-115.39,256-256S396.61,0,256,0z"/>
    </g>
</svg>

export const Triangle = ({className}) =>
<svg viewBox="0 0 490 490" className={className}>
	<g>
		<path d="M490,474.459H0L245.009,15.541L490,474.459z"/>
	</g>
</svg>

export const SubTitleText = styled.h2`
    font-size: 5rem;
    margin: auto;
    letter-spacing: 0.1em;
    text-align: center;
    font-weight: 700;
    color: #FFFFFF;
`;

export const MenuH2 = styled.h2`
    font-size: 3rem;
    letter-spacing: 0.1em;
    text-align: center;
    font-weight: 700;
    color: #7851A9;
    margin-bottom: 5vh;
`;

export const SubTitleTextButton = styled.h2`
    font-size: 3rem;
    margin: auto;
    letter-spacing: 0.1em;
    text-align: center;
    font-weight: 700;
    color: #FFFFFF;
    background-color: #7851A9;
    padding: 20px 40px;
    border-radius: 10px;
    :hover {
        cursor: pointer;
    }
`;

export const Blur = styled.div`
    z-index: 2;
    position: absolute;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(5px);
`;

export const Window = styled.div`
    z-index: 3;
    position: absolute;
    width: 75vw;
    height: 75vh;
    background-color: #373737;
    transform: translate(-50%, -50%);
    top: 50vh;
    left: 50vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 10px solid #7851A9;
`;
export const WrapperLink = styled(Link)`
  text-decoration: none;
`;
