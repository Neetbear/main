import React, { useEffect, useState } from 'react'
import { FreeImg } from '../img'
import styled from "styled-components";
import { Container, Row, Col, Button } from 'react-bootstrap'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useDispatch, useSelector } from 'react-redux';
import contractAbi from "../abi.json";
import { useNavigate } from 'react-router-dom';
import Browny from '../img/browny8.png';

// 리팩터링 - 코드를 단순화하는 작업 불필요한 중복요소들을 제거
const StyledMain = styled.div`
    width: 320px;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    background-color: white;
    opacity: 95%;
    border: 3px solid black;
    border-radius: 6px;
    text-align: center;
    display: flex ;
    flex-wrap: wrap;
    justify-content:center;
    background: rgb(243, 224, 224);
`;

const StyledDiv = styled.div`
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    color: green;
    line-height: 1.5;
    background-color: rgb(144, 214, 32);
    /* margin-top: 20px; */
    margin-bottom: 30px;
    margin-left: 20px;
    border-radius: 8px;
    
    /* background: blue; */
`;

const StyledButton = styled.button`
    width: 40px;
    height: 40px;
    padding: 0.375rem 0.75rem;
    border-radius: 20rem;
    font-size: 1rem;
    line-height: 1.5;
    border: 1px solid lightgray;
    color: white;
    background-color: blue;
    margin: 0 6px;
`;

const StyledBar = styled.div`
    margin-bottom: 20px;
    width: 200px;
    height: 20px;
    text-align: center;
`;

const FreeSale = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { myContract } = useSelector(state => state.nft);

    const onClick2 = async () => {
        console.log(myContract);
        try {
            // console.log(typeof(count));
            let data = myContract.methods.batchMint(count)
            console.log(count);
            // .send({
            // from: window.klaytn.selectedAddress,
            // gas: 300000,
            // })
            // console.log(window.klaytn.selectedAddress)
            let test = await data.send({
                from: window.klaytn.selectedAddress,
                gas: 300000,
                value: 0,
            })
            console.log(data);
            console.log(test);
            // if (test.status) alert("해당 지갑 주소로 민팅되었습니다!");

        } catch (e) {
            console.log(e)
        }
        // navigate('/');
        const onClick = async () => {
            const accounts = await window.klaytn.enable()
            console.log("account", accounts)
            const balance = await window.caver.klay.getBalance(accounts[0])
            console.log("balance", balance)
            dispatch({ type: "WHITELIST_KEY", payload: accounts })
        }
        const onClick2 = async () => {
            const conData = await myContract.methods.batchMint(count).encodeABI()
            const test = await window.caver.klay.sendTransaction({
                type: 'SMART_CONTRACT_EXECUTION',
                from: window.klaytn.selectedAddress,
                to: '0xB965D7Ba9814BaF32EE004c165288365BA65eCb5',
                data: conData,
                gas: 300000
            })
            console.log(test)
            alert("해당 지갑 주소로 민팅되었습니다!");
            navigate('/');
        }

        // const dispatch = useDispatch(state => state.nft)

        const [count, setCount] = useState(1)


        const countAdd = () => {
            if (count < 5) setCount(count + 1);
            else alert("최대 5개까지 민팅 가능합니다.");
        }

        const countMinus = () => {
            if (count > 0) setCount(count - 1);
        }

        // useEffect(() => {
        //     dispatch(countAdd())
        // })

        return (
            <div className="freelist">
                <StyledMain >
                    <h2 className="mint-title">Pre-Sale</h2>
                    <div className='mint-img-container'>
                        <StyledDiv >
                            <img src={Browny} style={{ width: 187, height: 220 }} />
                        </StyledDiv>
                    </div>
                    <div className='mint-count-box'>
                        <StyledButton onClick={() => countMinus()}>  - </StyledButton>
                        <span>Mint : {count}</span>
                        <StyledButton onClick={() => countAdd()}> +</StyledButton>
                    </div>
                    <Container className="mint-info-box">
                        <Row>
                            <Col>Price</Col>
                            <Col>2 BTK</Col>
                        </Row>
                        <Row>
                            <Col>Per transaction</Col>
                            <Col>최대 5 개</Col>
                        </Row>
                        <Row>
                            <Col>Amount</Col>
                            <Col>limited</Col>
                        </Row>
                    </Container>
                    <br />
                    {/* <Button className="mint-wal-connect-btn" variant="success" onClick={onClick}>지갑 연결하기</Button>{' '} */}
                    <Button className="mint-wal-connect-btn" variant="success" onClick={onClick2}>노진형 nft 받기</Button>{' '}

                </StyledMain>
            </div>
        )
    }
}
export default FreeSale