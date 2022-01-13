import styled, { css } from "styled-components";

export const absoluteCenter = css`
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    position: absolute;
`;

export const verticalCenter = css`
    position: absolute;
    transform: translate(-0%, -50%);
    top: 50%;
`;

export const horizontalCenter = css`
    position: absolute;
    transform: translate(-50%, -0%);
    left: 50%;
`;