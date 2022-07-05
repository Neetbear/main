import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import PreSale from './PreSale'
import mintBackground from "../../img/mint/fireplace.png"
import { Main1, Main2, Main3 } from '../../img';
import { PreBrowny, WhiteBrowny } from '../../img/browny';

let preSaleProps = {
  title: 'Pre-Sale',
  img: PreBrowny,
  price: 50,
  amount: '/120',
}

let whiteSaleProps = {
  title: 'White-Sale',
  img: WhiteBrowny,
  price: 25,
  amount: '/30',
}


const MintCard = () => {  
    return (
      <>
      <img 
          style={{ position: "absolute", width: "80%", height: "88%", top: "5%", left: "10%", zIndex: "-2" }} 
          // src='https://www.google.com/imgres?imgurl=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fbaking-buns-oven-vector-image-tray-which-lie-hot-68181559.jpg&imgrefurl=https%3A%2F%2Fwww.dreamstime.com%2Fstock-illustration-baking-buns-oven-vector-image-tray-which-lie-hot-image68181559&tbnid=vYdHEH5_NKaxTM&vet=12ahUKEwiP5amco-H4AhWLypQKHTroBxYQMygAegUIARDGAQ..i&docid=KFCQZUMUwxo5OM&w=800&h=800&hl=ko&safe=images&ved=2ahUKEwiP5amco-H4AhWLypQKHTroBxYQMygAegUIARDGAQ'
          // src={Main1}
      src={mintBackground} 
      />
      <Container className='MintCard'>
          <Row>
            <Col className='FreeSale' xs={{span:4, offset:2 }}> 
              <PreSale 
                {...preSaleProps}/> 
            </Col>
            <Col className='WhiteSale' xs={{span:4 }}> 
              <PreSale 
               {...whiteSaleProps}/> 
              </Col>
          </Row>
        </Container>
      </>
    )
}

export default MintCard