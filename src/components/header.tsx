import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
    grid-area: header;
    /* border: 1px solid green; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
    background-color: var(--purple-gray);
    color: var(--dark-purple);
    border-bottom: 3px solid var(--dark-purple);

    .header-1 {
        font-size: 4rem;
        text-shadow: 1px 1px white;
    }

    .header-2 {
        font-size: 4rem;
        font-weight: bold;
        text-shadow: 1px 1px white;
    }
`;

export function Header() {
    return (
        <StyledHeader>
            <div>
                <span className="header-1">HOOK</span>
                <span className="header-2">SCRIPT</span>
            </div>
        </StyledHeader>
    )
}

// --blue-accent: #0068FF;
// --dark-purple: #24243A;
// --purple-gray: #B2B7D1;
// --red: #ED7071;
// --green: #8DD384;
// --light-gray: #F3F6FF;
// --purple: #8493D3;
// --dark-blue: #253443;
// --light-code: #f0f1f2;
// --dark-background: #202224;
// --context-background: #2b2d2f;
// font-size: 10px;