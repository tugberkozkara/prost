const form = document.querySelector('form');
const places = document.querySelector('#places');
const API_URL = "http://127.0.0.1:5000/places/";

function listAllPlaces(){
    places.innerHTML = '';

    fetch(API_URL)
        .then(resp=>resp.json())
        .then(place =>{
            place.forEach(element => {
                const col = document.createElement('div');
                col.classList.add('col');

                const div = document.createElement('div');
                div.classList.add('card');

                const name = document.createElement('p');
                name.textContent = element.name;

                const category = document.createElement('p');
                category.textContent = element.category;

                const location = document.createElement('p');
                location.textContent = element.location;

                div.appendChild(name);
                div.appendChild(category);
                div.appendChild(location);
                col.appendChild(div);
                places.appendChild(col);
            });
        })
}

listAllPlaces();


form.addEventListener('submit', (event)=>{
    event.preventDefault();

    const formData = new FormData(form);

    const name = formData.get('name');
    const category = formData.get('category');
    const location = formData.get('location');
    const price = formData.get('price');
    const menu = formData.get('menu');
    let tags = formData.get('tags');

    if(tags.length === 0){
        tags = [];
    }

    const place = {
        name,
        category,
        location,
        price,
        menu,
        tags
    }
    console.log(place);

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(place),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response=>response.json())
    .then(()=>{
        form.reset();
    })


})