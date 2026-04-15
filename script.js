function handleAuth() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (!user || !pass) return alert("Wpisz dane!");

    // Prosta rejestracja/logowanie
    if (!localStorage.getItem(user)) {
        localStorage.setItem(user, pass);
        alert("Zarejestrowano pomyślnie!");
    } 
    
    if (localStorage.getItem(user) === pass) {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('app-screen').classList.remove('hidden');
    } else {
        alert("Błędne hasło!");
    }
}

function toggleSettings() {
    document.getElementById('settings-menu').classList.toggle('hidden');
}

function sendMsg() {
    const inp = document.getElementById('msg-input');
    if (inp.value.trim()) {
        appendMsg(inp.value, null);
        inp.value = "";
    }
}

function sendFile(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => appendMsg(null, e.target.result);
        reader.readAsDataURL(input.files[0]);
    }
}

function appendMsg(text, img) {
    const chat = document.getElementById('chat-main');
    const div = document.createElement('div');
    div.className = 'msg own';
    if (text) div.innerText = text;
    if (img) div.innerHTML = `<img src="${img}" class="chat-img">`;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
