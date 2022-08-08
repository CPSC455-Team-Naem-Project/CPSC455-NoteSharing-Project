import React, { useState } from "react";
import './SpeechSection.css'

function SpeechSection() {
    const [text, setText] = useState('');
    //const {speak} = useSpeechSynthesis();
    const playButton = document.getElementById('play-button');
    const pauseButton = document.getElementById('pause-button');
    const stopButton = document.getElementById('stop-button');
    const textInput = document.getElementById('text-input');
    const speedInput = document.getElementById('speed');
    let currentCharacter;
    //let speedValue;

    /*
    const handleSpeak = () => {
        speak({ text: text })
    }*/
    /*
    playButton.addEventListener('click', () => {
        playText(textInput.value)
    })*/
    const [state, setSlide] = useState(1); //1 is defaultState

    const handleSpeak = () => {
        playText(textInput.value);
    }

    //pauseButton.addEventListener('click', pauseText)
    const handlePause = () => {
        pauseText();
    }
    //stopButton.addEventListener('click', stopText)
    const handleStop = () => {
        stopText();
    }

    const utterance = new SpeechSynthesisUtterance()
    utterance.addEventListener('end', () => {
        textInput.disabled = false;
    })
    utterance.addEventListener('boundary', e => {
        currentCharacter = e.charIndex;
        console.log(currentCharacter);
    })

    function playText(text) {
        if (speechSynthesis.paused && speechSynthesis.speaking) {
            return speechSynthesis.resume();
        }
        if (speechSynthesis.speaking) return;
        utterance.text = text;
        utterance.rate = state;
        textInput.disabled = true;
        speechSynthesis.speak(utterance);
    }

    function pauseText() {
        if (speechSynthesis.speaking) speechSynthesis.pause();
    }

    function stopText() {
        speechSynthesis.resume();
        speechSynthesis.cancel();
    }

    /*
    const setSpeed = () => {
        stopText();
        playText(utterance.text.substring(currentCharacter));
    }*/

    const handleChange = e => {
        console.log('Setting Speed ', e.target.value);
        setSlide(e.target.value);
        console.log('New State ', state);
        //speedValue = e.target.value;
        //console.log('Speed Value ', speedValue);
        stopText();
        playText(utterance.text.substring(currentCharacter));
    };

    const Slider = () => (
        <input
            type="range"
            id="speed"
            min={0.25}
            max={3}
            step={0.25}
            defaultValue={state}
            onChange={handleChange}
        />
    );
    /*
    speedInput.addEventListener('input', () => {
        stopText()
        playText(utterance.text.substring(currentCharacter))
    })*/
    /*
    function getInitialState() {
        return { value: 1 };
    }
    function handleChange(event) {
        this.setState({ value: event.target.value });
        playText(utterance.text.substring(currentCharacter));
    }
    const setSpeed = () => {
        stopText();
        playText(utterance.text.substring(currentCharacter));
    }*/
    return (<>
        <h3 className="description">Copy text from your notes and paste it below to listen:</h3>
        {/* <textarea id="text-input" className="textAreaStyle" onChange={(e) => { setText(e.target.value) }}></textarea> */}
        <textarea id="text-input" className="textAreaStyle"></textarea>
        {/* <button className="buttonStyle" onClick={() => { handleSpeak() }}>Listen</button> */}
        <button id="play-button" className="buttonStyle" onClick={() => { handleSpeak() }}>Listen</button>
        <button id="pause-button" className="buttonStyle" onClick={() => { handlePause() }}>Pause</button>
        <button id="stop-button" className="buttonStyle" onClick={() => { handleStop() }}>Stop</button>
        <label className="speedLabel">Speed</label>
        {/* <input id="speed" className="speedInput" type="number" min=".5" max="3" step=".5" value="1" onClick={() => { setSpeed() }}/> */}
        <Slider />
    </>
    );
}

export default SpeechSection;