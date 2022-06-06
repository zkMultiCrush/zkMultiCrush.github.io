const fetchUserName = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const user_name = decodeURIComponent(urlParams.get("name"))

    document.getElementById("aashiq").textContent = user_name
}
fetchUserName();

const decryptWithAES = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, "123");
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};

const processURL = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const hash = urlParams.get("hash")
    const aashiq = decodeURIComponent(urlParams.get("name"))
    const decryptedHash = decryptWithAES(decodeURIComponent(hash))

    const inputName = document.getElementById("mehbooba").value.trim()

    const encryptedMessage = await openpgp.readMessage({
        armoredMessage: decryptedHash
    });

    try {
        await openpgp.decrypt({
            message: encryptedMessage,
            passwords: [inputName],
            format: 'text'
        });
        document.getElementById("answer").textContent = "YOU MATCHED! 🎉🎉🎉"
    }
    catch {
        document.getElementById("answer").textContent = "SORRY NOPE! 😭😭😭"
    }

}