import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { BsPlusLg, BsXLg } from 'react-icons/bs';
import { CSSTransition } from 'react-transition-group';
import Button from './Button';
import '../cssAnimation/inputBar.css';

const StyledWrapper = styled.div`
    width: 100%;
    &:before {
        content: '';
        display: block;
        width: 100%;
        height: 5.5rem;
        background: linear-gradient(transparent, #8338ecaa 60%, #8338ecbf 100%);
        position: absolute;
        bottom: 0;
        left: 0;
    }
`;
const StyledMainWrapper = styled.div`
    background-color: var(--color-white);
    padding: 1rem;
`;
const StyledOpenBtnWrapper = styled.div`
    padding: 1.5rem 1rem 1rem 1rem;
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
    height: 3rem;
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
    display: block;
    font-size: 1.2rem;
    color: var(--color-dark-gray);
    &:after {
        content: '${(props) => props.warning}';
        position: absolute;
        right: 0;
        bottom: 2.15rem;
        font-size: 1rem;
        color: var(--color-warning);
        opacity: ${(props) => (props.valid ? '0' : '1')};
        transition: opacity 300ms;
    }
`;
const StyledInput = styled.input`
    display: block;
    width: 100%;
    height: 1.75rem;
    color: var(--color-dark-gray);
    background-color: var(--color-gray);
    border: 0.125rem solid ${(props) => (props.valid ? 'var(--color-gray)' : 'var(--color-warning)')};
    border-radius: 0.925rem;
    outline: none;
    margin-bottom: ${(props) => (props.mb ? props.mb : '0')};
    margin-top: 0.4rem;
    padding: 0 1rem;
    font-size: 1rem;
    transition: background-color 300ms, border 300ms;
    cursor: default;

    &:focus {
        background-color: var(--color-white);
        border: 2px solid var(--color-green);
        color: var(--color-black);
    }
    &::placeholder {
        color: rgba(0, 0, 0, 0.3);
    }
`;
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
        if (title === '' || url === '') {
            if (title === '') setTitleValid(false);
            if (url === '') setUrlValid(false);
            return;
        }
        let hostname;
        try {
            const u = new URL(url);
            hostname = u.hostname;
        } catch (err) {
            setUrlValid(false);
            return;
        }
        handleAddData(title, url, hostname);
        setTitle('');
        setUrl('');
        setIsOpen(false);
    };
    const handleOpen = (e) => {
        setTitleValid(true);
        setUrlValid(true);
        setIsOpen(true);
    };
    const handleClose = (e) => {
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
                        <StyledLabel warning={'Invalid title'} valid={titleValid}>
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
                                placeholder="Enter a title"
                            />
                        </StyledLabel>

                        <StyledLabel warning={'Invalid URL'} valid={urlValid}>
                            URL
                            <StyledInput
                                ref={urlRef}
                                valid={urlValid}
                                type="text"
                                onChange={() => handleTyping(urlRef, setUrl)}
                                onClick={() => setUrlValid(true)}
                                value={url}
                                name="url"
                                mb="1.4rem"
                                placeholder="Enter an URL"
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
