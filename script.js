let isLogin = true;

function toggleMode() {
    isLogin = !isLogin;
    document.getElementById('main-btn').innerText = isLogin ? "Zaloguj się" : "Zarejestruj się";
    document.getElementById('toggle-text').innerText = isLogin ? "Nie masz konta? Załóż konto" : "Masz konto? Zaloguj się";
}

function handleAuth() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (!user || !pass) return alert("Wpisz dane!");

    if (isLogin) {
        if (localStorage.getItem(user) === pass) { showApp(user); }
        else { alert("Błąd!"); }
    } else {
        localStorage.setItem(user, pass);
        alert("Zarejestrowano!"); toggleMode();
    }
}

function showApp(user) {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('app-screen').classList.remove('hidden');
    document.getElementById('user-display').innerText = user;
}

function toggleSettings() {
    document.getElementById('settings-dropdown').classList.toggle('hidden');
}

function sendMessage() {
    const input = document.getElementById('msg-input');
    if (input.value.trim() !== "") {
        appendMessage("Ty", input.value, null);
        input.value = "";
    }
}

function sendImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            appendMessage("Ty", null, e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function appendMessage(user, text, imgSrc) {
    const box = document.getElementById('messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message';
    let content = `<strong>${user}</strong><br>`;
    if (text) content += text;
    if (imgSrc) content += `<img src="${imgSrc}" class="chat-img">`;
    msgDiv.innerHTML = content;
    box.appendChild(msgDiv);
    document.getElementById('chat-container').scrollTop = box.scrollHeight;
}

function toggleDarkMode() { document.body.classList.toggle('dark-mode'); }
function logout() { location.reload(); }
