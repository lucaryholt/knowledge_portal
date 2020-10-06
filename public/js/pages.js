let searchTerms = null;
let currentNoteIndex = null;

const ip = window.location.origin;
const pageId = window.location.toString().split('/')[3].split('#')[0];

fetch(ip + '/api/pages/' + pageId)
    .then(response => response.json())
    .then(response => {
        $('#logo').attr('src', '..' + response.data.imageFile);
    });

fetch(ip + '/api/notes/' + pageId)
    .then(response => response.json())
    .then(response => {
        for (let i = 0; i < response.data.length; i++) {
            appendNote(response.data[i], i);
        }
        getSpecificNote(response.data[0].fileName, 0);
        checkForMode();
    });

fetch(ip + "/api/searchTerms/" + pageId)
    .then(response => response.json())
    .then(response => {
        searchTerms = response.data;
    });

function getSpecificNote(id, index){
    if(currentNoteIndex !== index){
        $('#note-' + index).toggleClass('active');
        $('#note-' + currentNoteIndex).toggleClass('active');
        currentNoteIndex = index;

        fetch(ip + "/api/notes/" + pageId + "/" + id)
            .then(response => response.json())
            .then(response => {
                $(document).prop('title', response.title + ' - Knowledge Portal');

                $("#noteTitle").text(response.title);

                $("#searchResults").html('');

                const linkList = $("#noteLinkList");
                linkList.html('');
                for(let i = 0; i < response.links.length; i++){
                    const link = response.links[i];
                    linkList.append('<li><a target="_blank" href="' + link.link + '">' + link.description + '</a></li>');
                }

                const body = $("#noteBody");
                body.html(response.body.replaceAll('&*', '&nbsp;&nbsp;&nbsp;&nbsp;'));

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

    if (term !== '') {
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
        if (pageResults.length !== 0) {
            for(let i = 0; i < pageResults.length; i++){
                $div.append('<div><span class="list-group-item list-group-item-action search-result" onclick="getSpecificNote(' + "'" + pageResults[i].page + "'" + ')">' + pageResults[i].page + '</span></div>');
            }
            searchResults.append($div);
        }
    }
}

function appendNote(note, index){
    $("#notesList").append('<div><span id="note-' + index + '" class="list-group-item list-group-item-action note-item" onclick="getSpecificNote(' + "'" + note.fileName + "'" + ', ' + index + ')">' + note.title + '</span></div>');
}