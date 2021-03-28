import React from 'react'
import styled from 'styled-components';

const Text = styled.div`
  font-size: 30px;
  text-align: center;
  color: white;
  padding: 50px 0 20px 0;
`;

export default function Title({ text }: { text: string }) {
  return <Text>{text}</Text>
}


