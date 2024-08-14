const translations = {
  en: {
    Pending: "Pending",
    Processing: "Processing",
    Shipped: "Shipped",
    Delivered: "Delivered",
    Your_order_is: "Your order is",
    Next: "Next",
    Previous: "Previous",
  },
  fa: {
    Pending: "در انتظار تایید است",
    Processing: "در حال بسته بندی است",
    Shipped: "در مسیر مقصد است",
    Delivered: "تحویل داده شد",
    Your_order_is: "سفارش شما",
    Next: "بعدی",
    Previous: "قبلی",
  },
};

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".previous");
const progressBars = document.querySelectorAll(".progress-bar");
const progresslines = document.querySelectorAll(".progress-line");
const notes = document.querySelectorAll(".notes p");
const processingBackground = document.querySelector(".prcessing-notes");
const processingNote = document.querySelector(".prcessing-notes p");
const languageSelect = document.getElementById("language");

let currentLanguage = translations["en"];
const steps = ["Pending", "Processing", "Shipped", "Delivered"];
let currentStep = localStorage.getItem("currentstep")
  ? parseInt(localStorage.getItem("currentstep"))
  : 0;

// به‌روزرسانی متن‌ها
function updateText() {
  notes.forEach((note, index) => {
    note.textContent = currentLanguage[steps[index]];
  });
  processingNote.textContent = `${currentLanguage["Your_order_is"]} ${
    currentLanguage[steps[currentStep]]
  }`;
  nextBtn.textContent = currentLanguage["Next"];
  prevBtn.textContent = currentLanguage["Previous"];
}

// تغییر زبان و ذخیره در لوکال استورج
languageSelect.addEventListener("change", (e) => {
  const selectedLanguage = e.target.value;
  localStorage.setItem("selectedLanguage", selectedLanguage);
  currentLanguage = translations[selectedLanguage];
  updateText();
});

// بارگذاری زبان ذخیره شده از لوکال استورج هنگام بارگذاری صفحه
document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
  languageSelect.value = savedLanguage;
  currentLanguage = translations[savedLanguage];
  updateText();
});

function updateProgress() {
  progressBars.forEach((bar, index) => {
    if (index < currentStep) {
      bar.classList.add("completed");
      bar.classList.remove("done-process");
      bar.querySelector(".rotation-div").style.display = "none";
    } else if (index === currentStep) {
      if (currentStep === progressBars.length - 1) {
        bar.classList.add("completed");
        bar.classList.remove("done-process");
        bar.querySelector(".rotation-div").style.display = "none";
      } else {
        bar.classList.add("done-process");
        bar.classList.remove("completed");
        bar.querySelector(".rotation-div").style.display = "block";
      }
    }
    else {
      bar.classList.remove("completed", "done-process");
      bar.querySelector(".rotation-div").style.display = "none";
    }
  });

  progresslines.forEach((line, index) => {
    if (index < currentStep) {
      line.classList.add("line-compelete");
    } else {
      line.classList.remove("line-compelete");
    }
  });

  notes.forEach((note, index) => {
    note.textContent = currentLanguage[steps[index]];
    if (index === currentStep) {
      note.style.color = "var(--color-progressing)";
    } else {
      note.style.color = "black";
    }
  });

  processingNote.textContent = `${currentLanguage["Your_order_is"]} ${
    currentLanguage[steps[currentStep]]
  }`;

  if (`${steps[currentStep]}` === "Delivered") {
    processingBackground.style.backgroundColor = "var( --color-completed)";
    processingNote.style.color = "white";
  } else {
    processingBackground.style.backgroundColor = "var(--color-nextBtn)";
    processingNote.style.color = "#214753";
  }

  // Disable/Enable buttons based on current step
  prevBtn.disabled = currentStep === 0;
  nextBtn.disabled = currentStep === progressBars.length - 1;
}

nextBtn.addEventListener("click", () => {
  if (currentStep < progressBars.length - 1) {
    currentStep++;
    localStorage.setItem("currentstep", currentStep);
    updateText();
    updateProgress();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    localStorage.setItem("currentstep", currentStep);
    updateText();
    updateProgress();
  }
});

updateProgress();
