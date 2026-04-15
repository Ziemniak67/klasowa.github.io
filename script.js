let isLogin = true;

function toggleMode() {
    isLogin = !isLogin;
    document.getElementById('title').innerText = isLogin ? "Witaj w klasie!" : "Załóż konto";
    document.getElementById('main-btn').innerText = isLogin ? "Zaloguj się" : "Zarejestruj się";
    document.getElementById('toggle-text').innerText = isLogin ? "Nowy tutaj? Załóż konto" : "Masz konto? Zaloguj się";
}

function handleAuth() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (!user || !pass) { alert("Uzupełnij pola!"); return; }

    if (isLogin) {
        if (localStorage.getItem(user) === pass) {
            showWelcome(user);
        } else {
            alert("Nieprawidłowe dane logowania.");
        }
    } else {
        localStorage.setItem(user, pass);
        alert("Konto stworzone! Możesz się zalogować.");
        toggleMode();
    }
}

function showWelcome(user) {
    document.getElementById('auth-box').classList.add('hidden');
    document.getElementById('welcome-msg').classList.remove('hidden');
    document.getElementById('user-display').innerText = user;
    showSection('chat'); // Domyślnie otwórz czat
}

function showSection(sectionName) {
    const chat = document.getElementById('chat-section');
    const settings = document.getElementById('settings-section');

    if (sectionName === 'chat') {
        chat.classList.remove('hidden');
        settings.classList.add('hidden');
    } else {
        chat.classList.add('hidden');
        settings.classList.remove('hidden');
    }
}

function sendMessage() {
    const input = document.getElementById('msg-input');
    const box = document.getElementById('messages');
    if (input.value.trim() !== "") {
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        box.innerHTML += `<div style="margin-bottom:8px"><strong>Ty</strong> <small>${time}</small><br>${input.value}</div>`;
        input.value = "";
        document.getElementById('messages-container').scrollTop = box.scrollHeight;
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function logout() {
    location.reload();
}
