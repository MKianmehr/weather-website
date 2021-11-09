const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const final = document.getElementById('weather')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    final.innerHTML = 'Loading ...'
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        response.json().then(data=>{
            if(data.error) {
                final.innerHTML = error
            }else {
                console.log(data)
                final.innerHTML = data.forecast + ' In ' + data.location
            }
        })
    })
})