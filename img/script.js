// ========================================
// NAVEGAÇÃO ENTRE AS DISCIPLINAS
// ========================================

const pages = document.querySelectorAll(".page");
const navTabs = document.querySelectorAll(".nav-tab");
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

function showPage(pageId) {
  const targetPage = document.getElementById(pageId);

  if (!targetPage) return;

  pages.forEach(page => {
    page.classList.remove("active");
  });

  navTabs.forEach(tab => {
    tab.classList.remove("active");
  });

  targetPage.classList.add("active");

  const activeTab = document.querySelector(
    `.nav-tab[data-page="${pageId}"]`
  );

  if (activeTab) {
    activeTab.classList.add("active");
  }

  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Botões do menu principal
navTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    showPage(tab.dataset.page);
  });
});

// Botões que levam a outras disciplinas
document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.go);
  });
});

// Links que retornam ao início
document.querySelectorAll("[data-page-link]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    showPage(link.dataset.pageLink);
  });
});

// Menu para celular
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// ========================================
// CALCULADORA NUTRICIONAL
// ========================================

// Valores aproximados por 100 gramas.
const foods = {
  arroz: {
    name: "Arroz branco cozido",
    calories: 128,
    carbs: 28.1,
    protein: 2.5,
    fat: 0.2,
    fiber: 1.6,
    sodium: 1
  },

  feijao: {
    name: "Feijão carioca cozido",
    calories: 76,
    carbs: 13.6,
    protein: 4.8,
    fat: 0.5,
    fiber: 8.5,
    sodium: 2
  },

  frango: {
    name: "Frango grelhado",
    calories: 159,
    carbs: 0,
    protein: 32,
    fat: 2.5,
    fiber: 0,
    sodium: 50
  },

  banana: {
    name: "Banana",
    calories: 98,
    carbs: 26,
    protein: 1.3,
    fat: 0.1,
    fiber: 2,
    sodium: 0
  },

  maca: {
    name: "Maçã",
    calories: 56,
    carbs: 15.2,
    protein: 0.3,
    fat: 0,
    fiber: 1.3,
    sodium: 0
  },

  ovo: {
    name: "Ovo cozido",
    calories: 146,
    carbs: 0.6,
    protein: 13.3,
    fat: 9.5,
    fiber: 0,
    sodium: 146
  },

  batata: {
    name: "Batata cozida",
    calories: 52,
    carbs: 11.9,
    protein: 1.2,
    fat: 0,
    fiber: 1.3,
    sodium: 2
  }
};

let selectedFoods = [];

const foodSelect = document.getElementById("food-select");
const foodGrams = document.getElementById("food-grams");
const calculateButton = document.getElementById("calculate-food");
const clearButton = document.getElementById("clear-foods");
const nutritionMessage = document.getElementById("nutrition-message");
const foodList = document.getElementById("food-list");

// Adiciona um alimento à lista.
function addFood() {
  const foodKey = foodSelect.value;
  const grams = Number(foodGrams.value);

  if (!foodGrams.value || !Number.isFinite(grams) || grams <= 0) {
    nutritionMessage.textContent =
      "Digite uma quantidade válida, maior que zero.";
    return;
  }

  const food = foods[foodKey];

  if (!food) {
    nutritionMessage.textContent = "Selecione um alimento válido.";
    return;
  }

  selectedFoods.push({
    key: foodKey,
    name: food.name,
    grams: grams
  });

  foodGrams.value = "";

  nutritionMessage.textContent =
    `${food.name} adicionado com sucesso!`;

  updateNutrition();
}

// Calcula os totais nutricionais.
function updateNutrition() {
  const totals = {
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
    fiber: 0,
    sodium: 0
  };

  foodList.innerHTML = "";

  selectedFoods.forEach((item, index) => {
    const food = foods[item.key];
    const factor = item.grams / 100;

    totals.calories += food.calories * factor;
    totals.carbs += food.carbs * factor;
    totals.protein += food.protein * factor;
    totals.fat += food.fat * factor;
    totals.fiber += food.fiber * factor;
    totals.sodium += food.sodium * factor;

    const entry = document.createElement("div");
    entry.className = "food-entry";

    const description = document.createElement("span");
    description.textContent =
      `${item.name} — ${formatNumber(item.grams)} g`;

    const removeButton = document.createElement("button");
    removeButton.className = "remove-food";
    removeButton.type = "button";
    removeButton.textContent = "Remover";
    removeButton.setAttribute(
      "aria-label",
      `Remover ${item.name}`
    );

    removeButton.addEventListener("click", () => {
      selectedFoods.splice(index, 1);
      nutritionMessage.textContent =
        "Alimento removido da lista.";
      updateNutrition();
    });

    entry.appendChild(description);
    entry.appendChild(removeButton);
    foodList.appendChild(entry);
  });

  document.getElementById("total-calories").textContent =
    formatNumber(totals.calories);

  document.getElementById("total-carbs").textContent =
    `${formatNumber(totals.carbs)} g`;

  document.getElementById("total-protein").textContent =
    `${formatNumber(totals.protein)} g`;

  document.getElementById("total-fat").textContent =
    `${formatNumber(totals.fat)} g`;

  document.getElementById("total-fiber").textContent =
    `${formatNumber(totals.fiber)} g`;

  document.getElementById("total-sodium").textContent =
    `${formatNumber(totals.sodium)} mg`;
}

// Formata números com até duas casas decimais.
function formatNumber(number) {
  return Number(number.toFixed(2)).toLocaleString("pt-BR");
}

// Eventos dos botões da calculadora.
calculateButton.addEventListener("click", addFood);

clearButton.addEventListener("click", () => {
  selectedFoods = [];
  nutritionMessage.textContent = "Lista limpa.";
  updateNutrition();
});

// ========================================
// GRÁFICO DAS MEDIÇÕES DE SOM
// ========================================

const soundMeasurements = [
  { place: "Pátio", value: 81 },
  { place: "Quadra", value: 75 },
  { place: "Sala de aula", value: 51 },
  { place: "Corredor", value: 71 },
  { place: "Biblioteca", value: 50 },
  { place: "Refeitório", value: 50 }
];

function createSoundChart() {
  const chart = document.getElementById("sound-chart");

  if (!chart) return;

  chart.innerHTML = "";

  soundMeasurements.forEach(measurement => {
    const row = document.createElement("div");
    row.className = "chart-row";

    const label = document.createElement("span");
    label.textContent = measurement.place;

    const track = document.createElement("div");
    track.className = "chart-track";

    const fill = document.createElement("div");
    fill.className = "chart-fill";

    // A largura é proporcional ao valor medido.
    fill.style.width = `${(measurement.value / 100) * 100}%`;

    track.appendChild(fill);

    const value = document.createElement("span");
    value.className = "chart-value";
    value.textContent = `${measurement.value} dB`;

    row.appendChild(label);
    row.appendChild(track);
    row.appendChild(value);

    chart.appendChild(row);
  });
}

// ========================================
// BOTÃO VOLTAR AO TOPO
// ========================================

const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 350) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ========================================
// INICIALIZAÇÃO
// ========================================

updateNutrition();
createSoundChart();