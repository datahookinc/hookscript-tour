import React from 'react';
import styled from 'styled-components';

const StyledContent = styled.main`
    display: flex;
    overflow: auto;
    grid-area: content;

    @media only screen and (max-width: 600px) {
        display: block;       
    }
`;

type Props = {
    children: React.ReactNode;
}

export function Content({ children }: Props) {
    return (
        <StyledContent>
            { children }
        </StyledContent>
    )
}
