export default function Slider({ slider, setSlider }) {

    function handleChange(e) {
        /*set slider vlaue*/
        setSlider(e.target.value)
        /*set background color of slider to trailing green*/
        let value = (e.target.value / e.target.max) * 100
        e.target.style.background = `linear-gradient(to right, #A4FFAF ${value}%, #18171F ${value}%)`
    }

    return (
        <section className="length-select flex flex-col">
            <div className='char-display flex justify'>
                <p>Character Length</p>
                <p className='charnum'>{slider}</p>
            </div>
            <div>
                <label htmlFor="charnum" id="charnumlabel">Character Length Select</label>
                <input type="range" value={slider} onChange={(e) => handleChange(e)} id='charnum' name='charnum' min='0' max='20' step='1' />
            </div>
        </section>
    )
}

