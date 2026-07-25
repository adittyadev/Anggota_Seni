const STORAGE_KEY = "senja_progress";

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

document.getElementById("btnMulai").onclick = () => {
  goTo("identity");
};

document.getElementById("backToAbout").onclick = () => {
  goTo("about");
};

document.getElementById("toQuestion1").onclick = () => {
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
};

document.getElementById("backToIdentity").onclick = () => {
  for (let i = 1; i <= 10; i++) {
    const field = document.getElementById("answer" + i);
    if (field) answers["q" + i] = field.value;
  }

  goTo("identity");
};

document.getElementById("nextQuestion").onclick = () => {
  for (let i = 1; i <= 10; i++) {
    answers["q" + i] = document.getElementById("answer" + i).value;
  }

  goTo("question2");
};

document.getElementById("backQuestion").onclick = () => {
  for (let i = 11; i <= 20; i++) {
    const field = document.getElementById("answer" + i);
    if (field) answers["q" + i] = field.value;
  }

  goTo("question1");
};

document.getElementById("backFromLoading").onclick = () => {
  goTo("question2");
};

document.getElementById("submitForm").onclick = async () => {
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
};
    
