
    const cropsData = {
      available: [
        {name:"Wheat", image:"./images/Wheat.jpg",
         season:"Winter crop", production:"~28,000 tons annually",
         description:"Jordan's primary cereal grain.", uses:"Bread, flour, livestock feed"},
        {name:"Tomatoes", image:"./images/tomato.jpg",
         season:"Year-round", production:"High volume export crop",
         description:"A successful agricultural export.", uses:"Fresh, processing, export"},
        {name:"Olives", image:"./images/Olives.jpg",
         season:"Oct–Dec", production:"Significant traditional crop",
         description:"Deeply rooted in Jordanian culture.", uses:"Olive oil, table olives"}
      ],
      rare: [
        {name:"Rasepberries", image:"./images/Rasepberries.jpg",
         season:"Spring", production:"Small scale, greenhouse farming",
         description:"Sweet red soft berry.", uses:"Fresh, jam, desserts, drinks"},
        {name:"Cherimoya", image:"./images/cherimoya.jpg",
         season:"winter", production:"Limited, small local farms",
         description:"Creamy sweet tropical fruit.", uses:"Fresh, smoothies, desserts, juice"},
        {name:"Miracle", image:"./images/miracle.jpg",
         season:"Warm", production:"Rare, small scale farming",
         description:"Red berry alters taste.", uses:"Fresh, medicine, flavor enhancer"}
      ]
    };

    let currentCategory='available', currentCardIndex=0;
    const categoryButtons=document.querySelectorAll('.category-btn');
    const prevArrow=document.getElementById('prevArrow');
    const nextArrow=document.getElementById('nextArrow');
    const cropCard=document.getElementById('cropCard');
    const cardCounter=document.getElementById('cardCounter');
    const cardCarousel=document.getElementById('cardCarousel');

    const darkToggle = document.getElementById('darkToggle');
    
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      darkToggle.innerHTML = '☀️ Light';
    }

    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      
      if (document.body.classList.contains('dark-mode')) {
        darkToggle.innerHTML = '☀️ Light';
        localStorage.setItem('darkMode', 'enabled');
      } else {
        darkToggle.innerHTML = '🌙 Dark';
        localStorage.setItem('darkMode', 'disabled');
      }
    });

    function updateCard(){
      const crop=cropsData[currentCategory][currentCardIndex];
      cropCard.innerHTML=`
        <img src="${crop.image}" alt="${crop.name}" onerror="this.src='https://via.placeholder.com/400x250/4CAF50/fff?text=${crop.name}'">
        <div class="crop-info">
          <h3>${crop.name}</h3>
          <p><span class="highlight">Season:</span> ${crop.season}</p>
          <p><span class="highlight">Production:</span> ${crop.production}</p>
          <p><span class="highlight">Description:</span> ${crop.description}</p>
          <p><span class="highlight">Uses:</span> ${crop.uses}</p>
        </div>`;
    }
    function updateCounter(){
      const total=cropsData[currentCategory].length;
      cardCounter.textContent=`${currentCardIndex+1} / ${total}`;
    }
    function init(){ updateCard(); updateCounter(); }
    categoryButtons.forEach(btn=>{
      btn.addEventListener('click',()=>{
        categoryButtons.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory=btn.dataset.category;
        currentCardIndex=0;
        cardCarousel.classList.remove('show');
        setTimeout(()=>{ updateCard(); updateCounter(); cardCarousel.classList.add('show'); },200);
      });
    });
    prevArrow.addEventListener('click',()=>{
      const total=cropsData[currentCategory].length;
      currentCardIndex=currentCardIndex===0?total-1:currentCardIndex-1;
      cardCarousel.classList.remove('show');
      setTimeout(()=>{ updateCard(); updateCounter(); cardCarousel.classList.add('show'); },150);
    });
    nextArrow.addEventListener('click',()=>{
      const total=cropsData[currentCategory].length;
      currentCardIndex=currentCardIndex===total-1?0:currentCardIndex+1;
      cardCarousel.classList.remove('show');
      setTimeout(()=>{ updateCard(); updateCounter(); cardCarousel.classList.add('show'); },150);
    });
    document.addEventListener('keydown',e=>{
      if(e.key==='ArrowLeft') prevArrow.click();
      if(e.key==='ArrowRight') nextArrow.click();
    });
    init();
  