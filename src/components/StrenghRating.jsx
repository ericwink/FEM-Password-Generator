export default function StrengthRating({ rating, ratingScale }) {

    return (
        <section className="strength-check flex justify">
            <p>STRENGTH</p>
            <div className='flex gap10'>
                {!rating ? null : <p className='rating'>{ratingScale[rating].name}</p>}
                <div className='flex'>
                    <div className={!rating ? 'rate-box' : 'rate-box ' + ratingScale[rating].color}></div>
                    <div className={!rating || rating < 3 ? 'rate-box' : 'rate-box ' + ratingScale[rating].color}></div>
                    <div className={!rating || rating < 5 ? 'rate-box' : 'rate-box ' + ratingScale[rating].color}></div>
                    <div className={!rating || rating < 7 ? 'rate-box' : 'rate-box ' + ratingScale[rating].color}></div>
                </div>
            </div>
        </section>
    )
}