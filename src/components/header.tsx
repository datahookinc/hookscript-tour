import React from 'react';
import { Link } from 'gatsby';
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

    sup {
        font-size: 18px;
        font-family: monospace;
        margin-top: 8px;
        line-height: 26px;
        padding-left: 6px;
        vertical-align: top;
    }

    a, a:hover, a:visited {
        text-decoration: none;
        color: var(--dark-purple);
    }

`;

export function Header() {
    return (
        <StyledHeader>
            <Link to="/tour/welcome">
                <div>
                    <span className="header-1">HOOK</span>
                    <span className="header-2">SCRIPT</span>
                    <sup>v0.8.0</sup>
                </div>
            </Link>
        </StyledHeader>
    )
}
