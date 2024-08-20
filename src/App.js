import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import Dashbord from "./components/sections/Dashbord.jsx";
import Register from "./components/sections/Register";
import TransferTokens from "./components/sections/TransferTokens";
import StartCanvas from "./components/canvas/Stars";
import MintToken from "./components/sections/MintToken.jsx";
import AllotAllowance from "./components/sections/Allowance.jsx";
import TokenBalance from "./components/sections/TokenBalance.jsx";
import BalanceByDate from "./components/sections/BalanceByDate.jsx";
import useWindowSize from "./utils/useWindowSize.js";
const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const Wrapper = styled.div`
  padding-bottom: 100px;
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

const ResponsiveComponent = styled.div`
  width: ${({ width }) => (width > 768 ? "100%" : "100%")};
`;



function App() {
  const {width} = useWindowSize();
  return (
    <ResponsiveComponent width={width}>
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Navbar />
        <Body>
          <StartCanvas />
          <div>
            <Dashbord />
           <Wrapper>
              <Register />
              <MintToken />
              <TransferTokens/> 
              <AllotAllowance/> 
              <TokenBalance/>  
              <BalanceByDate/>
            </Wrapper>
          </div>
        </Body>
      </BrowserRouter>
    </ThemeProvider>
    </ResponsiveComponent>
  );

}

export default App;
