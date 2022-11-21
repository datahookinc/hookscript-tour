import React from 'react';
import styled from 'styled-components';

const StyledCode = styled.section`
    /* border: 1px solid magenta; */
    overflow: auto;
    flex: 1 1;
    font-size: 1.6rem;
    color: var(--dark-purple);

    .inner {
        padding-left: 20px;

        @media only screen and (max-width: 600px) {
            padding-bottom: 40px;
            padding-right: 20px;
        }
    }

    h1 {
        font-size: 30px;
        text-transform: uppercase;
    }
`;

type Props = {
    children: React.ReactNode;
}

export function InstructionsWrapper({ children }: Props) {
    return (
        <StyledCode>
            <div className="inner">
                {children}
            </div>
        </StyledCode>
    )
}