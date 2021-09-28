const formElement = document.getElementById("contact-form");

export function onSubmit(e) {
    if (e.preventDefault) e.preventDefault();

    const formData = new FormData(formElement);

    const response = fetch('https://developerdesmond.tech/api/', {
        method: 'POST',
        body: JSON.stringify({
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = response.then((res) => {
        console.log(res);
    });
}