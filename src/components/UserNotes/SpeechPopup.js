import React from "react"
import './SpeechPopup.css'

function SpeechPopup(props) {
  return (props.trigger) ? (
    <div className="popup">
      <div className="space"></div>
      {/* {props.children} */}
      <h3>IN PROGRESS... TEXT TO SPEECH</h3>
      {/* <input type="file" id="inpFile" />
      <button type="button" id="btnUpload">Upload</button>
      <br />
      <br />
      <textarea id="resultText" placeholder="Your PDF text will appear here..."></textarea>
      <br />
      <br /> */}
      <label for="speed">Speed</label>
      <input type="number" name="spee" id="speed" min=".5" max="3" step=".5" value="1" />
      <button id="play-button">Play</button>
      <button id="pause-button">Pause</button>
      <button id="stop-button">Stop</button>
      <script src="script.js"></script>
      {/* <input type="file" id="inpFile" />
      <button type="button" id="btnUpload">Upload</button>
      <br />
      <br />
      <textarea style="width: 300px; height: 150px;" id="resultText"
        placeholder="Your PDF text will appear here..."></textarea>
      <br />
      <label for="speed">Speed</label>
      <input type="number" name="spee" id="speed" min=".5" max="3" step=".5" value="1" />
      <button id="play-button">Play</button>
      <button id="pause-button">Pause</button>
      <button id="stop-button">Stop</button> */}
    </div>
  ) : <></>;
};

export default SpeechPopup