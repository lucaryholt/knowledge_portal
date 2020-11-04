const ip = window.location.origin;

checkForMode();

function submitPage(){
    const name = document.getElementById('page-name-input').value;
    const link = document.getElementById('page-link-input').value;
    const image = document.getElementById('page-image-input').value;

    if (name === '' || link === '' || image === '') {
        alert('You need to fill in all fields.');
    } else {
        fetch('/api/pages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                link,
                imageFile: image,
                enabled: true
            })
        })
            .then(response => response.json())
            .then(result => {
                if (result.insertedCount === 1) {
                    alert('Page created!');
                    window.location.href = '/';
                }
            });
    }
}
