// script.js

// Assistant IA
function askAI() {
  const question = document.getElementById('user-question').value;
  const responseDiv = document.getElementById('ai-response');
  
  if (!question.trim()) {
    alert("Veuillez poser une question.");
    return;
  }

  responseDiv.innerHTML = "🔍 Recherche dans les bases fiscales béninoises...";
  
  setTimeout(() => {
    responseDiv.innerHTML = `
      <p><strong>EXPERTI AI :</strong> Votre question serait analysée à partir du Code Général des Impôts du Bénin, des lois de finances, notes de service et arrêtés. Une réponse précise vous serait fournie.</p>
      <p>💡 <em>Exemple : Pour une SARL au Bénin, le taux d’impôt sur les sociétés est de 35%, avec exonérations possibles selon le secteur.</em></p>
    `;
  }, 1500);
}

// Gestion du formulaire d'inscription
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
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
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
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
      document.getElementById('username').innerText = currentUser.name.split(' ')[0];
    }
  }
};

// Déconnexion
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

// Panier (simulateur)
function addToCart(item) {
  alert(item + " ajouté au panier");
}
