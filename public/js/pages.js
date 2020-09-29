const ip = window.location.origin;
let searchTerms = null;
let currentNoteIndex = null;

const pageId = window.location.toString().split('/')[3];

const corIp = ip + '/api/notes/' + pageId;

function getPageData(){
    $.ajax({
        method: "GET",
        url: ip + "/api/pages/" + pageId
    }).done(function (data) {
        $('#logo').attr('src', '..' + data.data.imageFile);
    });
}

function getNotes() {
    $.ajax({
        method: "GET",
        url: corIp
    }).done(function (data) {
        for (let i = 0; i < data.length; i++) {
            appendNote(data[i], i);
        }
        specificNote(data[0].fileName, 0);
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

function appendNote(note, index){
    $("#notesList").append('<div><span id="note-' + index + '" class="list-group-item list-group-item-action" onclick="specificNote(' + "'" + note.fileName + "'" + ', ' + index + ')">' + note.title + '</span></div>');
}

function specificNote(id, index){
    $.ajax({
        method: "GET",
        url: ip + "/api/notes/" + pageId + "/" + id
    }).done(function (data){
        const title = $("#noteTitle");
        const linkList = $("#noteLinkList");
        const body = $("#noteBody");
        const searchBox = $("#searchResults");

        setPageTitle(data.title);

        if(currentNoteIndex !== index){
            $('#note-' + index).toggleClass('active');
            $('#note-' + currentNoteIndex).toggleClass('active');
            currentNoteIndex = index;
        }

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
getPageData();
getNotes();
getSearchTerms();