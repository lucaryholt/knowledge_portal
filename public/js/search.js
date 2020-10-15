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