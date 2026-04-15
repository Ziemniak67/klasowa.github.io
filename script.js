// Ta funkcja zajmuje się wszystkim: logowaniem i rejestracją na raz
function handleAuth() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    // 1. Sprawdź czy wpisano dane
    if (user === "" || pass === "") {
        alert("Wpisz cokolwiek w pola login i hasło!");
        return;
    }

    // 2. Pobierz hasło dla tego użytkownika z pamięci
    const savedPassword = localStorage.getItem("klasa_" + user);

    if (savedPassword === null) {
        // REJESTRACJA: Jeśli użytkownik nie istnieje, stwórz go
        localStorage.setItem("klasa_" + user, pass);
        alert("Konto utworzone! Witaj w klasie.");
        enterApp(user);
    } else {
        // LOGOWANIE: Jeśli użytkownik istnieje, sprawdź hasło
        if (savedPassword === pass) {
            enterApp(user);
        } else {
            alert("Błędne hasło dla tego użytkownika!");
        }
    }
}

// Funkcja wejścia do aplikacji
function enterApp(name) {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('app-screen').classList.remove('hidden');
    document.getElementById('user-display').innerText = name;
}

// Reszta funkcji (ustawienia i czat)
function toggleSettings() {
    const menu = document.getElementById('settings-menu');
    menu.classList.toggle('hidden');
}

function sendMsg() {
    const inp = document.getElementById('msg-input');
    if (inp.value.trim() !== "") {
        addMessage(document.getElementById('user-display').innerText, inp.value, null);
        inp.value = "";
    }
}

function sendFile(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => addMessage(document.getElementById('user-display').innerText, null, e.target.result);
        reader.readAsDataURL(input.files[0]);
    }
}

function addMessage(who, text, img) {
    const chat = document.getElementById('chat-main');
    const div = document.createElement('div');
    div.className = 'msg own';
    
    let content = `<b>${who}:</b><br>`;
    if (text) content += text;
    if (img) content += `<img src="${img}" class="chat-img" style="display:block; max-width:100%; margin-top:5px;">`;
    
    div.innerHTML = content;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
