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

        setPageTitle(data.title);

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

function setPageTitle(title){
    if(title !== undefined){
        $(document).prop('title', title + ' - Knowledge');
    } else {
        $(document).prop('title', 'Front page - Knowledge');
    }
}

$('#front-page-link').prop('href', ip);
getNotes();
getSearchTerms();