var pos = require('pos');
var blacklistedNodeNames = ['SCRIPT', 'STYLE'];
var nouns = { NNP: 1, NNPS: 1 }

var tagger = new pos.Tagger();
var lexer = new pos.Lexer();

var nodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, null);
var node;

while (node = nodes.nextNode()) {
  if (!blacklistedNodeNames.includes(node.parentNode.nodeName) && node.nodeValue.trim()) {
    tagger.tag(lexer.lex(node.nodeValue)).forEach((t, i, ts) => {
      var word = t[0];
      var tag = t[1];
      if (nouns[tag] && !(ts[i + 1] && nouns[ts[i + 1][1]])) {
        node.nodeValue = node.nodeValue.replace(new RegExp('\\b' + word + '\\b'), (occurence) => {
          return occurence.replace(/(.)(.*)/, ($0, $1, $2) => $1 + $2 + ($2.slice(-1) !== 'y' ? 'y' : '') + ' Mc' + $1.toUpperCase() + $2 + 'face');
        });
      }
    });
  }
}

var boaty = document.createElement("div");
boaty.classList.add("boatymcboatfaceannoyer");
document.body.appendChild(boaty);