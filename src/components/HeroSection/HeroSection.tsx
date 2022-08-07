import React, { useState } from "react";
import { Container, BgImg, Content, BgWrap, P, H1, BtnWrap, Btn, Icon, HoverIcon, TextWrap } from "./styled";

const HeroSection = () => {
  const [isBtnHover, setIsBtnHover] = useState(false);

  const btnHover = () => {
    setIsBtnHover(!isBtnHover);
  }

	return (
		<Container>
      <BgWrap>
        <BgImg src={""} />
      </BgWrap>
      
			<Content>
        <TextWrap>
          <H1>Blockchain Basics</H1>
          <P>This is for the biginners to understand blockchain.</P>
        </TextWrap>

        <BtnWrap>
          <Btn to="/mint" 
            onMouseEnter={btnHover}
            onMouseLeave={btnHover}
            >
            Get started
            {isBtnHover ? <Icon/> : <HoverIcon/>}
          </Btn>
        </BtnWrap>
			</Content>
		</Container>
	);
};

export default HeroSection;
