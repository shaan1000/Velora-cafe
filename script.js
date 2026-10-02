
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Menu data: category, id, name, description, price, featured
  const M = [
    ['Coffee', 'c1', 'Velora Signature Latte', 'Espresso, house caramel, cardamom, silky oat or whole milk', 240, 1],
    ['Coffee', 'c2', 'Flat White', 'Double ristretto, velvet microfoam', 190],
    ['Coffee', 'c3', 'Cortado', 'Equal parts espresso and warm milk', 170],
    ['Coffee', 'c4', 'Filter Pour-Over', 'Single-estate Chikmagalur beans, brewed to order', 220],
    ['Coffee', 'c5', 'Hazelnut Mocha', 'Dark chocolate, roasted hazelnut, espresso', 260],

    ['Tea', 't1', 'Darjeeling First Flush', 'Delicate, muscatel, brewed in a pot for two', 200],
    ['Tea', 't2', 'Masala Chai', 'Slow-simmered with fresh ginger and cardamom', 140],
    ['Tea', 't3', 'Rose Sage Tisane', 'Caffeine-free, floral and herbal', 190],
    ['Tea', 't4', 'Matcha Latte', 'Ceremonial grade, oat milk', 250],

    ['Breakfast', 'b1', 'Velora Slow Breakfast', 'Sourdough, soft eggs, butter, roasted tomatoes', 380, 1],
    ['Breakfast', 'b2', 'Avocado Sourdough', 'Smashed avocado, feta, chilli oil, microgreens', 340],
    ['Breakfast', 'b3', 'Maple Granola Bowl', 'Greek yoghurt, seasonal fruit, toasted seeds', 290],
    ['Breakfast', 'b4', 'Masala Omelette', 'Green chilli, coriander, buttered pav', 260],

    ['Food', 'f1', 'Wild Mushroom Toastie', 'Gruyère, thyme, truffle butter', 360],
    ['Food', 'f2', 'Pesto Penne', 'Basil pesto, sun-dried tomato, parmesan', 420],
    ['Food', 'f3', 'Smoked Chicken Sandwich', 'Ciabatta, aioli, pickled onion', 390],
    ['Food', 'f4', 'Roasted Pumpkin Soup', 'Coconut cream, toasted pumpkin seeds', 280],

    ['Dessert', 'd1', 'Burnt Basque Cheesecake', 'Caramelised top, creamy centre', 320, 1],
    ['Dessert', 'd2', 'Butter Croissant', 'Laminated daily, 27 layers', 150],
    ['Dessert', 'd3', 'Dark Chocolate Tart', 'Sea salt, espresso cream', 300],
    ['Dessert', 'd4', 'Pistachio Cardamom Cake', 'Soft crumb, rose glaze', 280],

    ['Cold Drinks', 'x1', 'Cold Brew Tonic', '18-hour cold brew over sparkling tonic', 230, 1],
    ['Cold Drinks', 'x2', 'Iced Velora Latte', 'Our signature, over ice', 250],
    ['Cold Drinks', 'x3', 'Mango Basil Cooler', 'Alphonso mango, lime, basil', 210],
    ['Cold Drinks', 'x4', 'Vanilla Cold Foam Mocha', 'Chocolate, cold brew, vanilla foam', 270]
  ];

  const inr = n => '₹' + n.toLocaleString('en-IN');
  const page = location.pathname.split('/').pop() || 'index.html';

  // Category images
  const menuImages = {
    Coffee: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85",
    Tea: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=85",
    Breakfast: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=85",
    Food: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
    Dessert: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
    "Cold Drinks": "https://images.unsplash.com/photo-1513558161293-c126a9b3c2c3?auto=format&fit=crop&w=900&q=85"
  };

  // Navigation
  const links = [
    ['index.html', 'Home'],
    ['menu.html', 'Menu'],
    ['about.html', 'Our Story'],
    ['contact.html', 'Reserve']
  ];

  // Header and cart
  document.body.insertAdjacentHTML('afterbegin', `
    <header class="hdr">
      <div class="wrap">
        <a class="logo" href="index.html" aria-label="Velora Café home">VELORA<span>.</span></a>
        <nav class="nav" id="nav" aria-label="Main">
          ${links.map(l => `<a href="${l[0]}" ${page === l[0] ? 'aria-current="page"' : ''}>${l[1]}</a>`).join('')}
        </nav>
        <div>
          <button class="icon-btn" id="cartBtn" aria-label="Open cart">🛍<span class="badge" id="cnt">0</span></button>
          <button class="icon-btn burger" id="burger" aria-label="Toggle menu" aria-expanded="false">☰</button>
        </div>
      </div>
    </header>

    <div class="veil" id="veil"></div>
    <aside class="cart" id="cart" aria-label="Your order" aria-hidden="true">
      <header>
        <h3>Your Order</h3>
        <button class="icon-btn" id="cartX" aria-label="Close cart">✕</button>
      </header>
      <ul id="cartList"></ul>
      <footer>
        <div class="tot"><span>Total</span><span id="total">₹0</span></div>
        <button class="btn" style="width:100%" id="checkout">Place Order</button>
      </footer>
    </aside>
    <div class="toasts" id="toasts" aria-live="polite"></div>
    <button class="top-btn" id="topBtn" aria-label="Back to top">↑</button>
  `);

  // Footer
  document.body.insertAdjacentHTML('beforeend', `
    <footer class="ftr">
      <div class="wrap">
        <div class="fgrid">
          <div>
            <a class="logo" href="index.html">VELORA<span>.</span></a>
            <p style="margin-top:12px;max-width:30ch">An independent café for slow mornings, bold coffee and good moments.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>${links.map(l => `<li><a href="${l[0]}">${l[1]}</a></li>`).join('')}</ul>
          </div>
          <div>
            <h4>Hours</h4>
            <ul>
              <li>Mon–Fri 8am–10pm</li>
              <li>Sat–Sun 7:30am–11pm</li>
            </ul>
          </div>
          <div>
            <h4>Letters from Velora</h4>
            <form class="news" id="news" novalidate>
              <label class="sr" style="position:absolute;left:-9999px" for="ne">Email</label>
              <input id="ne" type="email" placeholder="your@email.com" required>
              <button class="btn" style="padding:10px 18px">Join</button>
            </form>
          </div>
        </div>
        <p class="copy">© 2026 Velora Café. Made slowly, with love.</p>
      </div>
    </footer>
  `);

  if (!$('.hero')) document.body.classList.add('light');

  // Toast notification
  const toast = m => {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = m;
    $('#toasts').append(t);
    setTimeout(() => t.remove(), 3000);
  };

  // Mobile navigation
  const nav = $('#nav');
  const bg = $('#burger');
  const hdr = $('.hdr');
  const tb = $('#topBtn');

  bg.onclick = () => {
    const o = nav.classList.toggle('open');
    bg.setAttribute('aria-expanded', o);
  };

  $$('#nav a').forEach(a =>
    a.onclick = () => nav.classList.remove('open')
  );

  // Scroll effects
  onscroll = () => {
    hdr.classList.toggle('solid', scrollY > 60);
    tb.classList.toggle('on', scrollY > 600);
  };

  onscroll();
  tb.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

  document.onkeydown = e => {
    if (e.key === 'Escape') {
      nav.classList.remove('open');
      closeCart();
    }
  };

  // Cart system
  let cart = {};
  try {
    cart = JSON.parse(localStorage.getItem('velora-cart') || '{}');
  } catch {
    cart = {};
  }

  const cartEl = $('#cart');
  const veil = $('#veil');

  const openCart = () => {
    cartEl.classList.add('open');
    veil.classList.add('on');
    cartEl.setAttribute('aria-hidden', 'false');
    $('#cartX').focus();
  };

  function closeCart() {
    cartEl.classList.remove('open');
    veil.classList.remove('on');
    cartEl.setAttribute('aria-hidden', 'true');
  }

  $('#cartBtn').onclick = openCart;
  $('#cartX').onclick = closeCart;
  veil.onclick = closeCart;

  function renderCart() {
    localStorage.setItem('velora-cart', JSON.stringify(cart));

    const ids = Object.keys(cart).filter(id =>
      M.find(m => m[1] === id) && Number(cart[id]) > 0
    );

    let tot = 0, n = 0;

    $('#cartList').innerHTML = ids.length
      ? ids.map(id => {
          const m = M.find(x => x[1] === id);
          const q = Number(cart[id]);

          tot += m[4] * q;
          n += q;

          return `
            <li>
              <div>
                <b>${m[2]}</b><br>
                <button class="rm" data-rm="${id}">Remove</button>
              </div>
              <div style="text-align:right">
                ${inr(m[4] * q)}
                <div class="qty">
                  <button data-d="-1" data-id="${id}" aria-label="Decrease ${m[2]}">−</button>
                  ${q}
                  <button data-d="1" data-id="${id}" aria-label="Increase ${m[2]}">+</button>
                </div>
              </div>
            </li>
          `;
        }).join('')
      : '<li style="display:block;opacity:.6;padding:40px 0;text-align:center">Your cart is empty.</li>';

    $('#total').textContent = inr(tot);
    $('#cnt').textContent = n;
  }

  $('#cartList').onclick = e => {
    const t = e.target;

    if (t.dataset.rm) {
      delete cart[t.dataset.rm];
    } else if (t.dataset.d) {
      const id = t.dataset.id;
      cart[id] = (Number(cart[id]) || 0) + Number(t.dataset.d);
      if (cart[id] < 1) delete cart[id];
    } else {
      return;
    }

    renderCart();
  };

  $('#checkout').onclick = () => {
    if (!Object.keys(cart).length)
      return toast('Your cart is empty');

    cart = {};
    renderCart();
    closeCart();
    toast('Order placed — see you soon ☕');
  };

  // Menu cards with category images
  const card = m => `
    <article class="item">
      <div
        class="ph menu-photo"
        role="img"
        aria-label="${m[2]}"
        style="--img:url('${menuImages[m[0]] || ''}');min-height:150px;height:150px;margin-bottom:16px">
      </div>
      <div class="top">
        <h3>${m[2]}</h3>
        <span class="price">${inr(m[4])}</span>
      </div>
      <p>${m[3]}</p>
      <button class="add" data-add="${m[1]}">Add to cart</button>
    </article>
  `;

  // Add items to cart
  document.addEventListener('click', e => {
    const button = e.target.closest('[data-add]');
    if (!button) return;

    const id = button.dataset.add;
    const item = M.find(m => m[1] === id);
    if (!item) return;

    cart[id] = (Number(cart[id]) || 0) + 1;
    renderCart();
    toast(item[2] + ' added');
  });

  renderCart();

  // Featured items
  const feat = $('#featured');
  if (feat) {
    feat.innerHTML = M.filter(m => m[5]).map(card).join('');
  }

  // Menu filters and search
  const mg = $('#menuGrid');

  if (mg) {
    let cat = 'All', q = '';
    const tabs = $('#tabs');

    if (tabs) {
      const cats = ['All', ...new Set(M.map(m => m[0]))];

      tabs.innerHTML = cats.map((c, i) =>
        `<button class="${i ? '' : 'on'}" aria-pressed="${!i}">${c}</button>`
      ).join('');

      const draw = () => {
        const r = M.filter(m =>
          (cat === 'All' || m[0] === cat) &&
          (m[2] + m[3]).toLowerCase().includes(q)
        );

        mg.innerHTML = r.map(card).join('') ||
          '<p class="empty">Nothing matches your search.</p>';
      };

      tabs.onclick = e => {
        const button = e.target.closest('button');
        if (!button) return;

        cat = button.textContent;

        $$('#tabs button').forEach(b => {
          b.classList.toggle('on', b === button);
          b.setAttribute('aria-pressed', b === button ? 'true' : 'false');
        });

        draw();
      };

      const search = $('#search');
      if (search) {
        search.oninput = e => {
          q = e.target.value.toLowerCase().trim();
          draw();
        };
      }

      draw();
    }
  }

  // Reveal animations
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    }), { threshold: .15 });

    $$('.rv').forEach(el => io.observe(el));

    // Animated counters
    const co = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;

      const el = e.target;
      const end = Number(el.dataset.n);
      let s = null;

      const f = t => {
        s ??= t;
        const p = Math.min((t - s) / 1500, 1);

        el.textContent =
          Math.floor(end * p).toLocaleString('en-IN') +
          (p === 1 ? el.dataset.s || '' : '');

        if (p < 1) requestAnimationFrame(f);
      };

      requestAnimationFrame(f);
      co.unobserve(el);
    }), { threshold: .6 });

    $$('[data-n]').forEach(el => co.observe(el));
  }

  // Countdown
  const cd = $('#countdown');

  if (cd) {
    const end = new Date();
    end.setDate(end.getDate() + (7 - end.getDay()) % 7 + 1);
    end.setHours(0, 0, 0, 0);

    const tick = () => {
      let d = Math.max(0, end - Date.now()) / 1000;
      const v = [
        ['Days', 86400],
        ['Hrs', 3600],
        ['Min', 60],
        ['Sec', 1]
      ];

      cd.innerHTML = v.map(([l, s]) => {
        const n = Math.floor(d / s);
        d -= n * s;
        return `<div><b>${String(n).padStart(2, '0')}</b><small>${l}</small></div>`;
      }).join('');
    };

    tick();
    setInterval(tick, 1000);
  }

  // Gallery lightbox
  const lb = $('#lb');

  if (lb) {
    $$('.gal button').forEach(b => b.onclick = () => {
      const p = $('.ph', b);
      if (!p) return;

      $('#lbImg').style.cssText = p.getAttribute('style');
      $('#lbImg').dataset.cap = p.dataset.cap || '';
      $('#lbImg').setAttribute(
        'aria-label',
        p.getAttribute('aria-label') || ''
      );

      lb.showModal();
    });

    $('#lbX').onclick = () => lb.close();

    lb.onclick = e => {
      if (e.target === lb) lb.close();
    };
  }

  // Review slider
  const sl = $$('.slide');

  if (sl.length) {
    let i = 0;
    const dots = $('#dots');

    if (dots) {
      dots.innerHTML = sl.map((_, k) =>
        `<button aria-label="Review ${k + 1}"></button>`
      ).join('');

      const show = n => {
        i = n;
        sl.forEach((s, k) => s.classList.toggle('on', k === n));
        $$('button', dots).forEach((d, k) =>
          d.classList.toggle('on', k === n)
        );
      };

      let t;

      dots.onclick = e => {
        const button = e.target.closest('button');
        if (!button) return;

        const k = $$('button', dots).indexOf(button);
        if (k > -1) {
          show(k);
          clearInterval(t);
        }
      };

      show(0);
      t = setInterval(() => show((i + 1) % sl.length), 6000);
    }
  }

  // Form validation
  const rules = {
    email: v =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ||
      'Enter a valid email',

    tel: v =>
      /^[6-9]\d{9}$/.test(v.replace(/\s/g, '')) ||
      'Enter a 10-digit mobile number'
  };

  function validate(f) {
    let ok = true;

    $$('[required]', f).forEach(el => {
      const v = el.value.trim();
      let m = !v
        ? 'This field is required'
        : (rules[el.type]?.(v) ?? true);

      if (el.type === 'date' && v) {
        const chosen = new Date(v + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (chosen < today) m = 'Pick a future date';
      }

      const err = el.parentElement.querySelector('.err');
      el.setAttribute('aria-invalid', String(m !== true));

      if (err) err.textContent = m === true ? '' : m;
      if (m !== true) ok = false;
    });

    return ok;
  }

  $$('form[data-form]').forEach(f =>
    f.addEventListener('submit', e => {
      e.preventDefault();

      if (!validate(f)) {
        $('[aria-invalid="true"]', f)?.focus();
        return;
      }

      const ok = $('.ok', f.parentElement);
      f.hidden = true;

      if (ok) {
        ok.classList.add('show');
        ok.focus();
      }

      toast("Thank you — we'll be in touch");
    })
  );

  // Clear errors when users edit fields
  $$('input,select,textarea').forEach(el =>
    el.addEventListener('input', () => {
      el.setAttribute('aria-invalid', 'false');

      const r = el.parentElement.querySelector('.err');
      if (r) r.textContent = '';
    })
  );

  // Newsletter form
  const news = $('#news');

  if (news) {
    news.onsubmit = e => {
      e.preventDefault();

      const i = $('#ne');
      if (rules.email(i.value.trim()) !== true)
        return toast('Please enter a valid email');

      i.value = '';
      toast('Welcome to the Velora letters ✉');
    };
  }

  // Reservation date minimum
  const dt = $('#date');
  if (dt) {
    const today = new Date();
    const localDate = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().slice(0, 10);

    dt.min = localDate;
  }
})();
