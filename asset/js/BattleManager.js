// 我草，咋写啊？
// 图标网站 https://fontawesome.com
// 配色选择 https://coolors.co

// 可用锑能
var CurrentMana_Battle = 0;
var OnBattle = false;

// 技能栏
var SkillContainers_0 = [];
var SkillContainers_1 = [];
var SkillContainers_2 = [];

// 开始计算回合
function StartTurn() {
    toastr.info('回合开始！');
    toastr.info('不好意思， 还没做！');
    End_Battle();
}

// 界面初始化（仅执行一次）
function Init_Battle_Panel() {
    for (var i = 1; i <= 7; i++) {
        SkillContainers_0.push(document.getElementById("personzeroskill" + i));
        SkillContainers_1.push(document.getElementById("persononeskill" + i));
        SkillContainers_2.push(document.getElementById("persontwoskill" + i));
    }

    // ☆ 目前放的技能，仅测试！
    //技能初始化 可以移植
    CreateSkill_Test();

    // 隐藏掉空白格子
    SkillContainers_0.forEach(element => {
        if (element.children.length === 0) {
            element.style.display = "none";
        }
    });
    SkillContainers_1.forEach(element => {
        if (element.children.length === 0) {
            element.style.display = "none";
        }
    });
    SkillContainers_2.forEach(element => {
        if (element.children.length === 0) {
            element.style.display = "none";
        }
    });

}

// 分配Mana
function Skill_AddSb(event) {

    // 检查是否可以升级 
    // 背景颜色、置换文本
    if (event.target !== null || event.target !== undefined) {
        if (SkillData[`${event.target.id}`] !== null) {

            // 获取已投入多少点
            var Invested = event.target.getAttribute("InvestedMana");

            // 右键，为减少一点
            if (event.button === 2) {
                if (Invested != 0) {
                    Invested--;
                    CurrentMana_Battle++;
                    UpdateCurrentMana(CurrentMana_Battle);

                }

                //检查是否到了最低启用点数
                var MinInvested = event.target.getAttribute("MinInvestedMana");
                if (MinInvested !== null) {
                    if (Invested < MinInvested) {
                        event.target.children[0].innerHTML = "能量不足，请供能。";
                        event.target.style.backgroundColor = "#ffffff";
                    }
                }

            }
            // 左键，增加一点
            else {
                // 检查sb情况
                if (CurrentMana_Battle <= 0) {
                    toastr.info('本回合锑能不足！');
                    return;
                }

                // 检查是否到了最大投入点数 
                var MaxInvested = event.target.getAttribute("MaxInvestedMana");
                if (Invested == MaxInvested) {
                    toastr.info('该技能已投入至目前最高上限');
                    return;
                }
                Invested++;
                CurrentMana_Battle--;
                UpdateCurrentMana(CurrentMana_Battle);
            }
            // 增加一点SB后，是否可升级。
            SkillData[`${event.target.id}`].forEach(element => {
                // JS的foreach无法跳出流程，看在数组不大的份上我就忍了


                // 可以升级的情况
                if (element[0] == Invested) {
                    event.target.textContent = element[1];
                    // 动态改变字体大小 
                    if (element[1].length > 6)
                        event.target.style.fontSize = '12px';
                    else
                        event.target.style.fontSize = '16px';


                    //设置textContent后，会导致tooltip被干掉，需要重新添加
                    var Tips = document.createElement("span");
                    Tips.innerHTML = element[2];
                    Tips.className = "tooltip";
                    Tips.style.fontSize = '16px';
                    // 置于顶层
                    Tips.style.zIndex = "11";
                    event.target.appendChild(Tips);


                    // 颜色设置
                    if (element[3] !== null)
                        event.target.style.backgroundColor = element[3];
                }
            });
            // 无论是否可以升级，都要改变投入点数显示
            event.target.style.backgroundRepeat = "no-repeat";
            event.target.style.backgroundPosition = "center bottom"
            event.target.style.backgroundImage = `url("/asset/game/image/${Invested}.png")`;
            // 大于9，真没素材偷了
            if (Invested >= 9)
                event.target.style.backgroundImage = `url("/asset/game/image/9.png")`;

            // 如果投入点降为0，变成白色背景
            if (Invested === 0)
                event.target.style.backgroundColor = "#ffffff";

            event.target.setAttribute("InvestedMana", Invested);
        } else {
            console.log("Skill_AddSb error 2:" + event.target.id)
        }


    } else {
        console.log("Skill_AddSb error 1")
    }


}

function CreateSkill_Test() {
    //创建技能
    var newSkill = document.createElement("div");
    newSkill.className = "skill";
    newSkill.textContent = "剑术斩击";
    newSkill.id = "skill_001";
    newSkill.style.width = "50px";
    newSkill.style.height = "50px";
    newSkill.setAttribute("draggable", "true");
    newSkill.setAttribute("InvestedMana", "0");
    newSkill.setAttribute("MaxInvestedMana", "4");
    newSkill.addEventListener('mouseup', function (event) {
        Skill_AddSb(event);
    });
    newSkill.setAttribute("InvestedMana", "0");
    newSkill.addEventListener("dragstart", drag);
    var Tips = document.createElement("span");
    Tips.innerHTML = '能量不足，请供能。'
    Tips.className = "tooltip";
    newSkill.appendChild(Tips);
    SkillContainers_1[0].appendChild(newSkill);

    //创建技能
    var newSkill2 = document.createElement("div");
    newSkill2.className = "skill";
    newSkill2.textContent = "抱头蹲防";
    newSkill2.id = "skill_002";
    newSkill2.style.width = "50px";
    newSkill2.style.height = "50px";
    newSkill2.setAttribute("draggable", "true");
    newSkill2.setAttribute("MaxInvestedMana", "3");
    newSkill2.setAttribute("InvestedMana", "0");
    newSkill2.addEventListener('mouseup', function (event) {
        Skill_AddSb(event);
    });
    newSkill2.addEventListener("dragstart", drag);
    var Tips = document.createElement("span");
    Tips.innerHTML = '能量不足，请供能。'
    Tips.className = "tooltip";
    newSkill2.appendChild(Tips);
    SkillContainers_1[1].appendChild(newSkill2);

    //创建技能
    var newSkill3 = document.createElement("div");
    newSkill3.className = "skill";
    newSkill3.textContent = "火球术";
    newSkill3.id = "skill_003";
    newSkill3.style.width = "50px";
    newSkill3.style.height = "50px";
    newSkill3.setAttribute("draggable", "true");
    newSkill3.setAttribute("InvestedMana", "0");
    newSkill3.setAttribute("MinInvestedMana", "2");
    newSkill3.setAttribute("MaxInvestedMana", "10");
    newSkill3.addEventListener("dragstart", drag);
    newSkill3.addEventListener('mouseup', function (event) {
        Skill_AddSb(event);
    });


    var Tips = document.createElement("span");
    Tips.innerHTML = '能量不足，请供能。'
    Tips.className = "tooltip";
    newSkill3.appendChild(Tips);
    SkillContainers_2[0].appendChild(newSkill3);


    //创建技能
    var newSkill4 = document.createElement("div");
    newSkill4.className = "skill";
    newSkill4.textContent = "治愈术";
    newSkill4.id = "skill_004";
    newSkill4.style.width = "50px";
    newSkill4.style.height = "50px";
    newSkill4.setAttribute("draggable", "true");
    newSkill4.setAttribute("InvestedMana", "0");
    newSkill4.setAttribute("MinInvestedMana", "2");
    newSkill4.setAttribute("MaxInvestedMana", "2");
    newSkill4.addEventListener('mouseup', function (event) {
        Skill_AddSb(event);
    });
    newSkill4.addEventListener("dragstart", drag);
    var Tips = document.createElement("span");
    Tips.innerHTML = '能量不足，请供能。'
    Tips.className = "tooltip";
    newSkill4.appendChild(Tips);
    SkillContainers_2[1].appendChild(newSkill4);

    //创建技能
    var newSkill5 = document.createElement("div");
    newSkill5.className = "skill";
    newSkill5.textContent = "圣光术";
    newSkill5.id = "skill_005";
    newSkill5.style.width = "50px";
    newSkill5.style.height = "50px";
    newSkill5.setAttribute("draggable", "true");
    newSkill5.setAttribute("InvestedMana", "0");
    newSkill5.addEventListener('mouseup', function (event) {
        Skill_AddSb(event);
    });
    newSkill5.addEventListener("dragstart", drag);
    var Tips = document.createElement("span");
    Tips.innerHTML = '2sb<br>造成攻击力150%的<span style="color:yellow;">圣属性伤害</span><br>向敌人照射一道80,000勒克斯亮度的光。'
    Tips.className = "tooltip";
    newSkill5.appendChild(Tips);
    SkillContainers_2[2].appendChild(newSkill5);

    //创建技能
    var newSkill6 = document.createElement("div");
    newSkill6.className = "skill";
    newSkill6.textContent = "火之加护";
    newSkill6.id = "skill_999";
    newSkill6.style.width = "50px";
    newSkill6.style.height = "50px";
    newSkill6.setAttribute("draggable", "true");
    newSkill6.addEventListener("dragstart", drag);
    var Tips = document.createElement("span");
    Tips.innerHTML = '<span style="color:red;">火属性</span>的学院法杖可以增加火系魔法的温度。<br><span style="color:red;">火属性</span>攻击额外增加20%伤害。'
    Tips.className = "tooltip";
    newSkill6.appendChild(Tips);
    SkillContainers_0[0].appendChild(newSkill6);
}


// 战斗初始化（战斗开始时执行）
function Init_Battle() {
    GetBattleElement = document.getElementById("battle-container");
    GetBattleElement.style.display = "block";

    CurrentMana_Battle = CurrentInitMana;
    GetCurrentManaElement = document.getElementById("CurrentMana_Battle");
    GetCurrentManaElement.innerText = "可用锑能：" + CurrentMana_Battle;


    OnBattle = true;
}


function End_Battle() {
    GetBattleElement = document.getElementById("battle-container");
    GetBattleElement.style.display = "none";

    OnBattle = false;

    StartStory(0, 2)
}

function UpdateCurrentMana(mana) {
    GetCurrentManaElement = document.getElementById("CurrentMana_Battle");
    GetCurrentManaElement.innerText = "可用锑能：" + mana;
}