import React, { useState } from 'react';
import styled from 'styled-components';
import { BsPlusLg, BsXLg } from 'react-icons/bs';
import { CSSTransition } from 'react-transition-group';

const StyledWrapper = styled.div`
    width: 100%;
`;
const StyledOpenWrapper = styled.div`
    padding: 1rem;
    /* overflow: hidden; */
    background-color: #305784;
`;
const StyledOpenBtnWrapper = styled.div`
    height: 100%;
    width: calc(100% - 2rem);
    margin: 0 auto 1rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #305784;
    border-radius: 0.625rem;
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
function Button({ className, handleClick, children }) {
    return (
        <button className={className} onClick={handleClick}>
            {children}
        </button>
    );
}
const StyledAddBtn = styled(Button)`
    color: var(--color-white);
    font-size: 1.25rem;
    width: 7rem;
    height: 2.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #12e3a5;
    border-radius: 10px;
    border: none;
`;
const StyledOpenBtn = styled(Button)`
    color: var(--color-white);
    font-size: 1.75rem;
    width: 100%;
    height: 3.75rem;
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
`;
const StyledCloseBtn = styled(Button)`
    color: var(--color-white);
    font-size: 1.75rem;
    width: 3rem;
    height: 2.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #305784;
    border-radius: 0.625rem 0.625rem 0 0;
    border: none;
    & svg {
        transform: rotate(45deg);
    }
`;
const StyledLabel = styled.label`
    font-size: 1.25rem;
    color: var(--color-white);
`;
const StyledInput = styled.input`
    display: block;
    width: 100%;
    height: 2.25rem;
    background-color: #fefefe;
    border-radius: 0.625rem;
    outline: none;
    border: none;
    margin-bottom: ${(props) => (props.mb ? props.mb : '0')};
    margin-top: 0.25rem;
    padding: 0 1rem;
    font-size: 1rem;
`;

function InputBar({ handleInput }) {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const handleTyping = function (setFunction) {
        return function (e) {
            setFunction(e.target.value);
        };
    };

    const handleAdd = (e) => {
        e.preventDefault();
        console.log('Clicked!!!');
        handleInput(title, url);
        setTitle('');
        setUrl('');
        setShow(false);
    };
    const handleOpen = (e) => {
        e.preventDefault();
        setShow(true);
    };
    const handleClose = (e) => {
        e.preventDefault();
        console.log('Close');
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
                    <div className="content">
                        <StyledLabel>
                            Title
                            <StyledInput
                                type="text"
                                onChange={handleTyping(setTitle)}
                                value={title}
                                name="title"
                                mb="0.75rem"
                            />
                        </StyledLabel>

                        <StyledLabel>
                            URL
                            <StyledInput
                                type="text"
                                onChange={handleTyping(setUrl)}
                                value={url}
                                name="url"
                                mb="1.5rem"
                            />
                        </StyledLabel>
                        <StyledBtnGroup>
                            <StyledAddBtn handleClick={handleAdd}>{<BsPlusLg />}</StyledAddBtn>
                        </StyledBtnGroup>
                    </div>

                    <StyledCloseBtnWrapper className="btn--close">
                        <StyledCloseBtn handleClick={handleClose}>
                            <BsPlusLg />
                        </StyledCloseBtn>
                    </StyledCloseBtnWrapper>
                </StyledOpenWrapper>
            </CSSTransition>
        </StyledWrapper>
    );
}

export default InputBar;
