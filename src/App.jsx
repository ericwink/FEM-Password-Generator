import { useEffect } from 'react'
import { useState } from 'react'
import arrowimg from './images/icon-arrow-right.svg'
import copyIMG from './images/icon-copy.svg'

function App() {
  const [password, setPassword] = useState(null)
  const [slider, setSlider] = useState(0)
  const [settings, setSettings] = useState({ upper: false, lower: false, numbers: false, symbols: false })
  const [rating, setRating] = useState(null)

  const ratingScale = {
    1: 'TOO WEAK', 2: 'TOO WEAK', 3: 'WEAK', 4: 'MEDIUM', 5: 'STRONG', test: 'checkmark'
  }

  function updateSettings(e) {
    setSettings({ ...settings, [e.target.name]: e.target.checked })
  }

  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '1234567890'
  const symbols = '!@#$%^&*()'

  const checkLower = /[a-z]/
  const checkSpecial = /[!@#$%^&*()]/
  const checkNumber = /[0-9]/
  const checkUpper = /[A-Z]/

  function setString() {
    let passString = ''
    if (settings.upper) { passString = passString + uppercase }
    if (settings.lower) { passString = passString + lowercase }
    if (settings.numbers) { passString = passString + numbers }
    if (settings.symbols) { passString = passString + symbols }
    return passString
  }
  function makePassword(num, string) {
    let password = []
    for (let i = 0; i < num; i++) {
      let randChar = Math.floor(Math.random() * (string.length))
      password.push(string[randChar]);
    }
    return (password.join(''))
  }
  function checkAndGenerate() {
    if (slider === 0 || !settings.upper && !settings.lower && !settings.numbers && !settings.symbols) {
      return alert('Adjust selections and try again')
    }
    const charset = setString()
    const password = makePassword(slider, charset)
    setPassword(password)
    ratePassword(password)
  }

  function ratePassword(password) {
    let rating = 0
    if (checkUpper.test(password)) { rating = rating + 0.5 }
    if (checkLower.test(password)) { rating = rating + 0.5 }
    if (checkNumber.test(password)) { rating = rating + 0.5 }
    if (checkSpecial.test(password)) { rating = rating + 0.5 }
    if (password.length >= 3) { rating = rating + 0.5 }
    if (password.length >= 6) { rating = rating + 0.5 }
    if (password.length >= 9) { rating = rating + 0.5 }
    if (password.length >= 12) { rating = rating + 0.5 }
    if (password.length >= 15) { rating = rating + 0.5 }
    if (password.length >= 18) { rating = rating + 0.5 }
    setRating(Math.floor(rating))
  }


  return (
    <>
      <header className="heading">
        <h1>Password Generator</h1>
      </header>
      <div className="container flex flex-col">
        <div className="sub-container">
          <section className="password-display flex justify">
            <p>{!password ? 'P4$5W0rD!' : password}</p>
            <img onClick={() => console.log('img click')} src={copyIMG} alt="copy" />
          </section>
        </div>
        <div className="sub-container flex flex-col">
          <section className="length-select flex flex-col">
            <div className='char-display flex justify'>
              <p>Character Length</p>
              <p>{slider}</p>
            </div>
            <div>
              <input type="range" value={slider} onChange={(e) => setSlider(e.target.value)} id='charnum' name='charnum' min='0' max='20' step='1' />
            </div>
          </section>
          <section className="checkboxes">
            <div>
              <input type="checkbox" name="upper" id="upper" onChange={(e) => updateSettings(e)} />
              <label htmlFor="upper">Include Uppercase Letters</label>
            </div>
            <div>
              <input type="checkbox" name="lower" id="lower" onChange={(e) => updateSettings(e)} />
              <label htmlFor="lower">Include Lowercase Letters</label>
            </div>
            <div>
              <input type="checkbox" name="numbers" id="numbers" onChange={(e) => updateSettings(e)} />
              <label htmlFor="numbers">Include Numbers</label>
            </div>
            <div>
              <input type="checkbox" name="symbols" id="symbols" onChange={(e) => updateSettings(e)} />
              <label htmlFor="symbols">Include Symbols</label>
            </div>
          </section>
          <section className="strength-check flex justify">
            <p>Strength</p>
            {!rating ? <p>'none'</p> : <p>{ratingScale[rating]}</p>}
          </section>
          <section className="generate">
            <button onClick={checkAndGenerate}>GENERATE<img className='arrow-right' src={arrowimg} alt="arrow right" /></button>
          </section>
        </div>
      </div>
    </>

  )
}

export default App

