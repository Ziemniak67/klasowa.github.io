let isLogin = true;

function toggleMode() {
    isLogin = !isLogin;
    document.getElementById('title').innerText = isLogin ? "Logowanie" : "Rejestracja";
    document.getElementById('main-btn').innerText = isLogin ? "Zaloguj" : "Zarejestruj";
}

function handleAuth() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (!user || !pass) return alert("Wpisz dane!");

    if (isLogin) {
        if (localStorage.getItem(user) === pass) { showWelcome(user); }
        else { alert("Błędne hasło!"); }
    } else {
        localStorage.setItem(user, pass);
        alert("Zarejestrowano! Zaloguj się.");
        toggleMode();
    }
}

function showWelcome(user) {
    document.getElementById('auth-box').classList.add('hidden');
    document.getElementById('welcome-msg').classList.remove('hidden');
    document.getElementById('user-display').innerText = user;
}

function showSection(name) {
    document.getElementById('chat-section').classList.toggle('hidden', name !== 'chat');
    document.getElementById('settings-section').classList.toggle('hidden', name !== 'settings');
}

function sendMessage() {
    const inp = document.getElementById('msg-input');
    if (inp.value) {
        const m = document.getElementById('messages');
        m.innerHTML += `<div><b>Ja:</b> ${inp.value}</div>`;
        inp.value = "";
        m.scrollTop = m.scrollHeight;
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function changePassword() {
    const user = document.getElementById('user-display').innerText;
    const newPass = document.getElementById('new-pass').value;
    if (newPass) {
        localStorage.setItem(user, newPass);
        alert("Hasło zmienione!");
    }
}

function logout() { location.reload(); }
