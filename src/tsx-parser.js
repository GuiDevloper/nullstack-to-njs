function isSyntax(line, separator) {
  return line.match(
    new RegExp(`^(?![\n*]|import|const|let|class)[a-zA-Z]*( |)*${separator.trim()}`)
  );
}

function removeComments(text) {
  const commentsRegex = new RegExp(
    /\/\*\**([\r\n|\r|\n]|[^\r\n|\r|\n])([^\*]|(\*(?!\/)))*\*\//g
  );
  text = text.replace(commentsRegex, '');
  // no more removes one-line comment
  return text;//.replace(/\/\/.*/, '');
}

function removeSyntax(line, typeName) {
  line = line.replace(new RegExp(`: ${typeName}\\) {`, 'g'), ') {');
  let bracketCount = 0;
  // if there's no brackets
  const allLines = line.split('\n');
  if (allLines[0].indexOf('{') === -1) {
    return allLines.slice(1).join('\n');
  }

  line = line.substring(line.indexOf('{')).split('\n');
  let newLine = '';
  for (let i = 0; i < line.length; i++) {
    const bracketStart = line[i].indexOf('{');
    const bracketEnd = line[i].indexOf('}');
    bracketCount += +!!(bracketStart > -1);
    bracketCount -= +!!(bracketEnd > -1);
    if (bracketEnd > -1 && bracketCount === 0) {
      newLine = line.slice(i + 1);
      break;
    }
  }
  return newLine.join('\n');
}

function searchSyntax(text, type) {
  const syntaxTypes = {
    type: '=',
    interface: ' '
  };

  return text.split(new RegExp(`(\n*|)${type} `)).map(line => {
    if (isSyntax(line, syntaxTypes[type])) {
      typeName = line.split(syntaxTypes[type])[0].trim();
      return removeSyntax(line, typeName);
    }
    return line;
  }).join('\n');
}

function parseFile(text) {
  text = removeComments(text);
  text = text.replace(/: Context.*\) \{/g, ') {');
  // remove props typing from constructor
  text = text.replace(/constructor\(.*\) \{/, match => {
    const matches = match.split(/\:.*/);
    return matches[0] + (matches.length > 1 ? ') {' : '');
  });
  // remove primitive types
  text = text.replace(/:( |)(Array<|)(string|number|object|boolean)(\[\]|)(>|)/g, '');
  text = searchSyntax(text, 'type');
  text = searchSyntax(text, 'interface');
  // remove excessive spaces
  return text.replace(/^\n+/gm, '\n');
}

module.exports = parseFile;