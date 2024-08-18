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
  padding: 80px 30px;
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;


`;
const TokenLeftContainer = styled.div`
  width: 100%;
  order: 1;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    gap: 6px;
    flex-direction: column;
    align-items: center;
  }
`;
const TokenRightContainer = styled.div`
  width: 100%;
  order: 2;
  display: flex;
  justify-content: end;


`;

const TextLoop = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;

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
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 42px;
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
                  Deploy your
                  <Span>
                    <Typewriter
                      options={{
                        strings: "TokenManager",
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </Span>
                </TextLoop>
              </motion.div>

              <motion.div {...headContentAnimation}>
                <SubTitle>Enter Your TokenName and TokenSymbol to deploy TokenManager that will manage your Token Over Blockchain</SubTitle>
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
