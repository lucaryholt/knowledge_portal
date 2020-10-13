let currentNoteIndex = null;
let notes = null;

// To enable dynamic IP's we extract the IP from the browser
const ip = window.location.origin;
const pageId = window.location.toString().split('/')[3].split('#')[0];

fetch(ip + '/api/pages/' + pageId)
    .then(response => response.json())
    .then(response => {
        $('#logo').attr('src', '..' + response.data.imageFile);
        $('#site-title').text(response.data.name);
    });

fetch(ip + '/api/notes/' + pageId)
    .then(response => response.json())
    .then(response => {
        notes = response.data;
        for (let i = 0; i < notes.length; i++) {
            appendNote(notes[i], i);
        }
        updateSpecificNote(0);
        checkForMode();
    });

function updateSpecificNote(index){
    if(index === -1 || currentNoteIndex !== index){
        $('#note-' + index).toggleClass('active');
        $('#note-' + currentNoteIndex).toggleClass('active');
        currentNoteIndex = index;
        const note = notes[index];

        $(document).prop('title', note.title + ' - Knowledge Portal');

        $("#noteTitle").text(note.title);

        $("#searchResults").html('');

        const linkList = $("#noteLinkList");
        linkList.html('');
        for(let i = 0; i < note.links.length; i++){
            const link = note.links[i];
            linkList.append('<li><a target="_blank" href="' + link.link + '">' + link.description + '</a></li>');
        }

        fetch(ip + "/api/notes/" + pageId + "/" + note.fileName)
            .then(response => response.text())
            .then(response => {

                $("#noteBody").html(response);

                const codeblocks = $('.code-block');
                for(let i = 0; i < codeblocks.length; i++){
                    hljs.highlightBlock(codeblocks[i]);
                }

                const titles = $('h4');
                const contentList = $('#content-list');
                contentList.html('');
                for(let i = 0; i < titles.length; i++){
                    const title = titles[i].textContent;
                    titles[i].id = title;
                    contentList.append('<a class="content-list-item" onclick="scrollToElement(' + "'" + title + "'" + ')">' + title + '</a> <br>');
                }
            });
    }
}

function getSpecificNote(fileName){
    for(let i = 0; i < notes.length; i++){
        if (notes[i].fileName === fileName) {
            updateSpecificNote(i);
        }
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
        const pageResults = notes.filter(pageResult => {
            const termResults = pageResult.searchTerms.find(termResult => {
                if (termResult.toLowerCase().includes(term.toLowerCase())) {
                    return termResult;
                }
            });
            if(termResults !== undefined){
                return pageResult;
            }
        });
        if (pageResults.length !== 0) {
            for(let i = 0; i < pageResults.length; i++){
                $div.append('<div><span class="list-group-item list-group-item-action search-result" onclick="getSpecificNote(' + "'" + pageResults[i].fileName + "'" + ')">' + pageResults[i].title + '</span></div>');
            }
            searchResults.append($div);
        }
    }
}

function clearSearchResults(){
    setTimeout(() => {
        $('#searchResults').html('');
    }, 100);
}

function appendNote(note, index){
    $("#notesList").append('<div><span id="note-' + index + '" class="list-group-item list-group-item-action note-item" onclick="getSpecificNote(' + "'" + note.fileName + "'" + ')">' + note.title + '</span></div>');
}

function scrollToElement(id){
    document.getElementById(id).scrollIntoView({ block: "center" });
}

function scrollToTop(){
    window.scrollTo(0, 0);
}

function toggleContentListCollapse(option){
    const toggle = $('#content-collapse-toggle');
    const list = $('#content-list');

    if(option === 'collapse'){
        toggle.html('<i class="fas fa-chevron-down"></i>');
        toggle.attr('onclick', 'toggleContentListCollapse("uncollapse")');
        list.hide();
    } else {
        toggle.html('<i class="fas fa-chevron-up"></i>');
        toggle.attr('onclick', 'toggleContentListCollapse("collapse")');
        list.show();
    }
}