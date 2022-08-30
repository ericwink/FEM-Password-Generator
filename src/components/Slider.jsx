export default function Slider({ slider, setSlider }) {
    return (
        <section className="length-select flex flex-col">
            <div className='char-display flex justify'>
                <p>Character Length</p>
                <p className='charnum'>{slider}</p>
            </div>
            <div>
                <input type="range" value={slider} onChange={(e) => setSlider(e.target.value)} id='charnum' name='charnum' min='0' max='20' step='1' />
            </div>
        </section>
    )
}