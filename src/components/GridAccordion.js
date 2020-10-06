import React, {useState} from "react";
import styled from 'styled-components';

const Header = styled.div`
  height: 30px;
  background-color: #d0d0d0;
`;

const ContentWrap = styled.div`
  overflow: scroll;
  
  height: ${props => props.isOpen? `auto` : `0`}
  
`;

const GridAccordion = props => {
        const {name, children} = props;

        const [isOpen, setOpen] = useState(true);

        return(
            <>
            <Header  onClick={() => setOpen(!isOpen)}>{name}</Header>
                    <ContentWrap isOpen={isOpen}>
                            {children}
                    </ContentWrap>
            </>
        );
}

export default GridAccordion;