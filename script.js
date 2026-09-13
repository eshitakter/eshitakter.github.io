/* ===========================================================
   ESHITA AKTER — PORTFOLIO SCRIPT
   Loader, scroll reveals, nav, thread spine, radar chart,
   flow graph, project filter, ambient constellation canvas.
   =========================================================== */
(function(){
  "use strict";

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Loader ---------- */
  var loader = document.getElementById('loader');
  window.addEventListener('load', function(){
    setTimeout(function(){
      loader.classList.add('done');
      document.body.style.overflow = '';
    }, reducedMotion ? 0 : 1400);
  });

  /* ---------- Nav scroll state + mobile toggle ---------- */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function onScroll(){
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    updateThread();
    updateActiveNav();
  }
  window.addEventListener('scroll', onScroll, { passive:true });

  navToggle.addEventListener('click', function(){
    var open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ navLinks.classList.remove('open'); });
  });

  /* ---------- Active nav link on scroll ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navA = Array.prototype.slice.call(navLinks.querySelectorAll('a'));
  function updateActiveNav(){
    var y = window.scrollY + window.innerHeight * 0.35;
    var current = sections[0];
    sections.forEach(function(s){ if (s.offsetTop <= y) current = s; });
    navA.forEach(function(a){
      a.classList.toggle('active', current && a.getAttribute('href') === '#' + current.id);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && !reducedMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold:0.12, rootMargin:'0px 0px -60px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------- Scroll thread spine ---------- */
  var threadPath = document.getElementById('thread-path');
  function updateThread(){
    if (!threadPath) return;
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var progress = max > 0 ? window.scrollY / max : 0;
    var y = Math.max(0, Math.min(1000, progress * 1000));
    threadPath.setAttribute('d', 'M1,0 C1,' + (y*0.4) + ' 1,' + (y*0.6) + ' 1,' + y);
  }

  /* ---------- Hero rotator ---------- */
  var roles = ['Business & Data Analyst','Aspiring Business Analyst','Finance Professional','Operations & Process Analyst'];
  var rotatorEl = document.getElementById('rotator');
  var ri = 0;
  if (rotatorEl && !reducedMotion){
    setInterval(function(){
      ri = (ri + 1) % roles.length;
      rotatorEl.style.opacity = 0;
      setTimeout(function(){
        rotatorEl.textContent = roles[ri];
        rotatorEl.style.opacity = 1;
      }, 350);
    }, 3200);
    rotatorEl.style.transition = 'opacity .35s ease';
  }

  /* ---------- Flow graph: activate nodes on scroll + draw line ---------- */
  var flowGraph = document.getElementById('flowGraph');
  var flowLine = document.querySelector('.flow-line');
  var flowNodes = flowGraph ? Array.prototype.slice.call(flowGraph.querySelectorAll('.flow-node')) : [];
  if (flowGraph && 'IntersectionObserver' in window){
    var flowIO = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){
          flowLine.classList.add('drawn');
          flowNodes.forEach(function(node, i){
            setTimeout(function(){ node.classList.add('active'); }, i * 160 + 200);
          });
          flowIO.disconnect();
        }
      });
    }, { threshold:0.4 });
    flowIO.observe(flowGraph);
  }

  /* ---------- Radar / skill matrix ---------- */
  var radarData = [
    { label:'Business Analysis', value:0.82 },
    { label:'Finance', value:0.9 },
    { label:'Data Analysis', value:0.85 },
    { label:'Operations', value:0.8 },
    { label:'Business Intelligence', value:0.85 },
    { label:'Communication', value:0.8 },
    { label:'Problem Solving', value:0.88 }
  ];
  var radarSvg = document.getElementById('radar');
  function buildRadar(){
    if (!radarSvg) return;
    var cx = 200, cy = 200, r = 150;
    var n = radarData.length;
    var ns = 'http://www.w3.org/2000/svg';
    function pt(i, scale){
      var angle = (Math.PI * 2 * i / n) - Math.PI/2;
      return [ cx + Math.cos(angle) * r * scale, cy + Math.sin(angle) * r * scale ];
    }
    // grid rings
    [0.25,0.5,0.75,1].forEach(function(scale){
      var poly = document.createElementNS(ns,'polygon');
      var pts = [];
      for (var i=0;i<n;i++){ pts.push(pt(i, scale).join(',')); }
      poly.setAttribute('points', pts.join(' '));
      poly.setAttribute('fill','none');
      poly.setAttribute('stroke','var(--line-strong)');
      poly.setAttribute('stroke-width','1');
      radarSvg.appendChild(poly);
    });
    // axes + labels
    for (var i=0;i<n;i++){
      var p = pt(i,1);
      var line = document.createElementNS(ns,'line');
      line.setAttribute('x1', cx); line.setAttribute('y1', cy);
      line.setAttribute('x2', p[0]); line.setAttribute('y2', p[1]);
      line.setAttribute('stroke','var(--line)'); line.setAttribute('stroke-width','1');
      radarSvg.appendChild(line);

      var lp = pt(i, 1.18);
      var text = document.createElementNS(ns,'text');
      text.setAttribute('x', lp[0]); text.setAttribute('y', lp[1]);
      text.setAttribute('text-anchor','middle');
      text.setAttribute('dominant-baseline','middle');
      text.setAttribute('font-size','10.5');
      text.setAttribute('font-family','var(--font-mono)');
      text.setAttribute('fill','var(--text-muted)');
      var words = radarData[i].label.split(' ');
      if (words.length > 1){
        words.forEach(function(w, wi){
          var tspan = document.createElementNS(ns,'tspan');
          tspan.setAttribute('x', lp[0]);
          tspan.setAttribute('dy', wi === 0 ? '0' : '11');
          tspan.textContent = w;
          text.appendChild(tspan);
        });
      } else {
        text.textContent = radarData[i].label;
      }
      radarSvg.appendChild(text);
    }
    // data polygon (animated draw)
    var dataPts = radarData.map(function(d,i){ return pt(i, d.value); });
    var poly = document.createElementNS(ns,'polygon');
    poly.setAttribute('points', dataPts.map(function(p){ return cx+','+cy; }).join(' '));
    poly.setAttribute('fill','rgba(145,89,214,0.25)');
    poly.setAttribute('stroke','var(--lilac)');
    poly.setAttribute('stroke-width','2');
    poly.style.transition = reducedMotion ? 'none' : 'points 1.1s cubic-bezier(.16,.84,.44,1)';
    radarSvg.appendChild(poly);

    dataPts.forEach(function(p){
      var dot = document.createElementNS(ns,'circle');
      dot.setAttribute('cx', p[0]); dot.setAttribute('cy', p[1]); dot.setAttribute('r','3.5');
      dot.setAttribute('fill','var(--lilac)');
      dot.style.opacity = '0';
      dot.style.transition = 'opacity .6s ease 1s';
      radarSvg.appendChild(dot);
    });

    // trigger animation on view
    if ('IntersectionObserver' in window){
      var rIO = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (e.isIntersecting){
            requestAnimationFrame(function(){
              poly.setAttribute('points', dataPts.map(function(p){ return p.join(','); }).join(' '));
            });
            radarSvg.querySelectorAll('circle').forEach(function(c){ c.style.opacity = '1'; });
            rIO.disconnect();
          }
        });
      }, { threshold:0.3 });
      rIO.observe(radarSvg);
    } else {
      poly.setAttribute('points', dataPts.map(function(p){ return p.join(','); }).join(' '));
    }
  }
  buildRadar();

  /* ---------- Project filter ---------- */
  var filterBar = document.getElementById('filterBar');
  var projectCards = Array.prototype.slice.call(document.querySelectorAll('.project-card'));
  if (filterBar){
    filterBar.addEventListener('click', function(e){
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.dataset.filter;
      projectCards.forEach(function(card){
        var cats = card.dataset.cat || '';
        var show = f === 'all' || cats.indexOf(f) !== -1;
        card.classList.toggle('hidden-card', !show);
      });
    });
  }

  /* ---------- Ambient constellation canvas ---------- */
  var canvas = document.getElementById('constellation');
  if (canvas && !reducedMotion){
    var ctx = canvas.getContext('2d');
    var w, h, points = [];
    var POINT_COUNT = window.innerWidth < 700 ? 26 : 46;

    function resize(){
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight * 1.4;
    }
    function initPoints(){
      points = [];
      for (var i=0;i<POINT_COUNT;i++){
        points.push({
          x: Math.random()*w, y: Math.random()*h,
          vx: (Math.random()-0.5)*0.15, vy: (Math.random()-0.5)*0.15
        });
      }
    }
    resize(); initPoints();
    window.addEventListener('resize', function(){ resize(); initPoints(); });

    function tick(){
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle = 'rgba(185,166,224,0.55)';
      points.forEach(function(p){
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI*2);
        ctx.fill();
      });
      for (var i=0;i<points.length;i++){
        for (var j=i+1;j<points.length;j++){
          var dx = points[i].x - points[j].x, dy = points[i].y - points[j].y;
          var dist = Math.sqrt(dx*dx+dy*dy);
          if (dist < 140){
            ctx.strokeStyle = 'rgba(145,89,214,' + (0.18 * (1 - dist/140)) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* ---------- init states ---------- */
  onScroll();

  if (document.body) document.body.style.overflow = 'hidden';
  setTimeout(function(){ document.body.style.overflow = ''; }, reducedMotion ? 0 : 1500);

})();
