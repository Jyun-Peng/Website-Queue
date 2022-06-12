import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import '../cssAnimation/linkItem.css';

const StyledItem = styled.li`
    &:not(:last-child) {
        margin-bottom: 0.8rem;
    }
`;
const StyledParagraph = styled.p`
    display: block;
    background-color: var(--color-white);
    border-radius: 0.625rem;
    font-size: 1.25rem;
    padding: 0.8rem 1rem 0.8rem 1rem;
    text-decoration: none;
    cursor: pointer;
`;

function LinkItem({ idx, url, children, handleLinkClick }) {
    const ref = useRef(null);
    const transition = 300;
    useEffect(() => {
        ref.current.classList.add('linkItem--enter');
        setTimeout(() => {
            ref.current.classList.remove('linkItem--enter');
        }, transition);
    }, []);
    const handleClick = (e) => {
        ref.current.style.transition = `opacity ${transition}ms, margin-bottom ${transition}ms, margin-top ${transition}ms`;
        ref.current.style.marginTop = `${-ref.current.clientHeight}px`;
        ref.current.style.marginBottom = '0px';
        ref.current.style.opacity = '0';
        // console.log(idx);
        setTimeout(() => handleLinkClick(idx, url), transition);
    };
    return (
        <StyledItem ref={ref} onClick={handleClick}>
            <StyledParagraph>{children}</StyledParagraph>
        </StyledItem>
    );
}

export default LinkItem;
