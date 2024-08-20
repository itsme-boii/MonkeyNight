import React from "react";
import styled , { keyframes } from "styled-components";
import Typewriter from "typewriter-effect";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from "../../utils/motion";
import Dep from '../DeployFunction';




const TokenContainer = styled.div`
  display: flex;
  justify-content: center;

  position: relative;
  padding: 370px 30px;
  z-index: 1;
  @media (max-width: 960px) {
    padding: 66px 16px;
  }
  @media (max-width: 640px) {
    padding: 32px 16px;
  }

  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
`;
const TokenInnerContainer = styled.div`

  position: relative;
  display: flex;
  gap:200px;
  justify-content: space-between;
  align-items: center;
  width: 2000px;
  max-width: 2500px;
`;

const TokenLeftContainer = styled.div`
margin-top:70px;
  width: 100%;
   margin-left:20px;
  order: 1;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    gap: 16px;
    flex-direction: column;
    align-items: center;
  }
`;
const TokenRightContainer = styled.div`
  width: 100%;
  order: 2;
  display: flex;
  justify-content: end;
  margin-right:80px;
  margin-top:-80px
`;

const TextLoop = styled.div`
  font-weight: 700;
  font-size: 92px;
  display: flex;
  gap: 16px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 80px;

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 960px) {
    font-size: 22px;
    line-height: 48px;
    margin-bottom: 16px;
  }
`;

const Span = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
`;

const SubTitle = styled.div`
  font-size: 30px;
  margin-top:40px;
  line-height: 38px;
  margin-bottom: 420px;
  color: ${({ theme }) => theme.text_primary + 95};

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 960px) {
    font-size: 16px;
    line-height: 32px;
  }
`;

const Dashboard = () => {
  return (
    <div id="Dashboard">
      <TokenContainer>
       

        <motion.div {...headContainerAnimation}>
          <TokenInnerContainer>
            <TokenLeftContainer>
              <motion.div {...headTextAnimation}>
                <TextLoop>
                  Deploy 
                  <Span>
                    <Typewriter
                      options={{
                        strings: "Token",
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </Span>
                </TextLoop>
              </motion.div>

              <motion.div {...headContentAnimation}>
                <SubTitle>Enter your TokenName and TokenSymbol to deploy the TokenManager, which will manage your token seamlessly over the blockchain.</SubTitle>
              </motion.div>
            </TokenLeftContainer>
            <TokenRightContainer>
              <motion.div {...headContentAnimation}>
                <Tilt>
                <Dep />
                </Tilt>
              </motion.div>
            </TokenRightContainer>
          </TokenInnerContainer>
        </motion.div>
      </TokenContainer>
    </div>
  );
};

export default Dashboard;
