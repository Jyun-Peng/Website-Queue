import React, { useEffect, useState } from 'react';
import './App.css';
import styled from 'styled-components';
import InputBar from './components/InputBar';
import LinkList from './components/LinkList';

const StyledWrapper = styled.div`
    max-width: 480px;
    min-height: 100vh;

    margin: 0 auto;

    background-color: var(--color-black);
`;
const StyledInputBarWrapper = styled.div``;
const StyledLinkListWrapper = styled.div`
    padding: 0 1rem 6rem 1rem;
`;

const StyledTitle = styled.h1`
    color: var(--color-white);
    font-size: 1.5rem;
    /* background-color: var(--color-gold); */
    padding: 0.8rem 1rem;
    box-shadow: var(--shadow);
`;
const FixedWrapper = styled.div`
    display: flex;
    position: fixed;
    width: min(480px, 100%);
    height: 100%;
    top: 0;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    pointer-events: none;

    & > div {
        pointer-events: auto;
    }
`;
const defaultLinks = {
    count: 3,
    links: [
        {
            id: 0,
            title: 'stackoverflow',
            url: 'https://stackoverflow.com/questions/2789703/remove-blue-underline-from-link',
        },
        { id: 1, title: '我以為', url: 'https://www.youtube.com/watch?v=tYj3zJIDyso' },
        { id: 2, title: 'Minecraft', url: 'https://minecraft.fandom.com/wiki/Bedrock_Edition_1.18.12' },
    ],
};
function App() {
    const [data, setData] = useState({ count: 0, links: [] });
    const handleAddData = function (title, url) {
        const { count, links } = data;
        const newData = { count: count + 1, links: [...links, { id: count, title: title, url: url }] };
        setData(newData);
        localStorage.setItem('data', JSON.stringify(newData));
    };
    const handleRemoveData = function (idx) {
        const { count, links } = data;
        const newLinks = [...links];
        newLinks.splice(idx, 1);
        const newData = { count: count + 1, links: newLinks };
        setData(newData);
        localStorage.setItem('data', JSON.stringify(newData));
    };
    useEffect(() => {
        const lsData = JSON.parse(localStorage.getItem('data'));
        console.log(lsData);
        if (!lsData) return;
        setData(lsData);
    }, []);

    return (
        <div className="App">
            <StyledWrapper>
                <StyledLinkListWrapper>
                    <LinkList data={data} handleRemoveData={handleRemoveData} />
                </StyledLinkListWrapper>
                <FixedWrapper>
                    <StyledTitle>Your Links</StyledTitle>
                    <StyledInputBarWrapper>
                        <InputBar handleAddData={handleAddData} />
                    </StyledInputBarWrapper>
                </FixedWrapper>
            </StyledWrapper>
        </div>
    );
}

export default App;
