// Flaga sprawdzająca czy jesteśmy w trybie logowania czy rejestracji
let isLoginMode = true;

function toggleMode() {
    isLoginMode = !isLoginMode;
    const btn = document.querySelector('#auth-screen button');
    const link = document.getElementById('toggle-text');
    const title = document.querySelector('#auth-screen h2');

    if (isLoginMode) {
        title.innerText = "Witaj w klasie 🌿";
        btn.innerText = "Zaloguj się";
        link.innerText = "Nie masz konta? Załóż konto";
    } else {
        title.innerText = "Stwórz konto ✨";
        btn.innerText = "Zarejestruj się";
        link.innerText = "Masz już konto? Zaloguj się";
    }
}

function handleAuth() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if (!user || !pass) {
        alert("Wpisz login i hasło!");
        return;
    }

    if (isLoginMode) {
        // LOGOWANIE
        const storedPass = localStorage.getItem(user);
        if (storedPass && storedPass === pass) {
            document.getElementById('auth-screen').classList.add('hidden');
            document.getElementById('app-screen').classList.remove('hidden');
            document.getElementById('user-display').innerText = user;
        } else {
            alert("Błędny login lub hasło!");
        }
    } else {
        // REJESTRACJA
        if (localStorage.getItem(user)) {
            alert("Taki użytkownik już istnieje!");
        } else {
            localStorage.setItem(user, pass);
            alert("Konto utworzone pomyślnie! Możesz się teraz zalogować.");
            toggleMode(); // Przełącz na logowanie
        }
    }
}

// Funkcje czatu i ustawień (bez zmian)
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
