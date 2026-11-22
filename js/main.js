function switchPage(pageId) {
  document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const targetPage = document.getElementById('page-' + pageId);
  if (targetPage) targetPage.classList.add('active');
  const nav = document.getElementById('nav-' + pageId);
  if (nav) nav.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openBooking(service, unit) {
  const modal = document.getElementById('bookingModal');
  if (service) {
    const sel = document.getElementById('bk-service');
    let found = false;
    for (let opt of sel.options) {
      if (opt.value.includes(service)) {
        opt.selected = true;
        found = true;
        break;
      }
    }
    if (!found) {
      const opt = new Option(service, service, true, true);
      sel.add(opt);
    }
  }
  if (unit) {
    const uSel = document.getElementById('bk-unit');
    for (let opt of uSel.options) {
      if (opt.value.includes(unit)) {
        opt.selected = true;
        break;
      }
    }
  }
  modal.classList.add('open');
}

function closeBooking() {
  document.getElementById('bookingModal').classList.remove('open');
}

function submitWhatsApp(e) {
  e.preventDefault();
  const name = document.getElementById('bk-name').value.trim();
  const service = document.getElementById('bk-service').value;
  const unit = document.getElementById('bk-unit').value;
  const text = encodeURIComponent(
    `Olá! Meu nome é ${name}. Gostaria de agendar um atendimento de *${service}* na unidade *${unit}*.`
  );
  window.open(`https://wa.me/5598987142545?text=${text}`, '_blank');
  closeBooking();
}

function submitContact(e) {
  e.preventDefault();
  const name = document.getElementById('ct-name').value.trim();
  const msg = document.getElementById('ct-msg').value.trim();
  const text = encodeURIComponent(`Olá! Meu nome é ${name}. ${msg}`);
  window.open(`https://wa.me/5598987142545?text=${text}`, '_blank');
}
