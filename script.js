// script.js

// Assistant IA (simulateur temporaire)
function askAI() {
  const question = document.getElementById('user-question').value;
  const responseDiv = document.getElementById('ai-response');
  
  if (!question.trim()) {
    alert("Veuillez poser une question.");
    return;
  }

  responseDiv.innerHTML = "🔍 Recherche en cours dans les bases fiscales béninoises...";
  
  // Simuler une réponse après 1.5 secondes
  setTimeout(() => {
    responseDiv.innerHTML = `
      <p><strong>EXPERTI AI :</strong> Votre question serait analysée à partir du Code Général des Impôts du Bénin, des lois de finances, notes de service et arrêtés. Une réponse précise vous serait fournie.</p>
      <p>💡 <em>Exemple : Pour une SARL au Bénin, le taux d’impôt sur les sociétés est de 35%, avec exonérations possibles selon le secteur.</em></p>
    `;
  }, 1500);
}
