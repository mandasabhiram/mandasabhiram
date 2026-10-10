/**
 * RAPARTHI MAHESH DIGITAL STUDIO - Interactive Main JavaScript
 * Handles navigation, portfolio filtering, modal lightbox, video showcase,
 * interactive deposit booking wizard, FAQ accordions, and form interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileDrawer();
  initPortfolioFilter();
  initLightbox();
  initVideoModal();
  initBookingWizard();
  initFaqAccordion();
  initForms();
  initBackToTop();
  initStoryModal();
});

/* -------------------------------------------------------------------------- */
/* 1. Header Scroll Effect                                                    */
/* -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 2. Mobile Drawer Navigation                                                */
/* -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link');

  if (!toggleBtn || !drawer || !overlay) return;

  function toggleMenu() {
    toggleBtn.classList.toggle('active');
    drawer.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
  }

  function closeMenu() {
    toggleBtn.classList.remove('active');
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* -------------------------------------------------------------------------- */
/* 3. Portfolio Category Filter                                               */
/* -------------------------------------------------------------------------- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.gallery-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 15);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 4. Fullscreen Lightbox Modal                                               */
/* -------------------------------------------------------------------------- */
function initLightbox() {
  const modal = document.querySelector('.lightbox-modal');
  if (!modal) return;

  const lightboxImg = modal.querySelector('.lightbox-image');
  const lightboxTitle = modal.querySelector('.lightbox-title');
  const lightboxDesc = modal.querySelector('.lightbox-desc');
  const closeBtn = modal.querySelector('.lightbox-close');
  const prevBtn = modal.querySelector('.lightbox-prev');
  const nextBtn = modal.querySelector('.lightbox-next');

  const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));
  let currentIndex = 0;

  function getVisibleCards() {
    return galleryCards.filter(card => window.getComputedStyle(card).display !== 'none');
  }

  function updateModal(index) {
    const visibleCards = getVisibleCards();
    if (!visibleCards.length) return;
    
    if (index < 0) index = visibleCards.length - 1;
    if (index >= visibleCards.length) index = 0;
    
    currentIndex = index;
    const currentCard = visibleCards[currentIndex];
    const img = currentCard.querySelector('.gallery-card-img');
    const title = currentCard.querySelector('.gallery-card-title');
    const location = currentCard.querySelector('.gallery-card-location');

    if (img && lightboxImg) lightboxImg.src = img.src;
    if (title && lightboxTitle) lightboxTitle.textContent = title.textContent;
    if (location && lightboxDesc) lightboxDesc.textContent = location.textContent;
  }

  function openLightbox(card) {
    const visibleCards = getVisibleCards();
    const index = visibleCards.indexOf(card);
    if (index === -1) return;
    updateModal(index);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(card);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => updateModal(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => updateModal(currentIndex + 1));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateModal(currentIndex - 1);
    if (e.key === 'ArrowRight') updateModal(currentIndex + 1);
  });
}

/* -------------------------------------------------------------------------- */
/* 5. Video Portfolio Modal                                                   */
/* -------------------------------------------------------------------------- */
function initVideoModal() {
  const modal = document.getElementById('videoModal');
  if (!modal) return;

  const closeBtn = document.getElementById('closeVideoModal');
  const videoPlayer = document.getElementById('portfolioVideoPlayer');
  const titleEl = document.getElementById('videoModalTitle');
  const descEl = document.getElementById('videoModalDesc');
  const openBtns = document.querySelectorAll('.open-video-btn');

  function openVideo(title, desc) {
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (videoPlayer) {
      videoPlayer.currentTime = 0;
      videoPlayer.play().catch(() => {});
    }
  }

  function closeVideo() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (videoPlayer) {
      videoPlayer.pause();
    }
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-video-title') || 'Cinematic Film';
      const desc = btn.getAttribute('data-video-desc') || 'RAPARTHI MAHESH DIGITAL STUDIO Production';
      openVideo(title, desc);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeVideo);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeVideo();
  });

  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active') && e.key === 'Escape') {
      closeVideo();
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 6. Interactive Booking & Deposit Payment Wizard                            */
/* -------------------------------------------------------------------------- */
function initBookingWizard() {
  let modal = document.getElementById('bookingModal');

  // If modal is not in current document, build and append it dynamically
  if (!modal) {
    modal = createDynamicBookingModal();
    document.body.appendChild(modal);
  }

  const closeBtn = document.getElementById('closeBookingModal');
  const closeReceiptBtn = document.getElementById('closeReceiptBtn');
  const openBtns = document.querySelectorAll('.open-booking-btn');

  // Wizard Elements
  const stepIndicators = modal.querySelectorAll('.step-indicator');
  const stepPanes = modal.querySelectorAll('.booking-step-pane');
  const packageOptions = modal.querySelectorAll('.package-option');

  // Navigation Buttons
  const toStep2Btn = document.getElementById('toStep2Btn');
  const backToStep1Btn = document.getElementById('backToStep1Btn');
  const toStep3Btn = document.getElementById('toStep3Btn');
  const backToStep2Btn = document.getElementById('backToStep2Btn');
  const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');

  // State
  let bookingState = {
    packageName: 'Gold Royal Collection (Flagship)',
    packageId: 'gold',
    totalPrice: 325000,
    depositAmount: 50000,
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    eventDate: '',
    eventVenue: '',
    refCode: ''
  };

  function setStep(stepNum) {
    stepIndicators.forEach(ind => {
      const indStep = parseInt(ind.getAttribute('data-step'));
      ind.classList.remove('active', 'completed');
      if (indStep === stepNum) {
        ind.classList.add('active');
      } else if (indStep < stepNum) {
        ind.classList.add('completed');
      }
    });

    stepPanes.forEach(pane => pane.classList.remove('active'));
    const targetPane = document.getElementById(`bookingStep${stepNum}`);
    if (targetPane) targetPane.classList.add('active');
  }

  function openModal(presetPackage) {
    setStep(1);
    if (presetPackage) {
      packageOptions.forEach(opt => {
        if (opt.getAttribute('data-package') === presetPackage) {
          opt.click();
        }
      });
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preset = btn.getAttribute('data-preset');
      openModal(preset);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeReceiptBtn) closeReceiptBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Package Selection
  packageOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      packageOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');

      bookingState.packageId = opt.getAttribute('data-package');
      bookingState.packageName = opt.querySelector('.package-option-title')?.textContent || 'Custom Experience';
      bookingState.totalPrice = parseInt(opt.getAttribute('data-price')) || 175000;
      bookingState.depositAmount = parseInt(opt.getAttribute('data-deposit')) || 25000;
    });
  });

  // Step 1 -> Step 2
  if (toStep2Btn) {
    toStep2Btn.addEventListener('click', () => {
      setStep(2);
    });
  }

  // Step 2 -> Step 1
  if (backToStep1Btn) {
    backToStep1Btn.addEventListener('click', () => {
      setStep(1);
    });
  }

  // Step 2 -> Step 3 (Validate fields)
  if (toStep3Btn) {
    toStep3Btn.addEventListener('click', () => {
      const name = document.getElementById('bookClientName')?.value.trim();
      const email = document.getElementById('bookClientEmail')?.value.trim();
      const phone = document.getElementById('bookClientPhone')?.value.trim();
      const date = document.getElementById('bookEventDate')?.value;
      const venue = document.getElementById('bookEventVenue')?.value.trim();

      if (!name || !email || !phone || !date) {
        showToast('Required Fields Missing', 'Please provide your Name, Email, Phone number, and Preferred Date.');
        return;
      }

      bookingState.clientName = name;
      bookingState.clientEmail = email;
      bookingState.clientPhone = phone;
      bookingState.eventDate = date;
      bookingState.eventVenue = venue || 'To be finalized';

      // Populate Step 3 Summary
      const summaryPkg = document.getElementById('summaryPackageName');
      const summaryDate = document.getElementById('summarySessionDate');
      const summaryTotal = document.getElementById('summaryTotalAmount');
      const summaryDeposit = document.getElementById('summaryDepositAmount');
      const payBtnDep = document.getElementById('payBtnDeposit');

      if (summaryPkg) summaryPkg.textContent = bookingState.packageName;
      if (summaryDate) summaryDate.textContent = formatDate(bookingState.eventDate);
      if (summaryTotal) summaryTotal.textContent = '₹' + bookingState.totalPrice.toLocaleString('en-IN');
      if (summaryDeposit) summaryDeposit.textContent = '₹' + bookingState.depositAmount.toLocaleString('en-IN');
      if (payBtnDep) payBtnDep.textContent = '₹' + bookingState.depositAmount.toLocaleString('en-IN');

      setStep(3);
    });
  }

  // Step 3 -> Step 2
  if (backToStep2Btn) {
    backToStep2Btn.addEventListener('click', () => {
      setStep(2);
    });
  }

  // Payment Tabs (Card / UPI)
  const tabBtns = modal.querySelectorAll('.payment-tab-btn');
  const cardPane = document.getElementById('cardPaymentPane');
  const upiPane = document.getElementById('upiPaymentPane');

  tabBtns.forEach(tBtn => {
    tBtn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tBtn.classList.add('active');
      const tab = tBtn.getAttribute('data-tab');
      if (tab === 'card') {
        if (cardPane) cardPane.classList.add('active');
        if (upiPane) upiPane.classList.remove('active');
      } else {
        if (cardPane) cardPane.classList.remove('active');
        if (upiPane) upiPane.classList.add('active');
      }
    });
  });

  // Step 3 -> Step 4 (Simulated Payment Processing)
  if (confirmPaymentBtn) {
    confirmPaymentBtn.addEventListener('click', () => {
      confirmPaymentBtn.disabled = true;
      confirmPaymentBtn.textContent = 'Securing Reservation...';

      setTimeout(() => {
        confirmPaymentBtn.disabled = false;
        confirmPaymentBtn.innerHTML = `Pay Deposit (<span id="payBtnDeposit">₹${bookingState.depositAmount.toLocaleString('en-IN')}</span>)`;

        bookingState.refCode = 'LDS-' + Math.floor(100000 + Math.random() * 900000);

        // Populate Receipt
        const receiptRef = document.getElementById('receiptRefCode');
        const receiptClient = document.getElementById('receiptClientName');
        const receiptPackage = document.getElementById('receiptPackageName');
        const receiptDate = document.getElementById('receiptDate');
        const receiptDeposit = document.getElementById('receiptDepositPaid');
        const receiptBalance = document.getElementById('receiptBalance');

        if (receiptRef) receiptRef.textContent = `BOOKING REF: ${bookingState.refCode}`;
        if (receiptClient) receiptClient.textContent = bookingState.clientName;
        if (receiptPackage) receiptPackage.textContent = bookingState.packageName;
        if (receiptDate) receiptDate.textContent = formatDate(bookingState.eventDate);
        if (receiptDeposit) receiptDeposit.textContent = `₹${bookingState.depositAmount.toLocaleString('en-IN')} (Deposit Confirmed)`;

        const remaining = bookingState.totalPrice - bookingState.depositAmount;
        if (receiptBalance) receiptBalance.textContent = `₹${remaining.toLocaleString('en-IN')} (Due prior to shoot)`;

        setStep(4);
        showToast('Reservation Deposit Confirmed!', `Booking ${bookingState.refCode} has been verified. Welcome to RAPARTHI MAHESH DIGITAL STUDIO.`);
      }, 1200);
    });
  }
}

function formatDate(dateStr) {
  if (!dateStr) return 'Selected Date';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function createDynamicBookingModal() {
  const modal = document.createElement('div');
  modal.id = 'bookingModal';
  modal.className = 'booking-modal';
  modal.innerHTML = `
    <div class="booking-container">
      <button id="closeBookingModal" class="booking-modal-close" aria-label="Close Booking">✕</button>

      <div class="booking-steps-bar">
        <div class="step-indicator active" data-step="1">
          <div class="step-circle">1</div>
          <span class="step-label">Package</span>
        </div>
        <div class="step-indicator" data-step="2">
          <div class="step-circle">2</div>
          <span class="step-label">Schedule</span>
        </div>
        <div class="step-indicator" data-step="3">
          <div class="step-circle">3</div>
          <span class="step-label">Deposit</span>
        </div>
        <div class="step-indicator" data-step="4">
          <div class="step-circle">4</div>
          <span class="step-label">Receipt</span>
        </div>
      </div>

      <div class="booking-step-pane active" id="bookingStep1">
        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-family: var(--font-serif); font-size: 1.75rem; color: #FFFFFF;">Select Your Experience</h3>
          <p style="color: var(--text-secondary); font-size: 0.88rem;">Choose the collection that fits your celebration. A deposit secures your date.</p>
        </div>

        <div class="package-radio-group">
          <label class="package-option selected" data-package="portrait" data-price="25000" data-deposit="5000">
            <div>
              <div class="package-option-title">Fine Art Portrait Session</div>
              <div class="package-option-desc">Studio or outdoor session, 20 edited images</div>
            </div>
            <div class="package-option-prices">
              <div class="package-total-price">₹25,000</div>
              <span class="package-deposit-tag">Deposit: ₹5,000</span>
            </div>
          </label>

          <label class="package-option" data-package="prewedding" data-price="45000" data-deposit="10000">
            <div>
              <div class="package-option-title">Pre-Wedding Concept Shoot</div>
              <div class="package-option-desc">Stylized outdoor shoot + 3-min film + drone</div>
            </div>
            <div class="package-option-prices">
              <div class="package-total-price">₹45,000</div>
              <span class="package-deposit-tag">Deposit: ₹10,000</span>
            </div>
          </label>

          <label class="package-option" data-package="silver" data-price="175000" data-deposit="25000">
            <div>
              <div class="package-option-title">Silver Heritage Wedding</div>
              <div class="package-option-desc">2 Days, Candid + Traditional, 4K Teaser</div>
            </div>
            <div class="package-option-prices">
              <div class="package-total-price">₹1,75,000</div>
              <span class="package-deposit-tag">Deposit: ₹25,000</span>
            </div>
          </label>

          <label class="package-option" data-package="gold" data-price="325000" data-deposit="50000">
            <div>
              <div class="package-option-title">Gold Royal Collection (Flagship)</div>
              <div class="package-option-desc">4-Crew team, drone, Italian album, full film</div>
            </div>
            <div class="package-option-prices">
              <div class="package-total-price">₹3,25,000</div>
              <span class="package-deposit-tag">Deposit: ₹50,000</span>
            </div>
          </label>
        </div>

        <button class="btn btn-primary" id="toStep2Btn" style="width: 100%;">Continue to Schedule →</button>
      </div>

      <div class="booking-step-pane" id="bookingStep2">
        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-family: var(--font-serif); font-size: 1.75rem; color: #FFFFFF;">Select Date & Details</h3>
          <p style="color: var(--text-secondary); font-size: 0.88rem;">Tell us when and where your celebration will take place.</p>
        </div>

        <div class="form-grid" style="margin-bottom: 2rem;">
          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input type="text" id="bookClientName" required placeholder="e.g. Radhika Sharma" class="form-control">
          </div>
          <div class="form-group">
            <label class="form-label">Email Address *</label>
            <input type="email" id="bookClientEmail" required placeholder="radhika@example.com" class="form-control">
          </div>
          <div class="form-group">
            <label class="form-label">Phone / WhatsApp *</label>
            <input type="tel" id="bookClientPhone" required placeholder="+91 98765 43210" class="form-control">
          </div>
          <div class="form-group">
            <label class="form-label">Preferred Session Date *</label>
            <input type="date" id="bookEventDate" required class="form-control">
          </div>
          <div class="form-group full-width">
            <label class="form-label">Location / Venue</label>
            <input type="text" id="bookEventVenue" placeholder="e.g. Falaknuma Palace, Hyderabad or Goa Beachfront" class="form-control">
          </div>
        </div>

        <div style="display: flex; gap: 1rem;">
          <button class="btn btn-outline" id="backToStep1Btn" style="flex: 1;">← Back</button>
          <button class="btn btn-primary" id="toStep3Btn" style="flex: 2;">Proceed to Deposit Payment →</button>
        </div>
      </div>

      <div class="booking-step-pane" id="bookingStep3">
        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-family: var(--font-serif); font-size: 1.75rem; color: #FFFFFF;">Secure Deposit Payment</h3>
          <p style="color: var(--text-secondary); font-size: 0.88rem;">Complete your reservation with a secure simulated deposit.</p>
        </div>

        <div class="booking-summary-box">
          <div class="summary-row">
            <span>Selected Package:</span>
            <strong id="summaryPackageName">Gold Royal Collection</strong>
          </div>
          <div class="summary-row">
            <span>Session Date:</span>
            <span id="summarySessionDate">Selected Date</span>
          </div>
          <div class="summary-row">
            <span>Total Package Value:</span>
            <span id="summaryTotalAmount">₹3,25,000</span>
          </div>
          <div class="summary-row highlight">
            <span>Reservation Deposit Due Now:</span>
            <strong id="summaryDepositAmount">₹50,000</strong>
          </div>
        </div>

        <div class="payment-tabs">
          <button class="payment-tab-btn active" data-tab="card">💳 Credit / Debit Card</button>
          <button class="payment-tab-btn" data-tab="upi">📱 UPI / QR Code</button>
        </div>

        <div class="payment-pane active" id="cardPaymentPane">
          <div class="form-grid" style="margin-bottom: 1.5rem;">
            <div class="form-group full-width">
              <label class="form-label">Card Number</label>
              <input type="text" id="payCardNumber" placeholder="4532 •••• •••• 8892" value="4532 8921 4452 8892" class="form-control">
            </div>
            <div class="form-group">
              <label class="form-label">Expiry (MM/YY)</label>
              <input type="text" id="payCardExpiry" placeholder="12/28" value="12/28" class="form-control">
            </div>
            <div class="form-group">
              <label class="form-label">CVV</label>
              <input type="password" id="payCardCvv" placeholder="•••" value="882" maxlength="4" class="form-control">
            </div>
          </div>
        </div>

        <div class="payment-pane" id="upiPaymentPane">
          <div style="background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 1.5rem; text-align: center; margin-bottom: 1.5rem;">
            <div style="width: 120px; height: 120px; background: #FFFFFF; border-radius: 8px; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 3rem;">
              📷
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Scan or enter your Virtual Payment Address (VPA):</p>
            <input type="text" placeholder="yourname@okhdfcbank" value="client@upi" class="form-control" style="max-width: 320px; margin: 0 auto; text-align: center;">
          </div>
        </div>

        <div style="display: flex; gap: 1rem;">
          <button class="btn btn-outline" id="backToStep2Btn" style="flex: 1;">← Back</button>
          <button class="btn btn-primary" id="confirmPaymentBtn" style="flex: 2;">
            Pay Deposit (<span id="payBtnDeposit">₹50,000</span>)
          </button>
        </div>
        <p style="font-size: 0.72rem; color: var(--text-muted); text-align: center; margin-top: 1rem;">
          🔒 256-bit Encrypted Simulated Gateway. No real charges occur.
        </p>
      </div>

      <div class="booking-step-pane" id="bookingStep4">
        <div class="booking-receipt-card">
          <div class="receipt-check-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h3 style="font-family: var(--font-serif); font-size: 2.2rem; color: #FFFFFF; margin-bottom: 0.5rem;">Session Reserved!</h3>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.25rem;">
            Your date has been reserved in RAPARTHI MAHESH DIGITAL STUDIO's master calendar.
          </p>
          <div class="receipt-ref-pill" id="receiptRefCode">BOOKING REF: RMDS-892144</div>

          <div class="receipt-table">
            <div class="receipt-table-row">
              <span>Client Name:</span>
              <strong id="receiptClientName">Valued Client</strong>
            </div>
            <div class="receipt-table-row">
              <span>Package:</span>
              <strong id="receiptPackageName">Gold Royal Collection</strong>
            </div>
            <div class="receipt-table-row">
              <span>Reserved Date:</span>
              <strong id="receiptDate">Selected Date</strong>
            </div>
            <div class="receipt-table-row">
              <span>Deposit Paid:</span>
              <strong style="color: var(--accent-gold);" id="receiptDepositPaid">Deposit Paid</strong>
            </div>
            <div class="receipt-table-row">
              <span>Remaining Balance:</span>
              <span id="receiptBalance">Due prior to shoot</span>
            </div>
          </div>

          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="window.print();">🖨️ Print / Save Receipt</button>
            <button class="btn btn-outline" id="closeReceiptBtn">Done</button>
          </div>
        </div>
      </div>
    </div>
  `;
  return modal;
}

/* -------------------------------------------------------------------------- */
/* 7. FAQ Accordion                                                           */
/* -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(otherItem => otherItem.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 8. Form Handling, Thank-You Confirmation & Toast                           */
/* -------------------------------------------------------------------------- */
function showToast(title, message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>
    <div class="toast-content">
      <div style="font-weight:600; font-size:0.95rem;">${title}</div>
      <div style="font-size:0.85rem; color:#A0A0AA;">${message}</div>
    </div>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

function initForms() {
  // Booking / Contact Form
  const bookingForm = document.getElementById('bookingForm');
  const contactFormContainer = document.getElementById('contactFormContainer');
  const contactThankYou = document.getElementById('contactThankYou');
  const resetBtn = document.getElementById('resetContactFormBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName')?.value || 'Valued Client';
      const refId = 'LDS-' + Math.floor(100000 + Math.random() * 900000);

      // If on-page thank-you card exists (contact.html), display it
      if (contactThankYou && contactFormContainer) {
        const refSpan = document.getElementById('thankyouRefCode');
        if (refSpan) refSpan.textContent = `REFERENCE #${refId}`;
        contactFormContainer.style.display = 'none';
        contactThankYou.classList.add('show');
      }

      showToast('Session Inquiry Received!', `Thank you, ${name}. Your inquiry #${refId} has been sent to our studio team. We will reply within 24 hours.`);
      bookingForm.reset();
    });
  }

  if (resetBtn && contactFormContainer && contactThankYou) {
    resetBtn.addEventListener('click', () => {
      contactThankYou.classList.remove('show');
      contactFormContainer.style.display = 'block';
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]')?.value || 'subscriber';
      showToast('Subscribed to The Journal', `We have added ${email} to our exclusive editorial newsletter.`);
      newsletterForm.reset();
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 9. Back to Top                                                             */
/* -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 10. Story Reader Modal (Journal)                                           */
/* -------------------------------------------------------------------------- */
function initStoryModal() {
  const modal = document.getElementById('storyModal');
  if (!modal) return;

  const closeBtn = document.getElementById('closeStoryModal');
  const tagEl = document.getElementById('modalStoryTag');
  const titleEl = document.getElementById('modalStoryTitle');
  const metaEl = document.getElementById('modalStoryMeta');
  const bodyEl = document.getElementById('modalStoryBody');
  const openButtons = document.querySelectorAll('.open-story-btn');

  const storyData = {
    'udaipur': {
      tag: 'Real Wedding Spotlight',
      title: "Under Rajasthan's Crimson Skies: Dev & Tara’s Royal Palace Vows",
      meta: 'September 4, 2026 • 8 Min Read • Udaipur',
      body: [
        "Udaipur is renowned as the city of lakes and royal fortresses, but for Dev and Tara, it was the sanctuary where their decade-long romance culminated in eternal vows. Over three unforgettable days at the historic Taj Lake Palace and Jagmandir Island, we had the honor of documenting their union.",
        "The festivities commenced with a vibrant Mehendi ceremony in the palace courtyards, punctuated by traditional marigold garlands and folk melodies. Tara chose a bespoke emerald silk lehenga, adorned with ancestral gold jhumkas that sparkled under the afternoon sunlight.",
        "For the sunset pheras, the golden light reflected off Lake Pichola creating a magical halo around the mandap. Our two lead candid photographers captured unscripted glances, tears of blessing from both sets of parents, and the joyous shower of rose petals.",
        "Our cinema team filmed the entire celebration in 4K with cinema-grade anamorphic lenses, crafting a cinematic film that will be cherished by future generations as a sacred family heirloom."
      ]
    },
    'golden-hour': {
      tag: 'Photography Technique',
      title: "The Magic of Golden Hour: A Couple's Lighting Guide",
      meta: 'September 2, 2026 • 5 Min Read • Studio Insights',
      body: [
        "In photography, Golden Hour refers to the last 45 to 60 minutes before the sun sets, and the first hour after sunrise. During this fleeting window, the sun is low on the horizon, filtering light through more atmosphere and creating warm, diffused tones.",
        "Why is this crucial for wedding and couple portraits? Harsh midday sunlight creates sharp, unflattering shadows under the eyes and nose. Golden hour light, conversely, bathes skin in soft champagne tones, softens fine details, and introduces stunning natural lens flares.",
        "When planning your wedding day itinerary with your event planner, we always recommend carving out 30 uninterrupted minutes during golden hour exclusively for couple portraits."
      ]
    },
    'bridal': {
      tag: 'Bridal Heritage',
      title: "Preserving Royal Heritage: Modern Indian Bridal Styling",
      meta: 'August 24, 2026 • 6 Min Read • Styling Guide',
      body: [
        "Indian bridal styling is an intricate dialogue between centuries of artisanal craftsmanship and contemporary modern grace. When selecting your wedding trousseau, considering how textiles interact with camera sensors can elevate your portraits immensely.",
        "Handwoven Banarasi katan silks, intricate zardozi embroidery, and velvet borders capture natural light with rich dimensional depth. For jewelry, antique polki and uncut diamonds reflect warmth without glare.",
        "Our studio emphasizes soft, natural-toned retouching that preserves the true radiance of your skin and the authentic hues of your heirloom attire."
      ]
    },
    'wardrobe': {
      tag: 'Pre-Wedding Advice',
      title: "What to Wear for Your Pre-Wedding Concept Shoot",
      meta: 'August 14, 2026 • 4 Min Read • Pre-Wedding Tips',
      body: [
        "Choosing wardrobe for an outdoor pre-wedding shoot is about harmony with your environment. If we are shooting in the golden sand dunes of Jaisalmer or an ancient sandstone fortress, jewel tones like deep ruby, emerald green, and royal sapphire pop dramatically against the neutral palette.",
        "Flowing fabrics such as chiffon, georgette, and organza create poetic movement in breezy environments, allowing our lenses to capture dynamic, cinematic wind motion.",
        "We recommend bringing two to three distinct looks: one regal traditional ensemble, one contemporary semi-formal attire, and one relaxed casual outfit."
      ]
    },
    'candid-traditional': {
      tag: 'Studio Philosophy',
      title: "Candid vs. Traditional: Why You Deserve Both",
      meta: 'July 30, 2026 • 5 Min Read • Our Approach',
      body: [
        "Couples often ask: 'Should we hire candid photographers or traditional photographers?' At RAPARTHI MAHESH DIGITAL STUDIO, we believe this is a false dichotomy. A wedding requires both disciplines executed at master level.",
        "Traditional photography ensures every beloved aunt, uncle, elder, and guest is formally documented in crisp, well-lit family portraits. Candid photography, on the other hand, captures the unspoken emotions — the quiet hug, the burst of laughter during rituals, the joyful chaos on the dance floor.",
        "Our team operates as two coordinated units, guaranteeing you never miss a family portrait while preserving 100% of the emotional magic."
      ]
    },
    'goa': {
      tag: 'Destination Guide',
      title: "Destination Goa: Planning a Sunset Beachfront Vow Ceremony",
      meta: 'July 18, 2026 • 6 Min Read • Destination Insights',
      body: [
        "Goa offers an enchanting backdrop for sunset nuptials, but coastal environments require special photographic planning. Sea breezes, humidity, and tide schedules all influence the lighting and audio setup.",
        "We always coordinate with the resort and decorators to orient the mandap so the setting sun casts backlight on the couple rather than shining directly into guests' eyes.",
        "Our wireless audio transmitters and wind-screened directional microphones ensure vows are captured with crystal clarity above the sound of crashing waves."
      ]
    },
    'albums': {
      tag: 'Heirloom Philosophy',
      title: "The Value of Archival Prints in a Digital Era",
      meta: 'June 28, 2026 • 4 Min Read • Art of Albums',
      body: [
        "In our digital world, photographs often remain trapped inside smartphones, flash drives, and social feeds that become obsolete in a matter of years.",
        "A physical, hand-bound archival album turns fleeting pixels into a tangible family heirloom. Crafted with museum-grade cotton rag paper and pigment inks that resist fading for over 150 years, each album is bound in genuine Italian leather.",
        "Nothing compares to the feeling of turning heavy, velvety pages with your children and grandchildren decades from today."
      ]
    }
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const storyId = btn.getAttribute('data-story');
      const data = storyData[storyId];
      if (!data) return;

      tagEl.textContent = data.tag;
      titleEl.textContent = data.title;
      metaEl.textContent = data.meta;
      bodyEl.innerHTML = data.body.map(p => `<p>${p}</p>`).join('');

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}
