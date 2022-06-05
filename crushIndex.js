const PASSPHRASE = '123';

const fetchUserName = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const user_name = decodeURIComponent(urlParams.get("name"))

    document.getElementById("user_name").textContent = user_name
}
fetchUserName();

const decryptWithAES = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, PASSPHRASE);
    console.log(bytes)
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};

const processUrl = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const hash = urlParams.get("hash")
    const user_name = decodeURIComponent(urlParams.get("name"))
    const decryptedHash = decryptWithAES(decodeURIComponent(hash))

    const inputName = document.getElementById("crush_name").value

    const encryptedMessage = await openpgp.readMessage({
        armoredMessage: decryptedHash
    });

    try {
        const { data: decrypted } = await openpgp.decrypt({
            message: encryptedMessage,
            passwords: [inputName],
            format: 'text'
        });
        document.getElementById("answer").textContent = "MATCHED!"
    }
    catch {
        document.getElementById("answer").textContent = "NOPE!"
    }

}