const fetchUserName=()=>{let a=window.location.search,b=new URLSearchParams(a),c=decodeURIComponent(b.get("name")).trim();document.getElementById("aashiq").textContent=c};fetchUserName();const decryptWithAES=a=>{let b=CryptoJS.AES.decrypt(a,"123"),c=b.toString(CryptoJS.enc.Utf8);return c},processURL=async()=>{let b=window.location.search,a=new URLSearchParams(b),c=a.get("hash");decodeURIComponent(a.get("name"));let d=decryptWithAES(decodeURIComponent(c)),e=document.getElementById("mehbooba").value,f=await openpgp.readMessage({armoredMessage:d});try{await openpgp.decrypt({message:f,passwords:[e],format:"text"}),document.getElementById("answer").textContent="YOU MATCHED! \u{1F389}\u{1F389}\u{1F389}"}catch{document.getElementById("answer").textContent="SORRY NOPE! \u{1F62D}\u{1F62D}\u{1F62D}"}}