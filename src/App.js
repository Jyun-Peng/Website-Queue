import React, { useEffect, useState } from 'react';
import './App.css';
import styled from 'styled-components';
import InputBar from './components/InputBar';
import LinkList from './components/LinkList';

const StyledWrapper = styled.div`
    max-width: 480px;
    min-height: 100vh;

    margin: 0 auto;

    background-color: var(--color-main);
`;
const StyledLinkListWrapper = styled.div`
    padding: 4.5rem 1rem 6rem 1rem;
`;

const StyledTitle = styled.h1`
    color: var(--color-white);
    background-color: var(--color-main);
    font-size: 1.5rem;
    padding: 1.5rem 1rem;
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
const Mask = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 300ms, visibility 300ms;
    ${(props) => (props.active ? 'opacity: 1;' : 'opacity: 0; visibility: hidden;')}
`;
function App() {
    const [data, setData] = useState({ count: 0, links: [] });
    const [inputIsOpen, setInputIsOpen] = useState(false);
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

                    <Mask active={inputIsOpen}></Mask>
                    <InputBar handleAddData={handleAddData} isOpen={inputIsOpen} setIsOpen={setInputIsOpen} />
                </FixedWrapper>
            </StyledWrapper>
        </div>
    );
}

export default App;
