alert("JavaScript conectado!");

document.querySelectorAll(".nav-tab").forEach(function(botao) {
    botao.addEventListener("click", function() {

        const destino = botao.getAttribute("data-page");

        document.querySelectorAll(".page").forEach(function(pagina) {
            pagina.classList.remove("active");
        });

        document.querySelectorAll(".nav-tab").forEach(function(item) {
            item.classList.remove("active");
        });

        document.getElementById(destino).classList.add("active");

        botao.classList.add("active");
    });
});