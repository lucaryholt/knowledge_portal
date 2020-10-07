const ip = window.location.origin;

fetch(ip + '/api/notebooks')
    .then(response => response.json())
    .then(response => {
        for(let i = 0; i < response.data.length; i++){
            appendPage(response.data[i]);
        }
        checkForMode();
    });

function appendPage(data){
    const pageHolder = $('#pages-holder');

    pageHolder.append(
        '<a href="' + ip + data.link + '" class="link-holder color-link"' +
            '<div class="page-holder">' +
                '<div class="card page-card">' +
                    '<div class="card-body page-card-body">' +
                        '<img class="page-image" src="' + data.imageFile + '" alt="' + data.title + '">' +
                        '<h3 class="title">' + data.name + '</h3>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</a>');
}

$('#editor-page-link').attr('href', ip + '/editing');