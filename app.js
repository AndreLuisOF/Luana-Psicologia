document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicialização da biblioteca de animações AOS
  AOS.init({
    duration: 900,
    once: true,
    offset: 160,
    easing: "ease-out-quad",
  });

  // 2. Efeito do Header inteligente ao rolar a página
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });

  // 3. Controle e Envio do Formulário Desktop (Prevenção contra erros de ID oculto)
  const formWhats = document.getElementById("formWhatsapp");
  if (formWhats) {
    formWhats.addEventListener("submit", function (e) {
      e.preventDefault();

      const numeroWhats = "3191319425"; // Seu número configurado

      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const mensagem = document.getElementById("mensagem").value;

      const textoFormatado =
        `*NOVO CONTATO VIA SITE*%0A` +
        `----------------------------------%0A` +
        ` *Nome:* ${nome}%0A` +
        ` *E-mail:* ${email}%0A` +
        `----------------------------------%0A` +
        ` *Mensagem:*%0A${mensagem}`;

      const url = `https://api.whatsapp.com/send?phone=${numeroWhats}&text=${textoFormatado}`;
      window.open(url, "_blank");
    });
  }

  // 4. Mecanismo do Menu Hambúrguer Mobile Avançado
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("menu-active");

      const icon = menuToggle.querySelector("i");
      if (navMenu.classList.contains("menu-active")) {
        icon.className = "fas fa-times";
      } else {
        icon.className = "fas fa-bars";
      }
    });

    // CORRIGIDO: Fecha o menu se clicar em qualquer link (incluindo links externos com âncora)
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("menu-active");
        const icon = menuToggle.querySelector("i");
        if (icon) icon.className = "fas fa-bars";
      });
    });

    // Fecha o menu de forma limpa caso o usuário clique fora dele
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove("menu-active");
        const icon = menuToggle.querySelector("i");
        if (icon) icon.className = "fas fa-bars";
      }
    });
  }
});
