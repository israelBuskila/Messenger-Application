import React from 'react'
import styled from 'styled-components'
function PreSelect() {
    return (
        <Div>
             <Logo_img src='./web_logo.jpg' width="300" height="300"/>
            <Title>choose username and start chat</Title>
        </Div>
    )
}

export default PreSelect

const Div = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-flow:column;
padding-bottom:5rem;
min-width:80%;
`

const Title = styled.h1`
font-family: "Segoe UI";
color:#525252;
display: flex;
align-items: center;
justify-content: center;
font-size:32px;
font-weight: 300;

`

const Logo_img = styled.img`
border-radius: 50%;
 
`