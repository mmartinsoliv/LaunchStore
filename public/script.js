const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')

menuItems.forEach((items)=>{
    if(currentPage.includes(items.getAttribute('href'))){
        items.classList.add('active')
    }
})

const formDelete = document.querySelector('#form-delete')

formDelete.addEventListener('submit', ()=>{
    const confirmation = confirm("Deseja excluir mesmo? ")
    if(!confirmation){
        event.preventDefault()
    }
})