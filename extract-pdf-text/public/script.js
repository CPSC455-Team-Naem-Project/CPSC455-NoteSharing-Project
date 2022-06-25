const inpFile = document.getElementById("inpFile");
const btnUpload = document.getElementById("btnUpload");
const resultText = document.getElementById("resultText");
const playButton = document.getElementById('play-button')
const pauseButton = document.getElementById('pause-button')
const stopButton = document.getElementById('stop-button')
const speedInput = document.getElementById('speed')

btnUpload.addEventListener("click", () => {
    const formData = new FormData();

    formData.append("pdfFile", inpFile.files[0]);

    fetch("/extract-text", {
        method: "post",
        body: formData
    }).then(response => {
        return response.text();
    }).then(extractedText => {
        resultText.value = extractedText.trim();
    });
});

playButton.addEventListener('click', () => {
    playText(resultText.value)
  })
  pauseButton.addEventListener('click', pauseText)
  stopButton.addEventListener('click', stopText)
  speedInput.addEventListener('input', () => {
    stopText()
    playText(utterance.text.substring(currentCharacter))
  })
  
  const utterance = new SpeechSynthesisUtterance()
  utterance.addEventListener('end', () => {
    resultText.disabled = false
  })
  utterance.addEventListener('boundary', e => {
    currentCharacter = e.charIndex
  })
  
  function playText(text) {
    if (speechSynthesis.paused && speechSynthesis.speaking) {
      return speechSynthesis.resume()
    }
    if (speechSynthesis.speaking) return
    utterance.text = text
    utterance.rate = speedInput.value || 1
    resultText.disabled = true
    speechSynthesis.speak(utterance)
  }
  
  function pauseText() {
    if (speechSynthesis.speaking) speechSynthesis.pause()
  }
  
  function stopText() {
    speechSynthesis.resume()
    speechSynthesis.cancel()
  }