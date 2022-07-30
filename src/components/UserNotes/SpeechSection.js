import React from 'react'
import './SpeechSection.css'

const getPDFFile = async (url) => {
    
}

function SpeechSection(props) {
  return (props.trigger) ? (
    <div className="popup">
        <div className="space"></div>
        {props.children}
    </div>
  ) : <></>;
};

export default SpeechSection