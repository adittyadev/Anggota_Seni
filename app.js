const STORAGE_KEY = "senja_progress";

/* pasang event listener dengan aman — kalau elemen tidak ditemukan,
   cukup catat peringatan di console, tidak menghentikan seluruh script */
function on(id, handler) {
  const el = document.getElementById(id);

  if (!el) {
    console.warn(`Elemen dengan id "${id}" tidak ditemukan di halaman.`);
    return;
  }

  el.onclick = handler;
}

/* =========================================
   SIMPAN / MUAT / HAPUS PROGRES
========================================= */

function saveProgress(page) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ page, answers }));
  } catch (error) {
    console.log(error);
  }
}

function loadProgress() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function clearProgress() {
  sessionStorage.removeItem(STORAGE_KEY);
}

/* pindah halaman sekaligus menyimpan progresnya */
function goTo(page) {
  showPage(page);
  saveProgress(page);
}

/* =========================================
   ISI ULANG FORM DARI DATA TERSIMPAN
========================================= */

function fillIdentityFields() {
  if (answers.nama) document.getElementById("nama").value = answers.nama;
  if (answers.nobp) document.getElementById("nobp").value = answers.nobp;
  if (answers.divisi) document.getElementById("divisi").value = answers.divisi;
  if (answers.alasan) document.getElementById("alasan").value = answers.alasan;
}

function fillQuestionFields() {
  for (let i = 1; i <= 20; i++) {
    const field = document.getElementById("answer" + i);
    if (field && answers["q" + i]) {
      field.value = answers["q" + i];
    }
  }
}

/* =========================================
   INIT
========================================= */

window.onload = () => {
  renderQuestions();

  const saved = loadProgress();

  if (
    saved &&
    saved.page &&
    saved.page !== "loading" &&
    saved.page !== "finish"
  ) {
    Object.assign(answers, saved.answers || {});
    fillIdentityFields();
    fillQuestionFields();
    showPage(saved.page);
  } else {
    setTimeout(() => {
      goTo("about");
    }, 3000);
  }
};

on("btnMulai", () => {
  goTo("identity");
});

on("backToAbout", () => {
  goTo("about");
});

on("toQuestion1", () => {
  const nama = document.getElementById("nama").value;
  const nobp = document.getElementById("nobp").value;
  const divisi = document.getElementById("divisi").value;

  if (nama == "" || nobp == "" || divisi == "") {
    showAlert("Lengkapi identitas terlebih dahulu.");
    return;
  }

  answers.nama = nama;
  answers.nobp = nobp;
  answers.divisi = divisi;
  answers.alasan = document.getElementById("alasan").value;

  goTo("question1");
});

on("backToIdentity", () => {
  for (let i = 1; i <= 10; i++) {
    const field = document.getElementById("answer" + i);
    if (field) answers["q" + i] = field.value;
  }

  goTo("identity");
});

on("nextQuestion", () => {
  for (let i = 1; i <= 10; i++) {
    answers["q" + i] = document.getElementById("answer" + i).value;
  }

  goTo("question2");
});

on("backQuestion", () => {
  for (let i = 11; i <= 20; i++) {
    const field = document.getElementById("answer" + i);
    if (field) answers["q" + i] = field.value;
  }

  goTo("question1");
});

on("backFromLoading", () => {
  goTo("question2");
});

on("submitForm", async () => {
  for (let i = 11; i <= 20; i++) {
    answers["q" + i] = document.getElementById("answer" + i).value;
  }

  console.log("DATA YANG DIKIRIM:");
  console.table(answers);

  showPage("loading");

  const result = await sendData(answers);

  console.log(result);

  clearProgress();

  setTimeout(() => {
    showPage("finish");
  }, 2000);
});
