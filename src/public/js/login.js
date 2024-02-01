
const form = document.getElementById('loginForm')

form.addEventListener('submit', e=> {
    e.preventDefault()

    const data = new FormData(form)

    const obj = {}

    data.forEach((value, key) => obj[key] = value)

    const fetchParams = {
        url: '/auth',
        headers: {
            'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(obj),
    }
    
    
    fetch(fetchParams.url, {
        headers: fetchParams.headers,
        method: fetchParams.method,
        body: fetchParams.body,
        redirect: 'follow'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.url) {
            window.location.href = data.url;
        }
    })
    .catch(error => console.log(error))
})
