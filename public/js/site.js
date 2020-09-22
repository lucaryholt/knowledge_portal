const ip = 'localhost:8080';
let searchTerms = null;

function getWisdoms() {
    $.ajax({
        method: "GET",
        url: "http://" + ip + "/api/wisdoms"
    }).done(function (data) {
        for (let i = 0; i < data.length; i++) {
            appendWisdom(data[i]);
        }
        specificWisdom(data[0].title);
    });
}

function getSearchTerms(){
    $.ajax({
        method: "GET",
        url: "http://" + ip + "/api/searchTerms"
    }).done(function (data){
        searchTerms = data.data;
    });
}

function searchUpdate(){
    const term = $('#searchBox').val();
    const searchResults = $('#searchResults');
    searchResults.html('');
    let foundPages = [];
    if(term !== ''){
        for(let i = 0; i < searchTerms.length; i++){
            if(searchTerms[i].term.toLowerCase().includes(term.toLowerCase()) && foundPages.indexOf(searchTerms[i].page) === -1){
                searchResults.append('<div><span class="list-group-item list-group-item-action" onclick="specificWisdom(' + "'" + searchTerms[i].page + "'" + ')">' + searchTerms[i].page + '</span></div>');
                foundPages.push(searchTerms[i].page);
            }
        }
    }
}

function appendWisdom(wisdom){
    $("#wisdomsList").append('<div><span class="list-group-item list-group-item-action" onclick="specificWisdom(' + "'" + wisdom.title + "'" + ')">' + wisdom.title + '</span></div>');
}

function specificWisdom(id){
    $.ajax({
        method: "GET",
        url: "http://" + ip + "/api/wisdoms/" + id
    }).done(function (data){
        const title = $("#wisdomTitle");
        const linkList = $("#wisdomLinkList");
        const body = $("#wisdomBody");

        $(document).prop('title', 'Node.JS Wisdom - ' + data.title);

        title.text(data.title);

        linkList.html('');
        for(let i = 0; i < data.links.length; i++){
            const link = data.links[i];
            linkList.append('<li><a target="_blank" href="' + link.link + '">' + link.description + '</a></li>');
        }

        body.html(data.body);
    });
}