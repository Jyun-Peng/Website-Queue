import React from 'react';
import styled from 'styled-components';
import LinkItem from './LinkItem';

function LinkList({ data, handleRemoveData }) {
    const handleLinkClick = function (idx, url) {
        window.open(url, '_blank');

        handleRemoveData(idx);
    };

    return (
        <ul>
            {data.links.map((link, idx) => (
                <LinkItem key={link.id} idx={idx} url={link.url} handleLinkClick={handleLinkClick}>
                    {link.title}
                </LinkItem>
            ))}
        </ul>
    );
}

export default LinkList;
