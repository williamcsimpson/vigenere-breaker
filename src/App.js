import React, { useState } from 'react';
import { 
  Box, 
  Button,
  Grid,
  Grommet,
  Main,
  TextArea,
  TextInput,
  defaultProps,
} from 'grommet';
import { Notification, StatusPlaceholder } from "grommet-icons";

const A_CODE = 65;
const Z_CODE = 90;
const SPACE = ' ';
const LEN_ALPHABET = 26;
const TEXT_BOX_N_GRAM = 5;

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
          onChange = {props.handleMessageEdit}
          value = {props.message}
          placeholder="Type message here..."
          focusIndicator={false}
          resize={false}
          fill={true}
          name='TextInput'
          spellCheck='false'
        />
      </Box>
      <Box gridArea='key'>
        <TextInput
          onChange = {props.handleKeyEdit}
          value = {props.keyVal}
          placeholder='Type key here...'
          spellCheck='false'
        />
      </Box>
      <Box gridArea='encrypt'>
        <Button
          label='Encrypt'
          size='small'
          onClick = {props.handleEncrypt}
          focusIndicator={false}
        />
      </Box>
      <Box gridArea='decrypt'>
        <Button
          label='Decrypt'
          size='small'
          onClick={props.handleDecrypt}
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messageBox: '',
      key: '',
      dummyForceRender: true,
    };
  }

  handleEditMessage (event) {
    let input = processMessage(event.target.value);
    this.setState({
      message:input,
      messageBox:toNGram(input,TEXT_BOX_N_GRAM),
      dummyForceRender: !this.state.dummyForceRender,
    });    
  }

  handleEncrypt(event) {
    if(this.state.key.length <= 0) {
      return;
    }
    let enc = encryptVigenere( this.state.message, this.state.key );
    this.setState({
      message: enc,
      messageBox:toNGram(enc,TEXT_BOX_N_GRAM),
    });
  }

  handleDecrypt(event) {
    if(this.state.key.length <= 0) {
      return;
    }
    let dec = decryptVigenere( this.state.message, this.state.key );
    this.setState({
      message: dec,
      messageBox:toNGram(dec,TEXT_BOX_N_GRAM),
    });
  }

  handleEditKey(event) {
    this.setState({
      key:processMessage(event.target.value),
    });
  }

  render () {
    return (
      <Grommet theme={theme} full>
        <Main>
          <Box width='large' alignSelf='center'>
            <HomeGrid
              message={this.state.messageBox}
              handleMessageEdit={event => this.handleEditMessage(event)}
              handleKeyEdit={event => this.handleEditKey(event)}
              keyVal={this.state.key}
              dummy={this.state.dummyForceRender}
              handleEncrypt={event => this.handleEncrypt(event)}
              handleDecrypt={event => this.handleDecrypt(event)}
            >
            </HomeGrid>
          </Box>
        </Main>
      </Grommet>
    );
  }
}

/**
 * Decrypts a given cyphertext and key using a vigenere cypher
 * @param {String} cyphertext the message to decrypt. Must be in character set [A-Z]
 * @param {String} key the key used to decrypt message. 
 *                     Must be longer than 0, and in charater set [A-Z] 
 * @returns decrypted messaged as a string
 */
function decryptVigenere (cyphertext, key) {
  let output = '';
  for(let i = 0; i < cyphertext.length; i++) {
    output += String.fromCharCode(A_CODE + (( (cyphertext.charCodeAt(i) - A_CODE) - (key.charCodeAt(i % key.length) - A_CODE) + LEN_ALPHABET) % LEN_ALPHABET));
  }
  return output;
}

/**
 * Encripts a given plaintext and key using a vigenere cypher
 * @param {String} plaintext the message to encrypt. Must be in character set [A-Z]
 * @param {String} key the key used to encrypt message. 
 *                     Must be longer than 0, and in charater set [A-Z] 
 * @returns encrypted messaged as a string
 */
function encryptVigenere (plaintext, key) {
  let output = '';
  for(let i = 0; i < plaintext.length; i++) {
    output += String.fromCharCode(A_CODE + (( (plaintext.charCodeAt(i) - A_CODE) + (key.charCodeAt(i % key.length) - A_CODE) ) % LEN_ALPHABET));
  }
  return output;
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
  message = message.toUpperCase();
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
