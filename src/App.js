import React, { useState } from 'react';
import { 
  Box, 
  Button,
  Grid,
  Grommet,
  Main,
  TextArea,
  TextInput,
} from 'grommet';
import { Notification, StatusPlaceholder } from "grommet-icons";

const A_CODE = 65;
const Z_CODE = 90;
const SPACE = ' ';

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: 'Courier New',
      size: '18px',
      height: '20px',
    },
  },
};

function HomeGrid(props) { 
  return (
    <Grid
      areas={[
        { name: 'text', start: [0, 0], end: [3, 0] },
        { name: 'key', start: [0, 1], end: [1, 1] },
        { name: 'encrypt', start: [2, 2], end: [2, 2] },
        { name: 'decrypt', start: [3, 2], end: [3, 2] },
        { name: 'break', start: [1, 2], end: [1, 2] },
        { name: 'randPT', start: [2, 1], end: [2, 1] },
        { name: 'randCT', start: [3, 1], end: [3, 1] },
      ]}
      columns={['auto', 'auto', 'auto', 'auto']}
      rows={['medium', 'xxsmall', 'xxsmall']}
      gap='small'
      margin='xlarge'
    >
      <Box gridArea='text'> 
       <TextArea
          placeholder="Type message here..."
          focusIndicator={false}
          resize={false}
          fill={true}
          name='TextInput'
        />
      </Box>
      <Box gridArea='key'>
        <TextInput
          placeholder='Type key here...'
        />
      </Box>
      <Box gridArea='encrypt'>
        <Button
          label='Encrypt'
          size='small'
        />
      </Box>
      <Box gridArea='decrypt'>
        <Button
          label='Decrypt'
          size='small'
        />
      </Box> 
      <Box gridArea='break'>
        <Button
          label='Break'
          size='small'
        />
      </Box>
      <Box gridArea='randPT'>
        <Button
          label='Random Plaintext'
          size='small'
        />
      </Box>
      <Box gridArea='randCT'>
        <Button
          label='Random Cyphertext'
          size='small'
        />
      </Box>
    </Grid>
  );
}

function App() {
  return (
    <Grommet theme={theme} full>
      <Main>
        <Box width='large' alignSelf='center'>
          <HomeGrid></HomeGrid>
        </Box>
      </Main>
    </Grommet>
  );
}

function handleKeyInput(event) {
  
}

/**
 * Returns the message broken into blocks of n chars, separated by a space
 * @param {String} message the string to be processed
 * @param {Integer} n the size of each block, must be greater than 0
 * @returns message broken into n-grams
 */
function toNGram(message, n) {
  let output = '';
  for(let i = 0; i < message.length; i++) {
    output += message.charAt(i);
    //if i is at the end of a n-gram, add a space
    if( (i % n) == (n - 1) ) {
      output += SPACE;
    }
  }
  return output;
}

/**
 * Converts message to upper case, removes all characters not in range [A,Z]
 * @param {String} message the string to be processed
 * @returns processed string
 */
function processMessage(message) {
  message.toUpperCase();
  let output = '';
  for(let i = 0; i < message.length; i++) {
    //concat char to the end of output
    let char = message.charCodeAt(i);
    if( A_CODE <= char && char <= Z_CODE ) {
      output += message.charAt(i);
    }
  }
  return output;
}

export default App;
