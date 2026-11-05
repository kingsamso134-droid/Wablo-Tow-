(function () {
  const stages = [
    ["personal-info", "Informations personnelles"],
    ["academic-info", "Informations académiques"],
    ["internship-info", "Informations sur le stage"],
    ["writing", "Rédaction des sections"],
    ["completeness", "Vérification de complétude"],
    ["customization", "Personnalisation"],
    ["model-selection", "Choix du modèle"],
    ["report-preview", "Aperçu du rapport"],
    ["order-summary", "Paiement"],
    ["download", "Téléchargement PDF ou Word"]
  ];
  const studentLinks = [
    ["student-dashboard", "⌂", "Tableau de bord"],
    ["report-new", "＋", "Nouveau rapport"],
    ["my-reports", "▤", "Mes rapports"],
    ["payment-history", "▣", "Historique des paiements"],
    ["profile-settings", "♙", "Profil et paramètres"]
  ];
  const adminLinks = [
    ["admin-dashboard", "⌂", "Tableau de bord"],
    ["admin-users", "♧", "Utilisateurs"],
    ["admin-reports", "▤", "Rapports"],
    ["admin-models", "▱", "Modèles"],
    ["admin-payments", "▣", "Paiements"],
    ["admin-pricing", "◇", "Tarifs"],
    ["admin-stats", "▥", "Statistiques"],
    ["admin-roles", "♢", "Rôles et permissions"],
    ["admin-settings", "⚙", "Paramètres généraux"]
  ];
  const routeTitles = {
    "password-forgot": "Mot de passe oublié",
    "password-reset": "Réinitialisation du mot de passe",
    "email-verify": "Vérification de l'adresse e-mail",
    "student-dashboard": "Tableau de bord étudiant",
    "report-new": "Création d'un nouveau rapport",
    "personal-info": "Informations personnelles",
    "academic-info": "Informations académiques",
    "internship-info": "Informations sur le stage",
    writing: "Rédaction des sections",
    completeness: "Vérification de complétude",
    customization: "Personnalisation",
    "model-selection": "Choix du modèle",
    "report-preview": "Aperçu du rapport",
    "order-summary": "Récapitulatif de commande",
    "payment-pending": "Paiement en attente",
    "payment-success": "Paiement confirmé",
    "payment-failed": "Paiement échoué ou annulé",
    generation: "Génération du rapport",
    download: "Téléchargement",
    "my-reports": "Mes rapports",
    "report-detail": "Détails d'un rapport",
    "payment-history": "Historique des paiements",
    "profile-settings": "Profil et paramètres",
    "admin-dashboard": "Tableau de bord administrateur",
    "admin-users": "Gestion des utilisateurs",
    "admin-user-detail": "Détails d'un utilisateur",
    "admin-reports": "Gestion des rapports",
    "admin-report-detail": "Détails d'un rapport (administration)",
    "admin-models": "Gestion des modèles",
    "admin-model-edit": "Création et modification d'un modèle",
    "admin-payments": "Paiements et transactions",
    "admin-pricing": "Gestion des tarifs",
    "admin-stats": "Statistiques",
    "admin-roles": "Rôles et permissions",
    "admin-settings": "Paramètres généraux",
    loading: "Chargement",
    error: "Erreur",
    "not-found": "Page introuvable (404)",
    forbidden: "Accès non autorisé (403)",
    maintenance: "Maintenance",
    notifications: "Notifications et alertes"
  };
  const isWorkspace = key => Object.hasOwn(routeTitles, key);
  const read = (key, fallback) => {
    try {
      const value = localStorage.getItem(`wablo.${key}`);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      console.error(`Impossible de lire ${key} depuis le stockage local.`, error);
      return fallback;
    }
  };
  const write = (key, value) => {
    try {
      localStorage.setItem(`wablo.${key}`, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Impossible d'enregistrer ${key} dans le stockage local.`, error);
      return false;
    }
  };
  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const reports = () => read("reports", []);
  const saveReports = value => write("reports", value);
  const activeId = () => read("activeReport", null);
  const activeReport = () => reports().find(report => report.id === activeId()) || null;
  const updateReport = updates => {
    const all = reports();
    const index = all.findIndex(report => report.id === activeId());
    if (index < 0) return null;
    all[index] = { ...all[index], ...updates, updatedAt: new Date().toISOString() };
    saveReports(all);
    return all[index];
  };
  const setActive = report => write("activeReport", report.id);
  const profile = () => read("profile", { firstName: "Aïcha", lastName: "Dossou", email: "aicha@exemple.com", phone: "+229 01 23 45 67" });
  const modelOptions = ["Académique", "Professionnel", "D’initiation", "Fin de formation"];
  const modelDescriptions = [
    "Structure classique attendue par la plupart des établissements.",
    "Orienté vers l'expérience en entreprise.",
    "Pour un premier stage d'observation.",
    "Pour le stage de fin de cycle."
  ];
  const sectionNames = ["Remerciements", "Introduction", "Présentation de l'entreprise", "Description des activités", "Analyse et difficultés rencontrées", "Compétences acquises", "Conclusion"];
  const pageLink = (route, label, cls = "button") => `<a class="${cls}" href="#${route}">${label}</a>`;
  const field = (label, key, value = "", type = "text", required = false, hint = "") =>
    `<label class="workspace-field"><span>${label}${required ? " *" : ""}</span><input type="${type}" name="${key}" value="${escapeHtml(value)}" ${required ? "required" : ""} data-report-field="${key}">${hint ? `<small>${hint}</small>` : ""}</label>`;
  const selectField = (label, key, options, value = "", required = false) =>
    `<label class="workspace-field"><span>${label}${required ? " *" : ""}</span><select name="${key}" data-report-field="${key}" ${required ? "required" : ""}>${options.map(option => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select></label>`;
  const textArea = (label, key, value = "", placeholder = "") =>
    `<label class="workspace-field workspace-textarea"><span>${label}</span><textarea name="${key}" data-report-field="${key}" placeholder="${placeholder}">${escapeHtml(value)}</textarea></label>`;
  const reportTitle = report => report?.title || "Rapport de stage — Entreprise A";
  const statusLabel = report => report?.status === "complete" ? "Finalisé" : report?.status === "paid" ? "Payé" : "En cours";
  const percent = report => Math.min(100, Math.round(((report?.step || 0) / 10) * 100));
  const refreshPage = () => window.dispatchEvent(new Event("hashchange"));
  const unreadNotifications = () => read("notifications", defaultNotifications()).filter(item => !item.read).length;

  function workspaceShell(route, body, admin = false) {
    const links = admin ? adminLinks : studentLinks;
    const user = admin ? { firstName: "Komla", lastName: "Agbodjan", role: "Administrateur principal" } : profile();
    const initials = `${user.firstName?.[0] || "A"}${user.lastName?.[0] || "D"}`;
    const unreadCount = unreadNotifications();
    return `<div class="workspace ${admin ? "workspace-admin" : ""}">
      <header class="workspace-topbar">
        <a class="workspace-logo topbar-logo" href="#${admin ? "admin-dashboard" : "student-dashboard"}" aria-label="Wàblɔ Towé, tableau de bord"><img src="assets/logo-dark-transparent.png" alt="Wàblɔ Towé"></a>
        <div class="workspace-header-actions">
          <a href="#notifications" class="workspace-notifications" aria-label="Notifications${unreadCount ? ` : ${unreadCount} non lue${unreadCount > 1 ? "s" : ""}` : ""}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>${unreadCount ? `<b class="notification-dot">${unreadCount}</b>` : ""}</a>
          <a href="#profile-settings" class="workspace-user"><b>${initials}</b><span><strong>${user.firstName} ${user.lastName}</strong><small>${user.role || "Compte étudiant"}</small></span><span class="user-chevron" aria-hidden="true">⌄</span></a>
        </div>
      </header>
      <aside class="workspace-sidebar">
        ${admin ? '<div class="admin-label">ADMINISTRATION</div>' : `<a class="workspace-create" href="#report-new">＋ &nbsp; Créer un rapport</a>`}
        <nav class="workspace-nav">${links.map(([href, icon, label]) => `<a class="${route === href || (route.startsWith("admin-") && route === href) ? "active" : ""}" href="#${href}"><span>${icon}</span>${label}</a>`).join("")}</nav>
        ${admin ? "" : `<div class="workspace-help"><strong>Besoin d'aide ?</strong><br>Consultez la FAQ ou écrivez à l'assistance. <a href="#faq">Voir la FAQ</a></div>`}
        <a class="workspace-logout" href="#home">⇥ &nbsp; Se déconnecter</a>
      </aside>
      <section class="workspace-main">
        <main class="workspace-content">${body}</main>
      </section>
    </div>`;
  }

  function pageHeading(title, description, step = null) {
    return `${step ? `<div class="workspace-step-label">ÉTAPE ${step} SUR 10</div>` : ""}<header class="workspace-page-heading"><div><h1>${title}</h1><p>${description}</p></div></header>`;
  }

  function progressCard(report, activeStage = 1) {
    const progress = Math.max(percent(report), activeStage === 1 ? 5 : 0);
    return `<aside class="workspace-card progress-card"><div class="progress-label"><span>Progression du rapport</span><strong>${progress} %</strong></div><div class="progress-track"><span style="width:${progress}%"></span></div><nav class="progress-list">${stages.map(([route, label], index) => {
      const number = index + 1;
      const done = number < activeStage;
      return `<a class="${number === activeStage ? "current" : ""} ${done ? "done" : ""}" href="#${route}"><b>${done ? "✓" : number}</b><span>${label}</span><small>${done ? "Terminé" : number === activeStage ? "En cours" : "À compléter"}</small></a>`;
    }).join("")}</nav></aside>`;
  }

  function stageForm(route, report, stage) {
    const student = profile();
    let fields = "";
    if (route === "personal-info") {
      fields = `<h2>Identité</h2><div class="workspace-form-grid">${field("Nom", "lastName", report.lastName || student.lastName, "text", true)}${field("Prénom", "firstName", report.firstName || student.firstName, "text", true)}${field("Date de naissance", "birthDate", report.birthDate || "", "date", true)}</div><h2>Coordonnées</h2><div class="workspace-form-grid">${field("Adresse e-mail", "email", report.email || student.email, "email", true)}${field("Téléphone", "phone", report.phone || student.phone, "tel", true)}${field("Ville", "city", report.city || "")}${selectField("Pays", "country", ["Bénin", "Togo", "Côte d’Ivoire", "Sénégal", "Autre"], report.country || "Bénin")}</div>`;
    } else if (route === "academic-info") {
      fields = `<h2>Votre parcours académique</h2><div class="workspace-form-grid">${field("Établissement", "school", report.school || "", "text", true)}${field("Faculté / école", "faculty", report.faculty || "")}${field("Filière", "fieldOfStudy", report.fieldOfStudy || "", "text", true)}${selectField("Niveau d'études", "studyLevel", ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2", "Autre"], report.studyLevel || "Licence 3")}${field("Année académique", "academicYear", report.academicYear || "2025–2026")}${field("Encadrant académique", "academicSupervisor", report.academicSupervisor || "")}</div>`;
    } else {
      fields = `<h2>Votre stage</h2><div class="workspace-form-grid">${field("Entreprise / structure", "company", report.company || "", "text", true)}${field("Secteur d'activité", "sector", report.sector || "", "text", true)}${field("Service d'accueil", "department", report.department || "")}${field("Maître de stage", "internshipSupervisor", report.internshipSupervisor || "", "text", true)}${field("Date de début", "startDate", report.startDate || "", "date", true)}${field("Date de fin", "endDate", report.endDate || "", "date", true)}</div>${textArea("Missions principales", "missions", report.missions || "", "Décrivez les principales missions confiées pendant le stage...")}`;
    }
    return `${pageHeading(routeTitles[route], route === "personal-info" ? "Vérifiez vos informations d'identité et vos coordonnées. Elles servent à compléter votre rapport." : "Renseignez ces informations pour structurer votre rapport.", stage)}
      <div class="workspace-stage-layout">${progressCard(report, stage)}<form class="workspace-card workspace-form" data-workspace-form="report">
        <p class="workspace-muted">Les champs marqués d'un astérisque (*) sont obligatoires. Votre travail est enregistré automatiquement.</p>${fields}
        <div class="workspace-form-actions"><a class="button button-outline" href="#student-dashboard">Enregistrer et quitter</a><button class="button" type="submit">Valider et continuer　→</button></div>
      </form></div>`;
  }

  function reportCreation() {
    return `${pageHeading("Créer un nouveau rapport", "Donnez un titre à votre rapport pour le retrouver facilement. Vous renseignerez ensuite vos informations, étape par étape.")}
      <div class="workspace-info">ⓘ &nbsp;Vous pouvez revenir à une étape précédente à tout moment. Les modifications sont sauvegardées dans ce navigateur.</div>
      <div class="workspace-stage-layout"><form class="workspace-card workspace-form" data-workspace-form="create"><h2>Informations de départ</h2><p class="workspace-muted">Les champs marqués d'un astérisque (*) sont obligatoires.</p>${field("Titre du rapport", "title", "", "text", true, "Ce titre sert uniquement à l'identification.")}<div class="workspace-readonly">🌐 &nbsp;Langue du rapport　 <strong>Français</strong></div><div class="workspace-info">▣ &nbsp;Votre travail est enregistré automatiquement après chaque modification.</div><div class="workspace-form-actions"><a class="button button-outline" href="#student-dashboard">Annuler</a><button class="button" type="submit">Créer et commencer　→</button></div></form>
      <aside class="workspace-card"><h2>Les étapes de votre rapport</h2><p class="workspace-muted">Vous pouvez revenir à une étape précédente à tout moment.</p>${stages.map(([_, label], i) => `<div class="guide-step"><b>${i + 1}</b><span>${label}</span></div>`).join("")}</aside></div>`;
  }

  function writingPage(report) {
    const selected = Math.min(report.sectionIndex || 0, sectionNames.length - 1);
    const name = sectionNames[selected];
    const text = report.sections?.[name] || "";
    const descriptions = ["Présentez les personnes et les structures que vous souhaitez remercier.", "Situez votre stage et annoncez les objectifs de votre rapport.", "Présentez l'entreprise, son organisation et le service qui vous a accueilli.", "Décrivez les missions et les activités que vous avez réalisées.", "Analysez les difficultés rencontrées et les solutions mises en place.", "Présentez les compétences et les connaissances acquises.", "Résumez votre expérience et ouvrez sur vos perspectives."];
    return `${pageHeading(routeTitles.writing, "Rédigez chaque section à votre rythme. Votre travail est sauvegardé automatiquement.", 4)}
      <div class="workspace-writing-layout"><div>${progressCard(report, 4)}<aside class="workspace-card section-list"><h2>Sections du rapport</h2><p class="workspace-muted">Modèle : ${escapeHtml(report.model || "Académique")}. Les chapitres varient selon le modèle choisi.</p>${sectionNames.map((section, i) => `<button type="button" data-section="${i}" class="${i === selected ? "selected" : ""}"><b>${i < selected ? "✓" : i + 1}</b><span>${section}</span><small>${report.sections?.[section] ? "En cours" : "À compléter"}</small></button>`).join("")}</aside></div>
      <form class="workspace-card workspace-form writing-form" data-workspace-form="writing"><div class="workspace-row"><h2>${name}</h2><span class="status-chip success">✓ Enregistré à l'instant</span></div><div class="workspace-info">ⓘ &nbsp;Vous restez l'auteur de votre rapport. La plateforme structure et met en forme votre texte, mais n'invente jamais vos activités ni vos résultats.</div><div class="workspace-readonly"><strong>Ce que cette section doit contenir</strong><ul><li>${descriptions[selected]}</li><li>Les éléments concrets de votre expérience et vos observations personnelles</li><li>Un texte rédigé avec vos propres mots</li></ul></div><label class="workspace-field"><span>Votre texte</span><textarea name="sectionText" data-section-text placeholder="Rédigez ici avec vos propres mots...">${escapeHtml(text)}</textarea></label><div class="workspace-row workspace-muted"><span><span id="word-count">${text.trim() ? text.trim().split(/\\s+/).length : 0}</span> mots</span><span>Sauvegarde automatique après chaque modification</span></div><div class="workspace-form-actions"><button type="button" class="button button-outline" data-section-move="-1">← Section précédente</button><button type="button" class="button" data-section-move="1">Section suivante　→</button></div></form></div>
      <div class="workspace-bottom-actions"><a class="button button-outline" href="#internship-info">← Informations sur le stage</a><a class="button" href="#completeness">Vérifier la complétude　→</a></div>`;
  }

  function completenessPage(report) {
    const required = [["Titre du rapport", "title"], ["Nom", "lastName"], ["Prénom", "firstName"], ["Établissement", "school"], ["Filière", "fieldOfStudy"], ["Entreprise", "company"], ["Maître de stage", "internshipSupervisor"], ["Dates du stage", "startDate"]];
    return `${pageHeading(routeTitles.completeness, "Vérifiez les informations manquantes avant de personnaliser votre rapport.", 5)}<div class="workspace-stage-layout">${progressCard(report, 5)}<section class="workspace-card"><h2>Éléments à vérifier</h2><div class="completion-list">${required.map(([label, key]) => `<a href="#${["lastName", "firstName"].includes(key) ? "personal-info" : ["school", "fieldOfStudy"].includes(key) ? "academic-info" : ["company", "internshipSupervisor", "startDate"].includes(key) ? "internship-info" : "report-new"}"><span class="${report[key] ? "success" : "warning"}">${report[key] ? "✓" : "!"}</span>${label}<small>${report[key] ? "Complété" : "À compléter"}</small></a>`).join("")}</div><div class="workspace-info">Vérifiez l'exactitude de vos informations avant de continuer.</div><div class="workspace-form-actions"><a class="button button-outline" href="#writing">← Reprendre la rédaction</a><a class="button" href="#customization">Continuer　→</a></div></section></div>`;
  }

  function customizationPage(report) {
    return `${pageHeading(routeTitles.customization, "Personnalisez la présentation de votre rapport.", 6)}<div class="workspace-stage-layout">${progressCard(report, 6)}<form class="workspace-card workspace-form" data-workspace-form="report"><h2>Options de mise en forme</h2><div class="workspace-form-grid">${selectField("Police du document", "font", ["Arial", "Times New Roman", "Calibri"], report.font || "Times New Roman")}${selectField("Taille du texte", "fontSize", ["11 pt", "12 pt", "13 pt"], report.fontSize || "12 pt")}${selectField("Interligne", "lineSpacing", ["Simple", "1,5", "Double"], report.lineSpacing || "1,5")}${selectField("Marges", "margins", ["Normales", "Étendues", "Étroites"], report.margins || "Normales")}</div><div class="workspace-card-inner"><h3>Éléments à inclure</h3>${["Page de garde", "Sommaire", "Numérotation des pages", "Remerciements"].map((item, index) => `<label class="workspace-check"><input type="checkbox" name="include${index}" data-report-field="include${index}" ${report[`include${index}`] !== false ? "checked" : ""}> ${item}</label>`).join("")}</div><div class="workspace-form-actions"><a class="button button-outline" href="#completeness">← Étape précédente</a><button class="button" type="submit">Enregistrer　→</button></div></form></div>`;
  }

  function modelSelection(report) {
    const artwork = ["academic", "professional", "initiation", "final"];
    const priceList = read("pricing", {});
    return `${pageHeading(routeTitles["model-selection"], "Chaque modèle repose sur une base commune, complétée par des chapitres spécifiques.", 7)}<div class="workspace-stage-layout">${progressCard(report, 7)}<div><div class="workspace-model-grid">${modelOptions.map((model, index) => {
      const selected = report.model === model;
      const price = priceList[`price${index}`];
      return `<article class="workspace-model ${selected ? "chosen" : ""}" data-model-card="${index}"><div class="workspace-row"><h2>${model}</h2><div class="workspace-model-badges">${selected ? '<span class="status-chip success">✓ Sélectionné</span>' : index === 1 ? '<span class="status-chip info">ⓘ Populaire</span>' : ""}</div></div><button class="model-preview-button" type="button" data-preview-model="${index}" aria-label="Agrandir l'aperçu du modèle ${model}"><img src="assets/model-${artwork[index]}.svg" alt="Aperçu de la couverture du modèle ${model}"><span>⌕ &nbsp; Agrandir l'aperçu</span></button><p>${modelDescriptions[index]}</p><ul><li>Base commune du rapport</li><li>${["Problématique et méthodologie", "Missions et réalisations détaillées", "Découverte du milieu professionnel", "Analyse critique et perspectives"][index]}</li></ul><div class="workspace-model-price">Tarif : <strong>${price ? `${escapeHtml(price)} FCFA` : "[montant à définir]"}</strong></div><button class="button ${selected ? "" : "button-outline"}" type="button" data-model="${model}">${selected ? "✓ Modèle choisi" : "Choisir ce modèle"}</button></article>`;
    }).join("")}</div><dialog class="model-preview-dialog" id="model-preview-dialog"><div data-model-preview-body></div><form method="dialog"><button class="button button-outline" type="submit">Fermer</button></form></dialog><form class="workspace-card workspace-form" data-workspace-form="report"><h2>Options du rapport</h2><div class="workspace-form-grid">${selectField("Niveau de finition", "quality", ["Standard", "Approfondi"], report.quality || "Standard")}${selectField("Nombre de pages estimé", "pages", ["Jusqu'à 20 pages", "Jusqu'à 30 pages", "Jusqu'à 50 pages"], report.pages || "Jusqu'à 20 pages")}</div><div class="workspace-form-actions"><a class="button button-outline" href="#customization">← Étape précédente</a><a class="button" href="#report-preview">Voir l'aperçu　→</a></div></form></div></div>`;
  }

  function reportDocument(report) {
    const person = `${report.firstName || profile().firstName} ${report.lastName || profile().lastName}`;
    return `<article class="report-paper"><div class="paper-brand">Wàblɔ Towé</div><h1>RAPPORT DE STAGE</h1><h2>${escapeHtml(reportTitle(report))}</h2><div class="paper-line"></div><p>Présenté par</p><h3>${escapeHtml(person)}</h3><p>${escapeHtml(report.school || "Établissement d'enseignement")}</p><p>${escapeHtml(report.company || "Structure d'accueil")}</p><p>${escapeHtml(report.academicYear || "Année académique")}</p><div class="paper-watermark">APERÇU</div>${sectionNames.map(name => report.sections?.[name] ? `<section><h2>${name}</h2><p>${escapeHtml(report.sections[name])}</p></section>` : "").join("")}</article>`;
  }

  function previewPage(report) {
    return `${pageHeading(routeTitles["report-preview"], "Consultez votre rapport avant de passer au paiement.", 8)}<div class="workspace-stage-layout">${progressCard(report, 8)}<section class="workspace-card preview-card"><div class="workspace-info">Aperçu du document. Vérifiez vos informations et votre contenu avant de continuer.</div>${reportDocument(report)}<div class="workspace-form-actions"><a class="button button-outline" href="#model-selection">← Modifier le modèle</a><a class="button" href="#order-summary">Continuer vers le paiement　→</a></div></section></div>`;
  }

  function orderSummary(report) {
    const modelIndex = Math.max(0, modelOptions.indexOf(report.model || modelOptions[0]));
    const price = read("pricing", {})[`price${modelIndex}`];
    const formattedPrice = price !== undefined && price !== "" ? `${Number(price).toLocaleString("fr-FR")} FCFA` : "Montant à définir";
    return `${pageHeading(routeTitles["order-summary"], "Vérifiez votre commande puis choisissez votre moyen de paiement.", 9)}<div class="workspace-stage-layout">${progressCard(report, 9)}<form class="workspace-card workspace-form" data-workspace-form="payment"><h2>Votre commande</h2><div class="summary-table"><div><span>Rapport de stage</span><strong>${escapeHtml(reportTitle(report))}</strong></div><div><span>Modèle</span><strong>${escapeHtml(report.model || "Académique")}</strong></div><div><span>Pages estimées</span><strong>${escapeHtml(report.pages || "Jusqu'à 20 pages")}</strong></div><div><span>Niveau de finition</span><strong>${escapeHtml(report.quality || "Standard")}</strong></div><div class="summary-total"><span>Total à payer</span><strong>${formattedPrice}</strong></div></div><p class="workspace-muted">${price !== undefined && price !== "" ? "Tarif configuré par l’administration." : "Aucun tarif n’a été défini pour ce modèle. Le paiement réel n’est pas disponible."}</p><h2>Moyen de paiement</h2>${["MTN Mobile Money", "Moov Money", "Celtiis Cash", "Carte Visa ou Mastercard", "Portefeuille électronique"].map((method, index) => `<label class="payment-option"><input type="radio" name="paymentMethod" value="${method}" ${index === 0 ? "checked" : ""}> ${method}</label>`).join("")}${field("Numéro de téléphone Mobile Money", "paymentPhone", report.paymentPhone || profile().phone, "tel", true)}<p class="workspace-muted">Simulation locale uniquement : aucune transaction réelle n'est envoyée ni débitée.</p><div class="workspace-form-actions"><a class="button button-outline" href="#report-preview">← Étape précédente</a><button class="button" type="submit">Continuer vers le paiement simulé</button></div></form></div>`;
  }

  function paymentState(route, report) {
    const success = route === "payment-success";
    const failed = route === "payment-failed";
    const title = success ? "Paiement confirmé" : failed ? "Le paiement n'a pas abouti" : "Paiement en attente de confirmation";
    const message = success ? "Votre paiement a été reçu. Vous pouvez maintenant générer votre rapport." : failed ? "Vous pouvez réessayer votre paiement ou choisir un autre moyen de paiement." : "Confirmez la demande reçue sur votre téléphone pour finaliser le paiement.";
    const actions = success
      ? `<a class="button" href="#generation">Générer mon rapport　→</a>`
      : failed
        ? `<a class="button" href="#order-summary">Réessayer le paiement</a>`
        : `<div class="workspace-info">Simulation locale uniquement : aucune transaction réelle ne sera envoyée ni débitée.</div><button class="button" type="button" data-go="payment-success">Simuler une confirmation</button><button class="button button-outline" type="button" data-go="payment-failed">Simuler un échec</button>`;
    return `<main class="standalone-state"><section class="workspace-card state-card"><span class="state-icon ${success ? "success" : failed ? "danger" : "warning"}">${success ? "✓" : failed ? "×" : "◷"}</span><h1>${title}</h1><p>${message}</p><div class="workspace-readonly"><strong>${escapeHtml(reportTitle(report))}</strong><br>Référence : ${escapeHtml(report?.paymentRef || "WT-000001")}<br>Mode de paiement : ${escapeHtml(report?.paymentMethod || "MTN Mobile Money")}</div>${actions}<a class="button button-outline" href="#student-dashboard">Retour au tableau de bord</a></section></main>`;
  }

  function dashboard(report) {
    const all = reports();
    return `${pageHeading("Bonjour " + escapeHtml(profile().firstName), "Retrouvez vos rapports de stage, reprenez-les là où vous les avez laissés ou créez-en un nouveau.")}
      <a class="button workspace-heading-action" href="#report-new">＋ &nbsp; Créer un rapport</a>
      ${report ? `<section class="resume-banner"><div><small>REPRENDRE OÙ VOUS VOUS ÊTES ARRÊTÉ</small><h2>${escapeHtml(reportTitle(report))}</h2><p>Prochaine étape : ${stages[Math.min(report.step || 0, 9)][1]} · Sauvegarde automatique</p><div class="progress-track"><span style="width:${percent(report)}%"></span></div></div><a class="button button-white" href="#${stages[Math.min(report.step || 0, 9)][0]}">Reprendre mon rapport　→</a></section>` : `<div class="workspace-info">Vous n'avez pas encore créé de rapport. Commencez en quelques étapes guidées.</div>`}
      <div class="workspace-stat-grid"><div class="workspace-stat"><b>▤</b><strong>${all.length}</strong><span>Rapports</span></div><div class="workspace-stat"><b>◷</b><strong>${all.filter(item => item.status !== "complete").length}</strong><span>En cours</span></div><div class="workspace-stat"><b>✓</b><strong>${all.filter(item => (item.step || 0) >= 8).length}</strong><span>Prêts à générer</span></div><div class="workspace-stat"><b>⇩</b><strong>${all.filter(item => item.status === "complete").length}</strong><span>Finalisés</span></div></div>
      <div class="workspace-row"><h2>Mes rapports</h2><div class="workspace-filter"><button class="active" data-report-filter="all">Tous (${all.length})</button><button data-report-filter="progress">En cours</button><button data-report-filter="complete">Finalisés</button></div></div>
      <div class="report-list">${all.length ? all.map(item => `<article class="report-row" data-status="${item.status === "complete" ? "complete" : "progress"}"><span class="report-symbol">▤</span><div><h3>${escapeHtml(reportTitle(item))}</h3><p>Modèle ${escapeHtml(item.model || "académique")} · Modifié ${new Date(item.updatedAt || item.createdAt).toLocaleDateString("fr-FR")}</p></div><div class="report-progress">${percent(item)} %<div class="progress-track"><span style="width:${percent(item)}%"></span></div></div><a class="button button-small" href="#${item.status === "complete" ? "download" : "report-detail"}" data-open-report="${item.id}">${item.status === "complete" ? "Télécharger" : "Reprendre"}</a></article>`).join("") : '<div class="workspace-empty">Aucun rapport pour le moment. <a href="#report-new">Créer mon premier rapport</a></div>'}</div>`;
  }

  function genericStudentList(route) {
    const all = reports();
    if (route === "my-reports") return `${pageHeading("Mes rapports", "Retrouvez, reprenez et téléchargez vos rapports.")}<div class="workspace-row"><div class="workspace-filter"><button class="active" data-report-filter="all">Tous</button><button data-report-filter="progress">En cours</button><button data-report-filter="complete">Finalisés</button></div><a class="button" href="#report-new">＋ Nouveau rapport</a></div><div class="report-list">${all.map(item => `<article class="report-row" data-status="${item.status === "complete" ? "complete" : "progress"}"><span class="report-symbol">▤</span><div><h3>${escapeHtml(reportTitle(item))}</h3><p>${escapeHtml(item.model || "Académique")} · ${statusLabel(item)}</p></div><span>${percent(item)} %</span><a class="button button-small" href="#report-detail" data-open-report="${item.id}">Détails</a></article>`).join("") || '<div class="workspace-card">Aucun rapport. <a href="#report-new">Créer un rapport</a></div>'}</div>`;
    if (route === "report-detail") {
      const report = activeReport();
      return `${pageHeading("Détails d'un rapport", report ? escapeHtml(reportTitle(report)) : "Sélectionnez un rapport depuis votre liste.")}<div class="workspace-grid two"><section class="workspace-card"><h2>Informations générales</h2><p>Modèle : ${escapeHtml(report?.model || "Académique")}</p><p>Entreprise : ${escapeHtml(report?.company || "À renseigner")}</p><p>Progression : ${percent(report)} %</p><p>Statut : ${statusLabel(report)}</p><a class="button" href="#personal-info">Modifier le rapport</a></section><section class="workspace-card"><h2>Actions</h2><a class="button button-outline" href="#report-preview">Prévisualiser</a>　<a class="button" href="#download">Télécharger</a></section></div>`;
    }
    if (route === "payment-history") return `${pageHeading("Historique des paiements", "Consultez les transactions liées à vos rapports.")}<div class="workspace-card workspace-table-wrap"><table class="workspace-table"><thead><tr><th>Date</th><th>Référence</th><th>Rapport</th><th>Moyen de paiement</th><th>Montant</th><th>Statut</th></tr></thead><tbody>${all.filter(item => item.paymentRef).map(item => `<tr><td>${new Date(item.updatedAt).toLocaleDateString("fr-FR")}</td><td>${item.paymentRef}</td><td>${escapeHtml(reportTitle(item))}</td><td>${escapeHtml(item.paymentMethod || "—")}</td><td>À confirmer</td><td><span class="status-chip ${item.status === "complete" ? "success" : "warning"}">${statusLabel(item)}</span></td></tr>`).join("") || "<tr><td colspan='6'>Aucun paiement enregistré.</td></tr>"}</tbody></table></div>`;
    return `${pageHeading("Profil et paramètres", "Gérez vos informations de compte et vos préférences.")}<div class="workspace-grid two"><form class="workspace-card workspace-form" data-workspace-form="profile"><h2>Informations personnelles</h2>${field("Nom", "lastName", profile().lastName)}${field("Prénom", "firstName", profile().firstName)}${field("Adresse e-mail", "email", profile().email, "email")}${field("Téléphone", "phone", profile().phone, "tel")}<button class="button" type="submit">Enregistrer les modifications</button></form><section class="workspace-card"><h2>Notifications</h2>${["E-mails concernant mes rapports", "Notifications de paiement", "Conseils et nouveautés"].map((item, index) => `<label class="workspace-check"><input type="checkbox" checked> ${item}</label>`).join("")}<h2>Zone de danger</h2><button class="button danger-button" type="button" data-action="clear-data">Supprimer les données locales</button></section></div>`;
  }

  function downloadPage(report) {
    return `${pageHeading("Téléchargement du rapport", "Enregistrez une version PDF ou téléchargez votre document compatible avec Word.", 10)}<div class="workspace-stage-layout">${progressCard(report, 10)}<section><div class="workspace-success-banner"><strong>✓　Votre rapport est prêt</strong><p>Imprimez ou enregistrez le document au format PDF, ou ouvrez la version Word compatible.</p></div><div class="workspace-card"><h2>Votre rapport</h2>${reportDocument(report)}<div class="workspace-form-actions"><button class="button" type="button" data-action="print-report">Imprimer / Enregistrer en PDF</button><button class="button button-outline" type="button" data-action="export-word">Télécharger pour Word (.doc)</button></div></div><div class="workspace-card"><h2>Besoin d'une correction ?</h2><p>Vous pouvez reprendre votre rapport et modifier son contenu à tout moment.</p><a class="button button-outline" href="#writing">Modifier le rapport</a>　<a class="button" href="#my-reports">Voir mes rapports　→</a></div></section></div>`;
  }

  function adminPage(route) {
    const allReports = reports();
    const users = read("users", [{ name: "Aïcha Dossou", email: "aicha@exemple.com", role: "Étudiant", status: "Actif" }, { name: "Komla Agbodjan", email: "admin@wablo.example", role: "Administrateur", status: "Actif" }]);
    const descriptions = {
      "admin-dashboard": "Vue d'ensemble de l'activité de la plateforme.",
      "admin-users": "Consultez et gérez les comptes de la plateforme.",
      "admin-user-detail": "Consultez les informations et l'activité d'un utilisateur.",
      "admin-reports": "Suivez les rapports créés sur la plateforme.",
      "admin-report-detail": "Consultez le détail et le statut du rapport.",
      "admin-models": "Gérez les modèles proposés aux étudiants.",
      "admin-model-edit": "Configurez la structure et les chapitres d'un modèle.",
      "admin-payments": "Consultez les transactions et leur état.",
      "admin-pricing": "Configurez les tarifs affichés aux étudiants.",
      "admin-stats": "Analysez l'activité de la plateforme.",
      "admin-roles": "Gérez les rôles et les permissions.",
      "admin-settings": "Configurez les options générales de la plateforme."
    };
    const heading = pageHeading(routeTitles[route], descriptions[route]);
    if (route === "admin-dashboard" || route === "admin-stats") {
      const bars = [12, 19, 27, 34, 41, 38];
      return `${heading}<div class="workspace-info">ⓘ &nbsp;Données locales de démonstration. Les intégrations de paiement et de gestion réelle requièrent un serveur.</div><div class="workspace-stat-grid">${[["♧", users.length, "Étudiants inscrits"], ["▤", allReports.length, "Rapports en cours"], ["▣", "—", "Paiements du mois"], ["!", 0, "Générations échouées"]].map(x => `<article class="workspace-stat"><b>${x[0]}</b><strong>${x[1]}</strong><span>${x[2]}</span></article>`).join("")}</div><div class="workspace-grid two"><section class="workspace-card"><h2>${route === "admin-stats" ? "Rapports par mois" : "Rapports créés par mois"}</h2><div class="bar-chart">${bars.map((value, i) => `<div><b style="height:${value * 5}px">${value}</b><span>${["Mai", "Juin", "Juil.", "Août", "Sept.", "Oct."][i]}</span></div>`).join("")}</div></section><section class="workspace-card"><h2>À traiter</h2><div class="admin-action-row">Paiements en attente <span class="status-chip warning">0</span></div><div class="admin-action-row">Générations échouées <span class="status-chip danger">0</span></div><div class="admin-action-row">Messages d'assistance <span class="status-chip info">0</span></div></section></div><section class="workspace-card"><h2>Dernières activités</h2><div class="workspace-empty">Les événements créés pendant cette session apparaîtront ici.</div></section>`;
    }
    if (route === "admin-users" || route === "admin-user-detail") return `${heading}${route === "admin-user-detail" ? `<div class="workspace-grid two"><section class="workspace-card"><h2>Informations utilisateur</h2><p>Nom : ${escapeHtml(users[0]?.name || "—")}</p><p>E-mail : ${escapeHtml(users[0]?.email || "—")}</p><p>Rôle : ${escapeHtml(users[0]?.role || "Étudiant")}</p><a class="button button-outline" href="#admin-users">Retour à la liste</a></section><section class="workspace-card"><h2>Actions</h2><button class="button danger-button" data-action="toggle-user">Suspendre le compte</button></section></div>` : `<div class="workspace-row"><input class="workspace-search" type="search" placeholder="Rechercher un utilisateur..." data-table-search><button class="button" data-action="add-demo-user">＋ Ajouter un utilisateur</button></div><div class="workspace-card workspace-table-wrap"><table class="workspace-table"><thead><tr><th>Nom</th><th>Adresse e-mail</th><th>Rôle</th><th>Inscription</th><th>Statut</th><th>Action</th></tr></thead><tbody>${users.map(user => `<tr><td>${escapeHtml(user.name)}</td><td>${escapeHtml(user.email)}</td><td>${escapeHtml(user.role)}</td><td>Aujourd'hui</td><td><span class="status-chip success">${escapeHtml(user.status)}</span></td><td><a class="button button-outline button-small" href="#admin-user-detail">Voir</a></td></tr>`).join("")}</tbody></table></div>`}`;
    if (route === "admin-reports" || route === "admin-report-detail") return `${heading}${route === "admin-report-detail" ? `<div class="workspace-grid two"><section class="workspace-card"><h2>Informations du rapport</h2><p>Titre : ${escapeHtml(reportTitle(activeReport()))}</p><p>Progression : ${percent(activeReport())}%</p><p>Statut : ${statusLabel(activeReport())}</p></section><section class="workspace-card"><h2>Actions</h2><button class="button button-outline" data-action="export-text">Télécharger le contenu</button></section></div>` : `<div class="workspace-row"><input class="workspace-search" type="search" placeholder="Rechercher un rapport..." data-table-search><select class="workspace-select" data-status-filter><option value="">Tous les statuts</option><option>En cours</option><option>Finalisé</option></select></div><div class="workspace-card workspace-table-wrap"><table class="workspace-table"><thead><tr><th>Titre</th><th>Utilisateur</th><th>Modèle</th><th>Création</th><th>Progression</th><th>Statut</th><th></th></tr></thead><tbody>${allReports.map(item => `<tr><td>${escapeHtml(reportTitle(item))}</td><td>${escapeHtml(profile().email)}</td><td>${escapeHtml(item.model || "Académique")}</td><td>${new Date(item.createdAt).toLocaleDateString("fr-FR")}</td><td>${percent(item)}%</td><td>${statusLabel(item)}</td><td><a class="button button-outline button-small" href="#admin-report-detail" data-open-report="${item.id}">Détails</a></td></tr>`).join("") || "<tr><td colspan='7'>Aucun rapport enregistré dans ce navigateur.</td></tr>"}</tbody></table></div>`}`;
    if (route === "admin-models") return `${heading}<div class="workspace-row"><span>Modèles de rapport</span><a class="button" href="#admin-model-edit">＋ Nouveau modèle</a></div><div class="workspace-card workspace-table-wrap"><table class="workspace-table"><thead><tr><th>Nom</th><th>Description</th><th>Statut</th><th>Action</th></tr></thead><tbody>${modelOptions.map((model, i) => `<tr><td>${model}</td><td>${modelDescriptions[i]}</td><td><span class="status-chip success">Actif</span></td><td><a class="button button-outline button-small" href="#admin-model-edit">Modifier</a></td></tr>`).join("")}</tbody></table></div>`;
    if (route === "admin-model-edit") return `${heading}<div class="workspace-grid two"><form class="workspace-card workspace-form" data-workspace-form="admin"><h2>Informations du modèle</h2>${field("Nom du modèle", "modelName", "Académique", "text", true)}${textArea("Description", "modelDescription", "", "Description du modèle...")}<h2>Chapitres</h2>${sectionNames.map((name, i) => `<label class="workspace-check"><input type="checkbox" checked> ${name}</label>`).join("")}<button class="button" type="submit">Enregistrer le modèle</button></form><section class="workspace-card"><h2>Aperçu</h2><div class="model-placeholder">Aperçu du modèle sélectionné</div></section></div>`;
    if (route === "admin-payments") return `${heading}<div class="workspace-stat-grid">${[["▣", "—", "Transactions"], ["✓", "—", "Confirmées"], ["◷", "—", "En attente"]].map(x => `<div class="workspace-stat"><b>${x[0]}</b><strong>${x[1]}</strong><span>${x[2]}</span></div>`).join("")}</div><div class="workspace-card workspace-table-wrap"><table class="workspace-table"><thead><tr><th>Référence</th><th>Utilisateur</th><th>Moyen</th><th>Date</th><th>Montant</th><th>Statut</th></tr></thead><tbody><tr><td colspan="6">Aucune transaction réelle. Configurez un prestataire de paiement pour activer les paiements.</td></tr></tbody></table></div>`;
    if (route === "admin-pricing") return `${heading}<form class="workspace-card workspace-form" data-workspace-form="pricing"><h2>Grille tarifaire</h2><div class="workspace-info">Les montants sont des paramètres de démonstration. Aucun prix n'est présenté aux utilisateurs tant qu'il n'a pas été confirmé.</div><div class="workspace-form-grid">${modelOptions.map((model, i) => field(`Modèle ${model} (FCFA)`, `price${i}`, read("pricing", {})[`price${i}`] || "", "number")).join("")}</div><div class="workspace-form-actions"><button class="button" type="submit">Enregistrer les tarifs</button></div></form>`;
    if (route === "admin-roles") return `${heading}<div class="workspace-card workspace-table-wrap"><table class="workspace-table"><thead><tr><th>Rôle</th><th>Tableau de bord</th><th>Utilisateurs</th><th>Rapports</th><th>Modèles</th><th>Paiements</th><th>Paramètres</th></tr></thead><tbody>${["Administrateur principal", "Administrateur", "Assistance"].map((role, i) => `<tr><td>${role}</td>${Array.from({ length: 6 }, (_, j) => `<td><input type="checkbox" ${j < (6 - i) ? "checked" : ""} aria-label="${role} permission ${j + 1}"></td>`).join("")}</tr>`).join("")}</tbody></table><div class="workspace-form-actions"><button class="button" data-action="save-settings">Enregistrer</button></div></div>`;
    return `${heading}<form class="workspace-form" data-workspace-form="settings"><section class="workspace-card"><h2>Plateforme</h2><div class="workspace-form-grid">${field("Nom de la plateforme", "platformName", "Wàblɔ towé")}${field("Adresse e-mail d'assistance", "supportEmail", "")}${selectField("Langue par défaut", "defaultLanguage", ["Français", "English"], "Français")}${field("Délai de renvoi du code (secondes)", "resendDelay", "30", "number")}</div></section><section class="workspace-card"><h2>Paiement</h2>${["MTN Mobile Money", "Moov Money", "Celtiis Cash", "Visa et Mastercard", "Portefeuilles électroniques"].map((name, i) => `<label class="workspace-check"><input type="checkbox" name="payment${i}" checked> ${name}</label>`).join("")}</section><section class="workspace-card"><h2>Maintenance</h2><p>Activez le mode maintenance pour suspendre temporairement l'accès des étudiants.</p><label class="workspace-check"><input type="checkbox" name="maintenance"> Activer le mode maintenance</label><a href="#maintenance">Voir la page de maintenance</a></section><div class="workspace-form-actions"><button class="button" type="submit">Enregistrer les paramètres</button></div></form>`;
  }

  function profileFlow(route) {
    const data = {
      "password-forgot": ["Mot de passe oublié ?", "Saisissez l'adresse e-mail associée à votre compte. Nous vous aiderons à réinitialiser votre mot de passe.", `<form class="workspace-form" data-workspace-form="forgot">${field("Adresse e-mail", "email", "", "email", true)}<button class="button" type="submit">Envoyer le lien de réinitialisation</button></form>`],
      "password-reset": ["Choisissez un nouveau mot de passe", "Créez un mot de passe sécurisé pour accéder à votre espace.", `<form class="workspace-form" data-workspace-form="reset"><label class="workspace-field"><span>Nouveau mot de passe *</span><input name="password" type="password" minlength="8" pattern="(?=.*[A-Za-z])(?=.*[0-9]).{8,}" required></label><label class="workspace-field"><span>Confirmer le mot de passe *</span><input name="confirm" type="password" minlength="8" required></label><button class="button" type="submit">Enregistrer le nouveau mot de passe</button></form>`],
      "email-verify": ["Vérifiez votre adresse e-mail", "Saisissez le code de vérification envoyé à votre adresse e-mail.", `<form class="workspace-form" data-workspace-form="verify"><label class="workspace-field"><span>Code de vérification *</span><input name="code" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" required></label><button class="button" type="submit">Vérifier mon adresse e-mail</button><p class="workspace-muted">Vous n'avez pas reçu le code ? <button type="button" class="text-button" data-action="resend-code">Renvoyer le code</button></p></form>`]
    }[route];
    return `<main class="standalone-state"><section class="workspace-card state-card"><a class="workspace-logo light" href="#home" aria-label="Wàblɔ Towé, accueil"><img src="assets/logo-dark-transparent.png" alt="Wàblɔ Towé"></a><h1>${data[0]}</h1><p>${data[1]}</p><div class="inline-message" role="status"></div>${data[2]}<p class="state-link"><a href="#login">Retour à la connexion</a></p></section></main>`;
  }

  function systemPage(route) {
    const copy = {
      loading: ["◌", "Chargement en cours...", "Veuillez patienter pendant le chargement de votre demande."],
      error: ["!", "Une erreur est survenue", "Nous n'avons pas pu traiter votre demande pour le moment."],
      "not-found": ["404", "Page introuvable", "La page que vous recherchez n'existe pas ou a été déplacée."],
      forbidden: ["403", "Accès non autorisé", "Vous n'avez pas les autorisations nécessaires pour consulter cette page."],
      maintenance: ["⚙", "Maintenance en cours", "La plateforme est temporairement indisponible. Nous serons de retour dès que possible."]
    }[route];
    return `<main class="standalone-state"><section class="workspace-card state-card"><a class="workspace-logo light" href="#home" aria-label="Wàblɔ Towé, accueil"><img src="assets/logo-dark-transparent.png" alt="Wàblɔ Towé"></a><span class="state-icon ${route === "error" ? "danger" : "info"}">${copy[0]}</span><h1>${copy[1]}</h1><p>${copy[2]}</p><a class="button" href="${route === "forbidden" ? "#login" : "#home"}">${route === "error" ? "Réessayer" : "Retour à l'accueil"}</a>${route === "error" ? '<a href="#contact">Contacter l’assistance</a>' : ""}</section></main>`;
  }

  function defaultNotifications() {
    return [
      { type: "success", title: "Paiement confirmé", body: "Votre paiement pour « Rapport — Entreprise A » a été reçu.", date: "Aujourd'hui", read: false },
      { type: "info", title: "Rapport prêt", body: "Votre rapport est disponible au téléchargement.", date: "Aujourd'hui", read: false },
      { type: "warning", title: "Paiement en attente", body: "Confirmez la demande reçue sur votre téléphone.", date: "Hier", read: true },
      { type: "danger", title: "Génération échouée", body: "Régénération gratuite ou remboursement possible.", date: "12 oct.", read: true }
    ];
  }

  function notificationsPage() {
    const items = read("notifications", defaultNotifications());
    return `${pageHeading("Notifications et alertes", "Suivez les événements concernant vos rapports et vos paiements.")}<div class="workspace-row"><span></span><button class="button button-outline" data-action="mark-all-read">✓　Tout marquer comme lu</button></div><section class="workspace-card notification-list">${items.map((item, index) => `<article class="notification-row ${item.read ? "" : "unread"}"><span class="status-chip ${item.type}">${item.type === "success" ? "✓ Succès" : item.type === "warning" ? "◷ Attention" : item.type === "danger" ? "× Erreur" : "ⓘ Information"}</span><div><strong>${item.title}</strong><p>${item.body}</p></div><time>${item.date}</time><button type="button" data-read-notification="${index}">${item.read ? "Lu" : "Non lu"}</button></article>`).join("")}</section><section class="workspace-card"><h2>Préférences</h2><p>Choisissez les notifications que vous souhaitez recevoir dans <a href="#profile-settings">Profil et paramètres</a>.</p></section>`;
  }

  function generationPage() {
    return `${pageHeading("Génération de votre rapport…", "Votre document est en cours de préparation.")}<section class="workspace-card state-card"><span class="state-icon info">◌</span><h2>Génération du rapport</h2><p>Vérification du contenu et création du document.</p><div class="progress-track"><span style="width:100%"></span></div><div class="completion-list">${stages.slice(0, 9).map(([, label]) => `<div><span class="success">✓</span>${label}<small>Terminé</small></div>`).join("")}</div><a class="button" href="#download">Voir mon rapport　→</a></section>`;
  }

  function render(route) {
    if (["password-forgot", "password-reset", "email-verify"].includes(route)) return profileFlow(route);
    if (["loading", "error", "not-found", "forbidden", "maintenance"].includes(route)) return systemPage(route);
    if (route === "notifications") return workspaceShell(route, notificationsPage());
    if (route.startsWith("admin-")) return workspaceShell(route, adminPage(route), true);
    const report = activeReport() || { step: 0, sections: {} };
    if (route === "student-dashboard") return workspaceShell(route, dashboard(activeReport()));
    if (route === "report-new") return workspaceShell(route, reportCreation());
    if (["personal-info", "academic-info", "internship-info"].includes(route)) return workspaceShell(route, stageForm(route, report, stages.findIndex(item => item[0] === route) + 1));
    if (route === "writing") return workspaceShell(route, writingPage(report));
    if (route === "completeness") return workspaceShell(route, completenessPage(report));
    if (route === "customization") return workspaceShell(route, customizationPage(report));
    if (route === "model-selection") return workspaceShell(route, modelSelection(report));
    if (route === "report-preview") return workspaceShell(route, previewPage(report));
    if (route === "order-summary") return workspaceShell(route, orderSummary(report));
    if (route === "payment-success" && !["paid", "complete"].includes(activeReport()?.status)) return paymentState("payment-pending", activeReport());
    if (["payment-pending", "payment-success", "payment-failed"].includes(route)) return paymentState(route, report);
    if (route === "generation") {
      if (activeReport()?.status !== "paid") return paymentState("payment-pending", activeReport());
      updateReport({ status: "complete", step: 10 });
      return workspaceShell(route, generationPage());
    }
    if (route === "download") {
      if (activeReport()?.status !== "complete") return workspaceShell("student-dashboard", `${pageHeading("Téléchargement indisponible", "Votre rapport doit être généré après paiement avant de pouvoir être téléchargé.")}<div class="workspace-info">Aucun document final n'est disponible pour le moment.</div><a class="button" href="#student-dashboard">Retour à mes rapports</a>`);
      return workspaceShell(route, downloadPage(report));
    }
    return workspaceShell(route, genericStudentList(route));
  }

  function titleFor(route) {
    if (route === "payment-success" && !["paid", "complete"].includes(activeReport()?.status)) return routeTitles["payment-pending"];
    if (route === "generation" && activeReport()?.status !== "paid") return routeTitles["payment-pending"];
    if (route === "download" && activeReport()?.status !== "complete") return routeTitles["student-dashboard"];
    return routeTitles[route];
  }

  function showFormMessage(form, message) {
    const element = form.querySelector(".inline-message");
    if (element) {
      element.textContent = message;
      element.classList.add("visible");
    }
  }

  function bind(route) {
    document.querySelectorAll("[data-go]").forEach(button => button.addEventListener("click", () => {
      if (button.dataset.go === "payment-success") updateReport({ status: "paid", step: 9, paymentRef: `WT-${Date.now().toString().slice(-8)}` });
      if (button.dataset.go === "payment-failed") updateReport({ status: "failed" });
      if (button.dataset.go === "generation") updateReport({ status: "complete", step: 10 });
      location.hash = button.dataset.go;
    }));
    document.querySelectorAll("[data-report-field]").forEach(input => {
      input.addEventListener("input", () => {
        const report = activeReport();
        if (report) updateReport({ [input.dataset.reportField]: input.type === "checkbox" ? input.checked : input.value });
      });
      input.addEventListener("change", () => {
        const report = activeReport();
        if (report) updateReport({ [input.dataset.reportField]: input.type === "checkbox" ? input.checked : input.value });
      });
    });
    document.querySelectorAll("[data-workspace-form]").forEach(form => form.addEventListener("submit", event => {
      event.preventDefault();
      const type = form.dataset.workspaceForm;
      const values = Object.fromEntries(new FormData(form).entries());
      if (type === "create") {
        const report = { id: crypto.randomUUID(), title: values.title.trim(), step: 1, status: "draft", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), sections: {}, model: "Académique" };
        const all = reports();
        all.unshift(report);
        saveReports(all);
        setActive(report);
        location.hash = "personal-info";
      } else if (type === "report") {
        if (type === "report" && form.closest(".workspace-stage-layout")) {
          const currentRoute = location.hash.slice(1);
          const step = stages.findIndex(item => item[0] === currentRoute) + 1;
          updateReport({ ...values, step: Math.max(step, activeReport()?.step || 0) });
          location.hash = stages[step]?.[0] || "writing";
        } else updateReport(values);
      } else if (type === "writing") {
        const report = activeReport();
        const selected = Math.min(report.sectionIndex || 0, sectionNames.length - 1);
        const sections = { ...(report.sections || {}), [sectionNames[selected]]: form.elements.sectionText.value };
        updateReport({ sections });
        location.hash = "completeness";
      } else if (type === "payment") {
        const report = activeReport();
        updateReport({ paymentMethod: values.paymentMethod, paymentPhone: values.paymentPhone, status: "pending" });
        location.hash = "payment-pending";
      } else if (type === "profile") {
        const current = profile();
        write("profile", { ...current, ...values });
        const profileForm = form.querySelector(".workspace-form-actions");
        if (profileForm) profileForm.insertAdjacentHTML("beforeend", '<span class="status-chip success">Modifications enregistrées</span>');
      } else if (type === "forgot") {
        showFormMessage(form, "Si un compte correspond à cette adresse, un lien de réinitialisation sera envoyé.");
        form.insertAdjacentHTML("beforeend", '<a class="button" href="#password-reset">Continuer vers la réinitialisation</a>');
      } else if (type === "reset") {
        if (values.password !== values.confirm) {
          form.elements.confirm.setCustomValidity("Les mots de passe ne correspondent pas.");
          form.elements.confirm.reportValidity();
          return;
        }
        showFormMessage(form, "Mot de passe mis à jour pour cette démonstration locale.");
      } else if (type === "verify") {
        const current = profile();
        write("profile", { ...current, verified: true });
        location.hash = "student-dashboard";
      } else if (type === "pricing") {
        write("pricing", values);
        alert("Tarifs enregistrés dans ce navigateur.");
      } else if (type === "settings" || type === "admin") {
        write(type, values);
        alert("Modifications enregistrées dans ce navigateur.");
      }
    }));
    const resetConfirmation = document.querySelector('form[data-workspace-form="reset"] [name="confirm"]');
    resetConfirmation?.addEventListener("input", () => resetConfirmation.setCustomValidity(""));
    document.querySelectorAll("[data-model]").forEach(button => button.addEventListener("click", () => {
      document.getElementById("model-preview-dialog")?.close();
      updateReport({ model: button.dataset.model, step: Math.max(activeReport()?.step || 0, 7) });
      refreshPage();
    }));
    document.querySelectorAll("[data-preview-model]").forEach(button => button.addEventListener("click", () => {
      const index = Number(button.dataset.previewModel);
      const model = modelOptions[index];
      const dialog = document.getElementById("model-preview-dialog");
      const body = dialog?.querySelector("[data-model-preview-body]");
      if (!dialog || !body || !model) return;
      body.innerHTML = `<span class="workspace-step-label">APERÇU DU MODÈLE</span><h2>${escapeHtml(model)}</h2><img class="model-dialog-image" src="assets/model-${["academic", "professional", "initiation", "final"][index]}.svg" alt="Aperçu de la couverture du modèle ${escapeHtml(model)}"><p>${escapeHtml(modelDescriptions[index])}</p><button class="button" type="button" data-model="${escapeHtml(model)}">Choisir ce modèle</button>`;
      body.querySelector("[data-model]")?.addEventListener("click", () => {
        updateReport({ model, step: Math.max(activeReport()?.step || 0, 7) });
        dialog.close();
        refreshPage();
      });
      dialog.showModal();
    }));
    document.getElementById("model-preview-dialog")?.addEventListener("click", event => {
      if (event.target === event.currentTarget) event.currentTarget.close();
    });
    document.querySelectorAll("[data-section]").forEach(button => button.addEventListener("click", () => {
      updateReport({ sectionIndex: Number(button.dataset.section) });
      refreshPage();
    }));
    document.querySelectorAll("[data-section-move]").forEach(button => button.addEventListener("click", () => {
      const report = activeReport();
      const next = Math.max(0, Math.min(sectionNames.length - 1, (report.sectionIndex || 0) + Number(button.dataset.sectionMove)));
      const sections = { ...(report.sections || {}), [sectionNames[report.sectionIndex || 0]]: document.querySelector("[data-section-text]")?.value || "" };
      updateReport({ sectionIndex: next, sections });
      refreshPage();
    }));
    const sectionText = document.querySelector("[data-section-text]");
    sectionText?.addEventListener("input", () => {
      const report = activeReport();
      const index = report.sectionIndex || 0;
      const sections = { ...(report.sections || {}), [sectionNames[index]]: sectionText.value };
      updateReport({ sections });
      const counter = document.getElementById("word-count");
      if (counter) counter.textContent = sectionText.value.trim() ? sectionText.value.trim().split(/\s+/).length : 0;
    });
    document.querySelectorAll("[data-open-report]").forEach(link => link.addEventListener("click", () => write("activeReport", link.dataset.openReport)));
    document.querySelectorAll("[data-report-filter]").forEach(button => button.addEventListener("click", () => {
      document.querySelectorAll("[data-report-filter]").forEach(item => item.classList.toggle("active", item === button));
      document.querySelectorAll(".report-row[data-status]").forEach(row => row.hidden = button.dataset.reportFilter !== "all" && row.dataset.status !== button.dataset.reportFilter);
    }));
    document.querySelectorAll("[data-table-search]").forEach(input => input.addEventListener("input", () => {
      const query = input.value.toLocaleLowerCase("fr");
      document.querySelectorAll(".workspace-table tbody tr").forEach(row => row.hidden = !row.innerText.toLocaleLowerCase("fr").includes(query));
    }));
    document.querySelectorAll("[data-action]").forEach(button => button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "mark-all-read") {
        write("notifications", read("notifications", defaultNotifications()).map(item => ({ ...item, read: true })));
        refreshPage();
      } else if (action === "clear-data" && confirm("Supprimer les rapports et données enregistrés dans ce navigateur ?")) {
        ["reports", "activeReport", "profile"].forEach(key => localStorage.removeItem(`wablo.${key}`));
        location.hash = "home";
      } else if (action === "print-report") window.print();
      else if (action === "export-text") {
        const report = activeReport();
        const content = `${reportTitle(report)}\n\n${sectionNames.map(name => `${name}\n${report?.sections?.[name] || ""}`).join("\n\n")}`;
        const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
        const link = document.createElement("a");
        link.href = url;
        link.download = `${reportTitle(report).replace(/[^\p{L}\p{N}-]+/gu, "-")}.txt`;
        link.click();
        URL.revokeObjectURL(url);
      } else if (action === "export-word") {
        const report = activeReport();
        const sections = sectionNames.map(name => `<h2>${escapeHtml(name)}</h2><p>${escapeHtml(report?.sections?.[name] || "")}</p>`).join("");
        const content = `<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:Calibri,Arial,sans-serif;line-height:1.6}h1{text-align:center;margin:3em 0}h2{color:#193d5b;border-bottom:1px solid #d5dde5;padding-bottom:5px}</style></head><body><h1>${escapeHtml(reportTitle(report))}</h1><p>${escapeHtml(report?.firstName || profile().firstName)} ${escapeHtml(report?.lastName || profile().lastName)}</p>${sections}</body></html>`;
        const url = URL.createObjectURL(new Blob([content], { type: "application/msword;charset=utf-8" }));
        const link = document.createElement("a");
        link.href = url;
        link.download = `${reportTitle(report).replace(/[^\p{L}\p{N}-]+/gu, "-")}.doc`;
        link.click();
        URL.revokeObjectURL(url);
      } else if (action === "resend-code") alert("Un nouveau code sera envoyé lorsque le service e-mail sera configuré.");
      else if (action === "add-demo-user") {
        const current = read("users", [{ name: "Aïcha Dossou", email: "aicha@exemple.com", role: "Étudiant", status: "Actif" }, { name: "Komla Agbodjan", email: "admin@wablo.example", role: "Administrateur", status: "Actif" }]);
        current.push({ name: "Nouvel utilisateur", email: `etudiant${current.length}@exemple.com`, role: "Étudiant", status: "Actif" });
        write("users", current);
        refreshPage();
      } else if (action === "save-settings") alert("Permissions enregistrées pour cette démonstration locale.");
      else if (action === "toggle-user") alert("Cette action requiert un service d'administration sécurisé.");
    }));
    document.querySelectorAll("[data-read-notification]").forEach(button => button.addEventListener("click", () => {
      const values = read("notifications", defaultNotifications());
      const item = values[Number(button.dataset.readNotification)];
      if (!item) return;
      item.read = true;
      write("notifications", values);
      refreshPage();
    }));
  }

  window.workspaceScreens = { isWorkspace, render, bind, routeTitles, titleFor };
})();
