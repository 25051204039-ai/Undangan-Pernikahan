(function(){
  var $=function(i){return document.getElementById(i)};
  // Nama tamu dari link: ...#Budi-Santoso
  var h=decodeURIComponent((location.hash||'').slice(1)).replace(/[-_]+/g,' ').trim();
  if(h)$('guestName').textContent=h.slice(0,40);
  if(h)$('fName').value=h.slice(0,40);

  // Buka undangan
  document.body.style.overflow='hidden';
  $('openBtn').addEventListener('click',function(){
    $('cover').classList.add('open');
    document.body.style.overflow='';
    window.scrollTo(0,0);
    setTimeout(function(){$('cover').style.visibility='hidden'},1300);
  });

  // Hitung mundur (Sabtu, 20 Feb 2027, 08.00 WIB = 01.00 UTC)
  var target=Date.UTC(2027,1,20,1,0,0);
  function tick(){
    var t=Math.max(0,target-Date.now()),
        s=Math.floor(t/1000);
    $('d').textContent=Math.floor(s/86400);
    $('h').textContent=Math.floor(s%86400/3600);
    $('m').textContent=Math.floor(s%3600/60);
    $('s').textContent=s%60;
  }
  tick();setInterval(tick,1000);

  // Simpan ke kalender (.ics)
  $('calBtn').addEventListener('click',function(e){
    e.preventDefault();
    var ics='BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Pernikahan Rania & Arga\nDTSTART:20270220T010000Z\nDTEND:20270220T070000Z\nLOCATION:Gedung Graha Bunga\\, Jl. Raya Darmo 88\\, Surabaya\nEND:VEVENT\nEND:VCALENDAR';
    var a=document.createElement('a');
    a.href='data:text/calendar;charset=utf-8,'+encodeURIComponent(ics);
    a.download='pernikahan-rania-arga.ics';
    a.click();
  });

  // Salin rekening
  $('copyBtn').addEventListener('click',function(){
    var b=this,n=$('acc').textContent;
    function ok(){b.textContent='Tersalin';setTimeout(function(){b.textContent='Salin nomor'},1800)}
    if(navigator.clipboard){navigator.clipboard.writeText(n).then(ok,ok)}else ok();
  });

  // Ucapan (disimpan di browser pengunjung)
  var wishes=[
    {n:'Keluarga Besar',a:'Hadir',m:'Selamat menempuh hidup baru. Semoga sakinah, mawaddah, warahmah.'}
  ];
  try{var s=localStorage.getItem('wishes');if(s)wishes=JSON.parse(s)}catch(e){}
  function esc(t){var d=document.createElement('div');d.textContent=t;return d.innerHTML}
  function render(){
    $('wishes').innerHTML=wishes.slice().reverse().map(function(w){
      return '<div class="card"><b>'+esc(w.n)+'</b><small>'+esc(w.a)+'</small><p style="margin:.4rem 0 0">'+esc(w.m)+'</p></div>'
    }).join('');
  }
  render();
  $('sendBtn').addEventListener('click',function(){
    var n=$('fName').value.trim(),m=$('fMsg').value.trim();
    if(!n||!m){$('fErr').textContent='Isi nama dan ucapan terlebih dahulu.';return}
    $('fErr').textContent='Terkirim. Terima kasih atas ucapannya.';
    wishes.push({n:n,a:$('fAtt').value,m:m});
    try{localStorage.setItem('wishes',JSON.stringify(wishes))}catch(e){}
    $('fMsg').value='';render();
  });

  // Muncul saat di-scroll
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
    els.forEach(function(el){io.observe(el)});
  }else els.forEach(function(el){el.classList.add('in')});
})();
