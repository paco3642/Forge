let currentLang = 'fr';

function setLang(lang) {
  currentLang = lang;

  // Met à jour l'attribut lang du document
  document.documentElement.lang = lang;

  // Boutons de langue actifs
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  if (lang === 'fr') {
    document.querySelector('.lang-btn:first-child').classList.add('active');
  } else {
    document.querySelector('.lang-btn:last-child').classList.add('active');
  }

  // Traduction des textes simples
  document.querySelectorAll('[data-fr]').forEach(el => {
    const val = el.getAttribute(`data-${lang}`);
    if (val) el.textContent = val;
  });

  // Traduction des éléments contenant du HTML (ex: <span>, <br>)
  document.querySelectorAll('[data-fr-html]').forEach(el => {
    const val = el.getAttribute(`data-${lang}-html`);
    if (val) el.innerHTML = val;
  });

  // Placeholders du formulaire
  const textarea = document.querySelector('textarea');
  const inputText = document.querySelector('input[type=text]');
  const inputEmail = document.querySelector('input[type=email]');

  if (textarea) {
    textarea.placeholder = lang === 'fr' ? 'Décrivez votre besoin...' : 'Describe your need...';
  }
  if (inputText) {
    inputText.placeholder = lang === 'fr'
      ? 'Ex: Jean Dupont — Acme Engineering'
      : 'E.g: John Smith — Acme Engineering';
  }
  if (inputEmail) {
    inputEmail.placeholder = lang === 'fr' ? 'votre@entreprise.com' : 'your@company.com';
  }

  // Hero corner
  const heroCorner = document.querySelector('.hero-corner');
  if (heroCorner) {
    heroCorner.innerHTML = lang === 'fr'
      ? '<div>CONCEPTION MÉCANIQUE 3D</div><div>FREELANCE — EUROPE</div><div style="color:var(--accent)">DISPONIBLE</div>'
      : '<div>3D MECHANICAL DESIGN</div><div>FREELANCE — EUROPE</div><div style="color:var(--accent)">AVAILABLE</div>';
  }

  // Footer
  const footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) {
    footerCopy.textContent = lang === 'fr'
      ? '© 2026 – Forge 3D – Tous droits réservés'
      : '© 2026 – Forge 3D – All rights reserved';
  }

  // Options du select
  document.querySelectorAll('select option').forEach(opt => {
    const val = opt.getAttribute(`data-${lang}`);
    if (val) opt.textContent = val;
  });
}
// ===== FORMULAIRE DE CONTACT =====
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const lang = document.documentElement.lang || 'fr';
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Désactive le bouton pendant l'envoi
    submitBtn.disabled = true;
    submitBtn.textContent = lang === 'fr' ? 'ENVOI EN COURS…' : 'SENDING…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        status.className = 'form-status success';
        status.textContent = lang === 'fr'
          ? '✓ Message envoyé. Réponse sous 24-48h.'
          : '✓ Message sent. Reply within 24-48h.';
        form.reset();
      } else {
        throw new Error('Erreur serveur');
      }
    } catch (error) {
      status.className = 'form-status error';
      status.textContent = lang === 'fr'
        ? '✗ Erreur d\'envoi. Contactez-moi directement par e-mail.'
        : '✗ Sending error. Please contact me directly by email.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}
