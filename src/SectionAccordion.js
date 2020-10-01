import React, {useState} from 'react';
import styled from 'styled-components';

const FoldingDiv = styled.div`
  height: ${props => props.open? `auto` : `0px`};
`;

const Title = styled.a``;

export const SectionAccordion = props => {
       const {name, children} = props;

       const [open, setOpen] = useState(false);

       return (
           <>
           <Title onClick={() => setOpen(!open)}>{name}</Title>
                   <SectionAccordion open={true}>
                           {children}
                   </SectionAccordion>
           </>
       );
}