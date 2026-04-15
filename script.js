function handleAuth() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if (!user || !pass) return alert("Uzupełnij dane!");

    const savedPass = localStorage.getItem("kp_" + user);
    if (!savedPass) {
        localStorage.setItem("kp_" + user, pass);
        alert("Konto utworzone!");
        enterApp(user);
    } else if (savedPass === pass) {
        enterApp(user);
    } else {
        alert("Błędne hasło!");
    }
}

function enterApp(user) {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('app-screen').classList.remove('hidden');
    document.getElementById('user-display').innerText = user;

    // Sprawdzanie MODA
    if (user.toLowerCase().includes("admin")) {
        document.getElementById('admin-tag').classList.remove('hidden');
    }

    // Wczytaj profilowe
    const pic = localStorage.getItem("pic_" + user);
    if (pic) document.getElementById('user-avatar').src = pic;
}

function changeAvatar(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('user-avatar').src = e.target.result;
            localStorage.setItem("pic_" + document.getElementById('user-display').innerText, e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function sendMsg() {
    const inp = document.getElementById('msg-input');
    if (inp.value.trim()) {
        appendMsg(inp.value, null);
        inp.value = "";
    }
}

function sendImage(input) {
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
    if (img) div.innerHTML = `<img src="${img}" style="max-width:100%; border-radius:10px;">`;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function startPV(name) {
    document.getElementById('current-chat-title').innerText = name;
    document.getElementById('chat-main').innerHTML = `<p style="text-align:center; color:gray;">To jest początek rozmowy z: ${name}</p>`;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
