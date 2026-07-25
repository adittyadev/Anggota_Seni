const pages = document.querySelectorAll(".page");

function showPage(id){

pages.forEach(page=>{

page.classList.remove("active");

});

document
.getElementById(id)
.classList.add("active");

}