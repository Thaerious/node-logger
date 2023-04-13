
export default function colorize(value, raw) {
    const split = [];
    const stack = ['\u001b[0m'];    
    const regex = /<\/?[a-z]*>/gi;
    
    let i = 0;
    for (const r of [...value.matchAll(regex)]) {
        split.push(value.substring(i, r.index));
        split.push(value.substring(r.index, r.index + r[0].length));
        i = r.index + r[0].length;
    }    
    split.push(value.substring(i));

    const parsed = split.map(entry => {
        switch (entry) {
            case '<reset>': return '\u001b[0m';            
            case '<black>': stack.unshift('\u001b[30m'); return '\u001b[30m';
            case '<red>': stack.unshift('\u001b[31m'); return '\u001b[31m';
            case '<green>': stack.unshift('\u001b[32m'); return '\u001b[32m';
            case '<yellow>': stack.unshift('\u001b[33m'); return '\u001b[33m';
            case '<blue>': stack.unshift('\u001b[34m'); return '\u001b[34m';
            case '<magenta>': stack.unshift('\u001b[35m'); return '\u001b[35m';
            case '<cyan>': stack.unshift('\u001b[36m'); return '\u001b[36m';
            case '<white>': stack.unshift('\u001b[37m'); return '\u001b[37m';     

            case '</black>':
            case '</red>':
            case '</green>':
            case '</yellow>':
            case '</blue>':
            case '</magenta>':
            case '</cyan>': 
            case '</white>':
            case '</>': stack.shift(); return stack[0];

            case '<i>': return '\u001b[3m';
            case '</i>': return '\u001b[23m';                   
            case '<b>': return '\u001b[1m';
            case '</b>': return '\u001b[22m';
            case '<u>': return '\u001b[4m';
            case '</u>': return '\u001b[24m';
            case '<r>': return '\u001b[4m';
            case '</r>': return '\u001b[27m';
            case '<strike>': return '\u001b[9m';
            case '</strike>': return '\u001b[29m';
            case '<blink>': return '\u001b[5m';
            case '</blink>': return '\u001b[25m';
            case '<o>': return '\u001b[53m';
            case '</o>': return '\u001b[54m';            
            default: return entry;
        }
    });

    return parsed.join("");
}