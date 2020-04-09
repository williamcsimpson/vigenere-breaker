import React from 'react';
import { 
  Box, 
  Button,
  Grid,
  Grommet,
  Main,
  RangeInput,
  TextArea,
  TextInput,
} from 'grommet';
import {
  Bar,
  BarChart,
  ComposedChart,
  XAxis,
} from 'recharts';

const A_CODE = 65;
const Z_CODE = 90;
const GRAPH_HEIGHT = 384; //grommet medium
const GRAPH_WIDTH = 580; //grommet large
const SPACE = ' ';
const LEN_ALPHABET = 26;
const TEXT_BOX_N_GRAM = 5;
const ENGLISH_FREQ = [0.08167, 0.01492, 0.02202, 0.04253, 0.12702, 0.02228, 
                      0.02015, 0.06094, 0.06966, 0.00153, 0.01292, 0.04025, 
                      0.02406, 0.06749, 0.07507, 0.01929, 0.00095, 0.05987,
                      0.06327, 0.09356, 0.02758, 0.00978, 0.02560, 0.00150, 
                      0.01994, 0.00077]


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
          resize={false}
          fill={true}
          name='TextInput'
          spellCheck='false'
          focus={false}
        />
      </Box>
      <Box gridArea='key'>
        <TextInput
          onChange = {props.handleKeyEdit}
          value = {props.keyVal}
          placeholder='Type key here...'
          spellCheck='false'
          focus={false}
        />
      </Box>
      <Box gridArea='encrypt'>
        <Button
          label='Encrypt'
          size='small'
          onClick = {props.handleEncrypt}
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
          onClick={props.handleBreak}
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

function BreakGrid(props) { 
  return (
    <Grid
      areas={[
        { name: 'keyword', start: [1, 0], end: [1, 0] },
        { name: 'sampleText', start: [3, 0], end: [3, 0] },
        { name: 'graph', start: [0, 1], end: [4, 1] },
        { name: 'slider', start: [0, 2], end: [4, 2] },
        { name: 'period', start: [0, 3], end: [1, 3] },
        { name: 'position', start: [2, 3], end: [3, 3] },
        { name: 'decrypt', start: [4, 3], end: [4, 3] },
      ]}
      columns={['auto', 'auto', 'auto', 'auto', 'auto']}
      rows={['xxsmall', 'medium', 'xxsmall', 'xxsmall']}
      gap='small'
      margin='xlarge'
    >
      <Box gridArea='keyword'> 
      </Box>
      <Box gridArea='sampleText'> 
      </Box>
      <Box gridArea='graph'> 
        <ComposedChart 
          width={GRAPH_WIDTH}
          height={GRAPH_HEIGHT}
          data={freqArray()}
        >
          <XAxis dataKey='name' />
          <Bar dataKey='globalFreq' />
          <Bar dataKey='freq' />
        </ComposedChart>
        <BarChart 
          width={GRAPH_WIDTH}
          height={25}
          data={freqArray()}
        >
          <XAxis dataKey='name' />
        </BarChart>
      </Box>
      <Box gridArea='slider'> 
        <RangeInput
          min={0}
          max={25}
          value={0}
          onChange={props.handleSlider}
        />
      </Box>
      <Box gridArea='period'> 
      </Box>
      <Box gridArea='position'> 
      </Box>
      <Box gridArea='decrypt'> 
        <Button
          label='Decrypt'
          size='small'
          onClick={props.handleDecryptBreak}
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
      home: true,
      offset: 0,
    };
  }

  handleDecryptBreak(event) {
    this.setState({
      home: !this.state.home,
    });
    this.handleDecrypt(event);
  }

  handleEditMessage (event) {
    let input = processMessage(event.target.value);
    this.setState({
      message:input,
      messageBox:toNGram(input,TEXT_BOX_N_GRAM),
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

  handleSlider(event) {
    this.setState({
      offset: event.target.value,
    });
  }

  handleEditKey(event) {
    this.setState({
      key:processMessage(event.target.value),
    });
  }

  handleBreak(event) {
    this.setState({
      home: !this.state.home,
      offset: 0,
    });
  }

  renderPage() {
    if(this.state.home) {
      return(
          <Box width='large' alignSelf='center'>
            <HomeGrid
              message={this.state.messageBox}
              handleMessageEdit={event => this.handleEditMessage(event)}
              handleKeyEdit={event => this.handleEditKey(event)}
              keyVal={this.state.key}
              handleEncrypt={event => this.handleEncrypt(event)}
              handleDecrypt={event => this.handleDecrypt(event)}
              handleBreak={event => this.handleBreak(event)}
            >
            </HomeGrid>
          </Box>
      );
    } else {
        return(
          <Box width='large' alignSelf='center'>
            <BreakGrid 
              handleDecryptBreak={event => this.handleDecryptBreak(event)}
              handleSlider={event => this.handleSlider(event)}
            >
            </BreakGrid>
          </Box>
        );
    }
  }

  render () {
    return (
      <Grommet theme={theme} full>
        <Main>
          {this.renderPage()}
        </Main>
      </Grommet>
    );
  }
}

/**
 * Formats and returns an array with letter frequencies
 */
function freqArray() {
  let data = Array();
  for(let i = 0; i < LEN_ALPHABET; i++) {
    let name = String.fromCharCode(A_CODE + i);
    data.push({'name': name, 'globalFreq': ENGLISH_FREQ[i], 'freq': 0.05});
  }
  return data;
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
    if( (i % n) === (n - 1) ) {
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
