/* ==========================================================================
   VANDIA AI - Interactive SaaS Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  let currentCurrency = 'USD';
  let isAnnual = false;
  let selectedPlan = 'basic';

  const planData = {
    basic: {
      name: 'Basic 💪',
      usdMonthly: 12,
      usdAnnual: 10,
      xofMonthly: 6784,
      xofAnnual: 5500,
      period: '/mois'
    },
    pro: {
      name: 'Pro 🚀',
      usdMonthly: 30,
      usdAnnual: 24,
      xofMonthly: 16960,
      xofAnnual: 13500,
      period: '/mois'
    },
    enterprise: {
      name: 'Enterprise 💎',
      usdMonthly: 'Sur-mesure',
      usdAnnual: 'Sur-mesure',
      xofMonthly: 'Sur-mesure',
      xofAnnual: 'Sur-mesure',
      period: ''
    }
  };

  const header = document.querySelector('.site-header');
  const currencyBtns = document.querySelectorAll('.currency-option');
  const billingToggle = document.getElementById('billingToggle');
  const toggleMonthlyLabel = document.getElementById('toggleMonthly');
  const toggleAnnualLabel = document.getElementById('toggleAnnual');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const mobileToggle = document.querySelector('.mobile-toggle-btn');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.background = '#0d131f';
      navMenu.style.padding = '20px';
      navMenu.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
    });
  }

  function updatePricingDisplay() {
    const basicAmountEl = document.getElementById('price-basic');
    const basicCurrEl = document.getElementById('curr-basic');
    const basicSubEl = document.getElementById('sub-basic');
    const proAmountEl = document.getElementById('price-pro');
    const proCurrEl = document.getElementById('curr-pro');
    const proSubEl = document.getElementById('sub-pro');
    const entAmountEl = document.getElementById('price-enterprise');
    const entCurrEl = document.getElementById('curr-enterprise');

    if (currentCurrency === 'USD') {
      const bPrice = isAnnual ? planData.basic.usdAnnual : planData.basic.usdMonthly;
      basicAmountEl.textContent = bPrice;
      basicCurrEl.textContent = '$';
      basicSubEl.textContent = '≈ ' + (bPrice * 565).toLocaleString('fr-FR') + ' XOF';

      const pPrice = isAnnual ? planData.pro.usdAnnual : planData.pro.usdMonthly;
      proAmountEl.textContent = pPrice;
      proCurrEl.textContent = '$';
      proSubEl.textContent = '≈ ' + (pPrice * 565).toLocaleString('fr-FR') + ' XOF';

      entAmountEl.textContent = 'Custom';
      entCurrEl.textContent = '';
    } else {
      const bPrice = isAnnual ? planData.basic.xofAnnual : planData.basic.xofMonthly;
      basicAmountEl.textContent = bPrice.toLocaleString('fr-FR');
      basicCurrEl.textContent = 'XOF';
      basicSubEl.textContent = '≈ $' + (isAnnual ? planData.basic.usdAnnual : planData.basic.usdMonthly);

      const pPrice = isAnnual ? planData.pro.xofAnnual : planData.pro.xofMonthly;
      proAmountEl.textContent = pPrice.toLocaleString('fr-FR');
      proCurrEl.textContent = 'XOF';
      proSubEl.textContent = '≈ $' + (isAnnual ? planData.pro.usdAnnual : planData.pro.usdMonthly);

      entAmountEl.textContent = 'Sur-mesure';
      entCurrEl.textContent = '';
    }
  }

  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currencyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCurrency = btn.getAttribute('data-currency');
      updatePricingDisplay();
    });
  });

  if (billingToggle) {
    billingToggle.addEventListener('change', () => {
      isAnnual = billingToggle.checked;
      if (isAnnual) {
        toggleAnnualLabel.classList.add('active');
        toggleMonthlyLabel.classList.remove('active');
      } else {
        toggleMonthlyLabel.classList.add('active');
        toggleAnnualLabel.classList.remove('active');
      }
      updatePricingDisplay();
    });
  }

    // WhatsApp Auto-Play Simulator (Wazzap Style)
  const phoneBody = document.getElementById('phoneChatBody');

  function getCurrentTime() {
    const now = new Date();
    return String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  }

  function appendMessage(text, isSent = false, htmlExtra = null) {
    if (!phoneBody) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = 'msg ' + (isSent ? 'msg-sent' : 'msg-received');
    let content = text;
    if (htmlExtra) content += htmlExtra;
    content += '<span class="msg-time">' + getCurrentTime() + (isSent ? ' <i class="fas fa-check-double" style="color:#53bdeb;margin-left:3px;"></i>' : '') + '</span>';
    msgDiv.innerHTML = content;
    phoneBody.appendChild(msgDiv);
    phoneBody.scrollTop = phoneBody.scrollHeight;
  }

  function showBotTyping(callback, delay = 1000) {
    if (!phoneBody) return;
    const statusEl = document.getElementById('botOnlineStatus');
    if (statusEl) statusEl.textContent = "en train d'ecrire...";
    const typingDiv = document.createElement('div');
    typingDiv.className = 'msg msg-received';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<span style="display:inline-flex;gap:4px;align-items:center;padding:4px 0;"><span style="animation:pulseGlow 1s infinite;width:6px;height:6px;background:#aaa;border-radius:50%;"></span><span style="animation:pulseGlow 1s infinite 0.2s;width:6px;height:6px;background:#aaa;border-radius:50%;"></span><span style="animation:pulseGlow 1s infinite 0.4s;width:6px;height:6px;background:#aaa;border-radius:50%;"></span></span>';
    phoneBody.appendChild(typingDiv);
    phoneBody.scrollTop = phoneBody.scrollHeight;
    setTimeout(() => {
      const tip = document.getElementById('typingIndicator');
      if (tip) tip.remove();
      if (statusEl) statusEl.textContent = 'En ligne - Repond en 1s';
      callback();
    }, delay);
  }

  // Auto-play sequence
  if (phoneBody) {
    setTimeout(() => {
      appendMessage("Salut ! Pouvez-vous me rappeler vos tarifs ?", true);
      
      setTimeout(() => {
        showBotTyping(() => {
          appendMessage("Salut ! Nos tarifs debutent a 7 900 FCFA. Voulez-vous plus de details ?", false);
          
          setTimeout(() => {
            appendMessage("Oui, j'aimerais connaitre vos forfaits Pro", true);
            
            setTimeout(() => {
              showBotTyping(() => {
                appendMessage("Avec plaisir ! Notre Forfait Pro est a 14 900 FCFA et vous offre une boite omnicanale avec 6 000 credits IA. Vous pouvez demarrer en 5 minutes !", false);
              }, 1500);
            }, 2500);
          }, 3000);
        }, 1200);
      }, 1000);
    }, 1000);
  }
// Modal Checkout
  const modalBackdrop = document.getElementById('checkoutModalBackdrop');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutSuccessView = document.getElementById('checkoutSuccessView');
  const checkoutFormView = document.getElementById('checkoutFormView');

  window.openCheckoutModal = function(planKey) {
    selectedPlan = planKey || 'basic';
    const plan = planData[selectedPlan] || planData.basic;
    document.getElementById('modalPlanName').textContent = plan.name;
    let priceStr = '';
    if (currentCurrency === 'USD') {
      const amount = isAnnual ? plan.usdAnnual : plan.usdMonthly;
      priceStr = typeof amount === 'number' ? '$' + amount + ' /mois' : amount;
    } else {
      const amount = isAnnual ? plan.xofAnnual : plan.xofMonthly;
      priceStr = typeof amount === 'number' ? amount.toLocaleString('fr-FR') + ' XOF /mois' : amount;
    }
    document.getElementById('modalPlanPrice').textContent = priceStr;
    document.getElementById('modalTotalAmount').textContent = priceStr;
    if (checkoutFormView) checkoutFormView.style.display = 'block';
    if (checkoutSuccessView) checkoutSuccessView.style.display = 'none';
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  const payOptions = document.querySelectorAll('.pay-option');
  payOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      payOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = checkoutForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement sécurisé...';
      submitBtn.disabled = true;

      const clientName = document.getElementById('clientName')?.value || 'Moussa Diallo';
      const clientEmail = document.getElementById('clientEmail')?.value || 'moussa@exemple.com';
      const clientPhone = document.getElementById('clientPhone')?.value || '+225 07 00 00 00 00';
      const payMethod = document.querySelector('input[name="payMethod"]:checked')?.value || 'wave';

      localStorage.setItem('vandia_user', JSON.stringify({
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        plan: selectedPlan,
        paymentMethod: payMethod,
        registeredAt: new Date().toISOString()
      }));

      setTimeout(() => {
        submitBtn.innerHTML = "Payer & Débloquer l'Accès";
        submitBtn.disabled = false;
        if (checkoutFormView) checkoutFormView.style.display = 'none';
        if (checkoutSuccessView) checkoutSuccessView.style.display = 'block';
      }, 1200);
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  updatePricingDisplay();
});
