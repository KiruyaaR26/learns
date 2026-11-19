document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
     1. TAB NAVIGATION
     ========================================================================== */
  const tabs = Array.from(document.querySelectorAll('.tab-grid [role="tab"]'));
  const panels = Array.from(document.querySelectorAll('.tab-panel[role="tabpanel"]'));

  const activateTab = (targetKey, updateHash = true) => {
    if (!tabs.length || !panels.length) return;
    const matchedTab = tabs.find((tab) => tab.dataset.tab === targetKey) || tabs[0];
    const activeKey = matchedTab.dataset.tab;

    tabs.forEach((tab) => {
      const isSelected = tab.dataset.tab === activeKey;
      tab.setAttribute("aria-selected", String(isSelected));
      tab.setAttribute("tabindex", isSelected ? "0" : "-1");
    });

    panels.forEach((panel) => {
      const isMatch = panel.id === `panel-${activeKey}`;
      panel.hidden = !isMatch;
      panel.classList.toggle("is-active", isMatch);
    });

    if (updateHash && window.history && window.history.replaceState) {
      window.history.replaceState(null, "", `#${activeKey}`);
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateTab(tab.dataset.tab, true);
    });

    tab.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + dir + tabs.length) % tabs.length;
      tabs[nextIndex].focus();
      activateTab(tabs[nextIndex].dataset.tab, true);
    });
  });

  const initialHash = window.location.hash.replace("#", "").toLowerCase();
  if (initialHash) {
    if (initialHash === "register-bootcamp") {
      activateTab("bootcamp", false);
      document.getElementById("register-bootcamp")?.scrollIntoView({ behavior: "smooth" });
    } else if (initialHash === "register-certification") {
      activateTab("certification", false);
      document.getElementById("register-certification")?.scrollIntoView({ behavior: "smooth" });
    } else if (tabs.some((tab) => tab.dataset.tab === initialHash)) {
      activateTab(initialHash, false);
    }
  }

  /* ==========================================================================
     2. INTERNATIONALIZATION (EN <-> ID) SYNC WITH #lang-toggle
     ========================================================================== */
  const learnsI18n = {
    en: {
      "header.eyebrow": "[Radova Academy & Docs]",
      "header.title": "Master Radova Linux",
      "header.lead": "Technical documentation, structured engineering courses, cohort bootcamps, and industry-grade certifications.",

      "tabs.tutorial": "Tutorial",
      "tabs.course": "Course",
      "tabs.bootcamp": "Bootcamp",
      "tabs.certification": "Certification",

      "tut.eyebrow": "01 // DOCUMENTATION INDEX",
      "tut.title": "Tutorial & System Wiki",
      "tut.cta": "Open Full Wiki",
      "tut.c1.title": "Installation & Boot",
      "tut.c1.desc": "Base system installation guide, UEFI/BIOS partitioning, and bootloader configuration.",
      "tut.c1.l1": "Installation Guide (x86_64)",
      "tut.c1.l2": "Disk Partitioning & LUKS Encryption",
      "tut.c1.l3": "Post-Installation Checklist",
      "tut.c2.title": "Package Management",
      "tut.c2.desc": "Using <code>packer</code>, repository synchronization, and system dependency management.",
      "tut.c2.l1": "Packer CLI Reference",
      "tut.c2.l2": "Official & Community Mirrors",
      "tut.c2.l3": "Building Custom PKGBUILDs",
      "tut.c3.title": "System Administration",
      "tut.c3.desc": "Init service management, networking, firewall, and kernel performance optimization.",
      "tut.c3.l1": "Service & Daemon Control",
      "tut.c3.l2": "Network Configuration & WireGuard",
      "tut.c3.l3": "Kernel Parameters & Sysctl",
      "tut.c4.title": "Library & DAM Stack",
      "tut.c4.desc": "Automated deployment of digital library platforms, institutional repositories, and archives.",
      "tut.c4.l1": "Digital Asset Management Setup",
      "tut.c4.l2": "Automated Snapshot & Offsite Backup",
      "tut.c4.l3": "Zero-Trust Server Hardening",

      "crs.eyebrow": "02 // STRUCTURED CURRICULUM",
      "crs.title": "Self-Paced Courses",
      "crs.note": "Open access for all Radova Linux users.",
      "crs.prereq": "Prerequisites",
      "crs.lab": "Lab Environment",
      "crs.cta": "Start Syllabus",
      "crs.c1.level": "Beginner",
      "crs.c1.dur": "4 Modules · 3 Hours",
      "crs.c1.title": "RDV-101: Radova Linux Fundamentals",
      "crs.c1.desc": "Introduction to Radova system architecture, shell navigation, FHS directory structure, and basic package management.",
      "crs.c1.prereq": "Basic CLI familiarity",
      "crs.c2.level": "Intermediate",
      "crs.c2.dur": "6 Modules · 6 Hours",
      "crs.c2.title": "RDV-201: Server & Repository Operations",
      "crs.c2.desc": "Production web server configuration, reverse proxy, system service automation, and institutional-scale digital archive management.",
      "crs.c2.prereq": "RDV-101 or equivalent",
      "crs.c3.level": "Advanced",
      "crs.c3.dur": "5 Modules · 8 Hours",
      "crs.c3.title": "RDV-301: Hardening & Custom ISO Engineering",
      "crs.c3.desc": "Kernel security auditing, mandatory access control, and custom ISO image building using the <code>mkarchiso</code> pipeline.",
      "crs.c3.prereq": "RDV-201 & Shell Scripting",

      "bc.eyebrow": "03 // COHORT NOTICE BOARD",
      "bc.title": "Intensive Bootcamps",
      "bc.cta": "Register Bootcamp",
      "bc.schedule": "Schedule",
      "bc.duration": "Duration",
      "bc.fee": "Fee",
      "bc.b1.status": "Open Registration",
      "bc.b1.mode": "Batch #04 · Live Online",
      "bc.b1.title": "Radova System Administrator Bootcamp",
      "bc.b1.desc": "An intensive 4-week program covering production server administration, backup automation, and live incident response with core Radova mentors.",
      "bc.b1.start": "Start: 12 Jan 2027",
      "bc.b1.quota": "Quota: 14 / 30 Seats Left",
      "bc.b1.schedule": "Sat & Sun · 09:00 WIB",
      "bc.b1.duration": "4 Weeks (32 Hours)",
      "bc.b1.fee": "Free (Community Grant)",
      "bc.b1.btn": "Apply for Batch #04",
      "bc.b2.status": "Upcoming",
      "bc.b2.mode": "Batch #02 · Hybrid Lab",
      "bc.b2.title": "Digital Repository & Archive Infrastructure Bootcamp",
      "bc.b2.desc": "Specialized training for librarians and archivists to build resilient institutional repository infrastructure powered by Radova Linux.",
      "bc.b2.start": "Start: 15 Feb 2027",
      "bc.b2.quota": "Quota: 25 / 25 Seats Left",
      "bc.b2.schedule": "Tue & Thu · 19:00 WIB",
      "bc.b2.duration": "3 Weeks (24 Hours)",
      "bc.b2.fee": "IDR 350.000",
      "bc.b2.btn": "Join Waitlist",
      "bc.form.eyebrow": "BOOTCAMP REGISTRATION",
      "bc.form.title": "Reserve Your Cohort Seat",
      "bc.form.desc": "Fill out the registration form beside to secure your seat in an available batch. Confirmation and lab access will be sent to your registered email within 24 hours.",
      "bc.form.nameLabel": "Full Name",
      "bc.form.namePlaceholder": "Full name as shown on certificate",
      "bc.form.emailLabel": "Email Address",
      "bc.form.programLabel": "Select Bootcamp Batch",
      "bc.form.opt1": "Radova System Administrator Bootcamp (Batch #04)",
      "bc.form.opt2": "Digital Repository & Archive Infrastructure (Batch #02)",
      "bc.form.submit": "Submit Bootcamp Application",

      "cert.eyebrow": "04 // CREDENTIAL & EXAM BOARD",
      "cert.title": "Professional Certifications",
      "cert.cta": "Register Exam",
      "cert.domainsTitle": "Core Exam Domains",
      "cert.code": "Exam Code",
      "cert.format": "Format",
      "cert.duration": "Duration",
      "cert.passing": "Passing Score",
      "cert.validity": "Validity",
      "cert.voucher": "Exam Voucher",
      "cert.c1.level": "Flagship Credential",
      "cert.c1.codeBadge": "Exam Code: RCSA-312",
      "cert.c1.desc": "Hands-on competency certification testing system hardening, network security auditing, incident response, and zero-trust server architecture on Radova Linux.",
      "cert.c1.d1": "<strong>01.</strong> Reconnaissance, Attack Surface & System Auditing (15%)",
      "cert.c1.d2": "<strong>02.</strong> Kernel Hardening, Permissions & Mandatory Access Control (25%)",
      "cert.c1.d3": "<strong>03.</strong> Network Defense, Cryptography & WireGuard Tunneling (20%)",
      "cert.c1.d4": "<strong>04.</strong> Service Isolation, Container Security & Supply-Chain Integrity (20%)",
      "cert.c1.d5": "<strong>05.</strong> Live Incident Response & Forensics Recovery Lab (20%)",
      "cert.c1.format": "60 MCQ + 6 Practical Labs",
      "cert.c1.duration": "4 Hours (Proctored)",
      "cert.c1.passing": "75% Minimum",
      "cert.c1.validity": "3 Years",
      "cert.c1.voucher": "IDR 750.000",
      "cert.c1.btn": "Schedule RCSSA Exam",
      "cert.c2.level": "Associate Level",
      "cert.c2.codeBadge": "Exam Code: RCLA-101",
      "cert.c2.desc": "Validates daily operational skills of a Radova Linux system administrator: installation, <code>packer</code> package management, storage, and service maintenance.",
      "cert.c2.d1": "<strong>01.</strong> System Installation, Bootloader & Storage Management (25%)",
      "cert.c2.d2": "<strong>02.</strong> Package Lifecycle & Repository Maintenance (25%)",
      "cert.c2.d3": "<strong>03.</strong> User Management, Process & Init Daemons (25%)",
      "cert.c2.d4": "<strong>04.</strong> Networking & Backup Operations (25%)",
      "cert.c2.format": "100% Hands-on Terminal Lab",
      "cert.c2.duration": "2.5 Hours (Proctored)",
      "cert.c2.passing": "70% Minimum",
      "cert.c2.validity": "3 Years",
      "cert.c2.voucher": "IDR 450.000",
      "cert.c2.btn": "Schedule RCLA Exam",
      "cert.form.eyebrow": "EXAMINATION REGISTRATION",
      "cert.form.title": "Apply for Certification Exam",
      "cert.form.desc": "Register to receive your exam voucher code and online proctoring session schedule. Passing candidates receive a verified digital certificate with a unique credential ID.",
      "cert.form.nameLabel": "Candidate Legal Name",
      "cert.form.namePlaceholder": "Full legal name for credential",
      "cert.form.emailLabel": "Email Address",
      "cert.form.examLabel": "Select Certification Exam",
      "cert.form.dateLabel": "Preferred Exam Date",
      "cert.form.submit": "Request Exam Voucher"
    },

    id: {
      "header.eyebrow": "[Akademi & Dokumentasi Radova]",
      "header.title": "Kuasai Radova Linux",
      "header.lead": "Dokumentasi teknis, kursus rekayasa terstruktur, bootcamp kohort, dan sertifikasi standar industri.",

      "tabs.tutorial": "Tutorial",
      "tabs.course": "Kursus",
      "tabs.bootcamp": "Bootcamp",
      "tabs.certification": "Sertifikasi",

      "tut.eyebrow": "01 // INDEKS DOKUMENTASI",
      "tut.title": "Tutorial & Wiki Sistem",
      "tut.cta": "Buka Wiki Lengkap",
      "tut.c1.title": "Instalasi & Boot",
      "tut.c1.desc": "Panduan pemasangan sistem dasar, partisi UEFI/BIOS, dan konfigurasi bootloader.",
      "tut.c1.l1": "Panduan Instalasi (x86_64)",
      "tut.c1.l2": "Partisi Disk & Enkripsi LUKS",
      "tut.c1.l3": "Daftar Periksa Pasca-Instalasi",
      "tut.c2.title": "Manajemen Paket",
      "tut.c2.desc": "Penggunaan <code>packer</code>, sinkronisasi repositori, serta manajemen dependensi sistem.",
      "tut.c2.l1": "Referensi CLI Packer",
      "tut.c2.l2": "Mirror Resmi & Komunitas",
      "tut.c2.l3": "Membangun PKGBUILD Kustom",
      "tut.c3.title": "Administrasi Sistem",
      "tut.c3.desc": "Manajemen layanan init, jaringan, firewall, dan optimalisasi performa kernel.",
      "tut.c3.l1": "Kontrol Layanan & Daemon",
      "tut.c3.l2": "Konfigurasi Jaringan & WireGuard",
      "tut.c3.l3": "Parameter Kernel & Sysctl",
      "tut.c4.title": "Tumpukan Perpustakaan & DAM",
      "tut.c4.desc": "Deployment otomatis platform perpustakaan digital, repositori institusi, dan arsip.",
      "tut.c4.l1": "Pengaturan Manajemen Aset Digital",
      "tut.c4.l2": "Snapshot Otomatis & Cadangan Offsite",
      "tut.c4.l3": "Penguatan Server Zero-Trust",

      "crs.eyebrow": "02 // KURIKULUM TERSTRUKTUR",
      "crs.title": "Kursus Mandiri",
      "crs.note": "Akses terbuka untuk seluruh pengguna Radova Linux.",
      "crs.prereq": "Prasyarat",
      "crs.lab": "Lingkungan Lab",
      "crs.cta": "Mulai Silabus",
      "crs.c1.level": "Pemula",
      "crs.c1.dur": "4 Modul · 3 Jam",
      "crs.c1.title": "RDV-101: Dasar-Dasar Radova Linux",
      "crs.c1.desc": "Pengenalan arsitektur sistem Radova, navigasi shell, struktur direktori FHS, dan manajemen paket dasar.",
      "crs.c1.prereq": "Pemahaman dasar CLI",
      "crs.c2.level": "Menengah",
      "crs.c2.dur": "6 Modul · 6 Jam",
      "crs.c2.title": "RDV-201: Operasi Server & Repositori",
      "crs.c2.desc": "Konfigurasi web server produksi, reverse proxy, otomasi layanan sistem, dan pengelolaan arsip digital skala institusi.",
      "crs.c2.prereq": "RDV-101 atau setara",
      "crs.c3.level": "Lanjutan",
      "crs.c3.dur": "5 Modul · 8 Jam",
      "crs.c3.title": "RDV-301: Hardening & Rekayasa ISO Kustom",
      "crs.c3.desc": "Audit keamanan kernel, mandatory access control, dan peracikan image ISO kustom menggunakan pipeline <code>mkarchiso</code>.",
      "crs.c3.prereq": "RDV-201 & Skrip Shell",

      "bc.eyebrow": "03 // PAPAN INFORMASI KOHORT",
      "bc.title": "Bootcamp Intensif",
      "bc.cta": "Daftar Bootcamp",
      "bc.schedule": "Jadwal",
      "bc.duration": "Durasi",
      "bc.fee": "Biaya",
      "bc.b1.status": "Pendaftaran Dibuka",
      "bc.b1.mode": "Batch #04 · Daring Langsung",
      "bc.b1.title": "Bootcamp Administrator Sistem Radova",
      "bc.b1.desc": "Program intensif 4 minggu membahas administrasi server produksi, otomasi backup, serta penanganan insiden sistem secara langsung bersama mentor inti Radova.",
      "bc.b1.start": "Mulai: 12 Jan 2027",
      "bc.b1.quota": "Kuota: Tersisa 14 / 30 Kursi",
      "bc.b1.schedule": "Sab & Min · 09:00 WIB",
      "bc.b1.duration": "4 Minggu (32 Jam)",
      "bc.b1.fee": "Gratis (Hibah Komunitas)",
      "bc.b1.btn": "Daftar Batch #04",
      "bc.b2.status": "Akan Datang",
      "bc.b2.mode": "Batch #02 · Lab Hibrida",
      "bc.b2.title": "Bootcamp Infrastruktur Repositori Digital & Arsip",
      "bc.b2.desc": "Pelatihan khusus pengelola perpustakaan dan pusat arsip untuk membangun infrastruktur repositori institusi berbasis Radova Linux yang tangguh.",
      "bc.b2.start": "Mulai: 15 Feb 2027",
      "bc.b2.quota": "Kuota: Tersisa 25 / 25 Kursi",
      "bc.b2.schedule": "Sel & Kam · 19:00 WIB",
      "bc.b2.duration": "3 Minggu (24 Jam)",
      "bc.b2.fee": "Rp 350.000",
      "bc.b2.btn": "Gabung Daftar Tunggu",
      "bc.form.eyebrow": "PENDAFTARAN BOOTCAMP",
      "bc.form.title": "Amankan Kursi Kohort Anda",
      "bc.form.desc": "Isi formulir pendaftaran di samping untuk mengamankan kursi pada batch yang tersedia. Konfirmasi dan akses lab akan dikirimkan ke email terdaftar maksimal 1×24 jam.",
      "bc.form.nameLabel": "Nama Lengkap",
      "bc.form.namePlaceholder": "Nama lengkap sesuai sertifikat",
      "bc.form.emailLabel": "Alamat Email",
      "bc.form.programLabel": "Pilih Batch Bootcamp",
      "bc.form.opt1": "Bootcamp Administrator Sistem Radova (Batch #04)",
      "bc.form.opt2": "Infrastruktur Repositori Digital & Arsip (Batch #02)",
      "bc.form.submit": "Kirim Pendaftaran Bootcamp",

      "cert.eyebrow": "04 // DEWAN KREDENSIAL & UJIAN",
      "cert.title": "Sertifikasi Profesional",
      "cert.cta": "Daftar Ujian",
      "cert.domainsTitle": "Domain Utama Ujian",
      "cert.code": "Kode Ujian",
      "cert.format": "Format",
      "cert.duration": "Durasi",
      "cert.passing": "Nilai Kelulusan",
      "cert.validity": "Masa Berlaku",
      "cert.voucher": "Voucher Ujian",
      "cert.c1.level": "Kredensial Utama",
      "cert.c1.codeBadge": "Kode Ujian: RCSA-312",
      "cert.c1.desc": "Sertifikasi kompetensi berbasis praktik untuk menguji kemampuan hardening sistem, audit keamanan jaringan, respons insiden, dan arsitektur server zero-trust di atas Radova Linux.",
      "cert.c1.d1": "<strong>01.</strong> Pengintaian, Permukaan Serangan & Audit Sistem (15%)",
      "cert.c1.d2": "<strong>02.</strong> Hardening Kernel, Hak Akses & Mandatory Access Control (25%)",
      "cert.c1.d3": "<strong>03.</strong> Pertahanan Jaringan, Kriptografi & Tunneling WireGuard (20%)",
      "cert.c1.d4": "<strong>04.</strong> Isolasi Layanan, Keamanan Kontainer & Integritas Rantai Pasok (20%)",
      "cert.c1.d5": "<strong>05.</strong> Lab Respons Insiden Langsung & Pemulihan Forensik (20%)",
      "cert.c1.format": "60 PG + 6 Lab Praktik",
      "cert.c1.duration": "4 Jam (Diawasi)",
      "cert.c1.passing": "Minimal 75%",
      "cert.c1.validity": "3 Tahun",
      "cert.c1.voucher": "Rp 750.000",
      "cert.c1.btn": "Jadwalkan Ujian RCSSA",
      "cert.c2.level": "Tingkat Madya",
      "cert.c2.codeBadge": "Kode Ujian: RCLA-101",
      "cert.c2.desc": "Validasi kemampuan operasional harian administrator sistem Radova Linux: instalasi, manajemen paket <code>packer</code>, penyimpanan, dan pemeliharaan layanan.",
      "cert.c2.d1": "<strong>01.</strong> Instalasi Sistem, Bootloader & Manajemen Penyimpanan (25%)",
      "cert.c2.d2": "<strong>02.</strong> Siklus Hidup Paket & Pemeliharaan Repositori (25%)",
      "cert.c2.d3": "<strong>03.</strong> Manajemen Pengguna, Proses & Daemon Init (25%)",
      "cert.c2.d4": "<strong>04.</strong> Operasi Jaringan & Pencadangan (25%)",
      "cert.c2.format": "100% Lab Terminal Praktik",
      "cert.c2.duration": "2,5 Jam (Diawasi)",
      "cert.c2.passing": "Minimal 70%",
      "cert.c2.validity": "3 Tahun",
      "cert.c2.voucher": "Rp 450.000",
      "cert.c2.btn": "Jadwalkan Ujian RCLA",
      "cert.form.eyebrow": "PENDAFTARAN UJIAN",
      "cert.form.title": "Ajukan Ujian Sertifikasi",
      "cert.form.desc": "Daftarkan diri untuk mendapatkan kode voucher ujian dan jadwal sesi pengawasan daring (<em>online proctoring</em>). Kandidat lulus mendapatkan sertifikat digital terverifikasi dengan ID kredensial unik.",
      "cert.form.nameLabel": "Nama Resmi Kandidat",
      "cert.form.namePlaceholder": "Nama lengkap untuk kredensial",
      "cert.form.emailLabel": "Alamat Email",
      "cert.form.examLabel": "Pilih Ujian Sertifikasi",
      "cert.form.dateLabel": "Tanggal Ujian Pilihan",
      "cert.form.submit": "Ajukan Voucher Ujian"
    }
  };

  const applyLearnsLanguage = (lang) => {
    const activeLang = lang === "id" ? "id" : "en";
    const dict = learnsI18n[activeLang];
    if (!dict) return;

    document.querySelectorAll("[data-learns-i18n]").forEach((el) => {
      const key = el.getAttribute("data-learns-i18n");
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll("[data-learns-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-learns-i18n-html");
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    document.querySelectorAll("[data-learns-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-learns-placeholder");
      if (dict[key] !== undefined) {
        el.setAttribute("placeholder", dict[key]);
      }
    });
  };

  const detectCurrentLanguage = () => {
    const htmlLang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
    if (htmlLang.startsWith("id")) return "id";

    const langBtn = document.getElementById("lang-toggle");
    if (langBtn) {
      const btnText = langBtn.textContent.trim().toUpperCase();
      if (btnText === "ID") return "id";
      if (btnText === "EN") return "en";
    }

    for (const key of ["lang", "language", "radova_lang", "radova-lang", "site_lang"]) {
      const stored = (localStorage.getItem(key) || "").toLowerCase();
      if (stored.startsWith("id")) return "id";
      if (stored.startsWith("en")) return "en";
    }

    return "en";
  };

  // Sinkronisasi awal saat halaman dibuka
  applyLearnsLanguage(detectCurrentLanguage());

  // Pantau perubahan atribut lang pada <html> dan teks pada tombol #lang-toggle
  const langObserver = new MutationObserver(() => {
    applyLearnsLanguage(detectCurrentLanguage());
  });

  langObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"]
  });

  const langToggleBtn = document.getElementById("lang-toggle");
  if (langToggleBtn) {
    langObserver.observe(langToggleBtn, {
      childList: true,
      characterData: true,
      subtree: true
    });

    langToggleBtn.addEventListener("click", () => {
      setTimeout(() => {
        applyLearnsLanguage(detectCurrentLanguage());
      }, 0);
    });
  }
});