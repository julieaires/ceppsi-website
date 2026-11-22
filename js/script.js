/* ==========================================================================
   CEPPSI — Clínica Multidisciplinar (São Luís - MA)
   Lógica de Navegação SPA, Modais de Agendamento WhatsApp e Leitores de Blog
   ========================================================================== */

const WHATSAPP_NUMBER = "5598987142545";

// Dados dos artigos completos do Blog
const BLOG_ARTICLES = {
  logoterapia: {
    tag: "Psicologia Clínica & Logoterapia",
    title: "O sentido da vida como caminho para superar o vazio existencial",
    date: "Equipe CEPPSI • Leitura de 4 min",
    content: `
      <p style="margin-bottom:16px;">Desenvolvida pelo psiquiatra vienense Viktor Frankl, a <strong>Logoterapia</strong> parte da premissa de que a busca por sentido é a principal força motivadora do ser humano. Mesmo diante de crises profissionais, lutos ou períodos de angústia, encontrar um propósito concreto transforma a forma como enfrentamos a dor.</p>
      <p style="margin-bottom:16px;">Na clínica contemporânea, muitos pacientes chegam relatando um sentimento difuso de cansaço e falta de direção — aquilo que Frankl denominou de <em>vazio existencial</em>. Diferente de abordagens focadas apenas na supressão imediata de sintomas, o acompanhamento terapêutico ajuda a reconectar a pessoa aos seus valores mais autênticos.</p>
      <p>Na <strong>CEPPSI</strong>, integramos essa escuta humanizada ao rigor técnico da Psicologia Clínica, oferecendo um ambiente sigiloso e acolhedor no Pátio Jardins ou na modalidade online.</p>
    `
  },
  psicanalise: {
    tag: "Psicanálise & Escuta Clínica",
    title: "Por que repetir padrões emocionais e como a terapia ajuda a elaborá-los",
    date: "Equipe CEPPSI • Leitura de 5 min",
    content: `
      <p style="margin-bottom:16px;">Muitas vezes percebemos que, mesmo mudando de emprego, cidade ou relacionamento, certas angústias e conflitos voltam a se repetir. Na perspectiva da <strong>Psicanálise</strong>, essas repetições apontam para questões inconscientes que ainda não puderam ser simbolizadas em palavras.</p>
      <p style="margin-bottom:16px;">O espaço analítico oferece uma escuta livre de julgamentos morais, permitindo que o paciente fale livremente sobre suas memórias, medos e desejos. Ao colocar em palavras aquilo que antes aparecia apenas como sintoma ou ansiedade, abre-se espaço para escolhas mais livres.</p>
      <p>Iniciar esse percurso é um gesto de cuidado profundo consigo mesmo e com a própria história.</p>
    `
  },
  neuropsicologia: {
    tag: "Avaliação Neuropsicológica",
    title: "Quando buscar uma Avaliação Neuropsicológica na infância ou na vida adulta?",
    date: "Equipe CEPPSI • Leitura de 4 min",
    content: `
      <p style="margin-bottom:16px;">A <strong>Avaliação Neuropsicológica</strong> investiga de forma detalhada funções cognitivas como atenção, memória, linguagem, raciocínio lógico e funções executivas por meio de entrevistas clínicas e instrumentos padronizados.</p>
      <p style="margin-bottom:16px;">Na infância e adolescência, ela é fundamental para compreender dificuldades escolares, suspeitas de TDAH ou Transtorno do Espectro Autista (TEA). Já na vida adulta e na terceira idade, auxilia tanto na investigação de queixas de concentração quanto no acompanhamento preventivo da saúde cognitiva.</p>
      <p>Ao final do processo, entregamos um laudo claro e orientações práticas para o paciente, a família e os médicos acompanhantes.</p>
    `
  }
};

// Alternar entre views (Home, Sobre, Equipe Completa)
function showView(viewName, targetSectionId = null) {
  document.querySelectorAll('.view-section').forEach(section => {
    section.classList.remove('active');
  });

  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) {
    targetView.classList.add('active');
  }

  // Atualiza estado ativo no menu
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.nav === viewName && !targetSectionId) {
      link.classList.add('active');
    }
    if (targetSectionId && link.dataset.section === targetSectionId) {
      link.classList.add('active');
    }
  });

  // Fecha menu mobile se estiver aberto
  const drawer = document.getElementById('mobileDrawer');
  if (drawer) drawer.classList.remove('open');

  if (targetSectionId) {
    setTimeout(() => {
      const el = document.getElementById(targetSectionId);
      if (el) {
        const yOffset = -100;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Alternar menu mobile
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileDrawer');
  if (drawer) {
    drawer.classList.toggle('open');
  }
}

// Abrir modal de agendamento com especialidade ou profissional pré-selecionado
function openBookingModal(specialty = "", professional = "") {
  const modal = document.getElementById('bookingModal');
  const specialtySelect = document.getElementById('bookingSpecialty');
  const professionalInput = document.getElementById('bookingProfessional');

  if (specialty && specialtySelect) {
    for (let i = 0; i < specialtySelect.options.length; i++) {
      if (specialtySelect.options[i].value === specialty) {
        specialtySelect.selectedIndex = i;
        break;
      }
    }
  }

  if (professionalInput) {
    professionalInput.value = professional || "";
  }

  if (modal) {
    modal.classList.add('open');
  }
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.remove('open');
  }
}

// Enviar triagem direto para o WhatsApp oficial da CEPPSI
function handleBookingSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('bookingName').value.trim();
  const specialty = document.getElementById('bookingSpecialty').value;
  const modality = document.getElementById('bookingModality').value;
  const professional = document.getElementById('bookingProfessional').value.trim();

  let message = `Olá, equipe CEPPSI! Gostaria de agendar uma consulta.\n\n`;
  message += `*Nome:* ${name}\n`;
  message += `*Especialidade:* ${specialty}\n`;
  message += `*Modalidade:* ${modality}`;
  if (professional) {
    message += `\n*Preferência de profissional:* ${professional}`;
  }

  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  closeBookingModal();
}

// Abrir modal de leitura completa de artigo do Blog
function openArticleModal(articleKey) {
  const article = BLOG_ARTICLES[articleKey];
  if (!article) return;

  document.getElementById('articleModalTag').textContent = article.tag;
  document.getElementById('articleModalTitle').textContent = article.title;
  document.getElementById('articleModalDate').textContent = article.date;
  document.getElementById('articleModalBody').innerHTML = article.content;

  document.getElementById('articleModal').classList.add('open');
}

function closeArticleModal() {
  document.getElementById('articleModal').classList.remove('open');
}

// Fechar modais ao clicar fora da caixa
window.addEventListener('click', (event) => {
  const bookingModal = document.getElementById('bookingModal');
  const articleModal = document.getElementById('articleModal');
  if (event.target === bookingModal) closeBookingModal();
  if (event.target === articleModal) closeArticleModal();
});
