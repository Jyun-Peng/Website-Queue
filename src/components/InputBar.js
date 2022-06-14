import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { BsPlusLg, BsXLg } from 'react-icons/bs';
import { CSSTransition } from 'react-transition-group';
import Button from './Button';

const StyledWrapper = styled.div`
    width: 100%;
`;
const StyledOpenWrapper = styled.div`
    padding: 1rem;
    box-shadow: var(--shadow);
`;
const StyledOpenBtnWrapper = styled.div`
    padding: 0 1rem;
    margin-bottom: 1rem;
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
    color: var(--color-white);
    background-color: var(--color-gold);
    font-size: 1.75rem;
    width: 100%;
    height: 3.75rem;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    border-radius: 0.625rem;
    box-shadow: var(--shadow);

    &:active {
        color: var(--color-gray-click);
    }
`;
const StyledCloseBtn = styled(Button)`
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
    border: 2px solid var(--color-gray);
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

function InputBar({ handleAddData }) {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const titleRef = useRef(null);
    const urlRef = useRef(null);
    const handleTitleTyping = (e) => {
        setTitle(titleRef.current.value);
    };
    const handleUrlTyping = (e) => {
        setUrl(urlRef.current.value);
    };
    const handleAdd = (e) => {
        // e.preventDefault();
        if (title === '' || url === '') return;
        handleAddData(title, url);
        setTitle('');
        setUrl('');
        setShow(false);
    };
    const handleOpen = (e) => {
        // e.preventDefault();
        setShow(true);
    };
    const handleClose = (e) => {
        // e.preventDefault();
        setTitle('');
        setUrl('');
        setShow(false);
    };
    return (
        <StyledWrapper open={open}>
            {!open && (
                <StyledOpenBtnWrapper>
                    <StyledOpenBtn handleClick={handleOpen.bind(this)}>{<BsPlusLg />}</StyledOpenBtn>
                </StyledOpenBtnWrapper>
            )}
            <CSSTransition
                in={show}
                timeout={300}
                classNames="inputbar"
                unmountOnExit
                onEnter={() => setOpen(true)}
                onExited={() => setOpen(false)}
            >
                <StyledOpenWrapper>
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
                                type="text"
                                onChange={handleTitleTyping}
                                value={title}
                                name="title"
                                mb="0.75rem"
                            />
                        </StyledLabel>

                        <StyledLabel>
                            URL
                            <StyledInput
                                ref={urlRef}
                                type="text"
                                onChange={handleUrlTyping}
                                value={url}
                                name="url"
                                mb="1.5rem"
                            />
                        </StyledLabel>
                        <StyledBtnGroup>
                            <StyledAddBtn handleClick={handleAdd}>{<BsPlusLg />}</StyledAddBtn>
                        </StyledBtnGroup>
                    </div>
                </StyledOpenWrapper>
            </CSSTransition>
        </StyledWrapper>
    );
}

export default InputBar;
