let isLogin = true;

function toggleMode() {
    isLogin = !isLogin;
    document.getElementById('title').innerText = isLogin ? "Logowanie" : "Rejestracja";
    document.getElementById('main-btn').innerText = isLogin ? "Zaloguj" : "Zarejestruj";
    document.getElementById('toggle-text').innerText = isLogin ? "Nie masz konta? Zarejestruj się" : "Masz już konto? Zaloguj się";
}

function handleAuth() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (isLogin) {
        const storedPass = localStorage.getItem(user);
        if (storedPass && storedPass === pass) {
            showWelcome(user);
        } else {
            alert("Błędne dane!");
        }
    } else {
        localStorage.setItem(user, pass);
        alert("Zarejestrowano pomyślnie! Teraz się zaloguj.");
        toggleMode();
    }
}

function showWelcome(user) {
    document.getElementById('auth-box').classList.add('hidden');
    document.getElementById('welcome-msg').classList.remove('hidden');
    document.getElementById('user-display').innerText = user;
}

function logout() { location.reload(); }
