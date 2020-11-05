function toHTML(json){
    const keyToHTML = [
        {
            key: 'sub-title',
            pre: '<div class="sub-title">',
            post: '</div>'
        },
        {
            key: 'hr',
            pre: '<hr>'
        },
        {
            key: 'h4',
            pre: '<h4>',
            post: '</h4>'
        },
        {
            key: 'h5',
            pre: '<h5>',
            post: '</h5>'
        },
        {
            key: 'text-section',
            pre: '<div class="text-section">',
            post: '</div>'
        },
        {
            key: 'code-block',
            pre: '<pre><code class="code-block rounded javascript">',
            pre_0: '<pre><code class="code-block rounded ',
            pre_1: '">',
            post: '</code></pre>'
        }
    ];

    let html = "";

    if (json !== undefined) {
        json.sort((a, b) => {
            return a.order < b.order;
        }).map(item => {
            const key = keyToHTML.find(key => key.key === item.type);
            if (item.type === 'code-block') {
                html = html + key.pre_0 + item.language + key.pre_1 + item.content + key.post;
            } else if (item.type === 'hr') {
                html = html + key.pre
            } else {
                html = html + key.pre + item.content + key.post
            }
        });
    }

    return html;
}

module.exports = {
    toHTML
};