import React, { useState } from 'react';
import './App.css';
import styled from 'styled-components';
// import components
import InputBar from './components/InputBar';
import LinkList from './components/LinkList';

const StyledWrapper = styled.div`
    max-width: 480px;
    min-height: 100vh;

    margin: 0 auto;

    background-color: #78a2be;
`;
const StyledInputBarWrapper = styled.div`
    width: min(480px, 100%);
    position: fixed;
    bottom: 0;
`;
const StyledLinkListWrapper = styled.div`
    padding: 0 1rem 6rem 1rem;
`;

const StyledTitle = styled.h1`
    padding: 1rem 1rem 1.5rem 1rem;
`;

const defaultLinks = [
    { title: 'sfes', url: 'https://stackoverflow.com/questions/2789703/remove-blue-underline-from-link' },
    { title: 'title', url: 'link' },
    { title: 'title', url: 'link' },
    { title: 'title', url: 'link' },
    { title: 'title', url: 'link' },
    { title: 'title', url: 'link' },
    { title: 'title', url: 'link' },
    { title: 'title', url: 'link' },
    { title: 'title', url: 'link' },
    { title: 'title', url: 'link' },
    { title: 'title', url: 'link' },
    { title: 'title', url: 'link' },
    { title: 'title', url: 'link' },
    { title: 'title', url: 'link' },
    { title: 'title', url: 'link' },
    { title: 'title', url: 'link' },
];

function App() {
    const [links, setLinks] = useState(defaultLinks);

    const handleInput = function (title, url) {
        // if link is valid, call setLinks
        // else do nothing
        setLinks([...links, { title: title, url: url }]);
    };

    return (
        <div className="App">
            <StyledWrapper>
                <StyledTitle>Website Links</StyledTitle>
                <StyledLinkListWrapper>
                    <LinkList links={links} setLinks={setLinks} />
                </StyledLinkListWrapper>
                <StyledInputBarWrapper>
                    <InputBar handleInput={handleInput} />
                </StyledInputBarWrapper>
            </StyledWrapper>
        </div>
    );
}

export default App;
