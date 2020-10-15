const ip = window.location.origin;

fetch(ip + '/api/pages')
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
        '<a href="' + ip + data.link + '" class="link-holder color-link color-change"' +
            '<div class="page-holder">' +
                '<div class="card page-card">' +
                    '<div class="card-body page-card-body color-change">' +
                        '<img class="page-image" src="' + data.imageFile + '" alt="' + data.title + '">' +
                        '<h3 class="page-title">' + data.name + '</h3>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</a>');
}