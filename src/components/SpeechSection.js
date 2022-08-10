import React, { useState } from 'react';
import './SpeechSection.css';

function SpeechSection() {
  const [text, setText] = useState('');

  const textInput = document.getElementById('text-input');
  let currentCharacter;

  const [state, setSlide] = useState(1); //1 is defaultState

  const handleSpeak = () => {
    playText(text);
  };
  const handlePause = () => {
    pauseText();
  };
  const handleStop = () => {
    stopText();
  };

  const utterance = new SpeechSynthesisUtterance();
  utterance.addEventListener('end', () => {
    try {
      textInput.disabled = false;
    } catch (e) {
      console.log('textInput not yet defined.');
    }
  });
  utterance.addEventListener('boundary', (e) => {
    currentCharacter = e.charIndex;
  });

  function playText(text) {
    if (speechSynthesis.paused && speechSynthesis.speaking) {
      return speechSynthesis.resume();
    }
    if (speechSynthesis.speaking) return;
    utterance.text = text;
    utterance.rate = state || 1;
    try {
      textInput.disabled = true;
    } catch (e) {
      console.log('textInput not yet defined.');
    }
    speechSynthesis.speak(utterance);
  }

  function pauseText() {
    if (speechSynthesis.speaking) speechSynthesis.pause();
  }

  function stopText() {
    speechSynthesis.resume();
    speechSynthesis.cancel();
  }

  const handleChange = (e) => {
    setSlide(e.target.value);
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
  return (
    <>
      <h3 className="description">
        Copy text from your notes and paste it below to listen:
      </h3>
      {/* <textarea id="text-input" className="textAreaStyle" onChange={(e) => { setText(e.target.value) }}></textarea> */}
      <textarea
        id="text-input"
        className="textAreaStyle"
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></textarea>
      {/* <button className="buttonStyle" onClick={() => { handleSpeak() }}>Listen</button> */}
      <button
        id="play-button"
        className="buttonStyle"
        onClick={() => {
          handleSpeak();
        }}
      >
        Listen
      </button>
      <button
        id="pause-button"
        className="buttonStyle"
        onClick={() => {
          handlePause();
        }}
      >
        Pause
      </button>
      <button
        id="stop-button"
        className="buttonStyle"
        onClick={() => {
          handleStop();
        }}
      >
        Stop
      </button>
      <label className="speedLabel">Speed</label>
      {/* <input id="speed" className="speedInput" type="number" min=".5" max="3" step=".5" value="1" onClick={() => { setSpeed() }}/> */}
      <Slider />
    </>
  );
}

export default SpeechSection;
