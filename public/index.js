const ip = window.location.origin;
let searchTerms = null;

const pageId = window.location.toString().split('/')[3];

const corIp = ip + '/api/notes/' + pageId

function getNotes() {
    $.ajax({
        method: "GET",
        url: corIp
    }).done(function (data) {
        for (let i = 0; i < data.length; i++) {
            appendNote(data[i]);
        }
        specificNote(data[0].fileName);
    });
}

function getSearchTerms(){
    $.ajax({
        method: "GET",
        url: ip + "/api/searchTerms/" + pageId
    }).done(function (data){
        console.log(data);
        searchTerms = data.data;
    });
}

function searchUpdate(){
    const term = $('#searchBox').val();
    const searchResults = $('#searchResults');
    const $div = $("<div>", {
        class: "list-group-item list-group-item-action",
        id: "searchResults"
    });

    searchResults.html('');
    $div.html('');

    if(term !== ''){
        const pageResults = searchTerms.filter(pageResult => {
            const termResults = pageResult.terms.filter(termResult => {
                if(termResult.toLowerCase().includes(term.toLowerCase())){
                    return termResult;
                }
            });
            if(termResults.length !== 0){
                return pageResult;
            }
        });
        for(let i = 0; i < pageResults.length; i++){
            $div.append('<div><span class="list-group-item list-group-item-action" onclick="specificNote(' + "'" + pageResults[i].page + "'" + ')">' + pageResults[i].page + '</span></div>');
        }
        if(pageResults.length !== 0) searchResults.append($div);
    }
}

function appendNote(note){
    $("#notesList").append('<div><span class="list-group-item list-group-item-action" onclick="specificNote(' + "'" + note.fileName + "'" + ')">' + note.title + '</span></div>');
}

function specificNote(id){
    $.ajax({
        method: "GET",
        url: ip + "/api/notes/" + pageId + "/" + id
    }).done(function (data){
        const title = $("#noteTitle");
        const linkList = $("#noteLinkList");
        const body = $("#noteBody");
        const searchBox = $("#searchResults");

        $(document).prop('title', data.title + ' - Knowledge');

        title.text(data.title);

        searchBox.html('');
        linkList.html('');
        for(let i = 0; i < data.links.length; i++){
            const link = data.links[i];
            linkList.append('<li><a target="_blank" href="' + link.link + '">' + link.description + '</a></li>');
        }

        body.html(data.body);
    });
}

$.ajax({
    method: "GET",
    url: ip + "/api/notebooks"
}).done(function (data){
    for(let i = 0; i < data.data.length; i++){
        appendPage(data.data[i]);
    }
});

function appendPage(data){
    const pageHolder = $('#pages-holder');

    pageHolder.append(
        '<a href="' + ip + data.link + '" class="link-holder">' +
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

getNotes();
getSearchTerms();