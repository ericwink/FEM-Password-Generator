import { useState } from 'react'
import CheckBoxes from './components/CheckBoxes'
import Generate from './components/Generate'
import PasswordDisplay from './components/PasswordDisplay'
import Slider from './components/Slider'
import StrengthRating from './components/StrenghRating'

function App() {
  const [password, setPassword] = useState(null)
  const [slider, setSlider] = useState(0)
  const [settings, setSettings] = useState({ upper: false, lower: false, numbers: false, symbols: false })
  const [rating, setRating] = useState(null)
  const [copied, setCopied] = useState('start')

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

  //evaluate which options the user has checked, and concat global string values to set password characters
  function setString() {
    //string values to use in generating a password
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '1234567890'
    const symbols = '!@#$%^&*()'
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

  function copyPassword() {
    if (!password) { return alert('Generate password first!') }
    navigator.clipboard.writeText(password)
    setCopied('visible')
    setTimeout(() => {
      setCopied('hidden')
    }, 2000);
  }

  return (
    <>
      <header className="heading">
        <h1>Password Generator</h1>
      </header>
      <div className="container flex flex-col">
        <div className="sub-container-1">
          <PasswordDisplay password={password} copied={copied} copyPassword={copyPassword} />
        </div>
        <div className="sub-container-2 flex flex-col flex1">
          <Slider slider={slider} setSlider={setSlider} />
          <CheckBoxes updateSettings={updateSettings} />
          <StrengthRating rating={rating} ratingScale={ratingScale} />
          <Generate checkAndGenerate={checkAndGenerate} />
        </div>
      </div>
    </>

  )
}

export default App