let currentChat = "Ogólny";

function handleAuth() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if (!user || !pass) return alert("Wpisz dane!");

    // Logika Głównego Admina
    if (user === "admin" && pass === "admln") {
        enterApp(user, true);
        return;
    }

    // Pozostali użytkownicy
    const savedPass = localStorage.getItem("kp_" + user);
    if (!savedPass) {
        localStorage.setItem("kp_" + user, pass);
        alert("Konto utworzone!");
        enterApp(user, false);
    } else if (savedPass === pass) {
        enterApp(user, user.toLowerCase().includes("admin"));
    } else {
        alert("Błędne hasło!");
    }
}

function enterApp(user, isAdmin) {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('app-screen').classList.remove('hidden');
    document.getElementById('user-display').innerText = user;

    if (isAdmin) {
        document.getElementById('admin-tag').classList.remove('hidden');
    }

    const pic = localStorage.getItem("pic_" + user);
    if (pic) document.getElementById('user-avatar').src = pic;
    
    switchChat('Ogólny');
}

function switchChat(chatName) {
    currentChat = chatName;
    document.getElementById('current-chat-title').innerText = chatName;
    
    // UI: Aktywacja przycisku w menu
    document.querySelectorAll('.pv-item').forEach(el => el.classList.remove('active'));
    const activeBtn = document.getElementById('btn-' + chatName);
    if (activeBtn) activeBtn.classList.add('active');

    // Ładowanie historii
    renderHistory();
}

function sendMsg() {
    const inp = document.getElementById('msg-input');
    if (inp.value.trim()) {
        saveMessage(inp.value, null);
        inp.value = "";
    }
}

function sendImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => saveMessage(null, e.target.result);
        reader.readAsDataURL(input.files[0]);
    }
}

function saveMessage(text, img) {
    const user = document.getElementById('user-display').innerText;
    const history = JSON.parse(localStorage.getItem("h_" + currentChat)) || [];
    
    history.push({ user, text, img, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) });
    localStorage.setItem("h_" + currentChat, JSON.stringify(history));
    
    renderHistory();
}

function renderHistory() {
    const chatMain = document.getElementById('chat-main');
    const me = document.getElementById('user-display').innerText;
    chatMain.innerHTML = "";
    
    const history = JSON.parse(localStorage.getItem("h_" + currentChat)) || [];
    
    history.forEach(m => {
        const div = document.createElement('div');
        div.className = m.user === me ? 'msg own' : 'msg';
        
        let html = `<small style="font-size:10px; opacity:0.6">${m.user} • ${m.time}</small><br>`;
        if (m.text) html += `<span>${m.text}</span>`;
        if (m.img) html += `<img src="${m.img}" style="max-width:100%; border-radius:10px; display:block; margin-top:5px;">`;
        
        div.innerHTML = html;
        chatMain.appendChild(div);
    });
    chatMain.scrollTop = chatMain.scrollHeight;
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

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
