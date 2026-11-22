(() => {
  /* ===================== Helpers ===================== */
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  const peso = n => '₱' + n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const num = (n, d = 4) => Number.isFinite(n) ? parseFloat(n.toFixed(d)).toLocaleString('en-US', { maximumFractionDigits: d }) : '—';
  const pct = n => (n * 100).toFixed(2) + '%';

  const icon = {
    conversion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13l-3-3M20 16H7l3 3"/></svg>',
    tax: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2.5" width="14" height="19" rx="2"/><rect x="8" y="5.5" width="8" height="3.5" rx=".6"/><path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01"/></svg>',
    loops: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2.5 20.5 6 17 9.5"/><path d="M3.5 12V10a4 4 0 0 1 4-4h13"/><path d="M7 21.5 3.5 18 7 14.5"/><path d="M20.5 12v2a4 4 0 0 1-4 4h-13"/></svg>',
    payroll: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2.5h12v19l-3-2-3 2-3-2-3 2z"/><path d="M9 7h6M9 11h6M9 15h3"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  /* ===================== Project data ===================== */
  const projects = [
    { id: 'conversion', num: 1, title: 'Conversion', icon: icon.conversion, layout: 'two-col',
      blurb: 'Convert temperatures and lengths instantly as you type.',
      lead: 'Four instant converters for temperature and length. Type a value and the result updates immediately.',
      topics: [{ name: 'Celsius to Fahrenheit' }, { name: 'Fahrenheit to Celsius' }, { name: 'Meters to Feet' }, { name: 'Feet to Meters' }] },
    { id: 'income-tax', num: 2, title: 'Income Tax Calculator', icon: icon.tax,
      blurb: 'Estimate your Philippine income tax using the graduated rates in effect from 2023.',
      lead: 'Enter your taxable income to estimate your income tax, effective rate and take-home amount under the graduated rates of the TRAIN Law (2023 onwards).',
      topics: [{ name: 'Income Tax Calculator' }] },
    { id: 'loops', num: 3, title: 'Factorial, Sum, and Average of First N Natural Numbers', icon: icon.loops,
      blurb: 'Enter N to get the factorial, sum and average — each computed with a different loop.',
      lead: 'Enter a whole number N. The factorial is computed with a while loop, the sum with a do-while loop, and the average with a for loop — the exact code is shown under each result.',
      topics: [{ name: 'Factorial', loop: 'While Loop' }, { name: 'Sum', loop: 'Do While Loop' }, { name: 'Average', loop: 'For Loop' }] },
    { id: 'payroll', num: 4, title: 'Simple Payroll', icon: icon.payroll,
      blurb: 'Compute gross pay, overtime, deductions and net pay with a printable-style payslip.',
      lead: 'Enter an employee’s rate, hours worked, overtime and deductions to generate a simple payslip with gross and net pay.',
      topics: [{ name: 'Simple Payroll' }] }
  ];
  const byId = Object.fromEntries(projects.map(p => [p.id, p]));

  const topicItem = t => t.loop
    ? `<li class="topic loop"><span class="name"><span class="dot"></span>${esc(t.name)}</span><span class="loop-tag">${esc(t.loop)}</span></li>`
    : `<li class="topic"><span class="dot"></span>${esc(t.name)}</li>`;
  const tagFor = p => `Project ${String(p.num).padStart(2, '0')}`;

  /* ===================== Home: project cards ===================== */
  $('#projectGrid').innerHTML = projects.map((p, i) => `
    <a class="card reveal" href="#${p.id}" style="transition-delay:${i * 80}ms" aria-label="Open ${esc(tagFor(p))}: ${esc(p.title)}">
      <div class="card-top">
        <div class="card-icon" aria-hidden="true">${p.icon}</div>
        <span class="tag">${tagFor(p)}</span>
      </div>
      <h3>${esc(p.title)}</h3>
      <p class="blurb">${esc(p.blurb)}</p>
      <ul class="topics${p.layout === 'two-col' ? ' two-col' : ''}">${p.topics.map(topicItem).join('')}</ul>
      <div class="card-foot"><span class="open-label">Open project ${icon.arrow}</span></div>
    </a>`).join('');

  /* ===================== Project page shell ===================== */
  const pageShell = (p, body) => {
    const i = projects.indexOf(p);
    const prev = projects[i - 1], next = projects[i + 1];
    return `
      <section class="page-hero">
        <div class="container">
          <nav class="crumbs" aria-label="Breadcrumb">
            <a href="#home">Home</a><span>/</span><a href="#projects">Projects</a><span>/</span><span aria-current="page">${esc(p.title)}</span>
          </nav>
          <div class="page-title">
            <div class="card-icon" aria-hidden="true">${p.icon}</div>
            <div>
              <span class="tag">${tagFor(p)}</span>
              <h1>${esc(p.title)}</h1>
            </div>
          </div>
          <p class="lead">${esc(p.lead)}</p>
        </div>
      </section>
      <section class="page-body">
        <div class="container">
          ${body}
          <nav class="pager" aria-label="More projects">
            ${prev ? `<a href="#${prev.id}"><small>&larr; Previous project</small><strong>${esc(prev.title)}</strong></a>` : ''}
            ${next ? `<a class="next" href="#${next.id}"><small>Next project &rarr;</small><strong>${esc(next.title)}</strong></a>` : ''}
          </nav>
        </div>
      </section>`;
  };

  const numField = (id, label, opts = {}) => `
    <div class="field">
      <label for="${id}">${label}</label>
      <div class="input-wrap${opts.prefix ? ' has-prefix' : ''}${opts.suffix ? ' has-suffix' : ''}">
        ${opts.prefix ? `<span class="affix prefix">${opts.prefix}</span>` : ''}
        <input type="number" id="${id}" inputmode="decimal" value="${opts.value ?? ''}" ${opts.min !== undefined ? `min="${opts.min}"` : ''} ${opts.max !== undefined ? `max="${opts.max}"` : ''} step="${opts.step ?? 'any'}" placeholder="${opts.placeholder ?? ''}">
        ${opts.suffix ? `<span class="affix suffix">${opts.suffix}</span>` : ''}
      </div>
      ${opts.help ? `<span class="help">${opts.help}</span>` : ''}
      <span class="error" id="${id}-err"></span>
    </div>`;

  const readNum = (id, { min = -Infinity, max = Infinity, integer = false, required = true } = {}) => {
    const el = document.getElementById(id), err = document.getElementById(id + '-err');
    const raw = el.value.trim();
    let msg = '';
    let v = raw === '' ? (required ? NaN : 0) : Number(raw);
    if (raw === '' && required) msg = 'Enter a value.';
    else if (!Number.isFinite(v)) msg = 'Enter a valid number.';
    else if (integer && !Number.isInteger(v)) msg = 'Enter a whole number.';
    else if (v < min) msg = `Must be at least ${min.toLocaleString()}.`;
    else if (v > max) msg = `Must be at most ${max.toLocaleString()}.`;
    el.classList.toggle('invalid', !!msg && raw !== '');
    if (err) err.textContent = raw === '' && required ? '' : msg;
    return msg ? null : v;
  };

  /* ===================== 1. Conversion ===================== */
  const conversions = [
    { id: 'c2f', title: 'Celsius to Fahrenheit', from: '°C', to: '°F', fn: c => c * 9 / 5 + 32, formula: '°F = (°C × 9/5) + 32', value: 100 },
    { id: 'f2c', title: 'Fahrenheit to Celsius', from: '°F', to: '°C', fn: f => (f - 32) * 5 / 9, formula: '°C = (°F − 32) × 5/9', value: 98.6 },
    { id: 'm2ft', title: 'Meters to Feet', from: 'm', to: 'ft', fn: m => m / 0.3048, formula: 'ft = m ÷ 0.3048', value: 1, min: 0 },
    { id: 'ft2m', title: 'Feet to Meters', from: 'ft', to: 'm', fn: ft => ft * 0.3048, formula: 'm = ft × 0.3048', value: 10, min: 0 }
  ];
  const renderConversion = () => `
    <div class="panel">
      <h2>Converters</h2>
      <p class="sub">Results update as you type.</p>
      <div class="conv-grid">
        ${conversions.map(c => `
          <div class="conv">
            <h3><span class="dot"></span>${c.title}</h3>
            ${numField(c.id, `Value in ${c.from}`, { suffix: c.from, value: c.value, min: c.min })}
            <div class="result" aria-live="polite"><span class="val" id="${c.id}-out">—</span><span class="unit">${c.to}</span></div>
            <div class="formula">${c.formula}</div>
          </div>`).join('')}
      </div>
    </div>`;
  const bindConversion = () => conversions.forEach(c => {
    const update = () => {
      const v = readNum(c.id, { min: c.min ?? -Infinity });
      $(`#${c.id}-out`).textContent = v === null ? '—' : num(c.fn(v), 4);
    };
    document.getElementById(c.id).addEventListener('input', update);
    update();
  });

  /* ===================== 2. Income tax ===================== */
  // Graduated income tax rates for individuals, effective 1 Jan 2023 onwards (RA 10963 / TRAIN Law)
  const BRACKETS = [
    { over: 0,       upTo: 250000,   base: 0,       rate: 0 },
    { over: 250000,  upTo: 400000,   base: 0,       rate: 0.15 },
    { over: 400000,  upTo: 800000,   base: 22500,   rate: 0.20 },
    { over: 800000,  upTo: 2000000,  base: 102500,  rate: 0.25 },
    { over: 2000000, upTo: 8000000,  base: 402500,  rate: 0.30 },
    { over: 8000000, upTo: Infinity, base: 2202500, rate: 0.35 }
  ];
  const computeTax = annual => {
    const idx = BRACKETS.findIndex(b => annual <= b.upTo);
    const b = BRACKETS[idx];
    return { idx, tax: b.base + (annual - b.over) * b.rate, b };
  };
  const bracketLabel = b => b.upTo === Infinity ? `Over ${peso(b.over)}` : b.over === 0 ? `${peso(b.upTo)} and below` : `Over ${peso(b.over)} up to ${peso(b.upTo)}`;
  const bracketRule = b => b.rate === 0 ? 'Exempt (0%)' : `${b.base ? peso(b.base) + ' + ' : ''}${b.rate * 100}% of excess over ${peso(b.over)}`;

  const renderTax = () => `
    <div class="split">
      <div class="panel">
        <h2>Your income</h2>
        <p class="sub">Use taxable income — gross pay minus non-taxable items and mandatory contributions (SSS, PhilHealth, Pag-IBIG).</p>
        <div class="seg" role="group" aria-label="Income period">
          <button type="button" data-period="monthly" class="on">Monthly</button>
          <button type="button" data-period="annual">Annual</button>
        </div>
        ${numField('taxIncome', 'Taxable income', { prefix: '₱', value: 35000, min: 0, placeholder: '0.00' })}
      </div>
      <div class="result-box" aria-live="polite">
        <div class="label">Estimated annual income tax</div>
        <div class="big" id="taxDue">—</div>
        <div class="kv">
          <div><span>Annual taxable income</span><span id="taxAnnual">—</span></div>
          <div><span>Monthly income tax</span><span id="taxMonthly">—</span></div>
          <div><span>Effective tax rate</span><span id="taxRate">—</span></div>
          <div><span>Tax bracket</span><span id="taxBracket">—</span></div>
          <div class="total"><span>Annual income after tax</span><span id="taxNet">—</span></div>
          <div class="total"><span>Monthly income after tax</span><span id="taxNetM">—</span></div>
        </div>
      </div>
    </div>
    <div class="panel">
      <h2>Tax table</h2>
      <p class="sub">Graduated income tax rates for individuals, effective January 1, 2023 onwards. Your bracket is highlighted.</p>
      <div class="table-wrap">
        <table class="brackets">
          <thead><tr><th>Annual taxable income</th><th>Income tax</th></tr></thead>
          <tbody id="taxTable">${BRACKETS.map((b, i) => `<tr data-i="${i}"><td>${bracketLabel(b)}</td><td>${bracketRule(b)}</td></tr>`).join('')}</tbody>
        </table>
      </div>
      <p class="note">This is an estimate for general information only, not tax advice. It applies the graduated rates and does not cover the optional 8% rate for self-employed individuals or other special cases.</p>
    </div>`;
  const bindTax = () => {
    let period = 'monthly';
    const update = () => {
      const v = readNum('taxIncome', { min: 0, max: 1e12 });
      const ids = ['taxDue', 'taxAnnual', 'taxMonthly', 'taxRate', 'taxBracket', 'taxNet', 'taxNetM'];
      document.querySelectorAll('#taxTable tr').forEach(tr => tr.classList.remove('active'));
      if (v === null) { ids.forEach(id => $('#' + id).textContent = '—'); return; }
      const annual = period === 'monthly' ? v * 12 : v;
      const { idx, tax } = computeTax(annual);
      $('#taxDue').textContent = peso(tax);
      $('#taxAnnual').textContent = peso(annual);
      $('#taxMonthly').textContent = peso(tax / 12);
      $('#taxRate').textContent = annual > 0 ? pct(tax / annual) : '0.00%';
      $('#taxBracket').textContent = BRACKETS[idx].rate === 0 ? 'Exempt' : `${BRACKETS[idx].rate * 100}% bracket`;
      $('#taxNet').textContent = peso(annual - tax);
      $('#taxNetM').textContent = peso((annual - tax) / 12);
      document.querySelector(`#taxTable tr[data-i="${idx}"]`).classList.add('active');
    };
    document.querySelectorAll('[data-period]').forEach(btn => btn.addEventListener('click', () => {
      period = btn.dataset.period;
      document.querySelectorAll('[data-period]').forEach(b => b.classList.toggle('on', b === btn));
      update();
    }));
    $('#taxIncome').addEventListener('input', update);
    update();
  };

  /* ===================== 3. Factorial / Sum / Average ===================== */
  // These functions are the code that runs. The page shows their exact source (via toString),
  // so what visitors read is always what computes their result.
  function factorial(n) {
    // 1n is a BigInt, so results stay exact
    let result = 1n;
    let i = 1n;
    while (i <= BigInt(n)) {
      result = result * i;
      i++;
    }
    return result;
  }
  function sum(n) {
    if (n < 1) return 0;
    let total = 0;
    let i = 1;
    do {
      total = total + i;
      i++;
    } while (i <= n);
    return total;
  }
  function average(n) {
    if (n < 1) return 0;
    let total = 0;
    for (let i = 1; i <= n; i++) {
      total = total + i;
    }
    return total / n;
  }

  /* ---------- Code display helpers ---------- */
  const dedent = src => {
    const lines = src.split('\n');
    const indents = lines.slice(1).filter(l => l.trim()).map(l => l.match(/^ */)[0].length);
    const cut = indents.length ? Math.min(...indents) : 0;
    return [lines[0], ...lines.slice(1).map(l => l.slice(Math.max(cut, 0)))].join('\n');
  };
  const highlight = code => {
    const KW = /^(function|let|const|return|while|do|for|if|else|new|true|false)$/;
    return code.split('\n').map(line => {
      const ci = line.indexOf('//');
      const body = ci >= 0 ? line.slice(0, ci) : line;
      const comment = ci >= 0 ? line.slice(ci) : '';
      const out = body.replace(/('[^']*'|`[^`]*`|\b\d+(?:\.\d+)?n?\b|\b[A-Za-z_]\w*\b|[^'`\w]+)/g, tok => {
        if (/^['`]/.test(tok)) return `<span class="s">${esc(tok)}</span>`;
        if (/^\d/.test(tok)) return `<span class="n">${esc(tok)}</span>`;
        if (KW.test(tok)) return `<span class="k">${tok}</span>`;
        return esc(tok);
      });
      return out + (comment ? `<span class="c">${esc(comment)}</span>` : '');
    }).join('\n');
  };
  const codeSources = {};
  const codeBlock = (key, fn) => {
    codeSources[key] = dedent(fn.toString());
    return `<div class="code-block">
      <div class="code-bar"><span class="lang"><b>JS</b>JavaScript</span><button type="button" class="copy-btn" data-copy="${key}">Copy</button></div>
      <pre class="code"><code>${highlight(codeSources[key])}</code></pre>
    </div>`;
  };
  document.addEventListener('click', async e => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    try { await navigator.clipboard.writeText(codeSources[btn.dataset.copy]); btn.textContent = 'Copied!'; }
    catch { btn.textContent = 'Copy failed'; }
    setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
  });
  const MAX_N = 1000;
  const traceOf = (n, op) => {
    if (n < 1) return '';
    if (n <= 8) return Array.from({ length: n }, (_, k) => k + 1).join(` ${op} `);
    return `1 ${op} 2 ${op} 3 ${op} … ${op} ${n}`;
  };
  const renderLoops = () => `
    <div class="panel">
      <h2>Choose N</h2>
      <p class="sub">A whole number from 0 to ${MAX_N.toLocaleString()}. The first N natural numbers are 1, 2, 3, …, N.</p>
      <div style="max-width:320px">${numField('loopN', 'N', { value: 5, min: 0, max: MAX_N, step: 1 })}</div>
    </div>
    <div class="panel">
      <div class="loop-cards">
        <article class="loop-card">
          <header><h3>Factorial</h3><span class="loop-tag">While Loop</span></header>
          <div class="out" aria-live="polite"><div class="val" id="factOut">—</div><div class="trace" id="factTrace"></div></div>
          ${codeBlock('factorial', factorial)}
        </article>
        <article class="loop-card">
          <header><h3>Sum</h3><span class="loop-tag">Do While Loop</span></header>
          <div class="out" aria-live="polite"><div class="val" id="sumOut">—</div><div class="trace" id="sumTrace"></div></div>
          ${codeBlock('sum', sum)}
        </article>
        <article class="loop-card">
          <header><h3>Average</h3><span class="loop-tag">For Loop</span></header>
          <div class="out" aria-live="polite"><div class="val" id="avgOut">—</div><div class="trace" id="avgTrace"></div></div>
          ${codeBlock('average', average)}
        </article>
      </div>
      <p class="note">All three are written in JavaScript — the code shown is the exact code that runs. Factorial uses BigInt, so even large results are exact. 0! = 1 by definition; the sum and average of zero numbers are shown as 0.</p>
    </div>`;
  const bindLoops = () => {
    const update = () => {
      const n = readNum('loopN', { min: 0, max: MAX_N, integer: true });
      if (n === null) { ['factOut','sumOut','avgOut'].forEach(id => $('#' + id).textContent = '—'); ['factTrace','sumTrace','avgTrace'].forEach(id => $('#' + id).textContent = ''); return; }
      const f = factorial(n).toString();
      const fEl = $('#factOut');
      fEl.textContent = f.length > 15 ? f : Number(f).toLocaleString('en-US');
      fEl.classList.toggle('long', f.length > 15);
      $('#factTrace').textContent = n === 0 ? '0! = 1' : `${n}! = ${traceOf(n, '×')}${f.length > 15 ? ` (${f.length} digits)` : ''}`;
      const s = sum(n);
      $('#sumOut').textContent = s.toLocaleString('en-US');
      $('#sumTrace').textContent = n ? traceOf(n, '+') : '';
      const a = average(n);
      $('#avgOut').textContent = num(a, 4);
      $('#avgTrace').textContent = n ? `${s.toLocaleString('en-US')} ÷ ${n}` : '';
    };
    $('#loopN').addEventListener('input', update);
    update();
  };

  /* ===================== 4. Simple payroll ===================== */
  function computePay(
    rate,
    hours,
    overtimeHours,
    overtimeMultiplier,
    deductionPercent,
    fixedDeductions
  ) {
    const regularPay = rate * hours;
    const overtimeRate = rate * overtimeMultiplier;
    const overtimePay = overtimeRate * overtimeHours;
    const grossPay = regularPay + overtimePay;
    const percentDeduction = grossPay * (deductionPercent / 100);
    const totalDeductions = percentDeduction + fixedDeductions;
    const netPay = grossPay - totalDeductions;
    return {
      regularPay,
      overtimeRate,
      overtimePay,
      grossPay,
      percentDeduction,
      totalDeductions,
      netPay
    };
  }
  const renderPayroll = () => `
    <div class="split">
      <div class="panel">
        <h2>Employee &amp; hours</h2>
        <p class="sub">Fill in the details for one pay period.</p>
        <div class="field">
          <label for="payName">Employee name</label>
          <input type="text" id="payName" value="Juan Dela Cruz" maxlength="60">
        </div>
        <div class="row">
          ${numField('payRate', 'Hourly rate', { prefix: '₱', value: 100, min: 0 })}
          ${numField('payHours', 'Regular hours', { value: 80, min: 0, max: 744 })}
        </div>
        <div class="row">
          ${numField('payOtHours', 'Overtime hours', { value: 5, min: 0, max: 744 })}
          ${numField('payOtMult', 'Overtime multiplier', { value: 1.25, min: 1, max: 5, suffix: '×', help: 'e.g. 1.25 = 125% of hourly rate' })}
        </div>
        <div class="row">
          ${numField('payDeductPct', 'Deductions (percent)', { value: 0, min: 0, max: 100, suffix: '%', help: 'Percent of gross pay, e.g. tax', required: false })}
          ${numField('payDeductFixed', 'Deductions (fixed amount)', { prefix: '₱', value: 500, min: 0, help: 'e.g. contributions, loans', required: false })}
        </div>
      </div>
      <div class="payslip" aria-live="polite">
        <div class="ps-head">
          <div><small>Payslip</small><strong id="psName">—</strong></div>
          <small id="psRate"></small>
        </div>
        <div class="ps-lines">
          <div class="ps-line"><span>Regular pay</span><span id="psRegular">—</span></div>
          <div class="ps-line sub"><span id="psRegularCalc"></span><span></span></div>
          <div class="ps-line"><span>Overtime pay</span><span id="psOt">—</span></div>
          <div class="ps-line sub"><span id="psOtCalc"></span><span></span></div>
          <div class="ps-line gross"><span>Gross pay</span><span id="psGross">—</span></div>
          <div class="ps-line minus"><span id="psPctLabel">Percent deductions</span><span id="psPct">—</span></div>
          <div class="ps-line minus"><span>Fixed deductions</span><span id="psFixed">—</span></div>
          <div class="ps-line gross"><span>Total deductions</span><span id="psDeduct">—</span></div>
        </div>
        <div class="ps-net"><span>Net pay</span><span id="psNet">—</span></div>
      </div>
    </div>
    <div class="panel">
      <h2>How it works</h2>
      <p class="sub">The payslip is computed by this JavaScript function — the exact code that runs.</p>
      ${codeBlock('payroll', computePay)}
    </div>`;
  const bindPayroll = () => {
    const ids = ['payName','payRate','payHours','payOtHours','payOtMult','payDeductPct','payDeductFixed'];
    const update = () => {
      const name = $('#payName').value.trim() || 'Employee';
      const rate = readNum('payRate', { min: 0 });
      const hours = readNum('payHours', { min: 0, max: 744 });
      const otH = readNum('payOtHours', { min: 0, max: 744 });
      const mult = readNum('payOtMult', { min: 1, max: 5 });
      const dPct = readNum('payDeductPct', { min: 0, max: 100, required: false });
      const dFix = readNum('payDeductFixed', { min: 0, required: false });
      $('#psName').textContent = name;
      if ([rate, hours, otH, mult, dPct, dFix].some(v => v === null)) {
        ['psRegular','psOt','psGross','psPct','psFixed','psDeduct','psNet'].forEach(id => $('#' + id).textContent = '—');
        $('#psRegularCalc').textContent = $('#psOtCalc').textContent = $('#psRate').textContent = '';
        return;
      }
      const pay = computePay(rate, hours, otH, mult, dPct, dFix);
      const regular = pay.regularPay, otRate = pay.overtimeRate, ot = pay.overtimePay, gross = pay.grossPay;
      const pctAmt = pay.percentDeduction, deductions = pay.totalDeductions, net = pay.netPay;
      $('#psRate').textContent = `${peso(rate)} / hour`;
      $('#psRegular').textContent = peso(regular);
      $('#psRegularCalc').textContent = `${num(hours, 2)} hrs × ${peso(rate)}`;
      $('#psOt').textContent = peso(ot);
      $('#psOtCalc').textContent = `${num(otH, 2)} hrs × ${peso(otRate)} (${num(mult, 2)}×)`;
      $('#psGross').textContent = peso(gross);
      $('#psPctLabel').textContent = `Percent deductions (${num(dPct, 2)}%)`;
      $('#psPct').textContent = '− ' + peso(pctAmt);
      $('#psFixed').textContent = '− ' + peso(dFix);
      $('#psDeduct').textContent = '− ' + peso(deductions);
      const netEl = $('#psNet');
      netEl.textContent = peso(net);
      netEl.style.color = net < 0 ? 'var(--bad)' : '';
    };
    ids.forEach(id => document.getElementById(id).addEventListener('input', update));
    update();
  };

  const tools = {
    'conversion': [renderConversion, bindConversion],
    'income-tax': [renderTax, bindTax],
    'loops': [renderLoops, bindLoops],
    'payroll': [renderPayroll, bindPayroll]
  };

  /* ===================== Router (hash-based) ===================== */
  const homeView = $('#view-home'), projectView = $('#view-project');
  const nav = $('#nav'), toggle = $('#navToggle');
  const navLinks = document.querySelectorAll('[data-nav]');
  const HOME_SECTIONS = ['home', 'projects', 'about'];
  const BASE_TITLE = 'Project Faker';
  let currentProject = null;

  const setActive = key => navLinks.forEach(a => a.classList.toggle('active', a.dataset.nav === key));
  const closeMenu = () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); };
  const smoothTo = id => {
    const el = document.getElementById(id);
    const top = id === 'home' || !el ? 0 : el.getBoundingClientRect().top + window.scrollY - nav.offsetHeight;
    window.scrollTo({ top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  const route = (fromLoad = false) => {
    const key = (location.hash || '#home').slice(1);
    closeMenu();
    if (byId[key]) {
      const p = byId[key];
      if (currentProject !== key) {
        projectView.innerHTML = pageShell(p, tools[key][0]());
        tools[key][1]();
        currentProject = key;
      }
      homeView.classList.remove('current');
      projectView.classList.add('current');
      document.title = `${p.title} · ${BASE_TITLE}`;
      setActive('projects');
      window.scrollTo(0, 0);
      return;
    }
    const wasProject = projectView.classList.contains('current');
    projectView.classList.remove('current');
    homeView.classList.add('current');
    document.title = BASE_TITLE;
    const section = HOME_SECTIONS.includes(key) ? key : 'home';
    setActive(section);
    if (wasProject || fromLoad) { window.scrollTo(0, 0); requestAnimationFrame(() => { revealAll(); smoothTo(section); }); }
    else smoothTo(section);
  };

  // Same-hash clicks (e.g. clicking "Projects" twice) still scroll.
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = a.getAttribute('href');
    if (target === location.hash || (target === '#home' && !location.hash)) { e.preventDefault(); route(); }
  });
  window.addEventListener('hashchange', () => route());

  /* ===================== Nav behaviour ===================== */
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  document.addEventListener('click', e => { if (!nav.contains(e.target)) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (innerWidth > 720) closeMenu(); });

  const sections = HOME_SECTIONS.map(id => document.getElementById(id));
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', scrollY > 10);
    if (!homeView.classList.contains('current')) return;
    const probe = scrollY + nav.offsetHeight + innerHeight * 0.3;
    let current = 'home';
    sections.forEach(s => { if (s.offsetTop <= probe) current = s.id; });
    if (innerHeight + scrollY >= document.body.scrollHeight - 4) current = 'about';
    setActive(current);
  }, { passive: true });

  /* ===================== Reveal on scroll ===================== */
  const revealEls = document.querySelectorAll('.reveal');
  let io = null;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: 0, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else revealEls.forEach(el => el.classList.add('in'));
  function revealAll() { setTimeout(() => revealEls.forEach(el => el.classList.add('in')), 1200); }
  revealAll();

  $('#year').textContent = new Date().getFullYear();
  route(true);
})();
