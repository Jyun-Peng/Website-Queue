import React from 'react';
import styled from 'styled-components';
import LinkItem from './LinkItem';

function LinkList({ links, setLinks }) {
    const handleLinkClick = function (e) {
        e.preventDefault();
        window.open(e.target.href, '_blank');
        const idx = e.target.dataset.idx;
        const newLinks = [...links];
        newLinks.splice(idx, 1);
        setLinks(newLinks);
    };

    return (
        <ul>
            {links.map((link, idx) => (
                <LinkItem key={idx} idx={idx} url={link.url} handleClick={handleLinkClick}>
                    {link.title}
                </LinkItem>
            ))}
        </ul>
    );
}

export default LinkList;
