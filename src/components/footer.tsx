import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    grid-area: footer;
    /* border: 1px solid red; */
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
    padding-left: 20px;
    background-color: var(--light-gray);
    text-align: center;

    .lobster {
        font-size: 16px;
    }

    .lobster::before {
        content: "🦞"
    }

    a {
        text-decoration: none;
        transition: opacity .2s linear;
        color: var(--blue-accent);
    }

    a:hover {
        opacity: 0.6;
    }
`;

export function Footer() {
    return (
        <StyledFooter>
            <div>Built with <span className="lobster"></span> in Halifax, Nova Scotia by <a href="https://www.linkedin.com/in/joshweston/" target="_blank">JW</a></div>
        </StyledFooter>
    )
}
