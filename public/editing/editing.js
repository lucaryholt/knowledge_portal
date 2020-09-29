function livePreview(){
    const input = $('#body-input');
    const preview = $('#body-tester');

    preview.html(input.val());
}

function insertAtCaret(areaId, text) {
    const txtarea = document.getElementById(areaId);

    const scrollPos = txtarea.scrollTop;
    let strPos = txtarea.selectionStart;

    const front = (txtarea.value).substring(0, strPos);
    const back = (txtarea.value).substring(strPos, txtarea.value.length);
    txtarea.value = front + text + back;
    strPos = strPos + text.length;

    txtarea.scrollTop = scrollPos;
}

function insertElement(id, element){
    let elementText = '';
    switch (element){
        case 'code-block'   :
            elementText =
                '<div class="code-block rounded">\n' +
                '\t<code class="code-block-code">\n' +
                '\t\t//code here\n' +
                '\t</code>\n' +
                '</div>';
            break;
        case 'sub-title'    :
            elementText =
                '<div class="sub-title">\n' +
                '\t//sub title here\n' +
                '</div>';
            break;
        case 'subsection'   :
            elementText =
                '<hr>\n\n' +
                '<h4>//subsection title here</h4>';
            break;
        case 'keyword'      :
            elementText =
                '<code>//keyword here</code>';
            break;
        case 'command'      :
            elementText =
                '<kbd>//command here</kbd>';
            break;
        case 'tab'          :
            elementText =
                '&nbsp;&nbsp;&nbsp;&nbsp;';
            break;
    }
    insertAtCaret(id, elementText);
    livePreview();
}

$('#front-page-link').prop('href', window.location.origin);
livePreview();