import React, { useState } from 'react';
import styled from 'styled-components';

const StyledItem = styled.li`
    &:not(:last-child) {
        margin-bottom: 0.8rem;
    }
`;
const StyledAnchor = styled.a`
    display: block;
    background-color: var(--color-white);
    border-radius: 0.625rem;
    font-size: 1.25rem;
    padding: 0.8rem 1rem 0.8rem 1rem;
`;
const StyledParagraph = styled.p`
    text-decoration: none;
    pointer-events: none;
`;

function LinkItem({ idx, url, children, handleClick }) {
    return (
        <StyledItem key={idx}>
            <StyledAnchor href={url} target="_blank" data-idx={idx} onClick={handleClick}>
                <StyledParagraph>{children}</StyledParagraph>
            </StyledAnchor>
        </StyledItem>
    );
}

export default LinkItem;
