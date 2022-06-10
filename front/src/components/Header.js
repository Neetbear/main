import React, { useState, useEffect } from 'react'
import { ToggleButton, Nav, Form, FormControl, Button, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../img/brownyLogo.png';
import { useNavigate } from 'react-router-dom';
import PFP from '../img/profile1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';

const SearchBox = styled.div`
    background-color: rgb(26, 126, 213);
    border-radius: 30px;
    width: 290px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 20px 10px 350px;
    border: 1px solid black;
`
const SearchInput = styled.input`
    padding-left: 20px;
    width: 16rem;
    height: 2.5rem;
    font-size: medium;
`

const LogoContainer = styled.div`
    background-image: url(${Logo});
    width: 130px;
    height: 70px;
    background-repeat: no-repeat;
    background-size: cover;
    border: 1px solid black;
    margin-left: 1px;
`
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-left: 0px; */
    /* position: absolute; */
    /* right: 10%; */
`

const PFPContainer = styled.div`
  /* position: fixed;
  right: 10px;
  top: 0px; */
  /* margin-top: 10px; */
  /* margin-left: 1px; */
  margin-left: 10px;
  /* font-weight: bold; */
  font-size: 20px;
  /* width: 50px;
  height: 50px; */
  padding: 2px 10px;
  border: 3px solid;
  border-radius: 20px;
  background-color: #198754;
  border-color: #198754;
  letter-spacing: -1px;
  padding: 1px 20px;
  cursor: pointer;
  color: white;
  /* position: fixed; */
  &:hover{  
    transform: scale(1.1);
  }
`
const StyledInfo = styled.div`
    /* background: red; */
    width: 105%;
    margin-top: 7px;
    position: relative;
    border: 1px solid black;
    border-radius: 8px;
    padding: 6px 10px;
    font-weight: bold;
    line-height: 30px;
    /* margin-right: 20px; */
    background: white;
    text-align: center;
`

const Header = () => {
    const dispatch = useDispatch();
    const { modalState } = useSelector(state => state.nft);

    const [checked, setChecked] = useState(false);
    const [address, setAddress] = useState(null);
    const [balance, setBalance] = useState(null);
    const [infoState, setInfoState] = useState(false);

    const onClick = async () => {
        const accounts = await window.klaytn.enable()
        console.log(accounts)
        const balance = await window.caver.klay.getBalance(accounts[0])
        setAddress(accounts);
        setBalance(balance);
        console.log(balance)
    }

    window.klaytn.on('accountsChanged', async function(accounts) {
        console.log(accounts[0])
        sessionStorage.setItem('id', accounts[0]);
        setAddress(accounts[0]);
        const balance = await window.caver.klay.getBalance(window.klaytn.selectedAddress)
        setBalance(balance);
        console.log(window.caver.utils.fromWei(balance))
    })

    const copyAddress = () => {
        navigator.clipboard.writeText(address)
    }

    const showInfo = () => {
        // console.log('show');
        dispatch({type: "MODAL_CLICK"})
    }

    const closeModal = () => {
        dispatch({type: "MODAL_CLOSE"})
    }

    useEffect(() => {
        console.log(address);
    }, [address])

    return (
        <Navbar className="nav" expand="lg">
            <Container fluid>
                <Navbar.Brand>
                    <Link to="/"><LogoContainer /></Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Link onClick={closeModal} className='nav-item' to="/">Home</Link>
                    <Link onClick={closeModal} className='nav-item' to="/mint">Mint</Link>
                    {/* <Link className='nav-item' to="/whitelist">Whitelist</Link> */}
                    <Link onClick={closeModal} className='nav-item' to="/admin">admin</Link>
                    <Link onClick={closeModal} className='nav-item' to="/test">testpage</Link>
                </Nav>
                {/* <SearchBox>
                    <SearchInput 
                    type="text"
                    placeholder="Search By ID..."
                    aria-label="Search"
                    />
                </SearchBox> */}

                {/* <ButtonContainer>
                    <ToggleButton
                        className="mb-2"
                        id="toggle-check"
                        type="checkbox"
                        variant="outline-primary"
                        checked={checked}
                        value="1"
                        onChange={(e) => setChecked(e.currentTarget.checked)}
                    >
                        Search
                    </ToggleButton>
                </ButtonContainer> */}
                {
                // sessionStorage.getItem('id')
                address != null
                ? 
                <div className="info-box">  
                    <PFPContainer
                        onClick={showInfo}
                    >
                    {address.toString().slice(0,7)+'...'+address.toString().slice(-7)}
                    </PFPContainer>
                    {modalState && 
                        <StyledInfo>
                        WHITELIST<br/>
                        Copy Address
                        <FontAwesomeIcon 
                            className='copy-icon'
                            icon={faCopy} 
                            onClick={copyAddress}    
                        />
                        <br />
                        {balance.slice(0,3)+'.'+balance.slice(3,5) + " KLAYS"}
                        </StyledInfo>
                    }
                </div>
                : <><Button className="mint-wal-connect-btn" variant="success" onClick={onClick}>지갑 연결하기</Button>{' '}</>
                }
                </Navbar.Collapse>
            </Container>
        </Navbar>
        // <div className='mint-container'>
        //     <LogoContainer />

        //     <SearchBox>
        //         <SearchInput 
        //         type="text"
        //         placeholder="Search By ID..."
        //         aria-label="Search"
        //         />
        //     </SearchBox>
        //     <ButtonContainer>
        //         <ToggleButton
        //             className="mb-2"
        //             id="toggle-check"
        //             type="checkbox"
        //             variant="outline-primary"
        //             checked={checked}
        //             value="1"
        //             onChange={(e) => setChecked(e.currentTarget.checked)}
        //         >
        //             Kaikas 열기
        //         </ToggleButton>
        //     </ButtonContainer>
        // </div>
    )
}

export default Header