import copyIMG from '../assets/images/icon-copy.svg'

export default function PasswordDisplay({ password, copied, copyPassword }) {

    return (
        <section className="password-display flex justify">
            <p role='show generated password' className={!password ? 'inactive password' : 'password'}>{!password ? 'P4$5W0rD!' : password}</p>
            <div className='copy-container flex'>
                <p className={copied}>COPIED</p>
                <img role='use to copy password' onClick={copyPassword} src={copyIMG} alt="copy icon" />
            </div>
        </section>
    )
}