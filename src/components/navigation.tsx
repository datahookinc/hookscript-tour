import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StyledNavigation = styled.nav`
    /* position: absolute; */
    /* bottom: 0px; */
    /* left: 0px; */
    width: 100%;
    text-align: center;
    padding-bottom: 10px;

    span {
        font-weight: bold;
    }
`;

type Props = {
    back?: string;
    forward?: string;
    index: number;
}

export function Navigation({ back,  forward, index }: Props) {
    return (
        <StyledNavigation>
            {back && 
            <Link to={back}>
                <IconButton size="large">
                    <ArrowBackIcon style={{  width: "2em", height: "2em", color: "var(--blue-accent)"}}/>
                </IconButton>
            </Link>
            }
            <span>{index} of 6</span>
            {forward && 
            <Link to={forward}>
                <IconButton size="large">
                    <ArrowForwardIcon style={{  width: "2em", height: "2em", color: "var(--blue-accent)"}}/>
                </IconButton>
            </Link>
            }
        </StyledNavigation>
    )
}
