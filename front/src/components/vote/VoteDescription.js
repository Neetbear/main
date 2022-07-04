import React from 'react'
import styled from 'styled-components'

const DescriptionOuter = styled.div`
    display: flex;
`
const Description = styled.div`
    background: lightgray;
    letter-spacing: 2.5px;
    padding: 20px;
    border-radius: 30px;
    width: 700px;
`

const VoteDescription = () => {
    return (
        <DescriptionOuter>
            <Description>
                Browny 커뮤니티에 오신걸 환영합니다.
                자유롭게 소통하시되 다음 규칙사항을 준수해주세요.
                <br />  
                <br />

                1. 비방 욕설의 글은 삼가해주세요. <br />
                2. 해당 글 Topic에 맞게 글 작성해주시기 바랍니다. <br />
                3. 일주일에 한번 커뮤니티 안건이 등록됩니다. 각 안건당 투표는 한 번씩만 가능<br /> 
                &nbsp;&nbsp;&nbsp;하며, 득표수에 따라 프로젝트의 방향성이 좌우되므로 신중하게 투표해주시기 <br />
                &nbsp;&nbsp;&nbsp;바랍니다^^
            </Description>
        </DescriptionOuter>
    )
}

export default VoteDescription