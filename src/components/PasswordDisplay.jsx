import copyIMG from '../assets/images/icon-copy.svg'

export default function PasswordDisplay({ password, copied, copyPassword }) {

    return (
        <section className="password-display flex justify">
            <p className={!password ? 'inactive password' : 'password'}>{!password ? 'P4$5W0rD!' : password}</p>
            <div className='copy-container flex'>
                <p className={copied}>COPIED</p>
                <img onClick={copyPassword} src={copyIMG} alt="copy" />
            </div>
        </section>
    )
}