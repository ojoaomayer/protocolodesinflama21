/**
 * DESINFLAMA 21 - APP LOGIC & STATE MANAGEMENT
 * Clínica Ale Zorzan - Área de Membros
 */

// Global State
const appState = {
    currentView: 'home',
    currentDay: 1,
    waterGoalLiters: 2.8,
    glassesTotal: 14,
    glassesDrank: 0,
    theme: 'light',
    symptomScore: null
};

// Recipe Database
const recipesDB = [
    {
        id: 1,
        title: "Shot Matinal da Imunidade & Reset Digestivo",
        category: "shots",
        catLabel: "Shot Matinal • Anti-inflamatório",
        time: "2 minutos",
        yield: "1 dose (50ml)",
        badge: "Shot Diário",
        description: "A melhor forma de começar o dia: estimula a produção de ácido clorídrico no estômago, ativa enzimas do fígado e reduz citocinas inflamatórias logo nas primeiras horas.",
        ingredients: [
            "Suco de 1/2 limão espremido na hora",
            "1 colher de café (rasa) de cúrcuma pura em pó",
            "1 pitada de pimenta preta moída (piperina para absorção)",
            "15 gotas de extrato de própolis verde alcoólico ou aquoso",
            "1 colher de café de gengibre fresco ralado ou em pó",
            "30ml de água morna"
        ],
        steps: [
            "Em um copo pequeno de vidro, adicione o suco de limão fresco e a água morna.",
            "Acrescente a cúrcuma em pó, a pitadinha de pimenta preta e o gengibre ralado.",
            "Pingue as 15 gotas de própolis verde e misture vigorosamente com uma colher pequena.",
            "Tome de uma vez em jejum, aguardando de 15 a 20 minutos antes de tomar seu café da manhã."
        ],
        tip: "A pimenta preta aumenta a absorção da curcumina em até 2000% no organismo."
    },
    {
        id: 2,
        title: "Suco Verde Desintoxicante Celular",
        category: "shots",
        catLabel: "Bebida • Drenagem & Fibras",
        time: "5 minutos",
        yield: "1 copo grande (300ml)",
        badge: "Detox Intestinal",
        description: "Bebida densa em clorofila viva, magnésio e potássio. Estimula a eliminação de toxinas retidas no espaço extracelular e alivia o inchaço abdominal.",
        ingredients: [
            "2 folhas de couve manteiga orgânica higienizadas",
            "1/2 pepino japonês com casca",
            "1 ramo pequeno de hortelã fresca",
            "1/2 maçã verde com casca (fonte de pectina prebiótica)",
            "1 lasca fina de gengibre (cerca de 1cm)",
            "200ml de água de coco natural ou água gelada filtrada",
            "Suco de 1/2 limão"
        ],
        steps: [
            "Higienize bem as folhas e os vegetais.",
            "Corte o pepino e a maçã verde em pedaços médios.",
            "Coloque todos os ingredientes no liquidificador, iniciando pelos líquidos.",
            "Bata em potência alta por 1 minuto e meio até ficar homogêneo.",
            "Beba imediatamente sem coar para preservar todas as fibras prebióticas."
        ],
        tip: "Evite coar! As fibras solúveis alimentam as bactérias benéficas da sua microbiota."
    },
    {
        id: 3,
        title: "Caldo de Ossos Restaurador da Mucosa",
        category: "caldos",
        catLabel: "Caldo • Colágeno & Barreira Intestinal",
        time: "Cozimento lento (6 a 12h na panela de pressão ou lenta)",
        yield: "Rende 4 a 6 porções de 250ml",
        badge: "Regeneração Intestinal",
        description: "O elixir de ouro para a integridade da parede intestinal. Fonte riquíssima de colágeno hidrolisado natural, glicina, prolina e glutamina para cessar a permeabilidade intestinal (leaky gut).",
        ingredients: [
            "1kg de ossos bovinos com tutano ou carcaça de frango caipira",
            "2 colheres de sopa de vinagre de maçã orgânico (essencial para extrair minerais)",
            "1 cebola média cortada ao meio",
            "2 dentes de alho amassados",
            "1 cenoura e 1 talo de salsão fatiados",
            "1 colher de sobremesa de sal marinho integral ou sal rosa",
            "1 ramo de alecrim, tomilho e 2 folhas de louro",
            "Água filtrada suficiente para cobrir os ossos"
        ],
        steps: [
            "Em uma panela grande de pressão ou panela lenta, coloque os ossos e os vegetais aromáticos.",
            "Cubra com água filtrada e adicione as 2 colheres de vinagre de maçã. Deixe descansar 20 minutos antes de ligar o fogo.",
            "Leve ao fogo. Quando pegar pressão, reduza para o fogo mínimo e deixe cozinhar por pelo menos 1h30 a 2h na pressão (ou 8 a 12 horas em panela tradicional/lenta).",
            "Desligue o fogo, espere esfriar, coe o líquido dourado e descarte os ossos e vegetais gastos.",
            "Armazene em potes de vidro na geladeira (dura 5 dias) ou no congelador (dura 3 meses). Ao gelar, forma-se uma gelatina firme de colágeno."
        ],
        tip: "Consuma 1 xícara morna no meio da tarde ou antes de dormir para acalmar o estômago."
    },
    {
        id: 4,
        title: "Salmão em Crosta de Ervas & Purê Dourado",
        category: "pratos",
        catLabel: "Prato Principal • Ômega-3 Nobre",
        time: "25 minutos",
        yield: "2 porções",
        badge: "Jantar Terapêutico",
        description: "Refeição rica em ácidos graxos anti-inflamatórios EPA e DHA, combinada com o betacaroteno da abóbora cabotiá assada e temperos frescos.",
        ingredients: [
            "2 filés de salmão fresco (aprox. 180g cada)",
            "300g de abóbora cabotiá cozida no vapor",
            "2 colheres de sopa de azeite de oliva extravirgem",
            "1 colher de sopa de sementes de gergelim preto e branco",
            "1 colher de chá de alecrim fresco bem picado",
            "1 pitada de noz-moscada ralada",
            "Sal marinho e pimenta do reino a gosto"
        ],
        steps: [
            "Aqueça o forno a 200°C ou use uma frigideira antiaderente de fundo grosso.",
            "Tempere os filés de salmão com sal, azeite, alecrim e cubra o topo com o mix de gergelim.",
            "Asse o salmão por 12 a 15 minutos até o ponto desejado sem ressecar.",
            "Enquanto isso, amasse a abóbora cozida com 1 colher de azeite, noz-moscada e sal até formar um purê aveludado.",
            "Sirva o filé sobre o purê dourado e decore com folhas frescas de salsinha."
        ],
        tip: "O salmão grelhado suavemente mantém as gorduras do ômega-3 protegidas da oxidação."
    },
    {
        id: 5,
        title: "Creme Dourado Noturno (Golden Milk)",
        category: "caldos",
        catLabel: "Leite Dourado • Sono & Relaxamento",
        time: "5 minutos",
        yield: "1 caneca (200ml)",
        badge: "Noturno / Conforto",
        description: "Tradição milenar da medicina integrativa. O leite vegetal aquecido com especiarias aquece o corpo, diminui o cortisol e prepara o cérebro para um sono REM restaurador.",
        ingredients: [
            "200ml de leite vegetal de amêndoas ou coco",
            "1 colher de café de cúrcuma pura",
            "1 pitada de canela do Ceilão em pó",
            "1 pitada de noz-moscada e cravo em pó",
            "1 pitada de pimenta preta",
            "1 colher de chá de óleo de coco prensado a frio"
        ],
        steps: [
            "Coloque o leite vegetal em uma panelinha em fogo baixo.",
            "Adicione a cúrcuma, a canela, os temperos e o óleo de coco.",
            "Misture com um batedor pequeno (fouet) até ficar espumoso e bem aquecido sem ferver.",
            "Despeje em uma caneca aconchegante e beba 40 minutos antes de dormir."
        ],
        tip: "O óleo de coco fornece triglicerídeos de cadeia média (TCM) que potencializam o efeito relaxante."
    },
    {
        id: 6,
        title: "Salada Anti-inflamatória com Molho Tahine",
        category: "pratos",
        catLabel: "Almoço Fresco • Antioxidantes Vivos",
        time: "10 minutos",
        yield: "2 porções fartas",
        badge: "Almoço Fresco",
        description: "Combinação colorida de folhas amargas, sementes ricas em zinco e um molho sedoso de pasta de gergelim rico em cálcio biodisponível.",
        ingredients: [
            "Mix de folhas verdes (rúcula, agrião e alface romana)",
            "1/2 abacate maduro cortado em cubos",
            "2 colheres de sopa de sementes de abóbora tostadas",
            "3 colheres de sopa de bagos de romã ou morangos picados",
            "Para o Molho: 2 colheres de sopa de tahine, suco de 1 limão siciliano, 2 colheres de água morna e 1 colher de azeite."
        ],
        steps: [
            "Em uma tigela pequena, bata o tahine com o limão, azeite e água até virar um molho cremoso e homogêneo.",
            "Em uma travessa bonita, distribua a cama de folhas verdes.",
            "Espalhe os cubos de abacate e as frutas antioxidantes por cima.",
            "Finalize com as sementes de abóbora crocantes e regue generosamente com o molho de tahine."
        ],
        tip: "Folhas amargas estimulam os receptores gustativos que ativam o fluxo biliar e a digestão de gorduras."
    }
];

// Phase lookup according to Day (1 to 21)
function getPhaseInfo(day) {
    if (day <= 7) {
        return {
            name: "Semana 1: Desintoxicação",
            desc: "Reset metabólico & limpeza celular"
        };
    } else if (day <= 14) {
        return {
            name: "Semana 2: Restauração",
            desc: "Regeneração da microbiota & barreira intestinal"
        };
    } else {
        return {
            name: "Semana 3: Manutenção",
            desc: "Consolidação de vitalidade e novos hábitos"
        };
    }
}

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    lucide.createIcons();

    // 2. Load stored state from localStorage
    loadPersistedState();

    // 3. Render 21 Days Bar
    renderDayBubbles();

    // 4. Render Water Calculator Initial State
    calculateMetrics(false);

    // 5. Setup Recipe Filter Event Listeners
    setupRecipeFilters();

    // 6. Setup Back Button Listener
    document.getElementById('btn-back').addEventListener('click', () => {
        navigateTo('home');
    });

    // 7. Theme Toggle Listener
    document.getElementById('btn-toggle-theme').addEventListener('click', toggleTheme);

    // 8. Brand Badge Click
    document.getElementById('brand-logo-container').addEventListener('click', () => {
        navigateTo('home');
    });

    // Log initialization
    console.log("Desinflama 21 Member Area Hub Initialized.");
});

/* ==========================================================================
   NAVIGATION & VIEW ROUTER
   ========================================================================== */
function navigateTo(viewName) {
    // Update active view
    appState.currentView = viewName;
    
    // Hide all views
    const views = document.querySelectorAll('.view-section');
    views.forEach(view => view.classList.remove('active'));

    // Show target view
    const target = document.getElementById(`view-${viewName}`);
    if (target) {
        target.classList.add('active');
    }

    // Scroll to top of app wrapper
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Handle Back button visibility
    const backBtn = document.getElementById('btn-back');
    if (viewName === 'home') {
        backBtn.classList.add('hidden');
    } else {
        backBtn.classList.remove('hidden');
    }

    // Update bottom navigation tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        if (tab.getAttribute('data-nav') === viewName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Update desktop navigation items
    const desktopNavItems = document.querySelectorAll('.d-nav-item');
    desktopNavItems.forEach(item => {
        if (item.getAttribute('data-nav') === viewName) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Re-render Lucide icons for any dynamically displayed element
    lucide.createIcons();
}

/* ==========================================================================
   21-DAY PROGRESS TRACKER
   ========================================================================== */
function renderDayBubbles() {
    const scrollContainer = document.getElementById('day-selector-scroll');
    if (!scrollContainer) return;

    scrollContainer.innerHTML = '';

    for (let d = 1; d <= 21; d++) {
        const bubble = document.createElement('button');
        bubble.className = `day-bubble ${d === appState.currentDay ? 'active' : ''} ${d < appState.currentDay ? 'completed' : ''}`;
        bubble.textContent = d;
        bubble.title = `Ir para o Dia ${d}`;
        bubble.onclick = () => selectDay(d);
        scrollContainer.appendChild(bubble);
    }

    updateProgressDisplay();
}

function selectDay(dayNumber) {
    appState.currentDay = dayNumber;
    savePersistedState();
    renderDayBubbles();
    updateProgressDisplay();

    const phase = getPhaseInfo(dayNumber);
    showToast(`📅 Dia ${dayNumber} selecionado: ${phase.name}`);
}

function updateProgressDisplay() {
    const percentage = Math.round((appState.currentDay / 21) * 100);
    const phase = getPhaseInfo(appState.currentDay);

    const fillElem = document.getElementById('progress-bar-fill');
    const pctTxt = document.getElementById('progress-percentage-txt');
    const phaseBadge = document.getElementById('phase-badge');
    const headerDayLabel = document.getElementById('current-day-label');

    if (fillElem) fillElem.style.width = `${percentage}%`;
    if (pctTxt) pctTxt.textContent = `${percentage}%`;
    if (phaseBadge) phaseBadge.textContent = phase.name;
    if (headerDayLabel) headerDayLabel.textContent = appState.currentDay;
}

/* ==========================================================================
   METRICS & HYDRATION CALCULATOR
   ========================================================================== */
function calculateMetrics(showToastNotice = true) {
    const weightInput = document.getElementById('calc-weight');
    const heightInput = document.getElementById('calc-height');
    const activitySelect = document.getElementById('calc-activity');

    const weight = parseFloat(weightInput.value) || 70;
    const heightCm = parseFloat(heightInput.value) || 168;
    const mlPerKg = parseFloat(activitySelect.value) || 40;

    // 1. Water Calculation (Weight * mlPerKg / 1000)
    const waterLiters = ((weight * mlPerKg) / 1000).toFixed(1);
    appState.waterGoalLiters = waterLiters;
    const glasses = Math.round((waterLiters * 1000) / 200);
    appState.glassesTotal = glasses;

    document.getElementById('res-water-liters').textContent = waterLiters;
    document.getElementById('res-water-glasses').textContent = `Aprox. ${glasses} copos de 200ml ou ${(waterLiters / 0.5).toFixed(1)} garrafas de 500ml`;

    // 2. IMC Calculation: Weight / (Height in meters ^ 2)
    const heightM = heightCm / 100;
    const imc = (weight / (heightM * heightM)).toFixed(1);
    document.getElementById('res-imc-val').textContent = imc;

    const imcBadge = document.getElementById('res-imc-badge');
    const imcDesc = document.getElementById('res-imc-desc');

    if (imc < 18.5) {
        imcBadge.textContent = "Abaixo do Peso";
        imcBadge.style.backgroundColor = "var(--terracotta-500)";
        imcDesc.textContent = "Foque em densidade nutricional e gorduras boas do protocolo.";
    } else if (imc < 25) {
        imcBadge.textContent = "Peso Adequado";
        imcBadge.style.backgroundColor = "var(--sage-600)";
        imcDesc.textContent = "Faixa saudável. Mantenha o foco na redução de inflamação silenciosa.";
    } else if (imc < 30) {
        imcBadge.textContent = "Sobrepeso Leve";
        imcBadge.style.backgroundColor = "var(--gold-500)";
        imcDesc.textContent = "O desinchaço e a queima metabólica serão acelerados nos 21 dias.";
    } else {
        imcBadge.textContent = "Grau de Atenção";
        imcBadge.style.backgroundColor = "var(--terracotta-600)";
        imcDesc.textContent = "O protocolo ajudará significativamente a desinflamar o fígado e artérias.";
    }

    // Render interactive water glasses
    renderWaterGlasses();

    if (showToastNotice) {
        showToast(`💧 Metas calculadas: ${waterLiters}L de água/dia | IMC ${imc}`);
    }
}

function renderWaterGlasses() {
    const container = document.getElementById('glasses-grid');
    if (!container) return;

    container.innerHTML = '';
    const total = appState.glassesTotal || 14;

    for (let i = 1; i <= total; i++) {
        const glass = document.createElement('div');
        const isDrank = i <= appState.glassesDrank;
        glass.className = `glass-item ${isDrank ? 'drank' : ''}`;
        glass.innerHTML = `<i data-lucide="${isDrank ? 'check' : 'droplet'}" style="width:16px;height:16px;"></i>`;
        glass.title = `Copo ${i} de 200ml`;
        glass.onclick = () => toggleWaterGlass(i);
        container.appendChild(glass);
    }

    const countTxt = document.getElementById('glasses-count-txt');
    const pctTxt = document.getElementById('glasses-percentage-txt');
    const pct = Math.round((appState.glassesDrank / total) * 100);

    if (countTxt) countTxt.textContent = `${appState.glassesDrank} de ${total} copos bebidos`;
    if (pctTxt) pctTxt.textContent = `${pct}%`;

    lucide.createIcons();
}

function toggleWaterGlass(index) {
    if (index === appState.glassesDrank) {
        appState.glassesDrank = index - 1;
    } else {
        appState.glassesDrank = index;
    }
    savePersistedState();
    renderWaterGlasses();

    if (appState.glassesDrank === appState.glassesTotal) {
        showToast("🎉 Parabéns! Você atingiu sua meta diária de hidratação anti-inflamatória!");
    }
}

function resetWaterGlasses() {
    appState.glassesDrank = 0;
    savePersistedState();
    renderWaterGlasses();
    showToast("Contador de água zerado para hoje.");
}

/* ==========================================================================
   RECIPES & MODAL
   ========================================================================== */
function setupRecipeFilters() {
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const filter = chip.getAttribute('data-filter');
            filterRecipes(filter);
        });
    });
}

function filterRecipes(category) {
    const cards = document.querySelectorAll('.recipe-card');
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function openRecipeModal(recipeId) {
    const recipe = recipesDB.find(r => r.id === recipeId);
    if (!recipe) return;

    document.getElementById('modal-recipe-cat').textContent = recipe.catLabel;

    const modalBody = document.getElementById('modal-recipe-body');
    modalBody.innerHTML = `
        <h2 class="modal-recipe-title">${recipe.title}</h2>
        <div class="modal-recipe-meta">
            <span><i data-lucide="clock" style="width:14px;height:14px;display:inline-block;vertical-align:middle;"></i> ${recipe.time}</span>
            <span><i data-lucide="utensils" style="width:14px;height:14px;display:inline-block;vertical-align:middle;"></i> ${recipe.yield}</span>
        </div>
        <p style="font-size:0.85rem;color:var(--text-muted);line-height:1.45;margin-bottom:14px;">${recipe.description}</p>
        
        <h3 class="modal-section-title">🌿 Ingredientes Necessários</h3>
        <ul class="modal-list">
            ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>

        <h3 class="modal-section-title">🥣 Modo de Preparo Passo a Passo</h3>
        <ol class="modal-steps">
            ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
        </ol>

        <div style="background:var(--cream-100);border-radius:10px;padding:12px 14px;margin-top:16px;border-left:4px solid var(--terracotta-500);font-size:0.78rem;color:var(--text-main);">
            <strong>Dica de Ouro:</strong> ${recipe.tip}
        </div>
    `;

    document.getElementById('recipe-modal').classList.add('active');
    lucide.createIcons();
}

function closeRecipeModal(event) {
    if (event.target.id === 'recipe-modal') {
        document.getElementById('recipe-modal').classList.remove('active');
    }
}

function closeRecipeModalDirect() {
    document.getElementById('recipe-modal').classList.remove('active');
}

/* ==========================================================================
   SYMPTOMS & EVOLUTION TRACKER
   ========================================================================== */
function updateSymptomLabels() {
    const sleep = document.querySelector('input[name="symp_sleep"]:checked')?.value;
    const joints = document.querySelector('input[name="symp_joints"]:checked')?.value;
    const energy = document.querySelector('input[name="symp_energy"]:checked')?.value;
    const bloating = document.querySelector('input[name="symp_bloating"]:checked')?.value;

    const sleepLabels = { '1': 'Cansado (+1)', '2': 'Razoável (+2)', '3': 'Profundo (+3)' };
    const jointLabels = { '1': 'Com dores (+1)', '2': 'Rigidez (+2)', '3': 'Sem dores (+3)' };
    const energyLabels = { '1': 'Fadiga (+1)', '2': 'Moderada (+2)', '3': 'Alta vitalidade (+3)' };
    const bloatingLabels = { '1': 'Estufado (+1)', '2': 'Leve (+2)', '3': 'Desinchado (+3)' };

    if (sleep) document.getElementById('lbl-sleep').textContent = sleepLabels[sleep];
    if (joints) document.getElementById('lbl-joints').textContent = jointLabels[joints];
    if (energy) document.getElementById('lbl-energy').textContent = energyLabels[energy];
    if (bloating) document.getElementById('lbl-bloating').textContent = bloatingLabels[bloating];
}

function calculateSymptomScore() {
    const sleep = parseInt(document.querySelector('input[name="symp_sleep"]:checked')?.value || 3);
    const joints = parseInt(document.querySelector('input[name="symp_joints"]:checked')?.value || 3);
    const energy = parseInt(document.querySelector('input[name="symp_energy"]:checked')?.value || 3);
    const bloating = parseInt(document.querySelector('input[name="symp_bloating"]:checked')?.value || 3);

    const totalPoints = sleep + joints + energy + bloating; // Max 12, Min 4
    const percentage = Math.round(((totalPoints - 4) / 8) * 100);

    const resultBox = document.getElementById('symptom-score-result');
    const scoreVal = document.getElementById('ssr-score-val');
    const headline = document.getElementById('ssr-headline');
    const feedback = document.getElementById('ssr-feedback');
    const circleGauge = document.getElementById('ssr-score-circle');

    scoreVal.textContent = `${percentage}%`;
    resultBox.classList.remove('hidden');

    if (percentage >= 80) {
        headline.textContent = "Excelente Resposta Anti-inflamatória!";
        feedback.textContent = "Seu corpo está respondendo de forma extraordinária ao protocolo. Suas vias de eliminação de toxinas e reparação celular estão em plena atividade.";
        circleGauge.style.background = "var(--sage-600)";
    } else if (percentage >= 50) {
        headline.textContent = "Evolução Positiva em Andamento";
        feedback.textContent = "Seu organismo está no processo de transição metabólica. Continue firme na hidratação, no shot matinal e no descanso reparador.";
        circleGauge.style.background = "var(--gold-500)";
    } else {
        headline.textContent = "Fase de Ajuste & Desintoxicação Intensa";
        feedback.textContent = "É natural sentir mais cansaço ou rigidez nos primeiros dias da Semana 1. Beba mais água, descanse e consuma o chá de hortelã com gengibre para acelerar o alívio.";
        circleGauge.style.background = "var(--terracotta-500)";
    }

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    document.getElementById('ssr-timestamp').textContent = `Registro salvo às ${timeStr} no seu histórico de hoje!`;

    showToast(`✅ Avaliação concluída: Índice de ${percentage}%`);
}

/* ==========================================================================
   FAQ ACCORDION
   ========================================================================== */
function toggleAccordion(button) {
    const parentItem = button.closest('.accordion-item');
    const isOpen = parentItem.classList.contains('open');

    // Close all others
    document.querySelectorAll('.accordion-item').forEach(item => item.classList.remove('open'));

    // Toggle current
    if (!isOpen) {
        parentItem.classList.add('open');
    }
}

/* ==========================================================================
   DOWNLOAD SIMULATION & FEEDBACK
   ========================================================================== */
function simulateDownload(filename) {
    showToast(`📥 Preparando download de "${filename}"...`);
    
    setTimeout(() => {
        // Create an automated simulated PDF download for user convenience
        const element = document.createElement('a');
        const fileContent = `DESINFLAMA 21 - CLÍNICA ALE ZORZAN\nDocumento Oficial: ${filename}\nData de Emissão: ${new Date().toLocaleDateString('pt-BR')}\n\nObrigado por fazer parte do programa Desinflama 21. Siga as orientações nutricionais e de estilo de vida para obter o máximo de longevidade e energia.`;
        const file = new Blob([fileContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        showToast(`✅ Download de "${filename}" concluído!`);
    }, 900);
}

/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */
function toggleTheme() {
    if (document.body.classList.contains('soft-dark')) {
        document.body.classList.remove('soft-dark');
        appState.theme = 'light';
        showToast("☀️ Visual Suave / Acolhedor ativado");
    } else {
        document.body.classList.add('soft-dark');
        appState.theme = 'dark';
        showToast("🌙 Modo Noturno Relaxante ativado");
    }
    savePersistedState();
}

/* ==========================================================================
   TOAST NOTIFICATIONS
   ========================================================================== */
function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerHTML = `
        <i data-lucide="bell" style="width:16px;height:16px;color:#F8DC99;flex-shrink:0;"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

/* ==========================================================================
   PERSISTENCE (LOCAL STORAGE)
   ========================================================================== */
function savePersistedState() {
    try {
        localStorage.setItem('df21_state', JSON.stringify({
            currentDay: appState.currentDay,
            glassesDrank: appState.glassesDrank,
            theme: appState.theme
        }));
    } catch (e) {
        console.warn("LocalStorage not available:", e);
    }
}

function loadPersistedState() {
    try {
        const stored = localStorage.getItem('df21_state');
        if (stored) {
            const data = JSON.parse(stored);
            if (data.currentDay) appState.currentDay = data.currentDay;
            if (data.glassesDrank !== undefined) appState.glassesDrank = data.glassesDrank;
            if (data.theme === 'dark') {
                document.body.classList.add('soft-dark');
                appState.theme = 'dark';
            }
        }
    } catch (e) {
        console.warn("Could not read local storage:", e);
    }
}
