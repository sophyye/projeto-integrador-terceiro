// =====================================================
// PROJETO INTEGRADOR
// JavaScript responsável pela navegação e calculadora
// =====================================================


// 1. NAVEGAÇÃO ENTRE AS DISCIPLINAS

document.addEventListener("DOMContentLoaded", function () {

    // Seleciona os botões do menu
    const botoesMenu = document.querySelectorAll(".nav-tab");

    // Seleciona todas as páginas
    const paginas = document.querySelectorAll(".page");

    // Função que troca o conteúdo exibido
    function mostrarPagina(nomePagina) {

        // Esconde todas as páginas
        paginas.forEach(function (pagina) {
            pagina.classList.remove("active");
        });

        // Retira a seleção de todos os botões
        botoesMenu.forEach(function (botao) {
            botao.classList.remove("active");
        });

        // Localiza a página escolhida
        const paginaSelecionada = document.getElementById(nomePagina);

        // Localiza o botão correspondente
        const botaoSelecionado = document.querySelector(
            '.nav-tab[data-page="' + nomePagina + '"]'
        );

        // Mostra a página escolhida
        if (paginaSelecionada) {
            paginaSelecionada.classList.add("active");
        }

        // Destaca o botão selecionado
        if (botaoSelecionado) {
            botaoSelecionado.classList.add("active");
        }

        // Retorna o usuário ao início da página
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // Adiciona o evento de clique aos botões do menu
    botoesMenu.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const destino = botao.getAttribute("data-page");

            mostrarPagina(destino);

        });

    });


    // Botões internos que levam para outra disciplina
    const botoesInternos = document.querySelectorAll("[data-go]");

    botoesInternos.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const destino = botao.getAttribute("data-go");

            mostrarPagina(destino);

        });

    });


    // =====================================================
    // 2. BANCO DE DADOS DA CALCULADORA NUTRICIONAL
    // Valores aproximados por 100 gramas
    // =====================================================

    const alimentos = {

        arroz: {
            nome: "Arroz branco cozido",
            calorias: 128,
            carboidratos: 28.1,
            proteinas: 2.5,
            gorduras: 0.2,
            fibras: 1.6,
            sodio: 1
        },

        feijao: {
            nome: "Feijão carioca cozido",
            calorias: 76,
            carboidratos: 13.6,
            proteinas: 4.8,
            gorduras: 0.5,
            fibras: 8.5,
            sodio: 2
        },

        frango: {
            nome: "Frango grelhado",
            calorias: 159,
            carboidratos: 0,
            proteinas: 32,
            gorduras: 2.5,
            fibras: 0,
            sodio: 50
        },

        banana: {
            nome: "Banana",
            calorias: 98,
            carboidratos: 26,
            proteinas: 1.3,
            gorduras: 0.1,
            fibras: 2,
            sodio: 0
        },

        maca: {
            nome: "Maçã",
            calorias: 56,
            carboidratos: 15.2,
            proteinas: 0.3,
            gorduras: 0,
            fibras: 1.3,
            sodio: 0
        },

        ovo: {
            nome: "Ovo cozido",
            calorias: 146,
            carboidratos: 0.6,
            proteinas: 13.3,
            gorduras: 9.5,
            fibras: 0,
            sodio: 146
        },

        batata: {
            nome: "Batata cozida",
            calorias: 52,
            carboidratos: 11.9,
            proteinas: 1.2,
            gorduras: 0,
            fibras: 1.3,
            sodio: 2
        }

    };


    // =====================================================
    // 3. FUNÇÃO PARA CALCULAR OS NUTRIENTES
    // =====================================================

    function calcularNutrientes(valor, quantidade) {

        // Aplica a regra de três para cada nutriente
        return {
            calorias: (valor.calorias / 100) * quantidade,
            carboidratos: (valor.carboidratos / 100) * quantidade,
            proteinas: (valor.proteinas / 100) * quantidade,
            gorduras: (valor.gorduras / 100) * quantidade,
            fibras: (valor.fibras / 100) * quantidade,
            sodio: (valor.sodio / 100) * quantidade
        };

    }


    // =====================================================
    // 4. FUNÇÃO PARA FORMATAR OS NÚMEROS
    // =====================================================

    function formatarNumero(numero) {

        return numero.toLocaleString("pt-BR", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });

    }


    // =====================================================
    // 5. FUNÇÃO DO BOTÃO CALCULAR
    // =====================================================

    const botaoCalcular = document.getElementById("calcular");

    if (botaoCalcular) {

        botaoCalcular.addEventListener("click", function () {

            // Pega o alimento selecionado
            const alimentoSelecionado =
                document.getElementById("alimento").value;

            // Pega a quantidade digitada
            const quantidade =
                Number(document.getElementById("quantidade").value);

            // Localiza a área de resultado
            const resultado =
                document.getElementById("resultado-nutricional");


            // Verifica se a quantidade é válida
            if (!Number.isFinite(quantidade) || quantidade <= 0) {

                resultado.textContent =
                    "Digite uma quantidade válida, maior que zero.";

                return;
            }


            // Busca os dados do alimento
            const alimento = alimentos[alimentoSelecionado];

            if (!alimento) {

                resultado.textContent =
                    "Não foi possível localizar esse alimento.";

                return;
            }


            // Calcula os nutrientes
            const valores = calcularNutrientes(alimento, quantidade);


            // Mostra os resultados
            resultado.innerHTML = `
                <h3>Resultado: ${alimento.nome}</h3>

                <p><strong>Quantidade:</strong>
                ${formatarNumero(quantidade)} g</p>

                <p><strong>Calorias:</strong>
                ${formatarNumero(valores.calorias)} kcal</p>

                <p><strong>Carboidratos:</strong>
                ${formatarNumero(valores.carboidratos)} g</p>

                <p><strong>Proteínas:</strong>
                ${formatarNumero(valores.proteinas)} g</p>

                <p><strong>Gorduras:</strong>
                ${formatarNumero(valores.gorduras)} g</p>

                <p><strong>Fibras:</strong>
                ${formatarNumero(valores.fibras)} g</p>

                <p><strong>Sódio:</strong>
                ${formatarNumero(valores.sodio)} mg</p>
            `;

        });

    }

});