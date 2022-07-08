import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightArrowLeft, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import Klaytn from '../img/swap/klaytn.png';
import Browny1 from '../img/swap/browny1.png';
import Arrow from '../img/swap/arrowRight.png';
import { addBTK, getBtk, sellBtk, useAlert } from "api"
import AlertModal from 'components/AlertModal';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Swap = () => {
    const bool = {false: 'KLAY', true: 'BTK'}
    const dispatch = useDispatch();

    const [swap, setSwap] = useState(true);
    const [exchange, setExchange] = useState('exchange');

    const customAlert = useAlert();

    const amountInput = useRef('');

    const swapChange = () => {
        setSwap(!swap);
        amountInput.current.value = '';
    }

    const checkValidation = () => {
        let value = amountInput.current.value
        let re = /[^0-9]/g;
        if (re.test(value)) {
            customAlert.open('숫자를 입력해 주세요!');
            amountInput.current.value = '';
            setExchange('');
        }
        else if (Number(value) > 10000) {
            customAlert.open('최대 거래 수량 초과 \n ')
            amountInput.current.value = '';
            setExchange('');
        }

        else {
            if (value !== '') {
                if (swap) setExchange(parseInt(Number(value) * 7.22))
                else setExchange(parseInt(Number(value) / 7.22))
            }
            else setExchange('exchange')
        }
    }

    const { myAddress, klayBalance, btkBalance } = useSelector(state => state.nft);
    
    const swapToken = async () => {
        let amount = amountInput.current.value
        let status;
        if(Number(amount)){
            if(swap){
                const result = await getBtk(myAddress, amount)
                status = result.status
            }
            else{
                const result = await sellBtk(myAddress, amount)
                status = result.status
            }
            if(status){
                customAlert.open('스왑완료');
                dispatch({type: "WALLET_REFRESH"})
            }
            else customAlert.open("오류 발생")
        }
        else {
            customAlert.open("숫자를 입력해주세요")
        }
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Add BTK to KAIKAS
        </Tooltip>
      );

    return (
        <div className='swap-box'>
            <AlertModal {...customAlert} />
            <div className='select-box'>
                <div className='swap-header'>
                    SWAP
                    <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                    >
                    <div className='token-add-kaikas'>
                    <FontAwesomeIcon 
                        icon={faCirclePlus}
                        className='add-BTK-icon'
                        onClick={addBTK}
                    />
                    <img 
                        className='browny-icon' 
                        src={Browny1}
                        alt="이미지를 찾을 수 없습니다"
                    />
                    </div>
                    </OverlayTrigger>
                </div>
                
                {myAddress && 
                    <div className='mywal-info-outer'>
                        <div className='mywal-info'>
                            <div className='mywal-header'>보유량</div>
                            <div className='mywal-bal'>{klayBalance} KLAY</div>
                            <div className='mywal-bal'>{btkBalance} BTK</div>
                        </div>
                    </div>
                }
                <div className='swap-select'>
                    <div className='swap-body'>
                        {<img 
                        className={!swap ? 'browny-icon' : 'klay-icon'} 
                        src={!swap ? Browny1 : Klaytn}
                        alt="이미지를 찾을 수 없습니다"
                        />}
                        {bool[!swap]}
                    </div>
                    <FontAwesomeIcon 
                    icon={faArrowRightArrowLeft} 
                    className='swap-token-icon'
                    onClick={swapChange}
                    />
                    <div className='swap-body'>
                        {<img 
                        className={swap ? 'browny-icon' : 'klay-icon'} 
                        src={!swap ? Klaytn : Browny1}
                        alt="이미지를 찾을 수 없습니다"
                        />}{bool[swap]}
                    </div>
                </div>
                <div className='swap-ratio-outer'>
                <div className='swap-ratio-inner'>
                    <div className='swap-ratio'>1 KLAY = 7.22 BTK</div>
                    <div className='swap-ratio'>1 BTK = 0.14 KLAY</div>
                </div>
                </div>
                <div className='swap-amount-input-box'>
                    <div className='swap-amount-inner'>
                        <div className='swap-input-flex'>
                            <input 
                            className='swap-amount-input'
                            placeholder='amount'
                            // value={input}
                            // onChange={checkInput}
                            onChange={checkValidation}
                            // value={bool[!swap]}
                            ref={amountInput} 
                            />
                            <div className='swap-amount-token'>{bool[!swap]}</div>
                        </div>
                        
                        <img className='swap-arrow' src={Arrow} alt="이미지를 찾을 수 없습니다"/>
                        <div className='swap-input-flex'>
                            <input 
                            disabled
                            className='swap-amount-input'
                            placeholder='exchange'
                            value={amountInput.current.value !== '' ?  exchange : 'exchange'}
                            /> 
                            <div className='swap-amount-token'>{bool[swap]}</div>
                        </div>
                        {/* <div className='swap-exchange'>
                            4{bool[swap]}
                        </div> */}
                    </div>
                </div>
                {exchange !== 'exchange' && myAddress && 
                    <div className='swap-user-token-outer'>
                        <div className='swap-user-token-head-outer'>
                            <div className='swap-user-token-header'>거래 후 잔액</div>
                        </div>
                        <div>
                            <div>
                            KLAY: {klayBalance + ' => '}
                            {
                            !swap ? (Number(klayBalance) + Number(exchange) - 0.023).toFixed(2) : (Number(klayBalance) - Number(amountInput.current.value) - 0.023).toFixed(2)
                            }
                            </div>
                            <div>
                            BTK: {btkBalance + ' => '}
                            {
                            !swap ? (Number(btkBalance) - Number(amountInput.current.value)).toFixed(4) : (Number(btkBalance) + Number(exchange)).toFixed(4)
                            }
                            </div>
                        </div>
                    </div>
                }
                <div className='swap-text-box'>
                    <div className='swap-text'>수수료: 0.023 KLAY</div>
                    <div className='swap-text'>최대 10000(일만)개 거래 가능합니다</div>
                </div>
                <div className='swap-submit'>
                    <button 
                    className='swap-button'
                    onClick={swapToken}
                    type='button'>Submit</button>
                </div>
            </div>
        </div>
  )
}

export default Swap