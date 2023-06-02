//剧情锁，用于是否能触发剧情
var StroyLock = false;
var chapter = 0;
var paragraph = 0;
var sentence = 0;

// 头像控制
function lefthead_control(imagepath) {
    var sourceElement = document.getElementById("character-head-left");
    if (imagepath === "" || imagepath === null || imagepath === undefined) {
        sourceElement.style.backgroundImage = '';
    } else {
        sourceElement.style.backgroundImage = `url("${imagepath}")`;
    }
}


function righthead_control(imagepath) {
    var sourceElement = document.getElementById("character-head-right");
    if (imagepath === "" || imagepath === null || imagepath === undefined) {
        sourceElement.style.backgroundImage = '';
    } else {
        sourceElement.style.backgroundImage = `url("${imagepath}")`;
    }
}


// 显示文本
function UpdateTextDisplay(options = {}) {
    // 设置默认值
    const defaults = {
        pos: 0,
        line1: '',
        line2: '',
        headleft: "default",
        headright: "default"
    };
    const settings = Object.assign({}, defaults, options);
    if (settings.headleft !== "default") {
        if (settings.headleft == '') {
            lefthead_control(null);
        } else {
            lefthead_control('/asset/game/head/' + settings.headleft);
        }
    }

    if (settings.headright !== "default") {
        if (settings.headright == '') {
            righthead_control(null);
        } else {
            righthead_control('/asset/game/head/' + settings.headright);
        }
    }

    const textDisplayElement = document.getElementById('text-display');
    if (settings.pos == 1) {
        textDisplayElement.style.textAlign = 'right';
    } else {
        textDisplayElement.style.textAlign = 'left';
    }
    textDisplayElement.innerHTML = `<p>${settings.line1}</p><p>${settings.line2}</p>`;
}



// 清空文本
function clearText() {
    UpdateTextDisplay(0, '', '');
    lefthead_control(null);
    righthead_control(null);
}

// 剧情推进
function OnClickAll() {
    if (!StroyLock) {
        if (chapter === 0 && paragraph === 0) {
            if (sentence < Chapter0Paragraph0.length) {
                UpdateTextDisplayByArray(Chapter0Paragraph0, sentence++);
            } else { StroyLock = true; clearText(); sentence = 0; }
        } else if (chapter === 0 && paragraph === 1) {
            if (sentence < Chapter0Paragraph1.length) {
                if (sentence === 8) {
                    createItem_Temp();
                }
                if (sentence === 22) {
                    Money -= 500;
                    Stat_Init();
                }
                UpdateTextDisplayByArray(Chapter0Paragraph1, sentence++);
            } else { StroyLock = true; clearText(); sentence = 0; }
        }

    }
}

// 根据参数显示剧情
function UpdateTextDisplayByArray(array, sentence) {
    if (array[sentence].length === 5)
        UpdateTextDisplay({ pos: array[sentence][0], line1: array[sentence][1], line2: array[sentence][2], headleft: array[sentence][3], headright: array[sentence][4] });
    if (array[sentence].length === 3)
        UpdateTextDisplay({ pos: array[sentence][0], line1: array[sentence][1], line2: array[sentence][2] });
}