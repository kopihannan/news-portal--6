const allCatagoryList = ()=>{
    const url = "https://openapi.programming-hero.com/api/news/categories"
    fetch(url)
    .then(rel => rel.json())
    .then(data => setShowDisplayCatagories(data.data.news_category))
}

const setShowDisplayCatagories = (navCatagory)=>{
    // console.log(navCatagory);
    const catagoryRow = document.getElementById('catagory-row')

    navCatagory.forEach(function(value){
        const createDiv = document.createElement('div')
        createDiv.innerHTML = `
        <nav class="nav">
            <a onclick="catagoryBtn()" class="nav-link text-info" href="#">${value.category_name}</a>
        </nav>

        `
        catagoryRow.appendChild(createDiv)
    })

}


allCatagoryList()