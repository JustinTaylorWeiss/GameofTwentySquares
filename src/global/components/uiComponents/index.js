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

export const LightHeader = styled.h1`
  margin: 10px auto 10px auto;
  font-size: 2rem;
  color: white;
`;

export const DarkHeader = styled.h1`
  margin: 10px auto 10px auto;
  text-align: center;
  font-size: 2rem;
  color: #7851A9;
`;

export const DarkButton = styled.button`
  text-align: center;
  color: white;
  background-color: #7851A9;
  margin: 5px;
  padding: 10px 5px 10px 5px;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 5px;
`;

export const LightButton = styled.button`
  text-align: center;
  background-color: white;
  color: #7851A9;
  padding: 10px 5px 10px 5px;
  margin: 5px;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const WrapperLink = styled(Link)`
  text-decoration: none;
`;
