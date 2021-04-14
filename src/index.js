document.addEventListener('DOMContentLoaded', () => {

const dogTable = document.querySelector('table.margin')
const editForm = document.querySelector('form#dog-form')

function renderOneDog(dog) {
    const dogRow = document.createElement('tr')
    dogRow.dataset.id = dog.id

    dogRow.innerHTML = `<td>${dog.name}</td> 
    <td>${dog.breed}</td> 
    <td>${dog.sex}</td> 
    <td><button>Edit Dog</button></td>`

    dogTable.append(dogRow)
}

function renderAllDogs() {
    fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(dogsArr => dogsArr.forEach(dog => {
            renderOneDog(dog)
        }))
}

dogTable.addEventListener('click', event => {
    if (event.target.matches('button')) {
        const tr = event.target.closest('tr')
        editForm.name.placeholder = tr.children[0].textContent
        editForm.breed.placeholder = tr.children[1].textContent
        editForm.sex.placeholder = tr.children[2].textContent
        editForm.dataset.id = tr.dataset.id
    }
})

editForm.addEventListener('submit', event => {
    event.preventDefault()
    const name = editForm.children[0].value
    const breed = editForm.children[1].value
    const sex = editForm.children[2].value

    fetch(`http://localhost:3000/dogs/${editForm.dataset.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ name, breed, sex })
    })
        .then(response => response.json())
        .then(updatedObj => updateDog(updatedObj))

})

function updateDog(obj) {
    const updatedTr = document.querySelector(`tr[data-id='${obj.id}']`)
    updatedTr.innerHTML = `<td>${obj.name}</td> 
    <td>${obj.breed}</td> 
    <td>${obj.sex}</td> 
    <td><button>Edit Dog</button></td>`
}



renderAllDogs()

})