export default function CheckBoxes({ updateSettings }) {

    return (
        <section className="checkboxes flex flex-col">
            <div className="check-wrapper">
                <input type="checkbox" name="upper" id="upper" onChange={(e) => updateSettings(e)} />
                <label htmlFor="upper">Include Uppercase Letters</label>
            </div>
            <div className="check-wrapper">
                <input type="checkbox" name="lower" id="lower" onChange={(e) => updateSettings(e)} />
                <label htmlFor="lower">Include Lowercase Letters</label>
            </div>
            <div className="check-wrapper">
                <input type="checkbox" name="numbers" id="numbers" onChange={(e) => updateSettings(e)} />
                <label htmlFor="numbers">Include Numbers</label>
            </div>
            <div className="check-wrapper">
                <input type="checkbox" name="symbols" id="symbols" onChange={(e) => updateSettings(e)} />
                <label htmlFor="symbols">Include Symbols</label>
            </div>
        </section>
    )
}