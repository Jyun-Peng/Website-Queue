import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import '../cssAnimation/linkItem.css';

const StyledItem = styled.li`
    &:not(:last-child) {
        margin-bottom: 0.8rem;
    }
`;
const StyledLink = styled.a`
    display: block;
    background-color: var(--color-white);
    opacity: 0.7;
    border-radius: 0.4rem;
    font-size: 1rem;
    line-height: 1.2;
    padding: 0.5rem 0.8rem;
    text-decoration: none;
    transition: opacity 0.2s;
    &:hover {
        opacity: 1;
    }
    & > h3 {
        font-size: 1rem;
        line-height: 1;
        margin-bottom: 0.25rem;
    }
    & > p {
        font-size: 0.8rem;
        line-height: 1;
    }
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

        setTimeout(() => handleLinkClick(idx, url), transition);
    };
    return (
        <StyledItem ref={ref} onClick={handleClick}>
            <StyledLink href="#!" onClick={(e) => e.preventDefault()} draggable="false">
                {children}
            </StyledLink>
        </StyledItem>
    );
}

export default LinkItem;
