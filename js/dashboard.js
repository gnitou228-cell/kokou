/* ==========================================================================
   VANDIA AI - Professional SaaS Dashboard Controller
   High-performance Interactive Single Page Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- State Management ---
  const state = {
    currentView: 'overview',
    currency: 'USD', // 'USD' or 'XOF'
    exchangeRate: 565, // 1 USD ≈ 565 XOF
    isAiAutopilot: true,
    activeThreadId: 'thread-1',
    tokensUsed: 412500,
    tokensTotal: 500000,
    threads: [
      {
        id: 'thread-1',
        name: 'Amina Traoré',
        phone: '+225 07 45 12 89',
        channel: 'whatsapp',
        avatarBg: 'linear-gradient(135deg, #25d366, #059669)',
        avatarText: 'AT',
        time: '12:44',
        unread: 1,
        sentiment: 'hot',
        tags: ['Lead Chaud', 'Shopify Panier'],
        totalSpendUSD: 145,
        notes: 'Intéressée par le pack VIP. A demandé si le paiement Wave est disponible.',
        messages: [
          { sender: 'client', text: 'Bonjour ! J’ai vu votre offre sur WhatsApp mais je n’arrive pas à valider mon panier sur votre site.', time: '12:40' },
          { sender: 'ai', text: 'Bonjour Amina ! 👋 Ravie de vous assister. Ne vous inquiétez pas, je peux générer directement votre lien de paiement instantané Wave ou Orange Money ici même sur WhatsApp.', time: '12:41', isAi: true },
          { sender: 'client', text: 'Super ! Quel est le tarif avec la réduction de 50% ?', time: '12:43' },
          { sender: 'ai', text: 'Voici votre récapitulatif avec l’offre de bienvenue spéciale (-50% à vie) :', time: '12:44', isAi: true, hasProduct: true, productTitle: 'Abonnement VANDIA Pro (Accès Annuel)', productPrice: '$288 (162 720 XOF)', payMethod: 'Wave 🌊' }
        ]
      },
      {
        id: 'thread-2',
        name: 'Fatou Sow',
        phone: '+221 77 120 44 55',
        channel: 'whatsapp',
        avatarBg: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
        avatarText: 'FS',
        time: '11:30',
        unread: 0,
        sentiment: 'warm',
        tags: ['Client VIP', 'Dakar'],
        totalSpendUSD: 420,
        notes: 'Cliente fidèle boutique Dakar. Achète régulièrement en gros.',
        messages: [
          { sender: 'client', text: 'Salam, envoyez-moi le catalogue des nouvelles arrivées svp.', time: '11:28' },
          { sender: 'ai', text: 'Wa alaykoum salam Fatou ! Voici notre catalogue exclusif de cette semaine avec les tarifs préférentiels revendeurs. 📦✨', time: '11:30', isAi: true }
        ]
      },
      {
        id: 'thread-3',
        name: 'Jean-Marc Koffi',
        phone: '+225 05 99 22 11',
        channel: 'instagram',
        avatarBg: 'linear-gradient(135deg, #e1306c, #833ab4)',
        avatarText: 'JK',
        time: 'Hier',
        unread: 0,
        sentiment: 'paid',
        tags: ['Commande Validée', 'Wave Encaissé'],
        totalSpendUSD: 85,
        notes: 'Commande #4912 livrée à Abidjan Plateau.',
        messages: [
          { sender: 'client', text: 'Paiement Wave de 25 000 FCFA effectué avec succès !', time: 'Hier 16:20' },
          { sender: 'ai', text: 'Paiement bien reçu Jean-Marc ! 🎉 Votre commande est en cours de préparation pour livraison rapide.', time: 'Hier 16:21', isAi: true }
        ]
      },
      {
        id: 'thread-4',
        name: 'Aïcha Diallo',
        phone: '+224 62 11 22 33',
        channel: 'messenger',
        avatarBg: 'linear-gradient(135deg, #0084ff, #00c6ff)',
        avatarText: 'AD',
        time: 'Hier',
        unread: 0,
        sentiment: 'warm',
        tags: ['Lead'],
        totalSpendUSD: 0,
        notes: 'A découvert VANDIA via la campagne Facebook Ads.',
        messages: [
          { sender: 'client', text: 'Est-ce que ça marche aussi pour la Guinée ?', time: 'Hier 14:10' },
          { sender: 'ai', text: 'Absolument Aïcha ! VANDIA fonctionne partout dans le monde avec l’API WhatsApp Cloud officielle. 🌍', time: 'Hier 14:11', isAi: true }
        ]
      }
    ],
    campaigns: [
      { id: 1, name: 'Promo Flash - Fin de Semaine 🔥', target: 'Clients VIP (1,500 contacts)', sent: 1500, delivered: '99.4%', read: '94.2%', revenue: '$3,850', status: 'completed' },
      { id: 2, name: 'Relance Paniers Abandonnés J-3 🛒', target: 'Paniers non payés (340 contacts)', sent: 340, delivered: '100%', read: '91.8%', revenue: '$1,420', status: 'completed' },
      { id: 3, name: 'Diffusion Nouveautés Catalogue 📦', target: 'Tous les abonnés (5,200 contacts)', sent: 2150, delivered: '98.9%', read: '86.4%', revenue: '$2,100', status: 'running' },
      { id: 4, name: 'Offre Fidélité Mobile Money Wave 🌊', target: 'Clients Côte d’Ivoire (850 contacts)', sent: 0, delivered: '-', read: '-', revenue: '-', status: 'scheduled' }
    ]
  };

  // --- Elements Cached ---
  const navItems = document.querySelectorAll('.dash-nav-item');
  const viewSections = document.querySelectorAll('.dash-view-section');
  const pageTitleEl = document.getElementById('viewTitleText');
  const currBtns = document.querySelectorAll('.dash-currency-toggle .curr-btn');
  const sidebarMobileToggle = document.getElementById('sidebarMobileToggle');
  const dashSidebar = document.querySelector('.dash-sidebar');
  const sidebarCloseMobile = document.getElementById('sidebarCloseMobile');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');
  const chatBackMobileBtn = document.getElementById('chatBackMobileBtn');
  const inboxFullContainer = document.querySelector('.inbox-full-container');

  // --- Initializing Chart Instances Cache ---
  let revenueChartInstance = null;
  let funnelChartInstance = null;

  // ==========================================================================
  // MOBILE DRAWER HANDLERS
  // ==========================================================================
  function openMobileSidebar() {
    if (dashSidebar) dashSidebar.classList.add('mobile-open');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileSidebar() {
    if (dashSidebar) dashSidebar.classList.remove('mobile-open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (sidebarMobileToggle) {
    sidebarMobileToggle.addEventListener('click', () => {
      if (dashSidebar && dashSidebar.classList.contains('mobile-open')) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });
  }

  if (sidebarCloseMobile) {
    sidebarCloseMobile.addEventListener('click', closeMobileSidebar);
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', closeMobileSidebar);
  }

  // ==========================================================================
  // NAVIGATION ROUTER
  // ==========================================================================
  function switchView(viewName) {
    if (!viewName) return;
    state.currentView = viewName;

    // Update Sidebar Navigation state
    navItems.forEach(item => {
      const link = item.querySelector('.dash-nav-link');
      if (link && link.getAttribute('data-view') === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update View Sections visibility
    viewSections.forEach(section => {
      if (section.id === `view-${viewName}`) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    // Update Header Page Title (Responsive span)
    const titles = {
      'overview': '<i class="fas fa-chart-line" style="color:var(--emerald-whatsapp);"></i> <span class="header-title-text">Tableau de Bord VANDIA IA</span>',
      'inbox': '<i class="fas fa-inbox" style="color:var(--emerald-whatsapp);"></i> <span class="header-title-text">Boîte de Réception</span>',
      'ai-agent': '<i class="fas fa-brain" style="color:var(--purple-accent);"></i> <span class="header-title-text">Agent Commercial IA</span>',
      'broadcast': '<i class="fas fa-bullhorn" style="color:var(--cyan-accent);"></i> <span class="header-title-text">Diffusions de Masse</span>',
      'automations': '<i class="fas fa-project-diagram" style="color:var(--amber-accent);"></i> <span class="header-title-text">Flow Builder</span>',
      'contacts': '<i class="fas fa-address-book" style="color:var(--emerald-whatsapp);"></i> <span class="header-title-text">Contacts CRM</span>',
      'templates': '<i class="fas fa-file-alt" style="color:var(--cyan-accent);"></i> <span class="header-title-text">Modèles WhatsApp</span>',
      'devices': '<i class="fas fa-mobile-alt" style="color:var(--emerald-whatsapp);"></i> <span class="header-title-text">Numéros & Appareils</span>',
      'integrations': '<i class="fas fa-puzzle-piece" style="color:var(--purple-accent);"></i> <span class="header-title-text">Intégrations</span>',
      'analytics': '<i class="fas fa-chart-pie" style="color:var(--emerald-whatsapp);"></i> <span class="header-title-text">Statistiques</span>',
      'settings': '<i class="fas fa-cog" style="color:var(--text-muted);"></i> <span class="header-title-text">Paramètres</span>'
    };

    if (pageTitleEl && titles[viewName]) {
      pageTitleEl.innerHTML = titles[viewName];
    }

    // Lazy initialization of charts if needed
    if (viewName === 'overview' && !revenueChartInstance) {
      setTimeout(initOverviewCharts, 50);
    } else if (viewName === 'analytics' && !funnelChartInstance) {
      setTimeout(initAnalyticsCharts, 50);
    }

    // Auto-close mobile sidebar if open
    closeMobileSidebar();

    // Reset inbox view to threads list on mobile if opening inbox
    if (viewName === 'inbox' && window.innerWidth <= 900 && inboxFullContainer) {
      inboxFullContainer.classList.remove('chat-view-open');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Attach nav item click events
  document.querySelectorAll('.dash-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.getAttribute('data-view');
      if (targetView) switchView(targetView);
    });
  });

  // ==========================================================================
  // CURRENCY SWITCHER (USD <-> XOF FCFA)
  // ==========================================================================
  function updateCurrency(newCurrency) {
    state.currency = newCurrency;
    currBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-curr') === newCurrency);
    });

    // Update all dynamic price elements marked with data-usd
    const priceElements = document.querySelectorAll('[data-usd]');
    priceElements.forEach(el => {
      const usdVal = parseFloat(el.getAttribute('data-usd'));
      if (isNaN(usdVal)) return;

      if (newCurrency === 'USD') {
        el.textContent = '$' + usdVal.toLocaleString('fr-FR');
      } else {
        const xofVal = Math.round(usdVal * state.exchangeRate);
        el.textContent = xofVal.toLocaleString('fr-FR') + ' XOF';
      }
    });

    showToast(`Devise changée en ${newCurrency === 'USD' ? 'Dollars ($)' : 'Francs CFA (XOF)'}`);
  }

  currBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const curr = btn.getAttribute('data-curr');
      if (curr && curr !== state.currency) {
        updateCurrency(curr);
      }
    });
  });

  // ==========================================================================
  // CHARTS INITIALIZATION (Chart.js)
  // ==========================================================================
  function initOverviewCharts() {
    const ctx = document.getElementById('revenueActivityChart');
    if (!ctx) return;

    if (revenueChartInstance) {
      revenueChartInstance.destroy();
    }

    revenueChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['01 Oct', '02 Oct', '03 Oct', '04 Oct', '05 Oct', '06 Oct', '07 Oct', '08 Oct', '09 Oct', '10 Oct', '11 Oct', '12 Oct', '13 Oct', 'Aujourd’hui'],
        datasets: [
          {
            label: 'Ventes Encaissées ($)',
            data: [340, 480, 620, 510, 890, 750, 980, 1120, 940, 1250, 1420, 1180, 1560, 1840],
            borderColor: '#25d366',
            backgroundColor: 'rgba(37, 211, 102, 0.12)',
            fill: true,
            tension: 0.4,
            borderWidth: 2.5,
            pointBackgroundColor: '#25d366',
            pointRadius: 4,
            pointHoverRadius: 6,
            yAxisID: 'y'
          },
          {
            label: 'Conversations Automatisées IA',
            data: [42, 58, 64, 52, 95, 88, 112, 134, 105, 148, 165, 140, 189, 215],
            borderColor: '#8b5cf6',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: '#8b5cf6',
            pointRadius: 3,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#94a3b8',
              font: { family: 'Inter', size: 12 },
              usePointStyle: true,
              boxWidth: 8
            }
          },
          tooltip: {
            backgroundColor: '#111a2d',
            titleColor: '#fff',
            bodyColor: '#cbd5e1',
            borderColor: 'rgba(37, 211, 102, 0.3)',
            borderWidth: 1,
            padding: 12,
            boxPadding: 6
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.04)' },
            ticks: { color: '#64748b', font: { family: 'Inter', size: 11 } }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            grid: { color: 'rgba(255, 255, 255, 0.04)' },
            ticks: {
              color: '#64748b',
              callback: value => '$' + value
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: { color: '#8b5cf6' }
          }
        }
      }
    });
  }

  function initAnalyticsCharts() {
    const ctx = document.getElementById('conversionFunnelChart');
    if (!ctx) return;

    if (funnelChartInstance) {
      funnelChartInstance.destroy();
    }

    funnelChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Messages WhatsApp Entrants', 'Engagements IA & Qualification', 'Fiches Produits / Catalogues Vus', 'Liens de Paiement Générés', 'Commandes Encaissées (Wave/OM/CB)'],
        datasets: [{
          label: 'Volume de prospects',
          data: [4280, 3950, 2840, 1680, 1215],
          backgroundColor: [
            'rgba(37, 211, 102, 0.85)',
            'rgba(6, 182, 212, 0.85)',
            'rgba(139, 92, 246, 0.85)',
            'rgba(245, 158, 11, 0.85)',
            'rgba(16, 185, 129, 1)'
          ],
          borderRadius: 8,
          barThickness: 32
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#111a2d',
            titleColor: '#fff',
            bodyColor: '#cbd5e1',
            borderColor: 'rgba(37, 211, 102, 0.3)',
            borderWidth: 1
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.04)' },
            ticks: { color: '#64748b' }
          }
        }
      }
    });
  }

  // ==========================================================================
  // LIVE OMNICHANNEL INBOX ENGINE
  // ==========================================================================
  const threadsContainer = document.getElementById('inboxThreadsList');
  const chatMessagesBody = document.getElementById('chatMessagesBody');
  const activeChatPartnerName = document.getElementById('activeChatPartnerName');
  const activeChatPartnerPhone = document.getElementById('activeChatPartnerPhone');
  const activeChatAvatar = document.getElementById('activeChatAvatar');
  const chatComposerInput = document.getElementById('chatComposerInput');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const aiAutopilotToggle = document.getElementById('aiAutopilotToggle');
  const crmContactName = document.getElementById('crmContactName');
  const crmContactPhone = document.getElementById('crmContactPhone');
  const crmTotalSpend = document.getElementById('crmTotalSpend');
  const crmInternalNotes = document.getElementById('crmInternalNotes');

  function renderThreadsList(filterChannel = 'all') {
    if (!threadsContainer) return;
    threadsContainer.innerHTML = '';

    const filtered = filterChannel === 'all'
      ? state.threads
      : state.threads.filter(t => t.channel === filterChannel);

    filtered.forEach(thread => {
      const item = document.createElement('div');
      item.className = `thread-item ${thread.id === state.activeThreadId ? 'active' : ''}`;
      item.setAttribute('data-id', thread.id);

      const lastMsg = thread.messages[thread.messages.length - 1];
      const previewText = lastMsg ? lastMsg.text : 'Discussion ouverte...';

      const platformIcon = thread.channel === 'whatsapp' ? 'fab fa-whatsapp platform-whatsapp'
        : thread.channel === 'instagram' ? 'fab fa-instagram platform-instagram'
        : 'fab fa-facebook-messenger platform-messenger';

      item.innerHTML = `
        <div class="thread-avatar" style="background:${thread.avatarBg};">
          ${thread.avatarText}
          <div class="avatar-badge-platform"><i class="${platformIcon}"></i></div>
        </div>
        <div class="thread-info">
          <div class="thread-top-meta">
            <span class="thread-contact-name">${thread.name}</span>
            <span class="thread-time-label">${thread.time}</span>
          </div>
          <div class="thread-preview-row">
            <span class="thread-preview-text">${previewText}</span>
            ${thread.unread > 0 ? `<span class="thread-unread-pill">${thread.unread}</span>` : ''}
          </div>
        </div>
      `;

      item.addEventListener('click', () => {
        selectThread(thread.id);
      });

      threadsContainer.appendChild(item);
    });
  }

  function selectThread(threadId) {
    state.activeThreadId = threadId;
    const thread = state.threads.find(t => t.id === threadId);
    if (!thread) return;

    // Slide into active chat on mobile viewports
    if (inboxFullContainer) {
      inboxFullContainer.classList.add('chat-view-open');
    }

    // Clear unread
    thread.unread = 0;
    renderThreadsList();

    // Update Header
    if (activeChatPartnerName) activeChatPartnerName.textContent = thread.name;
    if (activeChatPartnerPhone) activeChatPartnerPhone.textContent = thread.phone;
    if (activeChatAvatar) {
      activeChatAvatar.style.background = thread.avatarBg;
      activeChatAvatar.textContent = thread.avatarText;
    }

    // Update CRM Panel
    if (crmContactName) crmContactName.textContent = thread.name;
    if (crmContactPhone) crmContactPhone.textContent = thread.phone;
    if (crmTotalSpend) {
      crmTotalSpend.setAttribute('data-usd', thread.totalSpendUSD);
      if (state.currency === 'USD') {
        crmTotalSpend.textContent = '$' + thread.totalSpendUSD;
      } else {
        crmTotalSpend.textContent = Math.round(thread.totalSpendUSD * state.exchangeRate).toLocaleString('fr-FR') + ' XOF';
      }
    }
    if (crmInternalNotes) crmInternalNotes.value = thread.notes || '';

    // Render Messages
    renderMessages(thread);
  }

  function renderMessages(thread) {
    if (!chatMessagesBody) return;
    chatMessagesBody.innerHTML = `
      <div class="chat-date-separator">
        <span>Aujourd’hui • Session Sécurisée Meta Cloud API</span>
      </div>
    `;

    thread.messages.forEach(msg => {
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${msg.sender === 'client' ? 'received' : 'sent'}`;

      let innerExtra = '';
      if (msg.isAi) {
        innerExtra += `
          <div class="ai-sent-badge">
            <i class="fas fa-robot"></i> Réponse Agent IA VANDIA (1s)
          </div>
        `;
      }

      if (msg.hasProduct) {
        innerExtra += `
          <div class="chat-product-card-preview">
            <div class="chat-product-img"><i class="fas fa-shopping-bag" style="font-size:1.5rem;color:var(--emerald-whatsapp);"></i></div>
            <div class="chat-product-info">
              <h5>${msg.productTitle}</h5>
              <p>${msg.productPrice}</p>
            </div>
          </div>
          <a class="chat-pay-btn-inline" href="javascript:void(0)" onclick="alert('Lien de paiement Wave/Mobile Money envoyé au client !')">
            <i class="fas fa-money-bill-wave"></i> Payer avec ${msg.payMethod || 'Wave 🌊'}
          </a>
        `;
      }

      bubble.innerHTML = `
        <div class="bubble-content">
          ${innerExtra}
          <div>${msg.text}</div>
          <div class="bubble-time">
            ${msg.time}
            ${msg.sender !== 'client' ? '<i class="fas fa-check-double" style="color:var(--cyan-accent);font-size:0.65rem;"></i>' : ''}
          </div>
        </div>
      `;

      chatMessagesBody.appendChild(bubble);
    });

    chatMessagesBody.scrollTop = chatMessagesBody.scrollHeight;
  }

  function sendMessageFromComposer() {
    if (!chatComposerInput) return;
    const text = chatComposerInput.value.trim();
    if (!text) return;

    const thread = state.threads.find(t => t.id === state.activeThreadId);
    if (!thread) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Append operator message
    thread.messages.push({
      sender: 'operator',
      text: text,
      time: timeStr,
      isAi: false
    });

    chatComposerInput.value = '';
    renderMessages(thread);
    renderThreadsList();

    showToast('Message WhatsApp envoyé');
  }

  // Mobile back to threads list
  if (chatBackMobileBtn && inboxFullContainer) {
    chatBackMobileBtn.addEventListener('click', () => {
      inboxFullContainer.classList.remove('chat-view-open');
    });
  }

  if (chatSendBtn) {
    chatSendBtn.addEventListener('click', sendMessageFromComposer);
  }
  if (chatComposerInput) {
    chatComposerInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessageFromComposer();
      }
    });
  }

  // Canned response pills
  document.querySelectorAll('.canned-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const text = pill.getAttribute('data-reply') || pill.textContent;
      if (chatComposerInput) {
        chatComposerInput.value = text;
        chatComposerInput.focus();
      }
    });
  });

  // Channel filter tabs
  document.querySelectorAll('.channel-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.channel-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const channel = btn.getAttribute('data-channel');
      renderThreadsList(channel);
    });
  });

  // AI Autopilot switch
  if (aiAutopilotToggle) {
    aiAutopilotToggle.addEventListener('click', () => {
      state.isAiAutopilot = !state.isAiAutopilot;
      aiAutopilotToggle.classList.toggle('active', state.isAiAutopilot);
      aiAutopilotToggle.innerHTML = state.isAiAutopilot
        ? '<i class="fas fa-robot"></i> <span>IA Autopilot : Activée</span>'
        : '<i class="fas fa-user"></i> <span>Mode Manuel : Agent Humain</span>';
      
      showToast(state.isAiAutopilot ? 'Agent IA VANDIA activé sur ce contact' : 'Prise de relais par un agent humain');
    });
  }

  // ==========================================================================
  // AI AGENT SANDBOX SIMULATOR (TEST TAB)
  // ==========================================================================
  const sandboxInput = document.getElementById('sandboxInput');
  const sandboxSendBtn = document.getElementById('sandboxSendBtn');
  const sandboxChatBody = document.getElementById('sandboxChatBody');
  const toneChips = document.querySelectorAll('.tone-chip');

  toneChips.forEach(chip => {
    chip.addEventListener('click', () => {
      toneChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      showToast(`Style d'argumentation de l'IA mis à jour : ${chip.textContent.trim()}`);
    });
  });

  function simulateAiReply(userText) {
    if (!sandboxChatBody) return;

    // User message bubble
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble received';
    userBubble.innerHTML = `
      <div class="bubble-content">
        <div>${userText}</div>
        <div class="bubble-time">À l'instant</div>
      </div>
    `;
    sandboxChatBody.appendChild(userBubble);
    sandboxChatBody.scrollTop = sandboxChatBody.scrollHeight;

    // Typing simulation
    setTimeout(() => {
      let aiText = "Merci pour votre question ! Avec VANDIA, votre entreprise dispose d'un commercial IA qui répond en moins d'une seconde, présente vos produits et encaisse directement par Wave et Orange Money 🚀";
      
      const lower = userText.toLowerCase();
      if (lower.includes('prix') || lower.includes('forfait') || lower.includes('tarif')) {
        aiText = "Nos forfaits démarrent à 12 $ /mois (soit environ 6 784 XOF) avec 50% de réduction à vie appliquée immédiatement. Souhaitez-vous le lien direct pour sécuriser ce tarif garanti ?";
      } else if (lower.includes('shopify') || lower.includes('site') || lower.includes('woocomerce')) {
        aiText = "Absolument ! VANDIA se synchronise en 2 minutes avec Shopify et WooCommerce pour récupérer vos catalogues, synchroniser les stocks et relancer les paniers abandonnés automatiquement.";
      } else if (lower.includes('wave') || lower.includes('orange') || lower.includes('payer')) {
        aiText = "Nous intégrons nativement Wave, Orange Money, MTN MoMo et Carte Bancaire. Le client clique sur un bouton dans WhatsApp et le paiement est immédiatement validé dans votre tableau de bord.";
      }

      const aiBubble = document.createElement('div');
      aiBubble.className = 'chat-bubble sent';
      aiBubble.innerHTML = `
        <div class="bubble-content">
          <div class="ai-sent-badge"><i class="fas fa-bolt"></i> IA VANDIA Réponse</div>
          <div>${aiText}</div>
          <div class="bubble-time">À l'instant <i class="fas fa-check-double" style="color:var(--cyan-accent);"></i></div>
        </div>
      `;
      sandboxChatBody.appendChild(aiBubble);
      sandboxChatBody.scrollTop = sandboxChatBody.scrollHeight;
    }, 700);
  }

  if (sandboxSendBtn && sandboxInput) {
    const handleSend = () => {
      const text = sandboxInput.value.trim();
      if (!text) return;
      sandboxInput.value = '';
      simulateAiReply(text);
    };
    sandboxSendBtn.addEventListener('click', handleSend);
    sandboxInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  // ==========================================================================
  // MASS BROADCAST MODAL & ENGINE
  // ==========================================================================
  const newBroadcastBtn = document.getElementById('newBroadcastBtn');
  const broadcastModal = document.getElementById('broadcastModal');
  const closeBroadcastModal = document.getElementById('closeBroadcastModal');
  const broadcastForm = document.getElementById('broadcastForm');

  if (newBroadcastBtn && broadcastModal) {
    newBroadcastBtn.addEventListener('click', () => {
      broadcastModal.classList.add('active');
    });
  }
  if (closeBroadcastModal && broadcastModal) {
    closeBroadcastModal.addEventListener('click', () => {
      broadcastModal.classList.remove('active');
    });
  }
  if (broadcastForm) {
    broadcastForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const campaignName = document.getElementById('bcastName').value;
      const targetAudience = document.getElementById('bcastAudience').value;

      state.campaigns.unshift({
        id: Date.now(),
        name: campaignName,
        target: targetAudience,
        sent: 0,
        delivered: 'En cours',
        read: '-',
        revenue: '$0',
        status: 'running'
      });

      renderCampaignsTable();
      broadcastModal.classList.remove('active');
      showToast(`Campagne "${campaignName}" lancée avec succès via SafeSend™`);
    });
  }

  function renderCampaignsTable() {
    const tbody = document.getElementById('campaignsTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    state.campaigns.forEach(c => {
      const tr = document.createElement('tr');
      const statusBadge = c.status === 'completed' ? '<span class="badge-status completed"><i class="fas fa-check-circle"></i> Terminé</span>'
        : c.status === 'running' ? '<span class="badge-status running"><i class="fas fa-spinner fa-spin"></i> En cours</span>'
        : '<span class="badge-status scheduled"><i class="fas fa-clock"></i> Programmé</span>';

      tr.innerHTML = `
        <td><strong>${c.name}</strong></td>
        <td><span style="color:var(--text-muted);">${c.target}</span></td>
        <td><strong>${c.sent.toLocaleString()}</strong></td>
        <td><span style="color:var(--emerald-whatsapp);font-weight:600;">${c.delivered}</span></td>
        <td><span style="color:var(--cyan-accent);font-weight:600;">${c.read}</span></td>
        <td><strong style="color:#fff;">${c.revenue}</strong></td>
        <td>${statusBadge}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ==========================================================================
  // WHATSAPP PAIRING & QR CODE SIMULATION MODAL
  // ==========================================================================
  const pairDeviceBtn = document.getElementById('pairDeviceBtn');
  const qrModal = document.getElementById('qrModal');
  const closeQrModal = document.getElementById('closeQrModal');
  const simulateScanBtn = document.getElementById('simulateScanBtn');

  if (pairDeviceBtn && qrModal) {
    pairDeviceBtn.addEventListener('click', () => {
      qrModal.classList.add('active');
    });
  }
  if (closeQrModal && qrModal) {
    closeQrModal.addEventListener('click', () => {
      qrModal.classList.remove('active');
    });
  }
  if (simulateScanBtn && qrModal) {
    simulateScanBtn.addEventListener('click', () => {
      simulateScanBtn.disabled = true;
      simulateScanBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Appairage en cours...';

      setTimeout(() => {
        qrModal.classList.remove('active');
        simulateScanBtn.disabled = false;
        simulateScanBtn.innerHTML = '<i class="fas fa-camera"></i> Simuler le Scan Réussi';
        showToast('Numéro WhatsApp appairé avec succès ! Coexistence activée 🟢');
      }, 1500);
    });
  }

  // ==========================================================================
  // INTEGRATIONS TOGGLE LOGIC
  // ==========================================================================
  document.querySelectorAll('.integration-toggle-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const name = e.target.getAttribute('data-integration') || 'Outil';
      const isChecked = e.target.checked;
      showToast(`${name} : ${isChecked ? 'Synchronisation activée 🟢' : 'Déconnecté'}`);
    });
  });

  // ==========================================================================
  // FLOW BUILDER ACTIONS
  // ==========================================================================
  const testFlowBtn = document.getElementById('testFlowBtn');
  if (testFlowBtn) {
    testFlowBtn.addEventListener('click', () => {
      showToast('Simulation du tunnel de vente lancée... Tout fonctionne à 100% ✨');
    });
  }

  // ==========================================================================
  // UNIVERSAL TOAST NOTIFICATIONS
  // ==========================================================================
  const toastContainer = document.getElementById('dashToastContainer');
  function showToast(message, icon = 'fas fa-check-circle') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'dash-toast';
    toast.innerHTML = `
      <i class="${icon}" style="color:var(--emerald-whatsapp);font-size:1.1rem;"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Global expose for inline actions
  window.showDashboardToast = showToast;
  window.switchDashboardView = switchView;

  // ==========================================================================
  // USER SESSION & PROFILE SYNCHRONIZATION
  // ==========================================================================
  function syncUserProfile() {
    const rawUser = localStorage.getItem('vandia_user');
    if (!rawUser) return;
    try {
      const user = JSON.parse(rawUser);

      // 1. User Name & Avatar Initial
      if (user.name) {
        // Welcome hero banner
        const welcomeEl = document.querySelector('.overview-welcome-banner h2');
        if (welcomeEl) welcomeEl.innerHTML = `Bienvenue sur votre espace VANDIA IA, ${user.name} 👋`;

        // Sidebar user meta
        const userNameEl = document.getElementById('sidebarUserName') || document.querySelector('.user-meta-name');
        if (userNameEl) userNameEl.textContent = user.name;

        // User avatar initials
        const avatarEl = document.getElementById('sidebarAvatarCircle') || document.querySelector('.user-avatar-circle');
        if (avatarEl) {
          const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
          avatarEl.textContent = initials || 'VA';
        }

        // Settings team table: Owner name
        const ownerTeamName = document.getElementById('ownerTeamName');
        if (ownerTeamName) ownerTeamName.textContent = user.name;

        // Settings company name
        const settingsBrandName = document.getElementById('settingsBrandName') || document.querySelector('input[value="VANDIA Commerce SARL"]');
        if (settingsBrandName) {
          settingsBrandName.value = user.name.includes(' ') ? `${user.name} Commerce` : `${user.name} SARL`;
        }

        // Canned reply /humain
        const cannedHumainBtn = document.getElementById('cannedHumainBtn');
        const firstName = user.name.split(' ')[0] || 'notre conseiller';
        if (cannedHumainBtn) {
          cannedHumainBtn.setAttribute('data-reply', `Je vous transfère immédiatement à notre conseiller humain ${firstName}. Un instant !`);
        }
      }

      // 2. WhatsApp Phone Number
      if (user.phone) {
        // Top header coexistence status chip
        const coexPhoneText = document.getElementById('coexPhoneText');
        if (coexPhoneText) {
          coexPhoneText.textContent = `${user.phone} (Coexistence Active)`;
        }

        // Devices View: Connected WhatsApp phone card
        const connectedDevicePhone = document.getElementById('connectedDevicePhone');
        if (connectedDevicePhone) {
          connectedDevicePhone.textContent = user.phone;
        }

        // Canned reply /wave
        const cannedWaveBtn = document.getElementById('cannedWaveBtn');
        if (cannedWaveBtn) {
          cannedWaveBtn.setAttribute('data-reply', `Vous pouvez régler directement et en toute sécurité via Wave Mobile Money au ${user.phone}.`);
        }
      }

      // 3. User Email
      if (user.email) {
        // Settings email field
        const settingsEmail = document.getElementById('settingsAdminEmail') || document.querySelector('input[value="moussa.diallo@vandia-ai.com"]');
        if (settingsEmail) settingsEmail.value = user.email;

        // Settings team table: Owner email
        const ownerTeamEmail = document.getElementById('ownerTeamEmail');
        if (ownerTeamEmail) ownerTeamEmail.textContent = user.email;
      }

      // 4. Selected Plan & Tokens Calibration
      if (user.plan) {
        const planTitle = document.getElementById('planInfoTitleText');
        const planTag = document.getElementById('planInfoTagText');
        const planTokensPercent = document.getElementById('planTokensPercent');
        const planProgressBarFill = document.getElementById('planProgressBarFill');
        const planTokensUsed = document.getElementById('planTokensUsedText');
        const planTokensMax = document.getElementById('planTokensMaxText');

        if (user.plan === 'basic') {
          if (planTitle) planTitle.textContent = 'Formule Basic 💪';
          if (planTag) planTag.textContent = '-50% À VIE';
          if (planTokensPercent) planTokensPercent.textContent = '14.2%';
          if (planProgressBarFill) planProgressBarFill.style.width = '14.2%';
          if (planTokensUsed) planTokensUsed.textContent = '14 200 jetons';
          if (planTokensMax) planTokensMax.textContent = 'Max 100k';
        } else if (user.plan === 'enterprise') {
          if (planTitle) planTitle.textContent = 'Formule Enterprise 💎';
          if (planTag) planTag.textContent = 'VIP SUR-MESURE';
          if (planTokensPercent) planTokensPercent.textContent = '42.0%';
          if (planProgressBarFill) planProgressBarFill.style.width = '42%';
          if (planTokensUsed) planTokensUsed.textContent = '840 000 jetons';
          if (planTokensMax) planTokensMax.textContent = 'Max 2M';
        } else {
          // Pro default
          if (planTitle) planTitle.textContent = 'Formule Pro 🚀';
          if (planTag) planTag.textContent = '-50% À VIE';
          if (planTokensPercent) planTokensPercent.textContent = '82.5%';
          if (planProgressBarFill) planProgressBarFill.style.width = '82.5%';
          if (planTokensUsed) planTokensUsed.textContent = '412 500 jetons';
          if (planTokensMax) planTokensMax.textContent = 'Max 500k';
        }
      }
    } catch (e) {
      console.warn('Could not parse user profile', e);
    }
  }

  // Handle logout
  const logoutBtn = document.querySelector('.logout-link-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('vandia_user');
      window.location.href = 'signup.html?mode=login';
    });
  }

  // --- Initial Launches ---
  syncUserProfile();
  renderThreadsList();
  selectThread('thread-1');
  if (window.innerWidth <= 900 && inboxFullContainer) {
    inboxFullContainer.classList.remove('chat-view-open');
  }
  renderCampaignsTable();
  initOverviewCharts();
});
