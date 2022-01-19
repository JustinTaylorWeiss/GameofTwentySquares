import styled, { css } from "styled-components";
import { Link } from 'react-router-dom';

export const Circle = (props) =>
<svg {...props} viewBox="0 0 512 512">
    <g>
    	<path d="M256,0C115.39,0,0,115.39,0,256s115.39,256,256,256s256-115.39,256-256S396.61,0,256,0z"/>
    </g>
</svg>

export const Triangle = (props) =>
<svg {...props} viewBox="0 0 490 490">
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
    @media only screen and (max-aspect-ratio: 1/1) {
        font-size: min(8vw, 3.75vh);
    }
    @media only screen and (max-width: 700px) {
        font-size: min(5vw, 9.5vh);
    }
`;

export const MenuH2 = styled.h2`
    font-size: 3.5rem;
    letter-spacing: 0.1em;
    text-align: center;
    font-weight: 700;
    color: #7851A9;
    margin-bottom: 5vh;
    --wider-dimension: max(1vh, 1vw);
    @media only screen and (max-aspect-ratio: 1/1) {
        font-size: min(8vw, 3.75vh);
    }
    @media only screen and (max-width: 700px) {
        font-size: min(5vw, 9.5vh);
    }
`;

export const SubTitleTextButton = styled.h2`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    margin: auto;
    letter-spacing: 0.1em;
    text-align: center;
    font-weight: 700;
    color: #FFFFFF;
    background-color: #7851A9;
    padding: 1.5vh 2vw;
    border-radius: 10px;
    :hover {
        cursor: pointer;
    }
    @media only screen and (max-aspect-ratio: 1/1) {
        padding: 0;
        width: 90%;
        height: 20%;
        font-size: min(5vw, 9.5vh);
    }
    @media only screen and (max-width: 700px) {
        font-size: min(5vw, 9.5vh);
    }
`;

export const Blur = styled.div`
    z-index: 5;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(5px);
`;

export const Window = styled.div`
    z-index: 6;
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
