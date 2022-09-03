const allCatagoryList = async ()=>{
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  try{
      const res = await fetch(url);
      const data = await res.json();
      setShowDisplayCatagories(data.data.news_category)
  }
  catch(error){
    console.log(error);
  }
}
const setShowDisplayCatagories = (navCatagory)=>{
    // console.log(navCatagory);
    const catagoryRow = document.getElementById('catagory-row')

    navCatagory.forEach(function(value){
        const createDiv = document.createElement('div')
        createDiv.innerHTML = `
        <nav class="nav">
            <a onclick="catagoryBtn('${value.category_id}',toggleLoading(true))" class="nav-link text-info" href="#">${value.category_name}</a>
        </nav>

        `
        catagoryRow.appendChild(createDiv)
  
    })
    toggleLoading(false)
}

const catagoryBtn =(id)=>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
    .then(rel => rel.json())
    .then(data => showNewsDisplay(data.data))
}
//   Details menu section 




const showNewsDisplay = newsItem =>{
  const cardView = document.getElementById('card-view')
  cardView.innerHTML = ``;

  const totalNews = newsItem.length;
  const resultItem = document.getElementById('result-item')
  resultItem.innerHTML = `
     <h3 class="fw-bold text-warning">Available News: ${totalNews ? totalNews: 'Sorry! No News Data Available'}</h3>
  `

  newsItem.forEach(function(value){
    

    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML = `
          <div class="card h-100">
          <img src="${value.image_url}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${value.title}</h5>
            <p class="card-text">${value.details.slice(0, 290).concat('...')}</p>
            <div class="d-flex justify-content-between px-5             align-items-center">
              <div class="d-flex align-items-center">
                <img style="width:40px; height: 40px;" class="rounded-5" src="${value.author.img}" alt="">
                <div class="ps-3"><h6>${value.author.name ? value.author.name: 'No Data Found'}</h6>
                  <h6 class="text-muted">${value.author.published_date ? value.author.published_date: 'No Data Found'}</h6></div>
              </div>
              <div>
                <i class="fa-solid fa-eye"></i>
                <h6 class="d-inline">${value.total_view}</h6>
              </div>
            </div>

          </div>
          <div class="pb-3 text-center">
            <button onclick="seeMore('${value._id}')" class="btn btn-success"  data-bs-toggle="modal" data-bs-target="#see-more">see more</button>       
          </div>

        </div>
    `

    cardView.appendChild(div)

    
  })
  toggleLoading(false)

}

  // toggle loading bar
  const toggleLoading = (isLoading)=>{

    const loadingBar = document.getElementById('loading')
    if(isLoading){
      loadingBar.classList.remove('d-none')
    }
    else{
      loadingBar.classList.add('d-none')
    }
  }


const seeMore = (showModal) =>{
  const url = `https://openapi.programming-hero.com/api/news/${showModal}`
  fetch(url)
  .then(rel => rel.json())
  .then(data => modalView(data.data))
}
const modalView = (getModel)=>{
  const modalSection = document.getElementById('modal-section')
  getModel.forEach(function(value){
    console.log(value);
    const seeMoreLabel = document.getElementById('see-moreLabel')
    seeMoreLabel.innerText = `${value.title}`
    const bodyModel = document.getElementById('body-model')
    bodyModel.innerHTML =`
    <div>
    <img class="img-fluid" src="${value.image_url}" alt="">
  </div>
  <div>
    <p>${value.details}</p>
  </div>
  <div class="d-flex justify-content-between px-5             align-items-center">
    <div class="d-flex align-items-center">
      <img style="width:40px; height: 40px;" class="rounded-5" src="${value.author.img}" alt="">
      <div class="ps-3"><h6>${value.author.name ? value.author.name: 'NO Data Found'}</h6>
        <h6 class="text-muted">${value.author.published_date ? value.author.published_date: 'NO Data Found'}</h6></div>
    </div>
    <div>
      <i class="fa-solid fa-eye"></i>
      <h6 class="d-inline">${value.total_view}</h6>
    </div>
  </div>

    `
  })


}
allCatagoryList()