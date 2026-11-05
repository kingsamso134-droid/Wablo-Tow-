const iconSearch = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>';
const modelArtworkPaths = ["assets/model-academic.svg", "assets/model-professional.svg", "assets/model-initiation.svg", "assets/model-final.svg"];

const pageNames = {
  home: "Accueil",
  about: "À propos",
  faq: "FAQ",
  contact: "Contact",
  legal: "Mentions légales",
  privacy: "Politique de confidentialité",
  login: "Se connecter",
  signup: "S'inscrire",
  ...Object.fromEntries(Object.entries(window.workspaceScreens.routeTitles).map(([route, title]) => [route, title]))
};

function brand(extraClass = "") {
  const logo = extraClass.includes("footer-brand") ? "assets/logo-light.png" : "assets/logo-dark-transparent.png";
  return `<a class="brand ${extraClass}" href="#home" aria-label="Wàblɔ Towé, accueil"><img class="brand-image" src="${logo}" alt="Wàblɔ Towé"></a>`;
}

function header(page) {
  const nav = ["home", "about", "faq", "contact"];
  return `<header class="site-header"><div class="nav-inner">
    ${brand()}<span class="brand-divider" aria-hidden="true"></span>
    <button class="menu-toggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false">☰</button>
    <nav class="nav-links" aria-label="Navigation principale">${nav.map(key => `<a href="#${key}" class="${page === key ? "active" : ""}">${pageNames[key]}</a>`).join("")}</nav>
    <div class="nav-actions"><a class="search-link" href="#faq" aria-label="Rechercher">${iconSearch}</a><a class="button button-outline button-small" href="#login">Se connecter</a><a class="button button-small" href="#signup">S'inscrire</a></div>
  </div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="container footer-inner">
    ${brand("footer-brand")}<span class="footer-divider" aria-hidden="true"></span>
    <nav class="footer-links" aria-label="Navigation de pied de page">
      <a href="#home">Accueil</a><a href="#about">À propos</a><a href="#faq">FAQ</a><a href="#contact">Contact</a>
      <a href="#legal">Mentions légales</a><a href="#privacy">Politique de confidentialité</a>
    </nav>
    <div class="socials" aria-label="Réseaux sociaux"><a href="#contact" aria-label="Facebook">f</a><a href="#contact" aria-label="YouTube">▶</a><a href="#contact" aria-label="WhatsApp">◉</a><a href="#contact" aria-label="Telegram">➤</a><a href="#contact" aria-label="LinkedIn">in</a></div>
    <span class="copyright">© 2026 Wàblɔ towé. Tous droits réservés.</span>
  </div></footer>`;
}

function cta(title = "Prêt à réussir ?", text = "Créez votre compte et lancez votre rapport de stage dès maintenant.") {
  return `<section class="cta"><div><h2>${title}</h2><p>${text}</p></div><a class="button button-white" href="#signup">Créer mon rapport <span aria-hidden="true">→</span></a></section>`;
}

const models = [
  "Rapport de stage académique",
  "Rapport de stage professionnel",
  "Rapport de stage d’initiation",
  "Rapport de stage de fin de formation"
];

function homePage() {
  const steps = [
    ["♙", "Créez votre compte", "Inscrivez-vous en quelques secondes et accédez à votre espace."],
    ["▤", "Complétez votre rapport", "Renseignez vos informations et rédigez chaque section pas à pas."],
    ["▣", "Choisissez un modèle", "Personnalisez la présentation et vérifiez l’aperçu avant de payer."],
    ["⇩", "Payez et téléchargez", "Récupérez votre rapport au format PDF ou dans un document compatible avec Word une fois le paiement confirmé."]
  ];
  return `<section class="hero"><div class="container hero-inner"><div>
    <span class="eyebrow">Plateforme de rapports de stage</span>
    <h1>Créez facilement votre <span>rapport de stage</span>, de vos informations à votre document final.</h1>
    <p class="hero-copy">Une plateforme simple et fiable pour structurer, personnaliser, prévisualiser et générer votre rapport de stage au format PDF ou dans un document compatible avec Word.</p>
    <div class="hero-buttons"><a class="button" href="#signup">Créer mon rapport <span>→</span></a><a class="button button-outline" href="#about">Découvrir le service</a></div>
  </div><div class="hero-visual"><img src="assets/student.jpg" alt="Étudiante prête à rédiger son rapport de stage"><div class="proof-card">
    <div class="proof-item"><span class="check">✓</span><span><strong>Rapide et efficace</strong><small>Un parcours guidé</small></span></div>
    <div class="proof-item"><span class="check">✓</span><span><strong>Sécurisé et fiable</strong><small>Sauvegarde automatique</small></span></div>
    <div class="proof-item"><span class="check">✓</span><span><strong>Assistance à l’écoute</strong><small>E-mail et messagerie</small></span></div>
  </div></div></div></section>
  <main class="container">
    <section class="section"><h2 class="section-title">Comment ça marche ?</h2><div class="grid steps-grid">${steps.map((s, i) => `<article class="step-card"><span class="step-icon">${s[0]}</span><span class="step-number">${i + 1}</span><h3>${s[1]}</h3><p>${s[2]}</p></article>`).join("")}</div></section>
    <section class="split-grid"><div class="dark-panel"><h2>Pourquoi choisir Wàblɔ towé ?</h2><p>Votre rapport reste fondé sur vos informations : la plateforme le structure et le met en forme, sans rien inventer à votre place.</p><ul class="benefits"><li>Gain de temps considérable</li><li>Documents de haute qualité</li><li>Interface intuitive et conviviale</li><li>Accompagnement dédié</li></ul></div>
      <div class="templates-panel"><h2>Nos modèles de rapports de stage</h2><div class="template-grid">${models.slice(0, 4).map((m, i) => `<a class="template-card" href="#signup"><img class="template-thumbnail" src="${modelArtworkPaths[i]}" alt=""><span>${m}</span></a>`).join("")}<a class="template-card" href="#about"><span>➜</span><span>Voir tous les modèles</span></a></div></div>
    </section>
    <div class="payment-strip"><div><h3>Un paiement simple et transparent</h3><p>Vous payez à l’acte, après avoir vérifié l’aperçu de votre rapport. Les conditions vous sont présentées avant de payer.</p></div><div class="payment-methods"><span>Mobile Money</span><span>MTN</span><span>Moov</span><span>Celtiis</span><span>Visa</span><span>Mastercard</span></div></div>
    ${cta()}
  </main>`;
}

function aboutPage() {
  const perks = [["ϟ", "Rapide et facile", "Un parcours guidé pas à pas"], ["♢", "Sécurisé et fiable", "Vos données sont protégées"], ["▣", "Accessible partout", "Ordinateur, tablette et mobile"], ["◉", "Assistance à l’écoute", "E-mail et messagerie"]];
  const features = [
    ["✎", "Rédaction guidée", "Des étapes courtes et ordonnées pour saisir vos informations, puis rédiger chaque section de votre rapport avec un suivi de progression."],
    ["▣", "Sauvegarde et reprise", "Votre travail est enregistré après chaque modification, toutes les 30 secondes et à chaque étape validée. Reprenez-le à tout moment."],
    ["▤", "Modèles et personnalisation", "Choisissez parmi quatre modèles, ajustez les exigences de votre établissement et personnalisez la présentation."],
    ["◎", "Aperçu avant paiement", "Consultez l’aperçu complet de votre rapport, affiché avec le filigrane « NON PAYÉ ». La version finale n’en comporte pas."],
    ["▣", "Paiement adapté à votre pays", "Mobile Money (MTN, Moov, Celtiis), cartes Visa et Mastercard, selon les moyens disponibles dans votre pays."],
    ["⇩", "Export PDF et Word", "Téléchargements illimités du rapport payé et accès à ses versions précédentes depuis votre historique."]
  ];
  const stages = [["Créer son compte", "Inscription et vérification de votre adresse e-mail."], ["Renseigner et rédiger", "Informations personnelles, académiques, de stage, puis sections du rapport."], ["Choisir un modèle", "Sélection du modèle et options de présentation."], ["Prévisualiser et payer", "Aperçu, récapitulatif de commande, paiement."], ["Télécharger", "Votre rapport en PDF ou au format Word, conservé dans l’historique."]];
  return `<section class="hero about-hero"><div class="container hero-inner"><div><span class="eyebrow">À propos de Wàblɔ towé</span><h1>Une plateforme pensée pour accompagner votre rapport de stage</h1><p class="hero-copy">Wàblɔ towé accompagne les étudiants dans la préparation et la production de rapports de stage professionnels. Vous renseignez vos informations, suivez un parcours guidé, choisissez un modèle, consultez un aperçu, puis payez et téléchargez votre document.</p><div class="hero-buttons"><a class="button" href="#signup">Créer mon rapport <span>→</span></a><a class="button button-outline" href="#home">Retour à l’accueil</a></div></div><div class="hero-visual"><img src="assets/students.jpg" alt="Deux étudiants préparant un rapport ensemble"></div></div></section>
  <main class="container section"><div class="grid mini-features">${perks.map(p => `<div class="mini-feature"><span class="side-icon">${p[0]}</span><span><strong>${p[1]}</strong><small>${p[2]}</small></span></div>`).join("")}</div>
    <div class="notice"><strong>ⓘ &nbsp;Votre rapport reste le vôtre</strong><br>La plateforme structure, met en forme et génère votre document à partir des informations que vous renseignez et validez. Elle n’invente ni vos activités, ni vos observations, ni vos résultats de stage.</div>
    <h2 class="section-title">Ce que vous trouvez sur la plateforme</h2><div class="grid feature-grid">${features.map(f => `<article class="feature-card"><span class="feature-icon">${f[0]}</span><h3>${f[1]}</h3><p>${f[2]}</p></article>`).join("")}</div>
    <section class="journey" style="margin-top:30px"><h2>Votre parcours, de l’inscription au téléchargement</h2><p>Cinq étapes, avec la possibilité de reprendre votre rapport là où vous vous êtes arrêté.</p><div class="journey-grid">${stages.map((s, i) => `<article class="journey-card"><b>${i + 1}</b><h3>${s[0]}</h3><p>${s[1]}</p></article>`).join("")}</div></section>
    <section class="section"><div class="split-grid"><div><h2>Les informations à préparer</h2><p class="hero-copy">Pour gagner du temps, rassemblez ces éléments avant de commencer. Les champs exacts dépendent du modèle choisi et vos données sont enregistrées au fil de la saisie.</p></div><div class="grid prepare-grid">${[["Votre identité", "Nom, prénom, date de naissance et contacts."], ["Votre parcours académique", "Établissement, filière, niveau et année académique."], ["Votre stage", "Entreprise, service, responsable, dates et durée."], ["Le travail effectué", "Missions, activités, difficultés rencontrées et résultats."], ["Votre encadrement", "Maître de stage et encadrant académique."]].map(x => `<div class="prepare-item"><span class="check">✓</span><span><strong>${x[0]}</strong><small>${x[1]}</small></span></div>`).join("")}</div></div></section>
    <h2 class="section-title">Quatre modèles de rapports de stage</h2><p class="section-intro">Choisissez le modèle adapté à votre situation. La plateforme est disponible en français ; d’autres langues viendront progressivement.</p><div class="template-grid">${models.map((m, i) => `<a class="template-card" href="#signup"><img class="template-thumbnail" src="${modelArtworkPaths[i]}" alt=""><span>${m}</span></a>`).join("")}</div>
    ${cta("Prêt à commencer ?", "Créez votre compte et lancez votre rapport de stage dès maintenant.")}
  </main>`;
}

const faqCategories = ["Compte et connexion", "Rédaction et sauvegarde", "Modèles et aperçu", "Paiement", "Téléchargement", "Données et assistance"];
const faqItems = [
  ["Compte et connexion", "Comment créer mon compte étudiant ?", "Cliquez sur « S’inscrire », renseignez votre nom, votre prénom, votre adresse e-mail, votre téléphone et un mot de passe, puis acceptez les conditions d’utilisation et la politique de confidentialité."],
  ["Compte et connexion", "Dois-je vérifier mon adresse e-mail ?", "Oui. Un message de vérification vous est envoyé afin de sécuriser votre compte. Consultez aussi vos courriers indésirables si vous ne le trouvez pas."],
  ["Rédaction et sauvegarde", "Mon travail est-il enregistré automatiquement ?", "Oui. Votre travail est enregistré après chaque modification et à chaque étape validée. Vous pouvez reprendre votre rapport là où vous vous êtes arrêté."],
  ["Rédaction et sauvegarde", "Puis-je reprendre mon rapport plus tard ?", "Oui. Connectez-vous à votre compte pour retrouver votre rapport en cours, vos documents générés et votre historique."],
  ["Rédaction et sauvegarde", "La plateforme rédige-t-elle mon rapport à ma place ?", "Non. Vous fournissez les informations et rédigez le contenu. La plateforme vous guide, structure et met en forme votre rapport sans inventer vos expériences."],
  ["Modèles et aperçu", "Quels modèles de rapports sont proposés ?", "Quatre modèles sont disponibles : académique, professionnel, stage d’initiation et stage de fin de formation."],
  ["Modèles et aperçu", "Puis-je adapter le rapport aux exigences de mon établissement ?", "Oui. Vous pouvez personnaliser le modèle et les options de présentation pour tenir compte des exigences de votre établissement."],
  ["Modèles et aperçu", "Que contient l’aperçu avant paiement ?", "Vous pouvez consulter le rapport complet avant de payer. L’aperçu comporte un filigrane « NON PAYÉ » qui n’apparaît pas sur le document final."],
  ["Paiement", "Combien coûte un rapport ?", "Le tarif applicable vous est indiqué avant le paiement, après la préparation et la prévisualisation du rapport. Vous payez à l’acte."],
  ["Paiement", "Quels moyens de paiement sont acceptés ?", "Les moyens disponibles comprennent Mobile Money (MTN, Moov, Celtiis), Visa et Mastercard, selon leur disponibilité dans votre pays."],
  ["Paiement", "Que se passe-t-il si mon paiement échoue ?", "Vérifiez le statut de la transaction dans votre historique de paiements. En cas de débit ou de doute, contactez l’assistance en indiquant la référence de la transaction."],
  ["Paiement", "Et si la génération échoue après le paiement ?", "Contactez l’assistance depuis la page Contact en indiquant la référence de votre paiement. Nous vous aiderons à retrouver votre document."],
  ["Téléchargement", "Combien de fois puis-je télécharger mon rapport ?", "Après paiement, vous pouvez télécharger votre document autant de fois que nécessaire depuis votre historique."],
  ["Téléchargement", "Puis-je modifier mon rapport après sa génération ?", "Vous pouvez reprendre votre rapport, le modifier et générer une nouvelle version depuis votre espace."],
  ["Données et assistance", "Combien de temps mes données sont-elles conservées ?", "Vos données sont conservées pour vous permettre de reprendre votre rapport et de retrouver vos documents. Consultez la politique de confidentialité pour les modalités détaillées."],
  ["Données et assistance", "Comment contacter l’assistance ?", "Écrivez-nous depuis le formulaire de contact ou connectez-vous à votre espace pour échanger avec l’assistance par messagerie."],
  ["Données et assistance", "Dans quelles langues la plateforme est-elle disponible ?", "La plateforme est actuellement disponible en français. D’autres langues viendront progressivement."]
];

function faqPage() {
  return `<section class="subhero"><div class="container"><span class="eyebrow">Aide</span><h1>Questions fréquentes</h1><p>Trouvez rapidement une réponse sur votre compte, la rédaction de votre rapport, le paiement et le téléchargement.</p><div class="faq-search" style="max-width:570px;margin:20px auto 0">${iconSearch}<input id="faq-search" type="search" placeholder="Rechercher une question, un mot-clé..." aria-label="Rechercher une question"></div></div></section>
  <main class="container faq-layout"><aside class="category-list"><h2>Catégories</h2><div><button class="category-button active" data-category="all">Toutes les questions <span>${faqItems.length}</span></button>${faqCategories.map(c => `<button class="category-button" data-category="${c}">${c} <span>${faqItems.filter(f => f[0] === c).length}</span></button>`).join("")}</div></aside><section id="faq-list" aria-label="Questions et réponses">${faqItems.map((f, i) => `<article class="faq-item ${i === 0 ? "open" : ""}" data-category="${f[0]}" data-search="${(f[1] + " " + f[2]).toLocaleLowerCase("fr")}"><button class="faq-question" aria-expanded="${i === 0}"><span>${f[1]}</span><span aria-hidden="true">⌄</span></button><div class="faq-answer">${f[2]}</div></article>`).join("")}<p id="faq-empty" class="notice" hidden>Aucune question ne correspond à votre recherche.</p></section></main>
  <section class="container faq-bottom"><div class="cta"><div><h2>Vous n’avez pas trouvé votre réponse ?</h2><p>Écrivez-nous via le formulaire de contact, par e-mail ou depuis la messagerie intégrée à la plateforme.</p></div><a class="button button-white" href="#contact">Nous contacter <span>→</span></a></div><div class="secondary-cta"><div><h3>Prêt à commencer votre rapport ?</h3><p>Créez votre compte et avancez étape par étape, à votre rythme.</p></div><a class="button" href="#signup">Créer mon rapport <span>→</span></a></div></section>`;
}

function contactPage() {
  return `<section class="subhero"><div class="container"><span class="eyebrow">Assistance</span><h1>Contactez-nous</h1><p>Une question sur votre compte, votre rapport ou un paiement ? Écrivez-nous, nous vous répondrons dès que possible.</p></div></section>
  <main class="container"><div class="contact-layout"><section class="form-card"><h2>Envoyer un message</h2><p>Les champs marqués d’un astérisque (*) sont obligatoires.</p><form data-form="contact"><div class="form-message" role="status"></div><div class="form-grid"><div class="field"><label for="contact-name">Nom complet *</label><input id="contact-name" name="name" required placeholder="Ex. : Aïcha Dossou"></div><div class="field"><label for="contact-email">Adresse e-mail *</label><input id="contact-email" name="email" type="email" required placeholder="Ex. : aicha@exemple.com"></div></div><div class="field"><label for="contact-subject">Sujet *</label><select id="contact-subject" name="subject" required><option value="">Choisissez un sujet</option><option>Mon compte</option><option>Mon rapport</option><option>Paiement</option><option>Téléchargement</option><option>Autre question</option></select></div><div class="field"><label for="contact-message">Votre message *</label><textarea id="contact-message" name="message" maxlength="2000" required placeholder="Décrivez votre question ou votre problème le plus précisément possible."></textarea></div><div class="char-count"><span id="message-count">0</span> caractères</div><label class="consent"><input type="checkbox" required><span>J’accepte que mes informations soient utilisées pour traiter ma demande, conformément à la <a href="#privacy">politique de confidentialité</a>. *</span></label><button class="button" type="submit">Envoyer mon message <span>➤</span></button></form></section>
    <aside class="contact-side"><h2>Autres moyens de nous joindre</h2><article class="info-card"><span class="side-icon">✉</span><div><h3>Assistance par e-mail</h3><p>Écrivez-nous directement à l’adresse de l’assistance.</p><a href="mailto:assistance@wablɔtowe.example">[adresse e-mail de l’assistance]</a></div></article><article class="info-card"><span class="side-icon">▤</span><div><h3>Messagerie intégrée</h3><p>Connecté à votre espace, échangez avec l’assistance depuis la plateforme.</p><a href="#login">Se connecter</a></div></article><article class="info-card"><span class="side-icon">?</span><div><h3>Consulter la FAQ</h3><p>La réponse à votre question s’y trouve peut-être déjà.</p><a href="#faq">Voir les questions fréquentes</a></div></article><div class="notice">ⓘ &nbsp;Pour un problème de paiement, indiquez la référence de votre transaction : elle se trouve dans votre historique des paiements.</div></aside></div>${cta()}</main>`;
}

const legalSections = [
  ["éditeur", "1. Éditeur de la plateforme", `<p>Wàblɔ towé est une plateforme web d’accompagnement des étudiants dans la préparation et la production de rapports de stage.</p><div class="legal-table"><div class="legal-row"><strong>Nom de la plateforme</strong><span>Wàblɔ towé</span></div><div class="legal-row"><strong>Raison sociale et forme juridique</strong><span>[à renseigner]</span></div><div class="legal-row"><strong>Siège social</strong><span>[adresse à renseigner]</span></div><div class="legal-row"><strong>Immatriculation</strong><span>[numéro à renseigner]</span></div><div class="legal-row"><strong>Directeur de la publication</strong><span>[nom à renseigner]</span></div><div class="legal-row"><strong>Contact</strong><span>[adresse e-mail de l’assistance]</span></div></div>`],
  ["hébergement", "2. Hébergement", `<p>La plateforme est hébergée par le prestataire suivant.</p><div class="legal-table"><div class="legal-row"><strong>Hébergeur</strong><span>[nom de l’hébergeur à renseigner]</span></div><div class="legal-row"><strong>Adresse</strong><span>[adresse de l’hébergeur à renseigner]</span></div></div>`],
  ["propriété", "3. Propriété intellectuelle", `<p>La marque Wàblɔ towé, son logo, ses textes, ses modèles de documents et les éléments graphiques de la plateforme sont protégés. Toute reproduction ou réutilisation sans autorisation préalable est interdite.</p><p>Les informations que vous saisissez vous appartiennent : la plateforme les utilise uniquement pour structurer et générer votre document.</p>`],
  ["responsabilité", "4. Responsabilité", `<p>La plateforme facilite la structuration, la présentation et la production de votre rapport. Elle ne rédige pas à votre place et n’invente aucune information.</p><ul class="legal-list"><li>Vous restez responsable de l’exactitude des informations que vous fournissez et validez.</li><li>Vous restez responsable du respect des exigences de votre établissement et de votre encadrant.</li><li>Les exigences proposées par la plateforme sont prédéfinies et modifiables : vérifiez-les avant de générer votre rapport.</li></ul>`],
  ["paiements", "5. Paiements", `<p>Les paiements sont effectués à l’acte et traités par des prestataires de paiement tiers (Mobile Money, cartes bancaires et portefeuilles électroniques compatibles), selon leur disponibilité dans votre pays.</p><div class="legal-table"><div class="legal-row"><strong>Prestataires de paiement</strong><span>[à confirmer]</span></div></div>`],
  ["droit", "6. Droit applicable et litiges", `<p>[Droit applicable et juridiction compétente à renseigner.] Pour toute réclamation, vous pouvez d’abord nous écrire depuis la page Contact.</p>`]
];

function legalPage(isPrivacy = false) {
  if (isPrivacy) {
    return `<section class="subhero"><div class="container"><span class="eyebrow">Informations légales</span><h1>Politique de confidentialité</h1><p>La confidentialité et la protection de vos informations sur Wàblɔ towé.</p><div class="legal-tabs"><a href="#legal">Mentions légales</a><a class="active" href="#privacy">Politique de confidentialité</a></div></div></section><main class="container"><div class="legal-layout"><aside class="legal-index"><h2>Sommaire</h2><nav>${["Informations collectées", "Utilisation des données", "Conservation et sécurité", "Vos droits", "Nous contacter"].map((x, i) => `<a href="#privacy-${i + 1}">${i + 1}. ${x}</a>`).join("")}</nav></aside><article class="legal-content">
      <section class="legal-section" id="privacy-1"><h2>1. Informations collectées</h2><p>Les informations que vous fournissez lors de la création de votre compte et de la préparation de votre rapport (identité, coordonnées, parcours académique et informations de stage) sont nécessaires au fonctionnement du service.</p></section>
      <section class="legal-section" id="privacy-2"><h2>2. Utilisation des données</h2><p>Vos informations sont utilisées pour gérer votre compte, enregistrer votre rapport, générer les documents demandés, traiter les paiements et répondre à vos demandes d’assistance. Elles ne servent pas à inventer le contenu de votre rapport.</p></section>
      <section class="legal-section" id="privacy-3"><h2>3. Conservation et sécurité</h2><p>Vos données sont conservées afin que vous puissiez reprendre votre travail et retrouver vos documents depuis votre espace. Des mesures de protection sont appliquées pour préserver leur confidentialité.</p></section>
      <section class="legal-section" id="privacy-4"><h2>4. Vos droits</h2><p>Vous pouvez demander l’accès, la rectification ou la suppression de vos informations en contactant l’assistance. Certaines données peuvent être conservées lorsque cela est nécessaire au fonctionnement du service ou au suivi d’un paiement.</p></section>
      <section class="legal-section" id="privacy-5"><h2>5. Nous contacter</h2><p>Pour toute question concernant vos données personnelles, écrivez-nous depuis le <a class="text-link" href="#contact">formulaire de contact</a>.</p></section><div class="legal-bottom"><span>Dernière mise à jour : [date à renseigner]</span><a class="button button-outline button-small" href="#contact">Une question ? Contactez-nous</a></div></article></div>${cta()}</main>`;
  }
  return `<section class="subhero"><div class="container"><span class="eyebrow">Informations légales</span><h1>Mentions légales</h1><p>Les informations légales relatives à l’éditeur, à l’hébergement et à l’utilisation de la plateforme Wàblɔ towé.</p><div class="legal-tabs"><a class="active" href="#legal">Mentions légales</a><a href="#privacy">Politique de confidentialité</a></div></div></section>
  <main class="container"><div class="legal-layout"><aside class="legal-index"><h2>Sommaire</h2><nav>${legalSections.map(s => `<a href="#legal-${s[0]}">${s[1]}</a>`).join("")}</nav></aside><article class="legal-content">${legalSections.map(s => `<section class="legal-section" id="legal-${s[0]}"><h2>${s[1]}</h2>${s[2]}</section>`).join("")}<div class="legal-bottom"><span>Dernière mise à jour : [date à renseigner]</span><a class="button button-outline button-small" href="#contact">Une question ? Contactez-nous</a></div></article></div>${cta()}</main>`;
}

function authPage(signup = false) {
  const name = signup ? "Créer un compte étudiant" : "Connexion étudiant";
  const headline = signup ? "Rejoignez Wàblɔ towé !" : "Content de vous revoir !";
  const promoIntro = signup ? "Créez votre compte et commencez à préparer votre rapport de stage, étape par étape." : "Connectez-vous pour retrouver votre espace et poursuivre votre rapport de stage.";
  const items = signup ? [["ϟ", "Rapide et facile"], ["♢", "Sécurisé et fiable"], ["▣", "Accessible partout"]] : [["▶", "Reprenez votre rapport là où vous l’avez laissé"], ["◷", "Retrouvez vos rapports et vos paiements dans votre historique"], ["⇩", "Téléchargez vos documents en PDF ou dans un format compatible avec Word"]];
  return `<main class="auth-area"><div class="container"><div class="auth-layout"><section class="auth-promo ${signup ? "signup-promo" : ""}"><h1>${headline}</h1><p>${promoIntro}</p><div class="auth-benefits">${items.map(i => `<div class="auth-benefit"><span>${i[0]}</span><span>${i[1]}</span></div>`).join("")}</div><img src="assets/${signup ? "students.jpg" : "student.jpg"}" alt="${signup ? "Étudiants qui préparent un rapport" : "Étudiante avec son rapport de stage"}"></section>
    <section class="auth-card"><div class="auth-heading">${brand()}<h2>${name}</h2><p>${signup ? "Rejoignez notre communauté et profitez de nos services." : "Accédez à votre espace pour reprendre votre rapport."}</p><div class="gold-rule"></div></div>
      <form data-form="${signup ? "signup" : "login"}"><div class="form-message" role="status"></div>
      ${signup ? `<div class="form-grid"><div class="field"><label for="last-name">Nom *</label><input id="last-name" name="lastName" autocomplete="family-name" required placeholder="Ex. : Dossou"></div><div class="field"><label for="first-name">Prénom *</label><input id="first-name" name="firstName" autocomplete="given-name" required placeholder="Ex. : Aïcha"></div></div><div class="field"><label for="signup-email">Adresse e-mail *</label><input id="signup-email" name="email" type="email" autocomplete="email" required placeholder="Ex. : aicha@exemple.com"></div><div class="field"><label for="phone">Téléphone *</label><input id="phone" name="phone" type="tel" autocomplete="tel" required placeholder="Ex. : +229 01 23 45 67"></div>` : `<div class="field"><label for="login-email">Adresse e-mail *</label><input id="login-email" name="email" type="email" autocomplete="email" required placeholder="Ex. : aicha@exemple.com"></div>`}
      <div class="field"><div class="field-label-row"><label for="${signup ? "signup-password" : "login-password"}">Mot de passe *</label>${signup ? "" : '<a class="text-link" href="#password-forgot">Mot de passe oublié ?</a>'}</div><div class="password-wrap"><input id="${signup ? "signup-password" : "login-password"}" name="password" type="password" autocomplete="${signup ? "new-password" : "current-password"}" required ${signup ? 'minlength="8" pattern="(?=.*[A-Za-z])(?=.*[0-9]).{8,}"' : ""} placeholder="${signup ? "Créez un mot de passe" : "Votre mot de passe"}"><button class="password-toggle" type="button" aria-label="Afficher le mot de passe">◎</button></div></div>
      ${signup ? `<div class="password-meta"><span>8 caractères minimum</span><span>Une lettre</span><span>Un chiffre</span></div><div class="field"><label for="confirm-password">Confirmer le mot de passe *</label><input id="confirm-password" name="confirmPassword" type="password" autocomplete="new-password" required placeholder="Saisissez-le à nouveau"></div><label class="consent"><input type="checkbox" required><span>J’accepte les <a href="#legal">conditions d’utilisation</a> et la <a href="#privacy">politique de confidentialité</a>. *</span></label>` : ""}
      <button class="button auth-submit" type="submit">${signup ? "♙ &nbsp; Créer mon compte" : "⇥ &nbsp; Se connecter"}</button></form>
      <div class="or-divider">Ou</div><p class="auth-switch">${signup ? 'Vous avez déjà un compte ? <a href="#login">Se connecter</a>' : 'Pas encore de compte ? <a href="#signup">Créer un compte étudiant</a>'}</p>
    </section></div>${signup ? '<div class="auth-perks"><span>Une solution pensée pour les étudiants</span><span>Des rapports de qualité pour réussir vos études</span><span>Une assistance à votre écoute</span></div>' : ""}</div></main>`;
}

function render() {
  const page = location.hash.slice(1).split("?")[0] || "home";
  const valid = Object.hasOwn(pageNames, page) ? page : "not-found";
  let content = "";
  if (window.workspaceScreens.isWorkspace(valid)) content = window.workspaceScreens.render(valid);
  else if (valid === "home") content = homePage();
  else if (valid === "about") content = aboutPage();
  else if (valid === "faq") content = faqPage();
  else if (valid === "contact") content = contactPage();
  else if (valid === "legal") content = legalPage();
  else if (valid === "privacy") content = legalPage(true);
  else if (valid === "login") content = authPage(false);
  else if (valid === "signup") content = authPage(true);
  document.title = `${window.workspaceScreens.titleFor(valid) || pageNames[valid] || "Wàblɔ Towé"} — Wàblɔ Towé`;
  const isWorkspace = window.workspaceScreens.isWorkspace(valid);
  document.getElementById("app").innerHTML = isWorkspace ? content : `${header(valid)}${content}${footer()}`;
  document.body.classList.toggle("workspace-body", isWorkspace);
  bindPageInteractions();
  if (isWorkspace) window.workspaceScreens.bind(valid);
  if (location.hash.includes("?")) {
    const term = decodeURIComponent(location.hash.split("?")[1].replace(/^q=/, ""));
    const search = document.getElementById("faq-search");
    if (search) { search.value = term; filterFaq(term); }
  }
}

function filterFaq(term) {
  const activeCategory = document.querySelector(".category-button.active")?.dataset.category || "all";
  const normalized = term.toLocaleLowerCase("fr").trim();
  let visibleCount = 0;
  document.querySelectorAll(".faq-item").forEach(item => {
    const visible = (activeCategory === "all" || item.dataset.category === activeCategory) && (!normalized || item.dataset.search.includes(normalized));
    item.hidden = !visible;
    if (visible) visibleCount++;
  });
  const empty = document.getElementById("faq-empty");
  if (empty) empty.hidden = visibleCount > 0;
}

function bindPageInteractions() {
  const toggle = document.querySelector(".menu-toggle");
  toggle?.addEventListener("click", () => {
    const nav = document.querySelector(".nav-links");
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll(".nav-links a, .footer-links a").forEach(link => link.addEventListener("click", () => document.querySelector(".nav-links")?.classList.remove("open")));
  document.querySelectorAll(".faq-question").forEach(button => button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(item.classList.contains("open")));
  }));
  const faqSearch = document.getElementById("faq-search");
  faqSearch?.addEventListener("input", () => filterFaq(faqSearch.value));
  document.querySelectorAll(".category-button").forEach(button => button.addEventListener("click", () => {
    document.querySelector(".category-button.active")?.classList.remove("active");
    button.classList.add("active");
    filterFaq(faqSearch?.value || "");
  }));
  const message = document.getElementById("contact-message");
  message?.addEventListener("input", () => { document.getElementById("message-count").textContent = String(message.value.length); });
  document.querySelectorAll(".password-toggle").forEach(button => button.addEventListener("click", () => {
    const input = button.parentElement.querySelector("input");
    input.type = input.type === "password" ? "text" : "password";
    button.setAttribute("aria-label", input.type === "password" ? "Afficher le mot de passe" : "Masquer le mot de passe");
  }));
  document.querySelectorAll("form[data-form]").forEach(form => form.addEventListener("submit", event => {
    event.preventDefault();
    const type = form.dataset.form;
    const messageBox = form.querySelector(".form-message");
    let response = "Votre message est prêt. L’envoi sera disponible lorsque le service sera connecté.";
    if (type === "contact") {
      try {
        const messages = JSON.parse(localStorage.getItem("wablo.contactMessages") || "[]");
        messages.push({
          name: form.elements.name.value,
          email: form.elements.email.value,
          subject: form.elements.subject.value,
          message: form.elements.message.value,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem("wablo.contactMessages", JSON.stringify(messages));
        response = "Votre demande a été enregistrée dans ce navigateur. Aucun e-mail n’a été envoyé.";
      } catch (error) {
        console.error("Impossible d'enregistrer la demande de contact localement.", error);
        response = "La demande n'a pas pu être enregistrée dans ce navigateur.";
      }
    }
    if (type === "login") response = "Votre formulaire est valide. La connexion sera disponible lorsque le service de compte sera connecté.";
    if (type === "signup") {
      const password = form.elements.password.value;
      const confirm = form.elements.confirmPassword.value;
      if (password !== confirm) {
        form.elements.confirmPassword.setCustomValidity("Les mots de passe ne correspondent pas.");
        form.elements.confirmPassword.reportValidity();
        return;
      }
      form.elements.confirmPassword.setCustomValidity("");
      try {
        const newProfile = {
          firstName: form.elements.firstName.value,
          lastName: form.elements.lastName.value,
          email: form.elements.email.value,
          phone: form.elements.phone.value
        };
        localStorage.setItem("wablo.profile", JSON.stringify(newProfile));
        const users = JSON.parse(localStorage.getItem("wablo.users") || "[]");
        if (!users.some(user => user.email === newProfile.email)) {
          users.push({ name: `${newProfile.firstName} ${newProfile.lastName}`, email: newProfile.email, role: "Étudiant", status: "Actif" });
          localStorage.setItem("wablo.users", JSON.stringify(users));
        }
      } catch (error) {
        console.error("Impossible d'enregistrer le profil de démonstration.", error);
        response = "Le profil n'a pas pu être enregistré dans ce navigateur.";
        messageBox.textContent = response;
        messageBox.classList.add("visible");
        return;
      }
      location.hash = "email-verify";
      return;
    }
    if (type === "login") {
      try {
        const savedProfile = {
          firstName: "Aïcha",
          lastName: "Dossou",
          phone: "+229 01 23 45 67",
          ...JSON.parse(localStorage.getItem("wablo.profile") || "{}")
        };
        localStorage.setItem("wablo.profile", JSON.stringify({
          ...savedProfile,
          email: form.elements.email.value
        }));
      } catch (error) {
        console.error("Impossible d'ouvrir la session de démonstration.", error);
        messageBox.textContent = "La session n'a pas pu être enregistrée dans ce navigateur.";
        messageBox.classList.add("visible");
        return;
      }
      location.hash = "student-dashboard";
      return;
    }
    messageBox.textContent = response;
    messageBox.classList.add("visible");
  }));
  const confirmPassword = document.querySelector("#confirm-password");
  confirmPassword?.addEventListener("input", () => confirmPassword.setCustomValidity(""));
}

window.addEventListener("hashchange", () => {
  render();
  window.scrollTo(0, 0);
});
render();
