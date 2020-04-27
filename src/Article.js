import React from 'react';
import { 
  Box, 
  Heading,
  Markdown,
  Text,
} from 'grommet';

function ArticleText() {
    return (
        <div>
            <Heading level='2' textAlign='center'>Breaking The Vigenère Encryption System</Heading>
            <Heading level='3' textAlign='start'>How it works</Heading>
                <Text>
                    We recall that a Caesar k-shift is the circular permutation which replaces each letter of the alphabet by the letter k places later (with wrap around). In Vigenère encryption, the key consists of a period p and a sequence k<sub>1</sub>,k<sub>2</sub>,...,k<sub>p</sub> of Caesar shifts. This given, the plaintext is broken up into successive strings of p letters each and the s<sup>th</sup> letter of each string is replaced by its image under the Caesar k<sub>s</sub>-shift. This encryption system is vulnerable to letter-frequency analysis. The letter frequencies observed in the sequence of s<sup>th</sup> letters have the same distribution as the plaintext letters only k<sub>s</sub>-shifted.
                    <br/>
                    <br/>
                    To break Vigenère encryption, one guesses a period p and then, by comparing the histogram of observed frequencies of s<sup>th</sup> letters to the histogram of English letter probabilities, one is led to the correct value of k<sub>s</sub>. A wrong guess for the period p leads to relatively flat histograms for all or most of the values of s. The code breaker in this case repeats the analysis with a new trial period.
                </Text>
            <Heading level='3' textAlign='start'>How to use</Heading>
                <Text>
                    <ul>
                        <li>Upon pressing the Random Cyphertext button the web app will display some text which is Vigenère encrypted by a randomly selected key.</li>
                        <li>Press the Break button to start the process. The web app assumes (most often incorrectly) that p=1. Thus it proceeds as if every letter of plaintext was encrypted by the same Caesar shift. It displays (in blue) the histogram of observed letter frequencies, alongside a (orange) histogram of english letter probabilities. It also displays the first 25 characters of your text, decoded according to your current keyword.</li>
                        <li>Press the Period + several times (if necessary) until the blue histogram resembles a shifted version of the orange histogram. This given, use the ranged input to move the blue histogram to the position where it best aproximates the orange histogram. The web app stores the shift corresponding to that position as a tentative value for k<sub>1</sub>.</li>
                        <li>Push the Position > button and the web app will display, again in blue, the histogram giving the observed frequencies of the 2<sup>nd</sup> letters of the successive strings. Drag the blue histogram to the best position as before to obtain the tentative of k<sub>2</sub>. Repeat this process until you have tentatively determined all the other k<sub>s</sub>.</li>
                        <li>At this point you may press the Decrypt button. The web app will then decrypt the given cyphertext as if it was encrypted by means of the values of k<sub>1</sub>,k<sub>2</sub>,...,k<sub>p</sub> you have just determined. A look at the resulting text will make it clear if all of your guesses were correct or which, if any, need to be changed.</li>
                    </ul>
                </Text>
        </div>
    );
}

export default ArticleText;