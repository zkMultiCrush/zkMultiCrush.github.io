const BASE_URL = "/crushIndex.html"
const MAX_CRUSHES = 10

const createNewElement = () => {
    let crushCount = document.getElementById("mehboobas").childElementCount;

    if (crushCount >= MAX_CRUSHES) {
        // TODO: HTML TO BE ADDED HERE
        alert("No more crushes allowed!");
        return;
    }

    var newCrush = document.createElement('div');
    newCrush.setAttribute('class', 'row mehbooba-row')
    newCrush.innerHTML = `<input type="text" class="form-control mehbooba" name="mehbooba" placeholder="Kim Kardashian" aria-describedby="inputGroupPrepend" required>
                            <div class="invalid-feedback">
                                Please enter crush's name!
                            </div>`
    document.getElementById("mehboobas").appendChild(newCrush);
}

const fetchUserName = () => document.getElementById("aashiq").value.trim()

const fetchCrushNames = () => [...document.getElementsByClassName("mehbooba")].map(cn => cn.value.trim())

const encryptWithAES = (text) => {
    return CryptoJS.AES.encrypt(text, "123").toString();
};

const generateURL = async () => {
    const aashiq = fetchUserName()
    const mehboobas = fetchCrushNames()

    const message = await openpgp.createMessage({ text: aashiq });
    const encrypted = await openpgp.encrypt({
        message,
        passwords: mehboobas,
        config: { preferredCompressionAlgorithm: openpgp.enums.compression.zlib }
    });

    const encryptedBody = encodeURIComponent(encryptWithAES(encrypted));
    const url = "https://" + window.location.hostname + BASE_URL + `?hash=${encryptedBody}` + `&name=${encodeURIComponent(aashiq)}`;
    document.getElementById("finalURL").innerHTML = `<a href=${url} id="disclaimer-links">${url}</a>`;
}