/* Health Saathi – Main Application */
(function () {
  'use strict';

  // ========== STORAGE ==========
  const DB = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem('hs_' + key);
        return v ? JSON.parse(v) : fallback;
      } catch { return fallback; }
    },
    set(key, val) {
      localStorage.setItem('hs_' + key, JSON.stringify(val));
    }
  };

  // ========== STATE ==========
  let state = {
    lang: DB.get('lang', 'en'),
    profile: DB.get('profile', { name: '', age: '', bloodGroup: '', photo: '', notes: '' }),
    bp: DB.get('bp', []),
    sugar: DB.get('sugar', []),
    weight: DB.get('weight', []),
    water: DB.get('water', { date: today(), glasses: 0, goal: 8 }),
    medicines: DB.get('medicines', []),
    appointments: DB.get('appointments', []),
    favorites: DB.get('favorites', []),
    notes: DB.get('notes', []),
    theme: DB.get('theme', 'light')
  };

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function nowTime() {
    const d = new Date();
    return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function save(key) {
    DB.set(key, state[key]);
  }

  // ========== i18n ==========
  const T = {
    en: {
      appName: 'Health Saathi',
      splashSub: 'Your personal health companion',
      home: 'Home',
      records: 'Records',
      medicines: 'Medicines',
      profile: 'Profile',
      settings: 'Settings',
      tips: "Today's Health Tips",
      quickAdd: 'Quick Add',
      bp: 'Blood Pressure',
      sugar: 'Blood Glucose',
      weight: 'Weight',
      water: 'Water',
      sleep: 'Sleep',
      appointments: 'Appointments',
      history: 'Health Records',
      favorites: 'Favorites',
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      systolic: 'Systolic',
      diastolic: 'Diastolic',
      pulse: 'Pulse',
      date: 'Date',
      time: 'Time',
      notes: 'Notes',
      value: 'Value',
      unit: 'Unit',
      beforeMeal: 'Before Meal',
      afterMeal: 'After Meal',
      mealTime: 'Meal Time',
      goal: 'Daily Goal',
      glasses: 'glasses',
      addMedicine: 'Add Medicine',
      medName: 'Medicine Name',
      dosage: 'Dosage / Instructions',
      reminder: 'Reminder Time',
      taken: 'Taken',
      photo: 'Photo',
      gallery: 'Gallery',
      camera: 'Camera',
      doctor: 'Doctor Name',
      purpose: 'Purpose / Notes',
      name: 'Name',
      age: 'Age',
      bloodGroup: 'Blood Group',
      language: 'Language',
      theme: 'Theme',
      install: 'Install App',
      notifications: 'Notifications',
      dataBackup: 'Data / Backup',
      privacy: 'Privacy',
      about: 'About',
      share: 'Share',
      search: 'Search...',
      noRecords: 'No records yet',
      noMeds: 'No medicines added',
      noAppts: 'No appointments',
      noFavs: 'No favorites yet',
      saved: 'Saved successfully',
      deleted: 'Deleted',
      markedTaken: 'Marked as taken',
      waterAdded: 'Water added',
      waterRemoved: 'Water removed',
      installPrompt: 'Install Health Saathi on your home screen',
      aboutText: 'Health Saathi is your offline-first personal health companion. Track BP, sugar, weight, water, medicines and appointments — all data stays on your device.',
      privacyText: 'All your health data is stored locally on your device. Nothing is sent to any server.',
      developer: 'Muhammad Usman Channa',
      pin: 'Add to Favorites',
      unpin: 'Remove from Favorites',
      back: 'Back',
      viewAll: 'View All',
      mgdl: 'mg/dL',
      mmoll: 'mmol/L',
      kg: 'kg',
      lbs: 'lbs',
      selectPhoto: 'Select Photo',
      clearPhoto: 'Remove Photo',
      exportData: 'Export Data',
      importData: 'Import Data',
      clearAll: 'Clear All Data',
      confirmClear: 'Are you sure you want to clear all data? This cannot be undone.',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      tip1: 'Drink a glass of water first thing in the morning to kickstart your metabolism.',
      tip2: 'Aim for 7–8 hours of quality sleep every night for better recovery.',
      tip3: 'A 20-minute walk after meals can help regulate blood sugar levels.',
      tip4: 'Take deep breaths for 2 minutes when stressed — it lowers blood pressure.',
      tip5: 'Keep your medicines organized and take them at the same time daily.',
      tip6: 'Monitor your weight weekly, not daily, for a more accurate trend.',
      tip7: 'Include colorful vegetables in every meal for essential vitamins.',
      tip8: 'Limit screen time before bed to improve sleep quality.',
    },
    ur: {
      appName: 'ہیلتھ ساتھی',
      splashSub: 'آپ کا ذاتی صحتی ساتھی',
      home: 'ہوم',
      records: 'ریکارڈز',
      medicines: 'ادویات',
      profile: 'پروفائل',
      settings: 'ترتیبات',
      tips: 'آج کی صحتی تجاویز',
      quickAdd: 'فوری اضافہ',
      bp: 'بلڈ پریشر',
      sugar: 'بلڈ شوگر',
      weight: 'وزن',
      water: 'پانی',
      sleep: 'نیند',
      appointments: 'ملاقاتیں',
      history: 'صحتی ریکارڈز',
      favorites: 'پسندیدہ',
      add: 'شامل کریں',
      edit: 'ترمیم',
      delete: 'حذف',
      save: 'محفوظ کریں',
      cancel: 'منسوخ',
      systolic: 'سسٹولک',
      diastolic: 'ڈائسٹولک',
      pulse: 'نبض',
      date: 'تاریخ',
      time: 'وقت',
      notes: 'نوٹس',
      value: 'قدر',
      unit: 'یونٹ',
      beforeMeal: 'کھانے سے پہلے',
      afterMeal: 'کھانے کے بعد',
      mealTime: 'کھانے کا وقت',
      goal: 'روزانہ ہدف',
      glasses: 'گلاس',
      addMedicine: 'دوا شامل کریں',
      medName: 'دوا کا نام',
      dosage: 'خوراک / ہدایات',
      reminder: 'یاد دہانی کا وقت',
      taken: 'لی گئی',
      photo: 'تصویر',
      gallery: 'گیلری',
      camera: 'کیمرہ',
      doctor: 'ڈاکٹر کا نام',
      purpose: 'مقصد / نوٹس',
      name: 'نام',
      age: 'عمر',
      bloodGroup: 'بلڈ گروپ',
      language: 'زبان',
      theme: 'تھیم',
      install: 'ایپ انسٹال کریں',
      notifications: 'اطلاعات',
      dataBackup: 'ڈیٹا / بیک اپ',
      privacy: 'رازداری',
      about: 'کے بارے میں',
      share: 'شیئر',
      search: 'تلاش...',
      noRecords: 'ابھی کوئی ریکارڈ نہیں',
      noMeds: 'کوئی دوا شامل نہیں',
      noAppts: 'کوئی ملاقات نہیں',
      noFavs: 'ابھی کوئی پسندیدہ نہیں',
      saved: 'کامیابی سے محفوظ ہو گیا',
      deleted: 'حذف کر دیا گیا',
      markedTaken: 'لی گئی کے طور پر نشان زد',
      waterAdded: 'پانی شامل کیا گیا',
      waterRemoved: 'پانی کم کیا گیا',
      installPrompt: 'ہیلتھ ساتھی کو اپنے ہوم اسکرین پر انسٹال کریں',
      aboutText: 'ہیلتھ ساتھی آپ کا آف لائن ذاتی صحتی ساتھی ہے۔ بلڈ پریشر، شوگر، وزن، پانی، ادویات اور ملاقاتیں ٹریک کریں — تمام ڈیٹا آپ کے ڈیوائس پر رہتا ہے۔',
      privacyText: 'آپ کا تمام صحتی ڈیٹا صرف آپ کے ڈیوائس پر محفوظ ہوتا ہے۔ کسی سرور پر نہیں بھیجا جاتا۔',
      developer: 'محمد عثمان چنہ',
      pin: 'پسندیدہ میں شامل',
      unpin: 'پسندیدہ سے ہٹائیں',
      back: 'واپس',
      viewAll: 'سب دیکھیں',
      mgdl: 'mg/dL',
      mmoll: 'mmol/L',
      kg: 'کلو',
      lbs: 'پاؤنڈ',
      selectPhoto: 'تصویر منتخب کریں',
      clearPhoto: 'تصویر ہٹائیں',
      exportData: 'ڈیٹا ایکسپورٹ',
      importData: 'ڈیٹا امپورٹ',
      clearAll: 'تمام ڈیٹا صاف کریں',
      confirmClear: 'کیا آپ واقعی تمام ڈیٹا صاف کرنا چاہتے ہیں؟ یہ واپس نہیں ہو سکتا۔',
      light: 'روشن',
      dark: 'تاریک',
      system: 'سسٹم',
      tip1: 'صبح اٹھتے ہی ایک گلاس پانی پیئیں تاکہ میٹابولزم فعال ہو۔',
      tip2: 'بہتر صحت کے لیے ہر رات 7 سے 8 گھنٹے معیاری نیند لیں۔',
      tip3: 'کھانے کے بعد 20 منٹ کی سیر بلڈ شوگر کنٹرول کرنے میں مدد دیتی ہے۔',
      tip4: 'تناؤ میں 2 منٹ گہری سانس لیں — یہ بلڈ پریشر کم کرتا ہے۔',
      tip5: 'ادویات منظم رکھیں اور روزانہ ایک ہی وقت پر لیں۔',
      tip6: 'وزن ہفتہ وار ناپیں، روزانہ نہیں، تاکہ درست رجحان ملے۔',
      tip7: 'ہر کھانے میں رنگین سبزیاں شامل کریں ضروری وٹامنز کے لیے۔',
      tip8: 'نیند کی بہتری کے لیے سونے سے پہلے اسکرین ٹائم کم کریں۔',
    }
  };

  function t(key) {
    return (T[state.lang] && T[state.lang][key]) || T.en[key] || key;
  }

  // ========== TIPS ==========
  const tipKeys = ['tip1', 'tip2', 'tip3', 'tip4', 'tip5', 'tip6', 'tip7', 'tip8'];
  function getTodayTip() {
    const day = new Date().getDate();
    return t(tipKeys[day % tipKeys.length]);
  }

  // ========== TOAST ==========
  function toast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2200);
  }

  // ========== ICONS (inline SVG helpers) ==========
  const icons = {
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    records: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    pill: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.5 20.5L3.5 13.5a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 0l7 7a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7 0z"/><line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    bp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    sugar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>',
    weight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v3M6.3 6.3l2.1 2.1M3 12h3M6.3 17.7l2.1-2.1M12 21v-3M17.7 17.7l-2.1-2.1M21 12h-3M17.7 6.3l-2.1 2.1"/><circle cx="12" cy="12" r="4"/></svg>',
    water: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    starOutline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    lang: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    install: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
  };

  // ========== NAVIGATION ==========
  let currentPage = 'home';
  let deferredInstallPrompt = null;

  function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.getElementById('page-' + id);
    if (page) {
      page.classList.add('active');
      currentPage = id;
    }
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.page === id);
    });
    // re-render page content
    renderPage(id);
    window.scrollTo(0, 0);
  }

  // ========== RENDER ==========
  function renderPage(id) {
    switch (id) {
      case 'home': renderHome(); break;
      case 'records': renderRecords(); break;
      case 'medicines': renderMedicines(); break;
      case 'profile': renderProfile(); break;
      case 'settings': renderSettings(); break;
      case 'bp': renderBP(); break;
      case 'sugar': renderSugar(); break;
      case 'weight': renderWeight(); break;
      case 'water': renderWater(); break;
      case 'appointments': renderAppointments(); break;
      case 'favorites': renderFavorites(); break;
      case 'history': renderHistory(); break;
    }
  }

  function isFav(type) {
    return state.favorites.includes(type);
  }

  function toggleFav(type) {
    const idx = state.favorites.indexOf(type);
    if (idx >= 0) {
      state.favorites.splice(idx, 1);
      toast(t('unpin'));
    } else {
      state.favorites.push(type);
      toast(t('pin'));
    }
    save('favorites');
    renderPage(currentPage);
  }

  // ----- HOME -----
  function renderHome() {
    const el = document.getElementById('page-home');
    // ensure water date
    if (state.water.date !== today()) {
      state.water = { date: today(), glasses: 0, goal: state.water.goal || 8 };
      save('water');
    }

    const lastBP = state.bp[0];
    const lastSugar = state.sugar[0];
    const lastWeight = state.weight[0];

    el.innerHTML = `
      <div class="card tips-card">
        <div class="card-title">${icons.heart} ${t('tips')}</div>
        <p class="tip-text">${getTodayTip()}</p>
      </div>

      <div class="card">
        <div class="card-title">${t('quickAdd')}</div>
        <div class="quick-grid">
          <button class="quick-btn" data-action="add-bp">${icons.bp}<span>${t('bp')}</span></button>
          <button class="quick-btn" data-action="add-sugar">${icons.sugar}<span>${t('sugar')}</span></button>
          <button class="quick-btn" data-action="add-weight">${icons.weight}<span>${t('weight')}</span></button>
          <button class="quick-btn" data-action="add-water">${icons.water}<span>${t('water')}</span></button>
        </div>
      </div>

      <div class="section-list">
        <div class="section-item" data-nav="bp">
          <div class="section-icon">${icons.bp}</div>
          <div class="section-info">
            <h3>${t('bp')}</h3>
            <p>${lastBP ? `${lastBP.sys}/${lastBP.dia} · ${lastBP.date}` : t('noRecords')}</p>
          </div>
          <span class="section-arrow">${icons.chevron}</span>
        </div>
        <div class="section-item" data-nav="sugar">
          <div class="section-icon">${icons.sugar}</div>
          <div class="section-info">
            <h3>${t('sugar')}</h3>
            <p>${lastSugar ? `${lastSugar.value} ${lastSugar.unit} · ${lastSugar.date}` : t('noRecords')}</p>
          </div>
          <span class="section-arrow">${icons.chevron}</span>
        </div>
        <div class="section-item" data-nav="weight">
          <div class="section-icon">${icons.weight}</div>
          <div class="section-info">
            <h3>${t('weight')}</h3>
            <p>${lastWeight ? `${lastWeight.value} ${lastWeight.unit} · ${lastWeight.date}` : t('noRecords')}</p>
          </div>
          <span class="section-arrow">${icons.chevron}</span>
        </div>
        <div class="section-item" data-nav="water">
          <div class="section-icon">${icons.water}</div>
          <div class="section-info">
            <h3>${t('water')}</h3>
            <p>${state.water.glasses} / ${state.water.goal} ${t('glasses')}</p>
          </div>
          <span class="section-arrow">${icons.chevron}</span>
        </div>
        <div class="section-item" data-nav="medicines">
          <div class="section-icon">${icons.pill}</div>
          <div class="section-info">
            <h3>${t('medicines')}</h3>
            <p>${state.medicines.length} ${t('medicines').toLowerCase()}</p>
          </div>
          <span class="section-arrow">${icons.chevron}</span>
        </div>
        <div class="section-item" data-nav="appointments">
          <div class="section-icon">${icons.calendar}</div>
          <div class="section-info">
            <h3>${t('appointments')}</h3>
            <p>${state.appointments.length ? state.appointments[0].doctor : t('noAppts')}</p>
          </div>
          <span class="section-arrow">${icons.chevron}</span>
        </div>
        <div class="section-item" data-nav="favorites">
          <div class="section-icon">${icons.star}</div>
          <div class="section-info">
            <h3>${t('favorites')}</h3>
            <p>${state.favorites.length || t('noFavs')}</p>
          </div>
          <span class="section-arrow">${icons.chevron}</span>
        </div>
        <div class="section-item" data-nav="history">
          <div class="section-icon">${icons.records}</div>
          <div class="section-info">
            <h3>${t('history')}</h3>
            <p>${t('viewAll')}</p>
          </div>
          <span class="section-arrow">${icons.chevron}</span>
        </div>
      </div>
      <div class="dev-credit">${t('developer')}</div>
    `;

    el.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const a = btn.dataset.action;
        if (a === 'add-bp') openBPForm();
        else if (a === 'add-sugar') openSugarForm();
        else if (a === 'add-weight') openWeightForm();
        else if (a === 'add-water') { addWater(1); showPage('water'); }
      });
    });
    el.querySelectorAll('[data-nav]').forEach(item => {
      item.addEventListener('click', () => showPage(item.dataset.nav));
    });
  }

  // ----- BP -----
  function renderBP() {
    const el = document.getElementById('page-bp');
    const favBtn = isFav('bp')
      ? `<button class="icon-btn fav-star" data-fav="bp" title="${t('unpin')}">${icons.star}</button>`
      : `<button class="icon-btn" data-fav="bp" title="${t('pin')}">${icons.starOutline}</button>`;

    let list = state.bp.length
      ? state.bp.map(r => `
        <div class="record-card">
          <div class="record-main">
            <h4>${r.sys}/${r.dia} <span style="font-weight:400;color:var(--text-muted)">· ${r.pulse || '—'} bpm</span></h4>
            <p>${r.date} ${r.time}${r.notes ? ' · ' + r.notes : ''}</p>
          </div>
          <div class="record-actions">
            <button class="btn btn-sm btn-secondary" data-edit-bp="${r.id}">${icons.edit}</button>
            <button class="btn btn-sm btn-danger" data-del-bp="${r.id}">${icons.trash}</button>
          </div>
        </div>`).join('')
      : `<div class="empty-state">${icons.bp}<p>${t('noRecords')}</p></div>`;

    el.innerHTML = `
      <button class="back-btn" data-back="home">${icons.chevron} ${t('back')}</button>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <h2 style="font-size:1.2rem;color:var(--mint-dark)">${t('bp')}</h2>
        <div style="display:flex;gap:6px">${favBtn}
          <button class="btn btn-sm btn-primary" data-action="add-bp">${icons.plus} ${t('add')}</button>
        </div>
      </div>
      ${list}
    `;
    bindBack(el);
    el.querySelector('[data-action="add-bp"]')?.addEventListener('click', () => openBPForm());
    el.querySelector('[data-fav]')?.addEventListener('click', () => toggleFav('bp'));
    el.querySelectorAll('[data-edit-bp]').forEach(b => b.addEventListener('click', () => openBPForm(b.dataset.editBp)));
    el.querySelectorAll('[data-del-bp]').forEach(b => b.addEventListener('click', () => {
      state.bp = state.bp.filter(r => r.id !== b.dataset.delBp);
      save('bp'); toast(t('deleted')); renderBP();
    }));
  }

  function openBPForm(id) {
    const rec = id ? state.bp.find(r => r.id === id) : null;
    openModal(t('bp'), `
      <div class="form-row">
        <div class="form-group"><label>${t('systolic')}</label><input type="number" id="f-sys" value="${rec?.sys || ''}" placeholder="120"></div>
        <div class="form-group"><label>${t('diastolic')}</label><input type="number" id="f-dia" value="${rec?.dia || ''}" placeholder="80"></div>
      </div>
      <div class="form-group"><label>${t('pulse')}</label><input type="number" id="f-pulse" value="${rec?.pulse || ''}" placeholder="72"></div>
      <div class="form-row">
        <div class="form-group"><label>${t('date')}</label><input type="date" id="f-date" value="${rec?.date || today()}"></div>
        <div class="form-group"><label>${t('time')}</label><input type="time" id="f-time" value="${rec?.time || nowTime()}"></div>
      </div>
      <div class="form-group"><label>${t('notes')}</label><textarea id="f-notes" rows="2">${rec?.notes || ''}</textarea></div>
      <button class="btn btn-primary" id="f-save">${t('save')}</button>
    `, () => {
      document.getElementById('f-save').onclick = () => {
        const sys = +document.getElementById('f-sys').value;
        const dia = +document.getElementById('f-dia').value;
        if (!sys || !dia) return;
        const data = {
          id: rec?.id || uid(),
          sys, dia,
          pulse: +document.getElementById('f-pulse').value || null,
          date: document.getElementById('f-date').value,
          time: document.getElementById('f-time').value,
          notes: document.getElementById('f-notes').value.trim()
        };
        if (rec) {
          const i = state.bp.findIndex(r => r.id === rec.id);
          state.bp[i] = data;
        } else {
          state.bp.unshift(data);
        }
        save('bp');
        closeModal();
        toast(t('saved'));
        if (currentPage === 'bp') renderBP();
        else if (currentPage === 'home') renderHome();
        else if (currentPage === 'history') renderHistory();
      };
    });
  }

  // ----- SUGAR -----
  function renderSugar() {
    const el = document.getElementById('page-sugar');
    const favBtn = isFav('sugar')
      ? `<button class="icon-btn fav-star" data-fav="sugar">${icons.star}</button>`
      : `<button class="icon-btn" data-fav="sugar">${icons.starOutline}</button>`;

    let list = state.sugar.length
      ? state.sugar.map(r => `
        <div class="record-card">
          <div class="record-main">
            <h4>${r.value} ${r.unit} <span style="font-weight:400;color:var(--text-muted)">· ${r.meal === 'before' ? t('beforeMeal') : t('afterMeal')}</span></h4>
            <p>${r.date} ${r.time}${r.notes ? ' · ' + r.notes : ''}</p>
          </div>
          <div class="record-actions">
            <button class="btn btn-sm btn-secondary" data-edit-s="${r.id}">${icons.edit}</button>
            <button class="btn btn-sm btn-danger" data-del-s="${r.id}">${icons.trash}</button>
          </div>
        </div>`).join('')
      : `<div class="empty-state">${icons.sugar}<p>${t('noRecords')}</p></div>`;

    el.innerHTML = `
      <button class="back-btn" data-back="home">${icons.chevron} ${t('back')}</button>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <h2 style="font-size:1.2rem;color:var(--mint-dark)">${t('sugar')}</h2>
        <div style="display:flex;gap:6px">${favBtn}
          <button class="btn btn-sm btn-primary" data-action="add-s">${icons.plus} ${t('add')}</button>
        </div>
      </div>
      ${list}
    `;
    bindBack(el);
    el.querySelector('[data-action="add-s"]')?.addEventListener('click', () => openSugarForm());
    el.querySelector('[data-fav]')?.addEventListener('click', () => toggleFav('sugar'));
    el.querySelectorAll('[data-edit-s]').forEach(b => b.addEventListener('click', () => openSugarForm(b.dataset.editS)));
    el.querySelectorAll('[data-del-s]').forEach(b => b.addEventListener('click', () => {
      state.sugar = state.sugar.filter(r => r.id !== b.dataset.delS);
      save('sugar'); toast(t('deleted')); renderSugar();
    }));
  }

  function openSugarForm(id) {
    const rec = id ? state.sugar.find(r => r.id === id) : null;
    openModal(t('sugar'), `
      <div class="form-row">
        <div class="form-group"><label>${t('value')}</label><input type="number" step="0.1" id="f-val" value="${rec?.value || ''}" placeholder="110"></div>
        <div class="form-group"><label>${t('unit')}</label>
          <select id="f-unit"><option value="mg/dL" ${rec?.unit === 'mg/dL' ? 'selected' : ''}>${t('mgdl')}</option>
          <option value="mmol/L" ${rec?.unit === 'mmol/L' ? 'selected' : ''}>${t('mmoll')}</option></select>
        </div>
      </div>
      <div class="form-group"><label>${t('mealTime')}</label>
        <select id="f-meal">
          <option value="before" ${rec?.meal !== 'after' ? 'selected' : ''}>${t('beforeMeal')}</option>
          <option value="after" ${rec?.meal === 'after' ? 'selected' : ''}>${t('afterMeal')}</option>
        </select>
      </div>
      <div class="form-row">
        <div class="form-group"><label>${t('date')}</label><input type="date" id="f-date" value="${rec?.date || today()}"></div>
        <div class="form-group"><label>${t('time')}</label><input type="time" id="f-time" value="${rec?.time || nowTime()}"></div>
      </div>
      <div class="form-group"><label>${t('notes')}</label><textarea id="f-notes" rows="2">${rec?.notes || ''}</textarea></div>
      <button class="btn btn-primary" id="f-save">${t('save')}</button>
    `, () => {
      document.getElementById('f-save').onclick = () => {
        const value = +document.getElementById('f-val').value;
        if (!value) return;
        const data = {
          id: rec?.id || uid(),
          value,
          unit: document.getElementById('f-unit').value,
          meal: document.getElementById('f-meal').value,
          date: document.getElementById('f-date').value,
          time: document.getElementById('f-time').value,
          notes: document.getElementById('f-notes').value.trim()
        };
        if (rec) {
          const i = state.sugar.findIndex(r => r.id === rec.id);
          state.sugar[i] = data;
        } else state.sugar.unshift(data);
        save('sugar');
        closeModal(); toast(t('saved'));
        if (currentPage === 'sugar') renderSugar();
        else if (currentPage === 'home') renderHome();
        else if (currentPage === 'history') renderHistory();
      };
    });
  }

  // ----- WEIGHT -----
  function renderWeight() {
    const el = document.getElementById('page-weight');
    const favBtn = isFav('weight')
      ? `<button class="icon-btn fav-star" data-fav="weight">${icons.star}</button>`
      : `<button class="icon-btn" data-fav="weight">${icons.starOutline}</button>`;

    let list = state.weight.length
      ? state.weight.map(r => `
        <div class="record-card">
          <div class="record-main">
            <h4>${r.value} ${r.unit}</h4>
            <p>${r.date} ${r.time}${r.notes ? ' · ' + r.notes : ''}</p>
          </div>
          <div class="record-actions">
            <button class="btn btn-sm btn-secondary" data-edit-w="${r.id}">${icons.edit}</button>
            <button class="btn btn-sm btn-danger" data-del-w="${r.id}">${icons.trash}</button>
          </div>
        </div>`).join('')
      : `<div class="empty-state">${icons.weight}<p>${t('noRecords')}</p></div>`;

    el.innerHTML = `
      <button class="back-btn" data-back="home">${icons.chevron} ${t('back')}</button>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <h2 style="font-size:1.2rem;color:var(--mint-dark)">${t('weight')}</h2>
        <div style="display:flex;gap:6px">${favBtn}
          <button class="btn btn-sm btn-primary" data-action="add-w">${icons.plus} ${t('add')}</button>
        </div>
      </div>
      ${list}
    `;
    bindBack(el);
    el.querySelector('[data-action="add-w"]')?.addEventListener('click', () => openWeightForm());
    el.querySelector('[data-fav]')?.addEventListener('click', () => toggleFav('weight'));
    el.querySelectorAll('[data-edit-w]').forEach(b => b.addEventListener('click', () => openWeightForm(b.dataset.editW)));
    el.querySelectorAll('[data-del-w]').forEach(b => b.addEventListener('click', () => {
      state.weight = state.weight.filter(r => r.id !== b.dataset.delW);
      save('weight'); toast(t('deleted')); renderWeight();
    }));
  }

  function openWeightForm(id) {
    const rec = id ? state.weight.find(r => r.id === id) : null;
    openModal(t('weight'), `
      <div class="form-row">
        <div class="form-group"><label>${t('value')}</label><input type="number" step="0.1" id="f-val" value="${rec?.value || ''}" placeholder="70"></div>
        <div class="form-group"><label>${t('unit')}</label>
          <select id="f-unit"><option value="kg" ${rec?.unit !== 'lbs' ? 'selected' : ''}>${t('kg')}</option>
          <option value="lbs" ${rec?.unit === 'lbs' ? 'selected' : ''}>${t('lbs')}</option></select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>${t('date')}</label><input type="date" id="f-date" value="${rec?.date || today()}"></div>
        <div class="form-group"><label>${t('time')}</label><input type="time" id="f-time" value="${rec?.time || nowTime()}"></div>
      </div>
      <div class="form-group"><label>${t('notes')}</label><textarea id="f-notes" rows="2">${rec?.notes || ''}</textarea></div>
      <button class="btn btn-primary" id="f-save">${t('save')}</button>
    `, () => {
      document.getElementById('f-save').onclick = () => {
        const value = +document.getElementById('f-val').value;
        if (!value) return;
        const data = {
          id: rec?.id || uid(),
          value,
          unit: document.getElementById('f-unit').value,
          date: document.getElementById('f-date').value,
          time: document.getElementById('f-time').value,
          notes: document.getElementById('f-notes').value.trim()
        };
        if (rec) {
          const i = state.weight.findIndex(r => r.id === rec.id);
          state.weight[i] = data;
        } else state.weight.unshift(data);
        save('weight');
        closeModal(); toast(t('saved'));
        if (currentPage === 'weight') renderWeight();
        else if (currentPage === 'home') renderHome();
        else if (currentPage === 'history') renderHistory();
      };
    });
  }

  // ----- WATER -----
  function renderWater() {
    if (state.water.date !== today()) {
      state.water = { date: today(), glasses: 0, goal: state.water.goal || 8 };
      save('water');
    }
    const el = document.getElementById('page-water');
    const g = state.water.glasses;
    const goal = state.water.goal || 8;
    let glassesHtml = '';
    for (let i = 0; i < Math.max(goal, g); i++) {
      glassesHtml += `<div class="glass ${i < g ? 'filled' : ''}"></div>`;
    }

    el.innerHTML = `
      <button class="back-btn" data-back="home">${icons.chevron} ${t('back')}</button>
      <h2 style="font-size:1.2rem;color:var(--mint-dark);margin-bottom:12px">${t('water')}</h2>
      <div class="card">
        <div class="water-display">
          <div class="water-amount">${g} / ${goal}</div>
          <div class="water-goal">${t('glasses')} · ${t('goal')}: ${goal}</div>
        </div>
        <div class="water-glasses">${glassesHtml}</div>
        <div class="water-controls">
          <button class="water-btn" id="water-minus">−</button>
          <button class="water-btn" id="water-plus">+</button>
        </div>
        <div class="form-group" style="margin-top:16px">
          <label>${t('goal')}</label>
          <input type="number" id="water-goal" value="${goal}" min="1" max="20">
        </div>
        <button class="btn btn-secondary" id="water-set-goal" style="width:100%;margin-top:8px">${t('save')}</button>
      </div>
    `;
    bindBack(el);
    document.getElementById('water-plus').onclick = () => { addWater(1); renderWater(); };
    document.getElementById('water-minus').onclick = () => { addWater(-1); renderWater(); };
    document.getElementById('water-set-goal').onclick = () => {
      const v = +document.getElementById('water-goal').value;
      if (v >= 1 && v <= 20) {
        state.water.goal = v;
        save('water');
        toast(t('saved'));
        renderWater();
      }
    };
  }

  function addWater(delta) {
    if (state.water.date !== today()) {
      state.water = { date: today(), glasses: 0, goal: state.water.goal || 8 };
    }
    state.water.glasses = Math.max(0, state.water.glasses + delta);
    save('water');
    toast(delta > 0 ? t('waterAdded') : t('waterRemoved'));
  }

  // ----- MEDICINES -----
  function renderMedicines() {
    const el = document.getElementById('page-medicines');
    let list = state.medicines.length
      ? state.medicines.map(m => `
        <div class="card" style="padding:12px">
          <div style="display:flex;gap:12px;align-items:flex-start">
            ${m.photo ? `<img src="${m.photo}" class="med-photo-preview" alt="">` : `<div class="section-icon" style="width:56px;height:56px">${icons.pill}</div>`}
            <div style="flex:1;min-width:0">
              <h3 style="font-size:0.95rem;font-weight:600">${m.name}</h3>
              <p style="font-size:0.8rem;color:var(--text-muted);margin-top:2px">${m.dosage || ''}</p>
              ${m.reminder ? `<p style="font-size:0.78rem;color:var(--mint-dark);margin-top:4px">⏰ ${m.reminder}</p>` : ''}
              ${m.notes ? `<p style="font-size:0.78rem;color:var(--text-muted)">${m.notes}</p>` : ''}
              <div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap">
                <button class="btn btn-sm ${m.takenToday === today() ? 'btn-primary' : 'btn-secondary'}" data-taken="${m.id}">
                  ${m.takenToday === today() ? icons.check + ' ' + t('taken') : t('taken')}
                </button>
                <button class="btn btn-sm btn-secondary" data-edit-m="${m.id}">${icons.edit}</button>
                <button class="btn btn-sm btn-danger" data-del-m="${m.id}">${icons.trash}</button>
              </div>
            </div>
          </div>
        </div>`).join('')
      : `<div class="empty-state">${icons.pill}<p>${t('noMeds')}</p></div>`;

    el.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <h2 style="font-size:1.2rem;color:var(--mint-dark)">${t('medicines')}</h2>
        <button class="btn btn-sm btn-primary" data-action="add-m">${icons.plus} ${t('add')}</button>
      </div>
      ${list}
    `;
    el.querySelector('[data-action="add-m"]')?.addEventListener('click', () => openMedicineForm());
    el.querySelectorAll('[data-edit-m]').forEach(b => b.addEventListener('click', () => openMedicineForm(b.dataset.editM)));
    el.querySelectorAll('[data-del-m]').forEach(b => b.addEventListener('click', () => {
      state.medicines = state.medicines.filter(m => m.id !== b.dataset.delM);
      save('medicines'); toast(t('deleted')); renderMedicines();
    }));
    el.querySelectorAll('[data-taken]').forEach(b => b.addEventListener('click', () => {
      const m = state.medicines.find(x => x.id === b.dataset.taken);
      if (m) {
        m.takenToday = m.takenToday === today() ? '' : today();
        save('medicines');
        toast(t('markedTaken'));
        renderMedicines();
      }
    }));
  }

  function openMedicineForm(id) {
    const rec = id ? state.medicines.find(m => m.id === id) : null;
    let photoData = rec?.photo || '';

    openModal(rec ? t('edit') + ' ' + t('medicines') : t('addMedicine'), `
      <div class="form-group"><label>${t('medName')}</label><input type="text" id="f-name" value="${rec?.name || ''}" placeholder="Paracetamol"></div>
      <div class="form-group"><label>${t('dosage')}</label><input type="text" id="f-dosage" value="${rec?.dosage || ''}" placeholder="1 tablet after meal"></div>
      <div class="form-group"><label>${t('reminder')}</label><input type="time" id="f-reminder" value="${rec?.reminder || ''}"></div>
      <div class="form-group"><label>${t('notes')}</label><textarea id="f-notes" rows="2">${rec?.notes || ''}</textarea></div>
      <div class="form-group">
        <label>${t('photo')}</label>
        <div id="photo-preview-wrap">${photoData ? `<img src="${photoData}" class="med-photo-preview" id="photo-preview">` : ''}</div>
        <div class="photo-actions">
          <button class="btn btn-sm btn-secondary" id="btn-gallery">${icons.image} ${t('gallery')}</button>
          <button class="btn btn-sm btn-secondary" id="btn-camera">${icons.camera} ${t('camera')}</button>
          ${photoData ? `<button class="btn btn-sm btn-danger" id="btn-clear-photo">${t('clearPhoto')}</button>` : ''}
        </div>
        <input type="file" id="file-gallery" accept="image/*" style="display:none">
        <input type="file" id="file-camera" accept="image/*" capture="environment" style="display:none">
      </div>
      <button class="btn btn-primary" id="f-save">${t('save')}</button>
    `, () => {
      const galleryInput = document.getElementById('file-gallery');
      const cameraInput = document.getElementById('file-camera');

      document.getElementById('btn-gallery').onclick = () => galleryInput.click();
      document.getElementById('btn-camera').onclick = () => cameraInput.click();

      const handleFile = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          photoData = e.target.result;
          const wrap = document.getElementById('photo-preview-wrap');
          wrap.innerHTML = `<img src="${photoData}" class="med-photo-preview" id="photo-preview">`;
        };
        reader.readAsDataURL(file);
      };

      galleryInput.onchange = (e) => handleFile(e.target.files[0]);
      cameraInput.onchange = (e) => handleFile(e.target.files[0]);

      document.getElementById('btn-clear-photo')?.addEventListener('click', () => {
        photoData = '';
        document.getElementById('photo-preview-wrap').innerHTML = '';
      });

      document.getElementById('f-save').onclick = () => {
        const name = document.getElementById('f-name').value.trim();
        if (!name) return;
        const data = {
          id: rec?.id || uid(),
          name,
          dosage: document.getElementById('f-dosage').value.trim(),
          reminder: document.getElementById('f-reminder').value,
          notes: document.getElementById('f-notes').value.trim(),
          photo: photoData,
          takenToday: rec?.takenToday || ''
        };
        if (rec) {
          const i = state.medicines.findIndex(m => m.id === rec.id);
          state.medicines[i] = data;
        } else state.medicines.unshift(data);
        save('medicines');
        closeModal(); toast(t('saved'));
        renderMedicines();
      };
    });
  }

  // ----- APPOINTMENTS -----
  function renderAppointments() {
    const el = document.getElementById('page-appointments');
    let list = state.appointments.length
      ? state.appointments.map(a => `
        <div class="record-card">
          <div class="record-main">
            <h4>${a.doctor}</h4>
            <p>${a.date} ${a.time}${a.purpose ? ' · ' + a.purpose : ''}</p>
          </div>
          <div class="record-actions">
            <button class="btn btn-sm btn-secondary" data-edit-a="${a.id}">${icons.edit}</button>
            <button class="btn btn-sm btn-danger" data-del-a="${a.id}">${icons.trash}</button>
          </div>
        </div>`).join('')
      : `<div class="empty-state">${icons.calendar}<p>${t('noAppts')}</p></div>`;

    el.innerHTML = `
      <button class="back-btn" data-back="home">${icons.chevron} ${t('back')}</button>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <h2 style="font-size:1.2rem;color:var(--mint-dark)">${t('appointments')}</h2>
        <button class="btn btn-sm btn-primary" data-action="add-a">${icons.plus} ${t('add')}</button>
      </div>
      ${list}
    `;
    bindBack(el);
    el.querySelector('[data-action="add-a"]')?.addEventListener('click', () => openApptForm());
    el.querySelectorAll('[data-edit-a]').forEach(b => b.addEventListener('click', () => openApptForm(b.dataset.editA)));
    el.querySelectorAll('[data-del-a]').forEach(b => b.addEventListener('click', () => {
      state.appointments = state.appointments.filter(a => a.id !== b.dataset.delA);
      save('appointments'); toast(t('deleted')); renderAppointments();
    }));
  }

  function openApptForm(id) {
    const rec = id ? state.appointments.find(a => a.id === id) : null;
    openModal(t('appointments'), `
      <div class="form-group"><label>${t('doctor')}</label><input type="text" id="f-doctor" value="${rec?.doctor || ''}"></div>
      <div class="form-row">
        <div class="form-group"><label>${t('date')}</label><input type="date" id="f-date" value="${rec?.date || today()}"></div>
        <div class="form-group"><label>${t('time')}</label><input type="time" id="f-time" value="${rec?.time || nowTime()}"></div>
      </div>
      <div class="form-group"><label>${t('purpose')}</label><textarea id="f-purpose" rows="2">${rec?.purpose || ''}</textarea></div>
      <button class="btn btn-primary" id="f-save">${t('save')}</button>
    `, () => {
      document.getElementById('f-save').onclick = () => {
        const doctor = document.getElementById('f-doctor').value.trim();
        if (!doctor) return;
        const data = {
          id: rec?.id || uid(),
          doctor,
          date: document.getElementById('f-date').value,
          time: document.getElementById('f-time').value,
          purpose: document.getElementById('f-purpose').value.trim()
        };
        if (rec) {
          const i = state.appointments.findIndex(a => a.id === rec.id);
          state.appointments[i] = data;
        } else state.appointments.unshift(data);
        save('appointments');
        closeModal(); toast(t('saved'));
        renderAppointments();
      };
    });
  }

  // ----- FAVORITES -----
  function renderFavorites() {
    const el = document.getElementById('page-favorites');
    const map = {
      bp: { label: t('bp'), icon: icons.bp, page: 'bp' },
      sugar: { label: t('sugar'), icon: icons.sugar, page: 'sugar' },
      weight: { label: t('weight'), icon: icons.weight, page: 'weight' },
      water: { label: t('water'), icon: icons.water, page: 'water' },
      medicines: { label: t('medicines'), icon: icons.pill, page: 'medicines' },
      appointments: { label: t('appointments'), icon: icons.calendar, page: 'appointments' }
    };

    let list = state.favorites.length
      ? state.favorites.map(f => {
          const item = map[f];
          if (!item) return '';
          return `<div class="section-item" data-nav="${item.page}">
            <div class="section-icon">${item.icon}</div>
            <div class="section-info"><h3>${item.label}</h3></div>
            <button class="icon-btn fav-star" data-unfav="${f}" style="width:32px;height:32px">${icons.star}</button>
          </div>`;
        }).join('')
      : `<div class="empty-state">${icons.star}<p>${t('noFavs')}</p></div>`;

    el.innerHTML = `
      <button class="back-btn" data-back="home">${icons.chevron} ${t('back')}</button>
      <h2 style="font-size:1.2rem;color:var(--mint-dark);margin-bottom:12px">${t('favorites')}</h2>
      <div class="section-list">${list}</div>
    `;
    bindBack(el);
    el.querySelectorAll('[data-nav]').forEach(i => i.addEventListener('click', (e) => {
      if (e.target.closest('[data-unfav]')) return;
      showPage(i.dataset.nav);
    }));
    el.querySelectorAll('[data-unfav]').forEach(b => b.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFav(b.dataset.unfav);
    }));
  }

  // ----- HISTORY -----
  function renderHistory() {
    const el = document.getElementById('page-history');
    const all = [];
    state.bp.forEach(r => all.push({ type: 'bp', date: r.date + 'T' + (r.time || '00:00'), label: `${t('bp')}: ${r.sys}/${r.dia}`, sub: r.notes || '', id: r.id, key: 'bp' }));
    state.sugar.forEach(r => all.push({ type: 'sugar', date: r.date + 'T' + (r.time || '00:00'), label: `${t('sugar')}: ${r.value} ${r.unit}`, sub: r.notes || '', id: r.id, key: 'sugar' }));
    state.weight.forEach(r => all.push({ type: 'weight', date: r.date + 'T' + (r.time || '00:00'), label: `${t('weight')}: ${r.value} ${r.unit}`, sub: r.notes || '', id: r.id, key: 'weight' }));
    all.sort((a, b) => b.date.localeCompare(a.date));

    let list = all.length
      ? all.map(r => `
        <div class="record-card">
          <div class="record-main">
            <h4>${r.label}</h4>
            <p>${r.date.replace('T', ' ')}${r.sub ? ' · ' + r.sub : ''}</p>
          </div>
        </div>`).join('')
      : `<div class="empty-state">${icons.records}<p>${t('noRecords')}</p></div>`;

    el.innerHTML = `
      <button class="back-btn" data-back="home">${icons.chevron} ${t('back')}</button>
      <h2 style="font-size:1.2rem;color:var(--mint-dark);margin-bottom:12px">${t('history')}</h2>
      ${list}
    `;
    bindBack(el);
  }

  // ----- RECORDS (tab) -----
  function renderRecords() {
    const el = document.getElementById('page-records');
    el.innerHTML = `
      <h2 style="font-size:1.2rem;color:var(--mint-dark);margin-bottom:14px">${t('records')}</h2>
      <div class="section-list">
        <div class="section-item" data-nav="bp"><div class="section-icon">${icons.bp}</div><div class="section-info"><h3>${t('bp')}</h3><p>${state.bp.length} records</p></div><span class="section-arrow">${icons.chevron}</span></div>
        <div class="section-item" data-nav="sugar"><div class="section-icon">${icons.sugar}</div><div class="section-info"><h3>${t('sugar')}</h3><p>${state.sugar.length} records</p></div><span class="section-arrow">${icons.chevron}</span></div>
        <div class="section-item" data-nav="weight"><div class="section-icon">${icons.weight}</div><div class="section-info"><h3>${t('weight')}</h3><p>${state.weight.length} records</p></div><span class="section-arrow">${icons.chevron}</span></div>
        <div class="section-item" data-nav="water"><div class="section-icon">${icons.water}</div><div class="section-info"><h3>${t('water')}</h3><p>${state.water.glasses}/${state.water.goal}</p></div><span class="section-arrow">${icons.chevron}</span></div>
        <div class="section-item" data-nav="history"><div class="section-icon">${icons.records}</div><div class="section-info"><h3>${t('history')}</h3><p>${t('viewAll')}</p></div><span class="section-arrow">${icons.chevron}</span></div>
        <div class="section-item" data-nav="appointments"><div class="section-icon">${icons.calendar}</div><div class="section-info"><h3>${t('appointments')}</h3><p>${state.appointments.length}</p></div><span class="section-arrow">${icons.chevron}</span></div>
      </div>
    `;
    el.querySelectorAll('[data-nav]').forEach(i => i.addEventListener('click', () => showPage(i.dataset.nav)));
  }

  // ----- PROFILE -----
  function renderProfile() {
    const el = document.getElementById('page-profile');
    const p = state.profile;
    const avatar = p.photo
      ? `<img src="${p.photo}" class="profile-avatar" alt="">`
      : `<div class="profile-avatar-placeholder">${(p.name || 'H')[0].toUpperCase()}</div>`;

    el.innerHTML = `
      <div class="profile-header">
        ${avatar}
        <h2 style="font-size:1.15rem;color:var(--mint-dark)">${p.name || t('profile')}</h2>
        ${p.age || p.bloodGroup ? `<p style="font-size:0.85rem;color:var(--text-muted);margin-top:4px">${[p.age ? p.age + ' yrs' : '', p.bloodGroup].filter(Boolean).join(' · ')}</p>` : ''}
      </div>
      <div class="card">
        <div class="form-group"><label>${t('name')}</label><input type="text" id="p-name" value="${p.name || ''}"></div>
        <div class="form-row">
          <div class="form-group"><label>${t('age')}</label><input type="number" id="p-age" value="${p.age || ''}" min="1" max="120"></div>
          <div class="form-group"><label>${t('bloodGroup')}</label>
            <select id="p-bg">
              <option value="">—</option>
              ${['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => `<option value="${g}" ${p.bloodGroup === g ? 'selected' : ''}>${g}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-group"><label>${t('notes')}</label><textarea id="p-notes" rows="3">${p.notes || ''}</textarea></div>
        <div class="form-group">
          <label>${t('photo')}</label>
          <div class="photo-actions">
            <button class="btn btn-sm btn-secondary" id="p-gallery">${icons.image} ${t('gallery')}</button>
            ${p.photo ? `<button class="btn btn-sm btn-danger" id="p-clear">${t('clearPhoto')}</button>` : ''}
          </div>
          <input type="file" id="p-file" accept="image/*" style="display:none">
        </div>
        <button class="btn btn-primary" id="p-save">${t('save')}</button>
      </div>
      <div class="dev-credit">${t('developer')}</div>
    `;

    let photoData = p.photo || '';
    document.getElementById('p-gallery').onclick = () => document.getElementById('p-file').click();
    document.getElementById('p-file').onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        photoData = ev.target.result;
        const header = el.querySelector('.profile-header');
        header.querySelector('img, .profile-avatar-placeholder')?.remove();
        const img = document.createElement('img');
        img.src = photoData;
        img.className = 'profile-avatar';
        header.insertBefore(img, header.firstChild);
      };
      reader.readAsDataURL(file);
    };
    document.getElementById('p-clear')?.addEventListener('click', () => {
      photoData = '';
      renderProfile();
    });
    document.getElementById('p-save').onclick = () => {
      state.profile = {
        name: document.getElementById('p-name').value.trim(),
        age: document.getElementById('p-age').value,
        bloodGroup: document.getElementById('p-bg').value,
        notes: document.getElementById('p-notes').value.trim(),
        photo: photoData
      };
      save('profile');
      toast(t('saved'));
      renderProfile();
    };
  }

  // ----- SETTINGS -----
  function renderSettings() {
    const el = document.getElementById('page-settings');
    el.innerHTML = `
      <h2 style="font-size:1.2rem;color:var(--mint-dark);margin-bottom:14px">${t('settings')}</h2>
      <div class="settings-list">
        <div class="setting-item" id="set-lang">
          <div class="setting-icon">${icons.lang}</div>
          <span class="setting-label">${t('language')}</span>
          <span class="setting-value">${state.lang === 'ur' ? 'اردو' : 'English'}</span>
        </div>
        <div class="setting-item" id="set-install">
          <div class="setting-icon">${icons.install}</div>
          <span class="setting-label">${t('install')}</span>
        </div>
        <div class="setting-item" id="set-share">
          <div class="setting-icon">${icons.share}</div>
          <span class="setting-label">${t('share')}</span>
        </div>
        <div class="setting-item" id="set-notif">
          <div class="setting-icon">${icons.bell}</div>
          <span class="setting-label">${t('notifications')}</span>
        </div>
        <div class="setting-item" id="set-data">
          <div class="setting-icon">${icons.database}</div>
          <span class="setting-label">${t('dataBackup')}</span>
        </div>
        <div class="setting-item" id="set-privacy">
          <div class="setting-icon">${icons.shield}</div>
          <span class="setting-label">${t('privacy')}</span>
        </div>
        <div class="setting-item" id="set-about">
          <div class="setting-icon">${icons.info}</div>
          <span class="setting-label">${t('about')}</span>
        </div>
      </div>
      <div class="dev-credit" style="margin-top:24px">${t('developer')}</div>
    `;

    document.getElementById('set-lang').onclick = () => {
      openModal(t('language'), `
        <button class="btn ${state.lang === 'en' ? 'btn-primary' : 'btn-secondary'}" id="lang-en" style="width:100%;margin-bottom:10px">English</button>
        <button class="btn ${state.lang === 'ur' ? 'btn-primary' : 'btn-secondary'}" id="lang-ur" style="width:100%">اردو</button>
      `, () => {
        document.getElementById('lang-en').onclick = () => { setLang('en'); closeModal(); };
        document.getElementById('lang-ur').onclick = () => { setLang('ur'); closeModal(); };
      });
    };

    document.getElementById('set-install').onclick = () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        deferredInstallPrompt.userChoice.then(() => { deferredInstallPrompt = null; });
      } else {
        toast(t('installPrompt'));
      }
    };

    document.getElementById('set-share').onclick = () => {
      const shareData = {
        title: 'Health Saathi',
        text: 'Health Saathi – Your personal health companion. Track BP, sugar, weight, medicines & more.',
        url: window.location.href
      };
      if (navigator.share) {
        navigator.share(shareData).catch(() => {});
      } else {
        navigator.clipboard?.writeText(window.location.href).then(() => toast('Link copied!'));
      }
    };

    document.getElementById('set-notif').onclick = () => {
      if ('Notification' in window) {
        Notification.requestPermission().then(p => toast(p === 'granted' ? 'Notifications enabled' : 'Permission: ' + p));
      } else toast('Not supported');
    };

    document.getElementById('set-data').onclick = () => {
      openModal(t('dataBackup'), `
        <button class="btn btn-secondary" id="exp" style="width:100%;margin-bottom:10px">${t('exportData')}</button>
        <button class="btn btn-secondary" id="imp" style="width:100%;margin-bottom:10px">${t('importData')}</button>
        <button class="btn btn-danger" id="clr" style="width:100%">${t('clearAll')}</button>
        <input type="file" id="imp-file" accept="application/json" style="display:none">
      `, () => {
        document.getElementById('exp').onclick = () => {
          const data = {
            profile: state.profile, bp: state.bp, sugar: state.sugar, weight: state.weight,
            water: state.water, medicines: state.medicines, appointments: state.appointments,
            favorites: state.favorites, notes: state.notes
          };
          const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'health-saathi-backup.json';
          a.click();
          toast(t('saved'));
        };
        document.getElementById('imp').onclick = () => document.getElementById('imp-file').click();
        document.getElementById('imp-file').onchange = (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (ev) => {
            try {
              const data = JSON.parse(ev.target.result);
              Object.keys(data).forEach(k => {
                if (state.hasOwnProperty(k)) {
                  state[k] = data[k];
                  save(k);
                }
              });
              toast(t('saved'));
              closeModal();
              applyLang();
              showPage('settings');
            } catch { toast('Invalid file'); }
          };
          reader.readAsText(file);
        };
        document.getElementById('clr').onclick = () => {
          if (confirm(t('confirmClear'))) {
            ['profile','bp','sugar','weight','water','medicines','appointments','favorites','notes'].forEach(k => {
              localStorage.removeItem('hs_' + k);
            });
            location.reload();
          }
        };
      });
    };

    document.getElementById('set-privacy').onclick = () => {
      openModal(t('privacy'), `<p style="font-size:0.92rem;line-height:1.6">${t('privacyText')}</p>`);
    };

    document.getElementById('set-about').onclick = () => {
      openModal(t('about'), `
        <p style="font-size:0.92rem;line-height:1.6;margin-bottom:12px">${t('aboutText')}</p>
        <p style="font-size:0.85rem;color:var(--text-muted);text-align:center">${t('developer')}</p>
      `);
    };
  }

  // ========== MODAL ==========
  function openModal(title, bodyHtml, onReady) {
    const overlay = document.getElementById('modal-overlay');
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = bodyHtml;
    overlay.classList.add('open');
    if (onReady) onReady();
  }

  function closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
  }

  function bindBack(el) {
    el.querySelector('[data-back]')?.addEventListener('click', () => showPage(el.querySelector('[data-back]').dataset.back));
  }

  // ========== LANGUAGE ==========
  function setLang(lang) {
    state.lang = lang;
    save('lang');
    applyLang();
    renderPage(currentPage);
  }

  function applyLang() {
    document.body.classList.toggle('rtl', state.lang === 'ur');
    document.documentElement.lang = state.lang === 'ur' ? 'ur' : 'en';
    document.documentElement.dir = state.lang === 'ur' ? 'rtl' : 'ltr';
    // update header title
    const h1 = document.querySelector('.header-brand h1');
    if (h1) h1.textContent = t('appName');
    // update nav labels
    document.querySelectorAll('.nav-item').forEach(n => {
      const label = n.querySelector('span');
      if (label) label.textContent = t(n.dataset.page);
    });
  }

  // ========== SEARCH ==========
  function doSearch(q) {
    q = q.toLowerCase().trim();
    if (!q) { showPage('home'); return; }
    const results = [];
    const sections = [
      { k: 'bp', p: 'bp' }, { k: 'sugar', p: 'sugar' }, { k: 'weight', p: 'weight' },
      { k: 'water', p: 'water' }, { k: 'medicines', p: 'medicines' },
      { k: 'appointments', p: 'appointments' }, { k: 'history', p: 'history' },
      { k: 'favorites', p: 'favorites' }, { k: 'profile', p: 'profile' }, { k: 'settings', p: 'settings' }
    ];
    sections.forEach(s => {
      if (t(s.k).toLowerCase().includes(q) || s.k.includes(q)) results.push(s);
    });
    state.medicines.forEach(m => {
      if (m.name.toLowerCase().includes(q)) results.push({ k: m.name, p: 'medicines' });
    });

    const el = document.getElementById('page-home');
    // temporarily show results on home
    showPage('home');
    if (results.length) {
      const list = results.map(r => `<div class="section-item" data-nav="${r.p}">
        <div class="section-icon">${icons.search}</div>
        <div class="section-info"><h3>${typeof r.k === 'string' && T.en[r.k] ? t(r.k) : r.k}</h3></div>
        <span class="section-arrow">${icons.chevron}</span>
      </div>`).join('');
      el.innerHTML = `<div class="section-list">${list}</div>`;
      el.querySelectorAll('[data-nav]').forEach(i => i.addEventListener('click', () => showPage(i.dataset.nav)));
    } else {
      el.innerHTML = `<div class="empty-state"><p>No results</p></div>`;
    }
  }

  // ========== INIT ==========
  function init() {
    // Splash
    setTimeout(() => {
      document.getElementById('splash').classList.add('hide');
    }, 1400);

    // Service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }

    // Install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
    });

    // Apply language
    applyLang();

    // Header actions
    document.getElementById('btn-search').onclick = () => {
      const bar = document.getElementById('search-bar');
      bar.classList.toggle('open');
      if (bar.classList.contains('open')) {
        document.getElementById('search-input').focus();
      }
    };
    document.getElementById('search-input').oninput = (e) => {
      doSearch(e.target.value);
    };
    document.getElementById('btn-lang').onclick = () => {
      setLang(state.lang === 'en' ? 'ur' : 'en');
    };

    // Bottom nav
    document.querySelectorAll('.nav-item').forEach(n => {
      n.addEventListener('click', () => showPage(n.dataset.page));
    });

    // Modal close
    document.getElementById('modal-close').onclick = closeModal;
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
      if (e.target === document.getElementById('modal-overlay')) closeModal();
    });

    // Start
    showPage('home');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
