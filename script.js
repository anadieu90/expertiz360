// Données des produits (mock data)
const products = {
  'chemise1': {
    id: 'chemise1',
    name: 'Chemise traditionnelle',
    price: 8500,
    oldPrice: 10000,
    description: 'Magnifique chemise traditionnelle en tissu de qualité, fabriquée à la main. Parfaite pour les cérémonies et événements spéciaux. Taille unique (convient du S au L).',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80',
    seller: 'Koffi',
    location: 'Allée 2, près de la boutique rouge',
    category: 'Vêtements',
    condition: 'neuf'
  },
  'robe1': {
    id: 'robe1',
    name: 'Robe traditionnelle',
    price: 6500,
    oldPrice: 8000,
    description: 'Belle robe traditionnelle en wax, disponible en plusieurs couleurs. Taille unique (convient du S au L).',
    image: 'https://images.unsplash.com/photo-1592226440509-5d069433b1ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80',
    seller: 'Awa',
    location: 'Allée 3, près du kiosque bleu',
    category: 'Vêtements',
    condition: 'neuf'
  },
  'sandales1': {
    id: 'sandales1',
    name: 'Sandales en cuir',
    price: 5000,
    description: 'Sandales en cuir véritable, taille 42, parfait état.',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce1d3e826?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80',
    seller: 'Baba',
    location: 'Allée 5, près de l\'entrée',
    category: 'Chaussures',
    condition: 'frippe'
  }
};

// Variables globales
let currentAdIndex = 0;
const totalAds = 3;
let tontineProgress = 20;

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
  // Démarrer le carousel
  startAdCarousel();
  
  // Initialiser les produits
  initProducts();
});

// Carousel publicitaire
function startAdCarousel() {
  setInterval(nextAd, 3000);
}

function nextAd() {
  currentAdIndex = (currentAdIndex + 1) % totalAds;
  updateAdDisplay();
}

function goToAd(index) {
  currentAdIndex = index;
  updateAdDisplay();
}

function updateAdDisplay() {
  // Cacher toutes les images
  for (let i = 0; i < totalAds; i++) {
    document.getElementById(`ad-image-${i+1}`).style.display = 'none';
  }
  
  // Afficher l'image courante
  document.getElementById(`ad-image-${currentAdIndex+1}`).style.display = 'block';
  
  // Mettre à jour les points de pagination
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index === currentAdIndex) {
      dot.classList.add('active-dot');
    } else {
      dot.classList.remove('active-dot');
    }
  });
}

// Fonctions de navigation
function openSidebar() {
  document.getElementById('sidebar').style.display = 'block';
  document.getElementById('sidebar-overlay').style.display = 'block';
}

function closeSidebar() {
  document.getElementById('sidebar').style.display = 'none';
  document.getElementById('sidebar-overlay').style.display = 'none';
}

function showSellerChoice() {
  document.getElementById('home-page').style.display = 'none';
  document.getElementById('seller-choice-page').style.display = 'block';
}

function goBackToHome() {
  document.getElementById('seller-choice-page').style.display = 'none';
  document.getElementById('home-page').style.display = 'block';
}

function showProductDetail(productId) {
  const product = products[productId];
  if (!product) return;
  
  // Mettre à jour les éléments de la page de détail
  document.getElementById('detail-image').src = product.image;
  document.getElementById('detail-title').textContent = product.name;
  document.getElementById('detail-price').textContent = formatPrice(product.price) + ' FCFA';
  if (product.oldPrice) {
    document.getElementById('detail-old-price').textContent = formatPrice(product.oldPrice) + ' FCFA';
  } else {
    document.getElementById('detail-old-price').style.display = 'none';
  }
  document.getElementById('detail-description').textContent = product.description;
  document.getElementById('detail-seller').textContent = product.seller;
  document.getElementById('detail-location').textContent = product.location;
  document.getElementById('detail-category').textContent = product.category;
  
  // Mettre à jour la condition
  if (product.condition === 'neuf') {
    document.getElementById('detail-condition').textContent = 'NEUF';
    document.getElementById('detail-condition').className = 'badge neuf-badge';
    document.getElementById('detail-condition-text').textContent = 'Neuf';
  } else {
    document.getElementById('detail-condition').textContent = 'FRIPE';
    document.getElementById('detail-condition').className = 'badge frippe-badge';
    document.getElementById('detail-condition-text').textContent = 'Frippé';
  }
  
  // Mettre à jour la modale de marchandage
  document.getElementById('modal-image').src = product.image;
  document.getElementById('modal-product-name').textContent = product.name;
  document.getElementById('modal-seller').textContent = product.seller;
  document.getElementById('modal-location').textContent = product.location;
  
  // Afficher la page de détail
  document.getElementById('home-page').style.display = 'none';
  document.getElementById('product-detail').style.display = 'block';
  document.querySelector('.bottom-nav').style.display = 'none';
}

function hideProductDetail() {
  document.getElementById('product-detail').style.display = 'none';
  document.getElementById('home-page').style.display = 'block';
  document.querySelector('.bottom-nav').style.display = 'flex';
}

function showProfile() {
  document.getElementById('home-page').style.display = 'none';
  document.getElementById('profile-page').style.display = 'block';
  document.querySelector('.bottom-nav').style.display = 'none';
  // Mettre à jour l'icône active dans le footer
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelectorAll('.nav-item')[3].classList.add('active');
}

function hideProfile() {
  document.getElementById('profile-page').style.display = 'none';
  document.getElementById('home-page').style.display = 'block';
  document.querySelector('.bottom-nav').style.display = 'flex';
}

function showSearch() {
  document.getElementById('home-page').style.display = 'none';
  document.getElementById('search-page').style.display = 'block';
  document.querySelector('.bottom-nav').style.display = 'none';
  // Mettre à jour l'icône active dans le footer
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelectorAll('.nav-item')[1].classList.add('active');
}

function hideSearch() {
  document.getElementById('search-page').style.display = 'none';
  document.getElementById('home-page').style.display = 'block';
  document.querySelector('.bottom-nav').style.display = 'flex';
}

function showChat() {
  document.getElementById('home-page').style.display = 'none';
  document.getElementById('chat-page').style.display = 'block';
  document.querySelector('.bottom-nav').style.display = 'none';
  // Mettre à jour l'icône active dans le footer
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelectorAll('.nav-item')[2].classList.add('active');
}

function hideChat() {
  document.getElementById('chat-page').style.display = 'none';
  document.getElementById('home-page').style.display = 'block';
  document.querySelector('.bottom-nav').style.display = 'flex';
}

function showCart() {
  document.getElementById('home-page').style.display = 'none';
  document.getElementById('cart-page').style.display = 'block';
  document.querySelector('.bottom-nav').style.display = 'none';
}

function hideCart() {
  document.getElementById('cart-page').style.display = 'none';
  document.getElementById('home-page').style.display = 'block';
  document.querySelector('.bottom-nav').style.display = 'flex';
}

function showAdvancedSearch() {
  document.getElementById('home-page').style.display = 'none';
  document.getElementById('advanced-search-page').style.display = 'block';
}

function hideAdvancedSearch() {
  document.getElementById('advanced-search-page').style.display = 'none';
  document.getElementById('home-page').style.display = 'block';
}

// Fonctions de gestion des produits
function initProducts() {
  // Ajouter des produits de démonstration pour chaque catégorie
  const categories = ['vetements', 'chaussures', 'sacs', 'accessoires'];
  
  categories.forEach(category => {
    const container = document.getElementById(`${category}-products`);
    
    // Créer 5 produits par catégorie
    for (let i = 1; i <= 5; i++) {
      const productId = category === 'vetements' ? (i === 1 ? 'chemise1' : i === 2 ? 'robe1' : `product-${category}-${i}`) : 
                      category === 'chaussures' ? (i === 1 ? 'sandales1' : `product-${category}-${i}`) : 
                      `product-${category}-${i}`;
      
      const product = products[productId] || {
        id: `product-${category}-${i}`,
        name: `Produit ${i} de ${category}`,
        price: 5000 + i * 1000,
        description: `Description du produit ${i} de la catégorie ${category}`,
        image: `https://images.unsplash.com/photo-${1500000000 + i * 100}?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=110&q=80`,
        seller: `Vendeur ${i}`,
        location: `Allée ${i}, près de la boutique ${i}`,
        category: category,
        condition: i % 2 === 0 ? 'neuf' : 'frippe'
      };
      
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.onclick = function() { showProductDetail(product.id); };
      
      productCard.innerHTML = `
        <img src="${product.image}" class="product-image" alt="${product.name}">
        <div class="product-name">${product.name}</div>
        <div class="seller-name">${product.seller}</div>
        <div class="badge-container">
          <span class="badge ${product.condition === 'neuf' ? 'neuf-badge' : 'frippe-badge'}">${product.condition === 'neuf' ? 'NEUF' : 'FRIPE'}</span>
        </div>
        <div class="location-container">
          <i class="fas fa-map-marker-alt"></i>
          <span class="location-text">${product.location}</span>
        </div>
        <div class="price-row">
          <div class="price">${formatPrice(product.price)} FCFA</div>
          ${product.oldPrice ? `<div class="old-price">${formatPrice(product.oldPrice)} FCFA</div>` : ''}
        </div>
        <div class="offer-button">Voir le produit</div>
      `;
      
      container.appendChild(productCard);
    }
  });
}

function filterProducts(category) {
  // Mettre à jour l'indicateur de catégorie active
  document.querySelectorAll('.category-button').forEach(button => {
    button.classList.remove('active-category');
    if (button.dataset.category === category) {
      button.classList.add('active-category');
    }
  });
  
  closeSidebar();
}

function showOfferModal() {
  // Afficher la modale
  document.getElementById('offer-modal').style.display = 'block';
}

function closeOfferModal() {
  document.getElementById('offer-modal').style.display = 'none';
}

function sendOffer() {
  const offerAmount = document.getElementById('offer-amount').value;
  if (!offerAmount || offerAmount <= 0) {
    alert('Veuillez entrer un montant valide');
    return;
  }
  
  // Ici, vous implémenteriez l'envoi de l'offre
  alert(`Votre offre de ${formatPrice(offerAmount)} FCFA a été envoyée au vendeur !`);
  closeOfferModal();
}

function shareProduct() {
  const product = {
    name: 'Chemise traditionnelle',
    price: 8500
  };
  
  const shareText = `Découvrez ce produit sur Missèbo Connect : ${product.name} - ${formatPrice(product.price)} FCFA`;
  const shareUrl = 'https://missebo-connect.vercel.app';
  
  if (navigator.share) {
    navigator.share({
      title: 'Missèbo Connect',
      text: shareText,
      url: shareUrl
    }).then(() => {
      console.log('Partage réussi');
    }).catch((error) => {
      console.log('Erreur de partage:', error);
    });
  } else {
    alert(`${shareText}\n${shareUrl}`);
  }
}

function contactSeller() {
  const product = {
    name: 'Chemise traditionnelle'
  };
  
  const message = `Bonjour, je suis intéressé par votre produit "${product.name}" sur Missèbo Connect.`;
  const whatsappUrl = `https://wa.me/2290159070737?text=${encodeURIComponent(message)}`;
  
  // Ouvrir WhatsApp
  window.open(whatsappUrl, '_blank');
}

function buyNow() {
  alert('Fonctionnalité de paiement en développement. Contactez le vendeur via WhatsApp pour finaliser votre achat.');
}

// Fonctionnalité de paiement en plusieurs tranches
function showTontineModal() {
  const product = {
    name: 'Chemise traditionnelle',
    price: 8500
  };
  
  // Mettre à jour les valeurs de la modale
  document.getElementById('tontine-product-price').textContent = formatPrice(product.price) + ' FCFA';
  
  const fees = product.price * 0.02;
  const total = product.price + fees;
  
  document.getElementById('tontine-fees').textContent = formatPrice(fees) + ' FCFA';
  document.getElementById('tontine-total').textContent = formatPrice(total) + ' FCFA';
  
  // Afficher la modale
  document.getElementById('tontine-modal').style.display = 'block';
}

function closeTontineModal() {
  document.getElementById('tontine-modal').style.display = 'none';
}

function startTontinePayment() {
  const product = {
    name: 'Chemise traditionnelle',
    price: 8500
  };
  const total = product.price * 1.02; // 2% de frais
  
  const confirmation = confirm(`Confirmez-vous le démarrage du paiement en plusieurs tranches pour "${product.name}" ?\nTotal à payer: ${formatPrice(total)} FCFA`);
  
  if (confirmation) {
    // Fermer la modale
    closeTontineModal();
    
    alert('Paiement en plusieurs tranches démarré avec succès !');
    hideProductDetail();
  }
}

function openRegisterModal() {
  document.getElementById('register-modal').style.display = 'block';
}

function closeRegisterModal() {
  document.getElementById('register-modal').style.display = 'none';
}

function registerSeller() {
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const whatsapp = document.getElementById('register-whatsapp').value;
  const location = document.getElementById('register-location').value;
  const category = document.getElementById('register-category').value;
  
  // Validation simple
  if (!name || !email || !password || !whatsapp || !location || !category) {
    document.getElementById('register-error').textContent = 'Veuillez remplir tous les champs';
    return;
  }
  
  // Simuler l'inscription
  alert('Inscription réussie ! Vous recevrez une confirmation par WhatsApp.');
  closeRegisterModal();
  goBackToHome();
}

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
