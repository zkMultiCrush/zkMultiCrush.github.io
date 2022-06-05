const BASE_URL = "/crushIndex.html"
const PASSPHRASE = '123';

const createNewElement = () => {
    let crushCount = document.getElementById("crushes").childElementCount;

    if (crushCount >= 10) {
        alert("No more crushes allowed!");
        return;
    }

    var newCrush = document.createElement('li');
    newCrush.innerHTML = "<input type='text' class='crush_name' name='crush_name' placeholder='First Last'>";
    document.getElementById("crushes").appendChild(newCrush);
}

const fetchUserName = () => document.getElementById("user_name").value
const fetchCrushNames = () => [...document.getElementsByClassName("crush_name")].map(cn => cn.value)

const encryptWithAES = (text) => {
    return CryptoJS.AES.encrypt(text, PASSPHRASE).toString();
};

const generateUrl = async () => {
    const user_name = fetchUserName()
    const crushes = fetchCrushNames()

    const message = await openpgp.createMessage({ text: user_name });
    const encrypted = await openpgp.encrypt({
        message,
        passwords: crushes,
        config: { preferredCompressionAlgorithm: openpgp.enums.compression.zlib }
    });

    const encryptedBody = encodeURIComponent(encryptWithAES(encrypted));
    const url = "https://" + window.location.hostname + BASE_URL + `?hash=${encryptedBody}` + `&name=${encodeURIComponent(user_name)}`;
    document.getElementById("finalURL").innerHTML = `<a href=${url}>${url}</a>`;
    console.log(url)
}