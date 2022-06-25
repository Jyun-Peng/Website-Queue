import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { BsPlusLg, BsXLg } from 'react-icons/bs';
import { CSSTransition } from 'react-transition-group';
import Button from './Button';
import '../cssAnimation/inputBar.css';

const StyledWrapper = styled.div`
    width: 100%;
`;
const StyledMainWrapper = styled.div`
    background-color: var(--color-white);
    padding: 1rem;
`;
const StyledOpenBtnWrapper = styled.div`
    padding: 0 1rem 1rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledCloseBtnWrapper = styled.div`
    position: absolute;
    left: 50%;
    top: 0%;
    transform: translate(-50%, -100%);
`;
const StyledBtnGroup = styled.div`
    display: flex;
    justify-content: flex-end;
`;
// Buttons
const StyledAddBtn = styled(Button)`
    color: var(--color-white);
    background-color: var(--color-green);
    font-size: 1.25rem;
    width: 7rem;
    height: 2.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: none;

    &:active {
        background-color: var(--color-dark-green);
    }
`;
const StyledOpenBtn = styled(Button)`
    color: var(--color-gray);
    background-color: var(--color-white);
    font-size: 1.75rem;
    width: 100%;
    height: 3.75rem;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    border-radius: 0.625rem;

    &:active {
        color: var(--color-gray-click);
    }
`;
const StyledCloseBtn = styled(Button)`
    background-color: var(--color-white);
    color: var(--color-gray);
    font-size: 1.75rem;
    width: 3rem;
    height: 2.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-white);
    border-radius: 0.625rem 0.625rem 0 0;
    border: none;
    /* box-shadow: var(--shadow); */
    & svg {
        transform: rotate(45deg);
    }
    &:active {
        color: var(--color-gray-click);
    }
`;
const StyledLabel = styled.label`
    font-size: 1.25rem;
    color: var(--color-dark-gray);
`;
const StyledInput = styled.input`
    display: block;
    width: 100%;
    height: 2.25rem;
    color: var(--color-dark-gray);
    background-color: var(--color-gray);
    border: 2px solid ${(props) => (props.valid ? 'var(--color-gray)' : 'var(--color-warning)')};
    border-radius: 0.625rem;
    outline: none;
    margin-bottom: ${(props) => (props.mb ? props.mb : '0')};
    margin-top: 0.5rem;
    padding: 0 1rem;
    font-size: 1rem;
    transition: background-color 300ms, border 300ms;
    cursor: default;

    &:focus {
        background-color: var(--color-white);
        border: 2px solid var(--color-green);
        color: var(--color-black);
    }
`;

function checkValidURL(url) {
    let res;
    try {
        res = new URL(url);
    } catch (err) {
        return false;
    }
    return true;
}

function InputBar({ handleAddData, isOpen, setIsOpen }) {
    const [isOn, setIsOn] = useState(false);
    const [titleValid, setTitleValid] = useState(true);
    const [urlValid, setUrlValid] = useState(true);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const titleRef = useRef(null);
    const urlRef = useRef(null);
    const handleTyping = (ref, setFunction) => {
        setFunction(ref.current.value);
    };
    const handleAdd = (e) => {
        // e.preventDefault();
        const titleIsValid = title !== '';
        const urlIsValid = url !== '' && checkValidURL(url);
        if (!titleIsValid || !urlIsValid) {
            if (!titleIsValid) setTitleValid(false);
            if (!urlIsValid) setUrlValid(false);
            return;
        }
        handleAddData(title, url);
        setTitle('');
        setUrl('');
        setIsOpen(false);
    };
    const handleOpen = (e) => {
        // e.preventDefault();
        setTitleValid(true);
        setUrlValid(true);
        setIsOpen(true);
    };
    const handleClose = (e) => {
        // e.preventDefault();
        setTitle('');
        setUrl('');
        setIsOpen(false);
    };
    return (
        <StyledWrapper>
            {!isOn && (
                <StyledOpenBtnWrapper>
                    <StyledOpenBtn handleClick={handleOpen}>{<BsPlusLg />}</StyledOpenBtn>
                </StyledOpenBtnWrapper>
            )}
            <CSSTransition
                in={isOpen}
                timeout={300}
                classNames="inputbar"
                unmountOnExit
                onEnter={() => setIsOn(true)}
                onExited={() => setIsOn(false)}
            >
                <StyledMainWrapper>
                    <StyledCloseBtnWrapper className="btn--close">
                        <StyledCloseBtn handleClick={handleClose}>
                            <BsPlusLg />
                        </StyledCloseBtn>
                    </StyledCloseBtnWrapper>
                    <div className="content">
                        <StyledLabel>
                            Title
                            <StyledInput
                                ref={titleRef}
                                valid={titleValid}
                                type="text"
                                onChange={() => handleTyping(titleRef, setTitle)}
                                onClick={() => setTitleValid(true)}
                                value={title}
                                name="title"
                                mb="0.75rem"
                            />
                        </StyledLabel>

                        <StyledLabel>
                            URL
                            <StyledInput
                                ref={urlRef}
                                valid={urlValid}
                                type="text"
                                onChange={() => handleTyping(urlRef, setUrl)}
                                onClick={() => setUrlValid(true)}
                                value={url}
                                name="url"
                                mb="1.5rem"
                            />
                        </StyledLabel>
                        <StyledBtnGroup>
                            <StyledAddBtn handleClick={handleAdd}>{<BsPlusLg />}</StyledAddBtn>
                        </StyledBtnGroup>
                    </div>
                </StyledMainWrapper>
            </CSSTransition>
        </StyledWrapper>
    );
}

export default InputBar;
