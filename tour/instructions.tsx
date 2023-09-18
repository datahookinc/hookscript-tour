import React from 'react';
import styled from 'styled-components';

const StyledInstructions = styled.section`
    flex: 1 1;
    font-size: 1.6rem;
    color: var(--dark-purple);
    position: relative;
    box-sizing: border-box;
    overflow-x: auto;
    
    .inner {
        padding-left: 20px;
        display: flex;
        flex-direction: column;
        height: 100%;
        
        .instructions-main {
            flex: 1;
            overflow: auto;
            padding-right: 10px;
        }

        @media only screen and (max-width: 600px) {
            padding-bottom: 40px;
            padding-right: 20px;
        }
    }

    h1 {
        font-size: 30px;
        text-transform: uppercase;
    }

    pre {
        border-radius: 5px;
        background-color: var(--dark-blue);
        color: var(--light-gray);
        padding: 10px;
        margin-right: 20px;
        tab-size: 4;
        overflow-y: auto;
    }

`;

type Props = {
    children: React.ReactNode;
}

export function InstructionsWrapper({ children }: Props) {
    return (
        <StyledInstructions>
            <div className="inner">
                {children}
            </div>
        </StyledInstructions>
    )
}
