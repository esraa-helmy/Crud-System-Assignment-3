// * ----------------Variables----------------------
var siteNameEl = document.getElementById("siteName");
var siteUrlEl = document.getElementById("siteUrl");
var submitBtnEl = document.getElementById("submitBtn");
var visitBtnEl = document.getElementById("visitBtn");
var deleteBtnEl = document.getElementById("deleteBtn");
var tbodyEl = document.getElementById("tbody");
let popUpModal =document.getElementById("popUpModal");
let closeBtn =document.getElementById("closeBtn");
let searchInputEl = document.getElementById("search")
// let nameAlert = document.getElementById("nameAlert");
// let urlAlert =document.getElementById("urlAlert")
var container = '';
var bookMarkList = []


// * ----------------Functions-------------------------
bookMarkList = JSON.parse(localStorage.getItem("bookmarkData")) || []
drawBookMarkTable (bookMarkList)
// & Add bookmark Function
function addBookMark () {
    if (validationName()== true && validationWebSiteUrl()== true) {
        siteNameEl.classList.remove('is-valid');
        siteUrlEl.classList.remove('is-valid');
        var bookMarkData = {
            name:siteNameEl.value,
            url:siteUrlEl.value
        }
        bookMarkList.push(bookMarkData)
        console.log(bookMarkList)
        localStorage.setItem("bookmarkData",JSON.stringify(bookMarkList))
        clearFormData ()
        showBookMarkData ()
    }else{
        openModal ()
    }
    
   

    
}

// & Clear Data from form
function clearFormData () {
    siteNameEl.value = ''
    siteUrlEl.value = ''
}

// & Show Bookmark Data in Table
function showBookMarkData () {
    var container = '';
    lastIndex = bookMarkList.length - 1
    container = `<tr class="">
                    <td scope="row">${lastIndex+1}</td>
                    <td>${bookMarkList[lastIndex].name}</td>
                    <td>
                        <a class="btn btn-visit" id="visitUrl" href="${bookMarkList[lastIndex].url}" target="_blank" >
                                <i class="fa-solid fa-eye pe-2"></i>
                                Visit
                        </a>

        
                    <td>
                        <button class="btn btn-danger  pe-2" data-index="0" id="deleteBtn" onclick="deleteBookMark (${lastIndex})">
                            <i class="fa-solid fa-trash-can"></i>
                        Delete
                        </button>
                    </td>
                </tr>`

    tbodyEl.innerHTML+=container
    
}
function drawBookMarkTable (list,searchTerm) {
    var container = '';
    
    for (let i = 0; i < list.length; i++) {
        container += `<tr class="">
        <td scope="row">${i+1}</td>
        <td>${searchTerm?list[i].name.replace(searchTerm,`<span class="bg-warning">${searchTerm}</span>`):list[i].name}</td>
        
        <td>
            <a class="btn btn-visit" id="visitUrl" href="${list[i].url}" target="_blank" >
                    <i class="fa-solid fa-eye pe-2"></i>
                    Visit
            </a>

        </td>
        <td>
            <button class="btn btn-danger  pe-2" data-index="0" id="deleteBtn" onclick="deleteBookMark (${i})">
                <i class="fa-solid fa-trash-can"></i>
            Delete
            </button>
        </td>
    </tr>`
       
      
    }
   

    tbodyEl.innerHTML=container
    
}



// & Visit BookMark WebSite 
// function visitWebSite (index) {
//     var websiteUrl =bookMarkList[index].url
//     console.log(websiteUrl);
//     var visitUrl = document.getElementById("visitUrl")
//     console.log(visitUrl);
//     visitUrl.getAttribute("href",bookMarkList[index].url)
    
// }



// & Delete Bookmark 
function deleteBookMark (index) {
    bookMarkList.splice(index,1)
    localStorage.setItem("bookmarkData",JSON.stringify(bookMarkList))
    drawBookMarkTable (bookMarkList)
    
}


// & Validation Name Function
function validationName(){
    let regexName = /^[A-Z][a-z]{2,}/
    let nameRegex = regexName.test(siteNameEl.value)
    if(nameRegex==true){
        siteNameEl.classList.add('is-valid');
        siteNameEl.classList.remove('is-invalid');

    }else{
        siteNameEl.classList.add('is-invalid');
        siteNameEl.classList.remove('is-valid');
    }
    return nameRegex
}


// & Validation WebSite URL function
function validationWebSiteUrl(){
    let regexUrl =  /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
    let urlRegex = regexUrl.test(siteUrlEl.value)
    console.log(urlRegex)
    if(urlRegex==true){
        // urlAlert.classList.add('d-none');
        siteUrlEl.classList.add('is-valid');
        siteUrlEl.classList.remove('is-invalid');

    }else{
        // urlAlert.classList.remove('d-none');
        siteUrlEl.classList.add('is-invalid');
        siteUrlEl.classList.remove('is-valid');
    }
    return urlRegex
}


// & close Modal function 
function openModal () {
    popUpModal.classList.replace('d-none','d-flex')
    // popUpModal.classList.add('justify-content-center')
    // popUpModal.classList.add(' align-items-center')
    
}
function closeModal () {
    popUpModal.classList.replace('d-flex','d-none')
    
}

// & Search Function 
function search(){
    let searchList =[]
    for (let i = 0; i < bookMarkList.length; i++) {
        if (bookMarkList[i].name.toLowerCase().includes( searchInputEl.value.toLowerCase())  ) {
            searchList.push(bookMarkList[i])
            drawBookMarkTable (searchList,searchInputEl.value)
        } 
    }
    
}


// *----------------Events----------------
submitBtnEl.addEventListener('click',addBookMark);
siteNameEl.addEventListener('blur',validationName);
siteUrlEl.addEventListener('blur',validationWebSiteUrl)

// ^------------Close PopUp Modal Events --------------
closeBtn.addEventListener('click',closeModal)
document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
      closeModal();
    }
  });
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("popup-modal")) {
      closeModal();
    }
  });


  searchInputEl.addEventListener('keyup',search)