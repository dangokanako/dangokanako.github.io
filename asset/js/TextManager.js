// TODO 把章节名也做成动态的 

//剧情锁，用于是否能触发剧情 true是正在剧情，false是没剧情
// TODO 准备弃用StroyLock
var StroyLock = true;
var chapter = 0;
var paragraph = 0;
var sentence = 0;
var AfterBattle = {
    func: null,
};
// 头像控制
function lefthead_control(imagepath) {
    var sourceElement = document.getElementById("character-head-left");
    if (imagepath === "" || imagepath === null || imagepath === undefined) {
        if (sourceElement.style.backgroundImage != `url("${imagepath}")`) {
            $("#character-head-left").fadeOut(150);
            sourceElement.style.backgroundImage = '';
            $("#character-head-left").fadeIn(150);
        } else {
            sourceElement.style.backgroundImage = '';
        }
    } else {
        if (sourceElement.style.backgroundImage != `url("${imagepath}")`) {
            $("#character-head-left").fadeOut(150);
            sourceElement.style.backgroundImage = `url("${imagepath}")`;
            $("#character-head-left").fadeIn(150);
        } else {
            sourceElement.style.backgroundImage = `url("${imagepath}")`;
        }
    }
}


function righthead_control(imagepath) {
    var sourceElement = document.getElementById("character-head-right");
    if (imagepath === "" || imagepath === null || imagepath === undefined) {
        if (sourceElement.style.backgroundImage != `url("${imagepath}")`) {
            $("#character-head-right").fadeOut(150);
            sourceElement.style.backgroundImage = '';
            $("#character-head-right").fadeIn(150);
        } else {
            sourceElement.style.backgroundImage = '';
        }
    } else {
        if (sourceElement.style.backgroundImage != `url("${imagepath}")`) {
            $("#character-head-right").fadeOut(150);
            sourceElement.style.backgroundImage = `url("${imagepath}")`;
            $("#character-head-right").fadeIn(150);
        } else {
            sourceElement.style.backgroundImage = `url("${imagepath}")`;
        }
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
    if (StroyLock) {
        if (Chapter00Story[`C${chapter}P${paragraph}`] !== null) {
            var temp = Chapter00Story[`C${chapter}P${paragraph}`];
            if (sentence < Chapter00Story[`C${chapter}P${paragraph}`].length) {
                UpdateTextDisplayByArray(Chapter00Story[`C${chapter}P${paragraph}`], sentence++);
            } else { StroyLock = false; ForceInput(false); clearText(); paragraph = -1; sentence = 0; }
        } else {
            alert(`获取章节文本失败，究竟是为什么呢？C${chapter}P${paragraph}`);
            console.error(`获取章节文本失败，究竟是为什么呢？C${chapter}P${paragraph}`);
        }
    }

}


// 根据参数显示剧情
function UpdateTextDisplayByArray(array, sentence) {
    // 如果对象里是函数，那么执行这个函数
    if (typeof array[sentence] === 'function') {
        array[sentence]();
        return;
    }

    if (array[sentence].length === 5)
        UpdateTextDisplay({ pos: array[sentence][0], line1: array[sentence][1], line2: array[sentence][2], headleft: array[sentence][3], headright: array[sentence][4] });
    if (array[sentence].length === 3)
        UpdateTextDisplay({ pos: array[sentence][0], line1: array[sentence][1], line2: array[sentence][2] });
    //容错
    if (array[sentence].length === 4)
        UpdateTextDisplay({ pos: array[sentence][0], line1: array[sentence][1], line2: array[sentence][2], headleft: array[sentence][3] });

}

// 开始剧情
function StartStory(chapter_in, paragraph_in) {
    ForceInput(true);
    StroyLock = true;
    chapter = chapter_in;
    paragraph = paragraph_in;
}