//runcode.js
var buttonisclick = false;
var supesu = false;
var variables = {"ramdom": Math.round(Math.random() * 100), "pressspace": supesu, "buttonname": "button1", "buttonisclick": buttonisclick};

function evalLog(code) {
    variables["ramdom"] = Math.round(Math.random() * 100);
    code = code.replace(/\|(\w+)/g, (_, varName) => {
        return variables[varName] !== undefined ? variables[varName] : varName;
    });
    return eval('`' + code + '`').replace("+", "");
}

async function reset() {
    buttonisclick = false;
    variables = {"ramdom": Math.round(Math.random() * 100), "pressspace": supesu, "buttonname": "button1", "buttonisclick": buttonisclick};
}

addEventListener("keydown", (event) => {
    variables["buttonisclick"] = buttonisclick;

    if (event.code == "Space") {
        supesu = true;
    }

    variables["pressspace"] = supesu;
    return false;
});

addEventListener("keyup", (event) => {
    if (event.code == "Space") {
        supesu = false;
    }

    variables["pressspace"] = supesu;
    return false;
});

async function setVariable(code, i) {
    variables["butt"] = supesu;
    variables["ramdom"] = Math.round(Math.random() * 100);
    variables["pressspace"] = supesu;
    const match = code.match(/\s*(\w+)\s*=\s*(\S+)\s*/);
    variables["buttonisclick"] = buttonisclick;

    if (match) {
        [, varName, value] = match;
        value = value.replace(/\|(\w+)/g, (_, varName) => {
            return variables[varName] !== undefined ? variables[varName] : varName;
        });
        if (value == "input") {
            variables[varName] = code.replace("input", window.prompt("文字を入力してください").toLowerCase()).replace("++", Math.floor(variables[varName]) + 1).replace("--", Math.floor(variables[varName]) - 1);
        } else {
            variables[varName] = value.replace("++", Math.floor(variables[varName]) + 1).replace("--", Math.floor(variables[varName]) - 1);
        }
    }

    if (varName == "buttonname") {
        if (variables["buttonname"].indexOf("</") != -1 && variables["buttonname"].indexOf(">") != -1) {
            log(`エラー:ボタンの名前にhtmlコードは埋め込めません\n${value}は存在しません\n code.ritutoscript:${i}:${code.indexOf(variables["buttonname"])}\nボタンの名前変え処理に失敗しました`);
        } else {
            document.getElementById('button1').innerHTML = variables["buttonname"];
        }
    }
}

async function log(message) {
    variables["buttonisclick"] = buttonisclick;
    variables["pressspace"] = supesu;

    document.getElementById('log').value = message + '\n' + document.getElementById('log').value;
}

/** @param {String} condition  */
async function evalCondition(condition, i) {
    variables["buttonisclick"] = buttonisclick;
    variables["pressspace"] = supesu;
    variables["ramdom"] = Math.round(Math.random() * 100);

    if (condition.split(" ")[1] != "=" && condition.split(" ")[1] != "!") {
        log(`エラー:式が不明です\n${condition.split(" ")[1]}は存在しません\n code.ritutoscript:${i}:${condition.indexOf(condition.split(" ")[1])}\n状況ifの処理に失敗しました`);
    }

    if (condition.split(" ")[3] != "{") {
        log(`エラー:{がありません\n{の場所を${condition.split(" ")[3] ?? "空白"}にすることはできません code.ritutoscript:${i}:${condition.indexOf(condition.split(" ")[1])}\n状況ifの処理に失敗しました`);
    }

    const m1 = condition.split(" ")[0].replace(/\|(\w+)/g, (_, varName) => {
        return variables[varName] !== undefined ? variables[varName] : varName;
    });
    const m2 = condition.split(" ")[2].replace(/\|(\w+)/g, (_, varName) => {
        return variables[varName] !== undefined ? variables[varName] : varName;
    });

    if (condition.split(" ")[1] == "=") {
        return m1 != m2;
    } else if (condition.split(" ")[1] == "!") {
        return m1 == m2;
    }
}

async function buttonclick() {
    buttonisclick = true;
    await sleep(20);
    buttonisclick = false;
}

async function sleep(msec) {
    return new Promise(function (resolve) {

        setTimeout(function () { resolve() }, msec);

    })
}
