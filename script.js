// script.js

// Gestion de l'inscription
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas !");
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || "[]");
    const userExists = users.some(u => u.email === email);

    if (userExists) {
        alert("Un compte existe déjà avec cet email.");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
    window.location.href = 'login.html';
});

// Gestion de la connexion
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users') || "[]");
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    } else {
        alert("Email ou mot de passe incorrect.");
    }
});

// Gestion du dashboard
window.onload = function () {
    if (document.getElementById('username')) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert("Veuillez vous connecter.");
            window.location.href = 'login.html';
        } else {
            document.getElementById('username').innerText = currentUser.name;
        }
    }
};

// Déconnexion
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Assistant IA (simulateur)
function askAI() {
    const question = document.getElementById('user-question').value;
    const responseDiv = document.getElementById('ai-response');
    responseDiv.innerHTML = "Recherche dans nos bases de données fiscales...";
    setTimeout(() => {
        responseDiv.innerHTML = "Votre réponse serait ici, basée sur le CGI béninois, les lois de finances et autres textes réglementaires.";
    }, 1500);
}