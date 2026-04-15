let isLoginMode = true;

function toggleMode() {
    isLoginMode = !isLoginMode;
    document.getElementById('auth-title').innerText = isLoginMode ? "Witaj w klasie 🌿" : "Stwórz konto ✨";
    document.getElementById('auth-btn').innerText = isLoginMode ? "Zaloguj się" : "Zarejestruj się";
    document.getElementById('toggle-text').innerText = isLoginMode ? "Nie masz konta? Załóż konto" : "Masz konto? Zaloguj się";
}

function handleAuth() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if (!user || !pass) {
        alert("Wpisz login i hasło!");
        return;
    }

    if (isLoginMode) {
        // Logowanie
        const storedPass = localStorage.getItem("user_" + user);
        if (storedPass && storedPass === pass) {
            document.getElementById('auth-screen').classList.add('hidden');
            document.getElementById('app-screen').classList.remove('hidden');
            document.getElementById('user-display').innerText = user;
        } else {
            alert("Błędny login lub hasło!");
        }
    } else {
        // Rejestracja
        if (localStorage.getItem("user_" + user)) {
            alert("Ten login jest zajęty!");
        } else {
            localStorage.setItem("user_" + user, pass);
            alert("Konto utworzone! Teraz możesz się zalogować.");
            toggleMode();
        }
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
