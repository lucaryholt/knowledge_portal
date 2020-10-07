const mode = window.location.toString().split('/')[3].split('#')[1] ? window.location.toString().split('/')[3].split('#')[1] : 'light';

function checkForMode(){
    if (mode === 'dark') {
        toggleDark();
    } else {
        toggleLight();
    }
}

function toggleDark(){
    const button = $('#color-mode');
    button.html('<i class="fas fa-sun"></i>');
    button.attr('onclick', 'toggleLight()');
    $('#style').attr('href', 'style/style-dark.css');
    $('#code-style').attr('href', '//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.2.1/build/styles/solarized-dark.min.css');
    $('#front-page-link').prop('href', ip + '#dark');

    const links = $('.color-link');
    for(let i = 0; i < links.length; i++){
        links[i].href += '#dark';
    }
    window.location.hash = '#dark';
}

function toggleLight(){
    const button = $('#color-mode');
    button.html('<i class="fas fa-moon"></i>');
    button.attr('onclick', 'toggleDark()');
    $('#style').attr('href', 'style/style-light.css');
    $('#code-style').attr('href', '//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.2.1/build/styles/gruvbox-dark.min.css');
    $('#front-page-link').prop('href', ip);

    const links = $('.color-link');
    for(let i = 0; i < links.length; i++){
        links[i].href = links[i].href.replace('#dark', '');
    }
    window.location.hash = '';
}