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
    1: { name: 'TOO WEAK!', color: 'red' },
    2: { name: 'TOO WEAK!', color: 'red' },
    3: { name: 'WEAK', color: 'orange' },
    4: { name: 'WEAK', color: 'orange' },
    5: { name: 'MEDIUM', color: 'yellow' },
    6: { name: 'MEDIUM', color: 'yellow' },
    7: { name: 'STRONG', color: 'green' },
    8: { name: 'STRONG', color: 'green' }
  }

  function updateSettings(e) {
    setSettings({ ...settings, [e.target.name]: e.target.checked })
  }

  //global string values to use in generating a password
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '1234567890'
  const symbols = '!@#$%^&*()'

  //evaluate which options the user has checked, and concat global string values to set password characters
  function setString() {
    let passString = ''
    if (settings.upper) { passString = passString + uppercase }
    if (settings.lower) { passString = passString + lowercase }
    if (settings.numbers) { passString = passString + numbers }
    if (settings.symbols) { passString = passString + symbols }
    return passString
  }

  //accepts a number value and a string to generate a random set of characters form the string
  function makePassword(num, string) {
    let password = []
    for (let i = 0; i < num; i++) {
      let randChar = Math.floor(Math.random() * (string.length))
      password.push(string[randChar]);
    }
    return (password.join(''))
  }

  //validate that the user has made a selection, then call each function to generate the password
  function checkAndGenerate() {
    if (slider === 0 || !settings.upper && !settings.lower && !settings.numbers && !settings.symbols) {
      return alert('Adjust selections and try again')
    }
    const charset = setString()
    const password = makePassword(slider, charset)
    setPassword(password)
    ratePassword(password)
  }

  //evaluate the generated password and assign a number rating value
  function ratePassword(password) {
    const checkLower = /[a-z]/
    const checkSpecial = /[!@#$%^&*()]/
    const checkNumber = /[0-9]/
    const checkUpper = /[A-Z]/
    let rating = 1
    if (checkUpper.test(password)) { rating = rating + 0.5 }
    if (checkLower.test(password)) { rating = rating + 0.5 }
    if (checkNumber.test(password)) { rating = rating + 1 }
    if (checkSpecial.test(password)) { rating = rating + 1 }
    if (password.length >= 5) { rating = rating + 0.5 }
    if (password.length >= 8) { rating = rating + 0.5 }
    if (password.length >= 11) { rating = rating + 0.5 }
    if (password.length >= 15) { rating = rating + 0.8 }
    if (password.length >= 18) { rating = rating + 0.8 }
    if (password.length >= 20) { rating = rating + 1 }
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
            <div className='flex gap10'>
              <p className='copied'>COPIED</p>
              <img className='copy-password' onClick={() => navigator.clipboard.writeText(password)} src={copyIMG} alt="copy" />
            </div>
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
            <div className='flex'>
              {!rating ? null : <p>{ratingScale[rating].name}</p>}
              <div className='flex'>
                <div className={!rating ? 'rate-box' : 'rate-box ' + ratingScale[rating].color}></div>
                <div className={!rating || rating < 3 ? 'rate-box' : 'rate-box ' + ratingScale[rating].color}></div>
                <div className={!rating || rating < 5 ? 'rate-box' : 'rate-box ' + ratingScale[rating].color}></div>
                <div className={!rating || rating < 7 ? 'rate-box' : 'rate-box ' + ratingScale[rating].color}></div>
              </div>
            </div>

          </section>
          <section className="generate">
            <button onClick={checkAndGenerate}>GENERATE<img className='arrow-right' src={arrowimg} alt="arrow right" /></button>
          </section>
        </div>
      </div >
    </>

  )
}

export default App

//display four boxes
//set color of boxes by rating
//too weak, first is red
//weak, two are orange
//medium, three are yellow
//strong, four are green

//create one box and set color by rating