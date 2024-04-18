// adapted from mdast-util-wiki-link
import safe from 'mdast-util-to-markdown/lib/util/safe';

function toMarkdown() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var aliasDivider = opts.aliasDivider || ':';
    var unsafe = [{
        character: '[',
        inConstruct: ['phrasing', 'label', 'reference']
    }, {
        character: ']',
        inConstruct: ['label', 'reference']
    }];

    function handler(node, _, context) {
        var exit = context.enter('wikiLink');
        var nodeValue = safe(context, node.value, {
            before: '[',
            after: ']'
        });
        var nodeAlias = safe(context, node.data.alias, {
            before: '[',
            after: ']'
        });
        var value;

        let embed_sym = ''

        if(node.isType === 'transclusions') {
            embed_sym = '!'
        }

        if (nodeAlias !== nodeValue) {
            value = embed_sym + "[[".concat(nodeValue).concat(aliasDivider).concat(nodeAlias, "]]");
        } else {
            value = embed_sym + "[[".concat(nodeValue, "]]");
        }

        exit();
        return value;
    }

    return {
        unsafe: unsafe,
        handlers: {
            wikiLink: handler
        }
    };
}

export { toMarkdown };