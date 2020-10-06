let searchTerms = null;
let currentNoteIndex = null;

const ip = window.location.origin;
const pageId = window.location.toString().split('/')[3];

ajaxRequest("GET", ip + "/api/pages/" + pageId, (data) => {
    $('#logo').attr('src', '..' + data.data.imageFile);
});

ajaxRequest("GET", ip + '/api/notes/' + pageId, (data) => {
    for (let i = 0; i < data.data.length; i++) {
        appendNote(data.data[i], i);
    }
    getSpecificNote(data.data[0].fileName, 0);
});

ajaxRequest("GET", ip + "/api/searchTerms/" + pageId, (data) => {
    searchTerms = data.data;
});

$('#front-page-link').prop('href', ip);

function ajaxRequest(method, url, callback){
    $.ajax({
        method,
        url
    }).done(function (data) {
        callback(data);
    });
}

function getSpecificNote(id, index){
    if(currentNoteIndex !== index){
        $('#note-' + index).toggleClass('active');
        $('#note-' + currentNoteIndex).toggleClass('active');
        currentNoteIndex = index;

        ajaxRequest("GET", ip + "/api/notes/" + pageId + "/" + id, (data) => {
            $(document).prop('title', data.title + ' - Knowledge Portal');

            $("#noteTitle").text(data.title);

            $("#searchResults").html('');

            const linkList = $("#noteLinkList");
            linkList.html('');
            for(let i = 0; i < data.links.length; i++){
                const link = data.links[i];
                linkList.append('<li><a target="_blank" href="' + link.link + '">' + link.description + '</a></li>');
            }

            const body = $("#noteBody");
            body.html(data.body.replaceAll('&*', '&nbsp;&nbsp;&nbsp;&nbsp;'));

            const codeblocks = $('.code-block');
            for(let i = 0; i < codeblocks.length; i++){
                hljs.highlightBlock(codeblocks[i]);
            }
        });
    }
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
            const termResults = pageResult.terms.find(termResult => {
                if(termResult.toLowerCase().includes(term.toLowerCase())){
                    return termResult;
                }
            });
            if(termResults !== undefined){
                return pageResult;
            }
        });
        if(pageResults.length !== 0){
            for(let i = 0; i < pageResults.length; i++){
                $div.append('<div><span class="list-group-item list-group-item-action" onclick="getSpecificNote(' + "'" + pageResults[i].page + "'" + ')">' + pageResults[i].page + '</span></div>');
            }
            searchResults.append($div);
        }
    }
}

function appendNote(note, index){
    $("#notesList").append('<div><span id="note-' + index + '" class="list-group-item list-group-item-action" onclick="getSpecificNote(' + "'" + note.fileName + "'" + ', ' + index + ')">' + note.title + '</span></div>');
}