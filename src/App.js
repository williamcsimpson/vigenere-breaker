import React from 'react';
import { 
  Box, 
  Button,
  Grid,
  Grommet,
  Main,
  RangeInput,
  Text,
  TextArea,
  TextInput,
  Markdown,
} from 'grommet';
import {
  Add,
  Subtract,
  Previous,
  Next,
} from 'grommet-icons'
import {
  Bar,
  BarChart,
  ComposedChart,
  XAxis,
} from 'recharts';
import { isCompositeComponent } from 'react-dom/test-utils';
import ArticleText from './Article';

const A_CODE = 65;
const Z_CODE = 90;
const GRAPH_HEIGHT = 384; //grommet medium
const GRAPH_WIDTH = 580; //grommet large
const SPACE = ' ';
const LEN_ALPHABET = 26;
const TEXT_BOX_N_GRAM = 5;
const MAX_KEY_LEN = 15;
const MAX_MESSAGE_LEN = 23;
const ENGLISH_FREQ = [0.08167, 0.01492, 0.02202, 0.04253, 0.12702, 0.02228, 
                      0.02015, 0.06094, 0.06966, 0.00153, 0.01292, 0.04025, 
                      0.02406, 0.06749, 0.07507, 0.01929, 0.00095, 0.05987,
                      0.06327, 0.09356, 0.02758, 0.00978, 0.02560, 0.00150, 
                      0.01994, 0.00077];
const RANDOM_PLAINTEXT = ['HACKISADISPLAYORIENTEDDUNGEONSDRAGONSLIKEGAMEBOTHDISPLAYANDCOMMANDSTRUCTURERESEMBLEROGUEFORAGAMEWITHTHESAMESTRUCTUREBUTENTIRELYDIFFERENTDISPLAYAREALCAVEINSTEADOFDULLRECTANGLESTRYQUESTTOGETSTARTEDYOUREALLYONLYNEEDTOKNOWTWOCOMMANDSTHECOMMANDWILLGIVEYOUALISTOFTHEAVAILABLECOMMANDSANDTHECOMMANDWILLIDENTIFYTHETHINGSYOUSEEONTHESCREENTOWINTHEGAMEASOPPOSEDTOMERELYPLAYINGTOBEATOTHERPEOPLEHIGHSCORESYOUMUSTLOCATETHEAMULETOFYENDORWHICHISSOMEWHEREBELOWTHETWENTIETHLEVELOFTHEDUNGEONANDGETITOUTNOBODYHASACHIEVEDTHISYETANDIFSOMEBODYDOESHEWILLPROBABLYGODOWNINHISTORYASAHEROAMONGHEROSWHENTHEGAMEENDSEITHERBYYOURDEATHWHENYOUQUITORIFYOUESCAPEFROMTHECAVESHACKWILLGIVEYOUAFRAGMENTOFTHELISTOFTOPSCORERSTHESCORINGISBASEDONMANYASPECTSOFYOURBEHAVIOURBUTAROUGHESTIMATEISOBTAINEDBYTAKINGTHEAMOUNTOFGOLDYOUVEFOUNDINTHECAVEPLUSFOURTIMESYOURREALEXPERIENCEPRECIOUSSTONESMAYBEWORTHALOTOFGOLDWHENBROUGHTTOTHEEXITTHEREISATENPERCENTPENALTYFORGETTINGYOURSELFKILLED',
                          'THEMOSTNOTICEABLEEFFECTTHISCOMMUNICATIONHASONTHEGAMEISTHEDELAYINMOVINGSUPPOSEAPLAYERTYPESAMOVEFORHISSHIPANDHITSRETURNWHATHAPPENSTHENTHEPLAYERPROCESSSAVESUPMESSAGESTOBEWRITTENTOTHETEMPORARYFILEINABUFFEREVERYSEVENSECONDSORSOTHEPLAYERPROCESSGETSEXCLUSIVEACCESSTOTHETEMPORARYFILEANDWRITESOUTITSBUFFERTOTHEFILETHEDRIVERRUNNINGASYNCHRONOUSLYMUSTREADINTHEMOVEMENTCOMMANDPROCESSITANDWRITEOUTTHERESULTSTHISTAKESTWOEXCLUSIVEACCESSESTOTHETEMPORARYFILEFINALLYWHENTHEPLAYERPROCESSGETSAROUNDTODOINGANOTHERSEVENSECONDUPDATETHERESULTSOFTHEMOVEAREDISPLAYEDONTHESCREENHENCEEVERYMOVEMENTREQUIRESFOUREXCLUSIVEACCESSESTOTHETEMPORARYFILEANYWHEREFROMSEVENTOTWENTYONESECONDSDEPENDINGUPONASYNCHRONYBEFORETHEPLAYERSEESTHERESULTSOFHISMOVESAFTERTHEPLAYERWRITESOUTAFIRSTMOVEMENTMESSAGEASECONDMOVEMENTCOMMANDCANTHENBEISSUEDTHEFIRSTMESSAGEWILLBEINTHETEMPORARYFILEWAITINGFORTHEDRIVERANDTHESECONDWILLBEINTHEFILEBUFFERWAITINGTOBEWRITTENTOTHEFILETHUSBYALWAYSTYPINGMOVESATURNAHEADOFTHETIMETHEPLAYERCANSAILAROUNDQUITEQUICKLY',
                          'IFYOUHAVENEVERPLAYEDSOLITAIREBEFOREITISRECOMMENDEDTHATYOUCONSULTASOLITAIREINSTRUCTIONBOOKINCANFIELDTABLEAUCARDSMAYBEBUILTONEACHOTHERDOWNWARDINALTERNATECOLORSANENTIREPILEMUSTBEMOVEDASAUNITINBUILDINGTOPCARDSOFTHEPILESAREAVAILABLETOBEPLAYEDONFOUNDATIONSBUTNEVERINTOEMPTYSPACESSPACESMUSTBEFILLEDFROMTHESTOCKTHETOPCARDOFTHESTOCKALSOISAVAILABLETOBEPLAYEDONFOUNDATIONSORBUILTONTABLEAUPILESAFTERTHESTOCKISEXHAUSTEDTABLEAUSPACESMAYBEFILLEDFROMTHETALONANDTHEPLAYERMAYKEEPTHEMOPENUNTILHEWISHESTOUSETHEMCARDSAREDEALTFROMTHEHANDTOTHETALONBYTHREESANDTHISREPEATSUNTILTHEREARENOMORECARDSINTHEHANDORTHEPLAYERQUITSTOHAVECARDSDEALTONTOTHETALONTHEPLAYERTYPESHTFORHISMOVEFOUNDATIONBASECARDSAREALSOAUTOMATICALLYMOVEDTOTHEFOUNDATIONWHENTHEYBECOMEAVAILABLE',
                          'ROBOTSPITSYOUAGAINSTEVILROBOTSWHOARETRYINGTOKILLYOUWHICHISWHYTHEYAREEVILFORTUNATELYFORYOUEVENTHOUGHTHEYAREEVILTHEYARENOTVERYBRIGHTANDHAVEAHABITOFBUMPINGINTOEACHOTHERTHUSDESTROYINGTHEMSELVESINORDERTOSURVIVEYOUMUSTGETTHEMTOKILLEACHOTHEROFFSINCEYOUHAVENOOFFENSIVEWEAPONRYSINCEYOUARESTUCKWITHOUTOFFENSIVEWEAPONRYYOUAREENDOWEDWITHONEPIECEOFDEFENSIVEWEAPONRYATELEPORTATIONDEVICEWHENTWOROBOTSRUNINTOEACHOTHERORAJUNKPILETHEYDIEIFAROBOTRUNSINTOYOUYOUDIEWHENAROBOTDIESYOUGETTENPOINTSANDWHENALLTHEROBOTSDIEYOUSTARTONTHENEXTFIELDTHISKEEPSUPUNTILTHEYFINALLYGETYOUONLYFIVESCORESAREALLOWEDPERUSERONTHESCOREFILEIFYOUMAKEITINTOTHESCOREFILEYOUWILLBESHOWNTHELISTATTHEENDOFTHEGAMEIFANALTERNATESCOREFILEISSPECIFIEDTHATWILLBEUSEDINSTEADOFTHESTANDARDFILEFORSCORESY',
                          'ATTHESTARTOFTHEFIRSTGAMETHEPROGRAMASKSTHEPLAYERTOCUTTHEDECKTODETERMINEWHOGETSTHEFIRSTCRIBTHEUSERSHOULDRESPONDWITHANUMBERBETWEENZEROANDFIFTYONEINDICATINGHOWMANYCARDSDOWNTHEDECKISTOBECUTTHEPLAYERWHOCUTSTHELOWERRANKEDCARDGETSTHEFIRSTCRIBIFMORETHANONEGAMEISPLAYEDTHELOSEROFTHEPREVIOUSGAMEGETSTHEFIRSTCRIBINTHECURRENTGAMEFOREACHHANDTHEPROGRAMFIRSTPRINTSTHEPLAYERSHANDWHOSECRIBITISANDTHENASKSTHEPLAYERTODISCARDTWOCARDSINTOTHECRIBTHECARDSAREPROMPTEDFORONEPERLINEANDARETYPEDASEXPLAINEDBELOWAFTERCUTTINGTHEDECKPLAYSTARTSWITHTHENONDEALERTHEPERSONWHODOESNTHAVETHECRIBLEADINGTHEFIRSTCARDPLAYCONTINUESASPERCRIBBAGEUNTILALLCARDSAREEXHAUSTEDTHEPROGRAMKEEPSTRACKOFTHESCORINGOFALLPOINTSANDTHETOTALOFTHECARDSONTHETABLEAFTERPLAYTHEHANDSARESCOREDTHEPROGRAMREQUESTSTHEPLAYERTOSCOREHISHANDANDTHECRIBIFITISHISBYPRINTINGOUTTHEAPPROPRIATECARDSANDTHECUTCARDENCLOSEDINBRACKETSPLAYCONTINUESUNTILONEPLAYERREACHESTHEGAMELIMITACARRIAGERETURNWHENANUMERICINPUTISEXPECTEDISEQUIVALENTTOTYPINGTHELOWESTLEGALVALUEWHENCUTTINGTHEDECKTHISISEQUIVALENTTOCHOOSINGTHETOPCARD'];
const RANDOM_KEY = ['TUSEDAY', 'VOLCANO', 'REWARD', 'HUNTER', 'ABSTRACT', 'MEDICINE', 'STORM', 'TOAST'];

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
          onClick={props.handleRandomPT}
        />
      </Box>
      <Box gridArea='randCT'>
        <Button
          label='Random Cyphertext'
          size='small'
          onClick={props.handleRandomCT}
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
      <Box 
        gridArea='keyword'
        border='true'
        round='small'
        align='center'
      > 
        <Text>----Keyword----</Text>
        <Markdown>{props.keyDisplay}</Markdown>
      </Box>
      <Box 
        gridArea='sampleText'
        border='true'
        round='small'
        align='center'
      > 
        <Text>Sample Text</Text>
        <Markdown>{props.sampleMessage}</Markdown>
      </Box>
      <Box gridArea='graph'> 
        <ComposedChart 
          width={GRAPH_WIDTH}
          height={GRAPH_HEIGHT}
          data={props.data}
          barGap={0}
        >
          <XAxis dataKey='localName' />
          <Bar 
            dataKey='localFreq'
            isAnimationActive={false}
            fill='#228BE6'
          />
          <Bar 
            dataKey='globalFreq' 
            isAnimationActive={false}
            fill='#E67D22'
          />
        </ComposedChart>
        <BarChart 
          width={GRAPH_WIDTH}
          height={25}
          data={props.data}
        >
          <XAxis dataKey='globalName' />
        </BarChart>
      </Box>
      <Box 
        gridArea='slider'
        allign='baseline'
      > 
        <RangeInput
          min={0}
          max={25}
          value={props.sliderDefault}
          onChange={props.handleSlider}
        />
      </Box>
      <Box 
        gridArea='period'
        direction='row'
        align='baseline'
        alignContent='around'
        alignSelf='stretch'
      > 
        <Text>Period:</Text>
        <Button
          icon={<Subtract size='small' />}
          size='small'
          onClick={props.handlePeriodMinus}
        />
        <Button
          icon={<Add size='small'/>}
          size='small'
          onClick={props.handlePeriodPlus}
        />
      </Box>
      <Box 
        gridArea='position'
        direction='row'
        align='baseline'
        alignContent='around'
        alignSelf='stretch'
      > 
        <Text>Positon:</Text>
        <Button
          icon={<Previous size='small' />}
          size='small'
          onClick={props.handlePositionPrevious}
        />
        <Button
          icon={<Next size='small'/>}
          size='small'
          onClick={props.handlePositionNext}
        />
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
      keyDisplay: '',
      home: true,
      offset: 0,
      data: Array(),
      sampleMessage: '',
      breakKeyDisplay:'',
      position: 0,
      sliderPos:0,
    };
    this.updateData(0);
  }

  updateData(offset, position = this.state.position, period = this.state.key.length) {
    this.setState({
      data: freqArray(getFreq(this.state.message, period, position), offset),
    });
  }

  handleDecryptBreak(event) {
    this.setState({
      home: !this.state.home,
    });
    this.handleDecrypt(event);
  }

  handleEditMessage (event) {
    this.updateMessae(event.target.value);
  }
  
  updateMessae( newMessage, pos = this.state.position, key = this.state.key ) {
    let input = processMessage(newMessage);
    let newMessageBox = toNGram(input,TEXT_BOX_N_GRAM);
    /**
    if( newMessageBox === this.state.messageBox ) {
      newMessageBox += ' ';
    }
    */
    this.setState({
      message:input,
      messageBox:newMessageBox,
      sampleMessage:boldN(decryptVigenere(input.substring(0, MAX_MESSAGE_LEN), this.state.key), pos, key.length),
    });    
  }

  handleEditKey(event) {
    this.updateKey(event.target.value);
  }

  updateKey( newKey, pos = this.state.position ) {
    let input = processMessage(newKey);
    let newKeyBox = input;
    /**
    if( newKeyBox === this.state.keyDisplay ) {
      newKeyBox += ' ';
    }
    */
    this.setState({
      key:input,
      keyDisplay:newKeyBox,
      breakKeyDisplay:boldN(input, pos, input.length),
      sampleMessage:boldN(decryptVigenere(this.state.message.substring(0, MAX_MESSAGE_LEN), input), pos, input.length),
    });    
  }

  handleEncrypt(event) {
    if(this.state.key.length <= 0) {
      return;
    }
    let enc = encryptVigenere( this.state.message, this.state.key );
    this.updateMessae(enc);
  }

  handleDecrypt(event) {
    if(this.state.key.length <= 0) {
      return;
    }
    let dec = decryptVigenere( this.state.message, this.state.key );
    this.updateMessae(dec);
  }

  handleSlider(event) {
    this.setState({
      offset: event.target.value,
      sliderPos: event.target.value,
    });
    this.updateData(event.target.value);
    let newKey = this.state.key.substring(0, this.state.position); 
    newKey += String.fromCharCode(A_CODE + ((LEN_ALPHABET - parseInt(event.target.value)) % LEN_ALPHABET) ); 
    newKey += this.state.key.substring(this.state.position + 1);
    this.updateKey(newKey);
    this.setState({
      sampleMessage:boldN(decryptVigenere(this.state.message.substring(0, MAX_MESSAGE_LEN), newKey), this.state.position, newKey.length),
    });
  }

  handleBreak(event) {
    let offset = this.state.key.charCodeAt(this.state.position) - A_CODE;
    let position = this.state.position;
    let period = this.state.key.length;
    this.setState({
      home: !this.state.home,
      offset: (this.state.key.charCodeAt(0) - A_CODE),
    });
    this.updateData(0);
    if(this.state.key === '') {
      this.updateKey('A');
      this.setState({
        sampleMessage:boldN(decryptVigenere(this.state.message.substring(0, MAX_MESSAGE_LEN), 'A'), this.state.position, 1),
        offset: 0,
      });
      offset = 0;
      position = 0;
      period = 1;
    }
    this.updateData(offset, position, period);
  }

  handleNewPeriod(newLen) {
    if(newLen <= 0 || newLen > MAX_KEY_LEN) {
        return;
    }
    let newKey = ''
    for(let i = 0; i < newLen; i++) {
      newKey += 'A';
    }
    this.setState({
      position:0,
      offset:0,
      sliderPos:0,
    });
    this.updateKey(newKey, 0);
    this.updateMessae(this.state.message, 0, newKey);
    this.updateData(0, 0, newLen);
  }

  handlePeriodMinus(event) {
    let newPeriod = this.state.key.length - 1;
    this.handleNewPeriod(newPeriod);
  }

  handlePeriodPlus(event) {
    let newPeriod = this.state.key.length + 1;
    this.handleNewPeriod(newPeriod);
  }

  handleNewPosition(newPos){
    if(newPos < 0 || newPos >= this.state.key.length) {
      return;
    }
    this.setState({
      position:newPos,
      breakKeyDisplay:boldN(this.state.key, newPos, this.state.key.length),
      sampleMessage:boldN(processMessage(this.state.sampleMessage), newPos, this.state.key.length),
      sliderPos:(Z_CODE - this.state.key.charCodeAt(newPos) + 1) % LEN_ALPHABET,
      offset:this.state.key.charCodeAt(newPos),
    });
    this.updateData(Z_CODE - this.state.key.charCodeAt(newPos) + 1, newPos);
  }

  handlePositionNext(event) {
    this.handleNewPosition(this.state.position + 1);    
  }

  handlePositionPrevious(event) {
    this.handleNewPosition(this.state.position - 1);    
  }

  handleRandomCT(event) {
    let key = RANDOM_KEY[Math.floor(Math.random() * RANDOM_KEY.length)];
    let newMessage = encryptVigenere(RANDOM_PLAINTEXT[Math.floor(Math.random() * RANDOM_PLAINTEXT.length)], key);
    while( newMessage === this.state.message ) {
      newMessage = encryptVigenere(RANDOM_PLAINTEXT[Math.floor(Math.random() * RANDOM_PLAINTEXT.length)], key);
    }
    this.updateKey('');
    this.updateMessae(newMessage);
  }

  handleRandomPT(event) {
    let newMessage = RANDOM_PLAINTEXT[Math.floor(Math.random() * RANDOM_PLAINTEXT.length)];
    while( newMessage === this.state.message ) {
      newMessage = RANDOM_PLAINTEXT[Math.floor(Math.random() * RANDOM_PLAINTEXT.length)];
    }
    this.updateKey('');
    this.updateMessae(newMessage);
  }

  renderPage() {
    if(this.state.home) {
      return(
          <Box width='large' alignSelf='center'>
            <HomeGrid
              message={this.state.messageBox}
              handleMessageEdit={event => this.handleEditMessage(event)}
              handleKeyEdit={event => this.handleEditKey(event)}
              keyVal={this.state.keyDisplay}
              handleEncrypt={event => this.handleEncrypt(event)}
              handleDecrypt={event => this.handleDecrypt(event)}
              handleBreak={event => this.handleBreak(event)}
              handleRandomPT={event => this.handleRandomPT(event)}
              handleRandomCT={event => this.handleRandomCT(event)}
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
              data={this.state.data}
              keyDisplay={this.state.breakKeyDisplay}
              sampleMessage={this.state.sampleMessage}
              handlePeriodMinus={event => this.handlePeriodMinus(event)}
              handlePeriodPlus={event => this.handlePeriodPlus(event)}
              handlePositionNext={event => this.handlePositionNext(event)}
              handlePositionPrevious={event => this.handlePositionPrevious(event)}
              sliderDefault={this.state.sliderPos}
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
          <Box width='large' alignSelf='center'>
          <ArticleText/>
          {this.renderPage()}
          </Box>
        </Main>
      </Grommet>
    );
  }
}

/**
 * Returns an array with the frequencies of every period-th character,
 * starting at the positon character in the message
 * @param {String} message the message to be looked at
 * @param {int} period the length of the key
 * @param {int} position the character we want in the key
 */
function getFreq(message, period, position) {
  let output = Array(LEN_ALPHABET).fill(0);
  let total = 0;
  if(period === 0) {
    return output;
  }
  for(let i = position; i < message.length; i += period) {
    output[message.charCodeAt(i) - A_CODE]++;
    total++;
  }
  if(total > 0) {
    for(let i = 0; i < output.length; i++){
      output[i] = (1.0 *output[i]) / (1.0 *total);
    }
  }
  return output;
}

/**
 * Bolds every nth character in the string
 * @param {String} string 
 * @param {int} n in range [0, string.length-1]
 */
function boldN(string, n, period) {
  let output = '';
  for(let i = 0; i < string.length; i++) {
    if( i  % period === parseInt(n)) {
      output += '**' + string.charAt(i) + '**';
    } else {
      output += string.charAt(i);
    }
  }
  return output;
}

/**
 * Formats and returns an array with letter frequencies
 * @param {float[]} freq
 * @param {int} offset
 */
function freqArray(freq, offset) {
  let data = Array();
  for(let i = 0; i < LEN_ALPHABET; i++) {
    //I don't know why it needs an inverse offset
    let inverseOffset = (i - parseInt(offset) + LEN_ALPHABET) % LEN_ALPHABET;
    let globalName = String.fromCharCode(A_CODE + i);
    let localName = String.fromCharCode(A_CODE + inverseOffset);
    data.push({'globalName': globalName, 'globalFreq': ENGLISH_FREQ[i], 'localName': localName, 'localFreq': freq[inverseOffset]});
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
  if(key.length <= 0) {
    return cyphertext;
  }
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
