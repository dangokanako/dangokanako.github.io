// 我草，咋写啊？

// 可用锑能
var CurrentMana_Battle = 0;

// 技能栏
var SkillContainers_0 = [];
var SkillContainers_1 = [];
var SkillContainers_2 = [];

// 开始计算回合
function StartTurn() {
}

// 界面初始化（仅执行一次）
function Init_Battle_Panel() {
    for (var i = 1; i <= 7; i++) {
        SkillContainers_0.push(document.getElementById("personzeroskill" + i));
        SkillContainers_1.push(document.getElementById("persononeskill" + i));
        SkillContainers_2.push(document.getElementById("persontwoskill" + i));
    }

    // ☆ 目前放的技能，仅测试！
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

    //技能初始化 可以移植
}

// 分配Mana
function Skill_AddSb(event) {
    // 检查是否可以升级 
    var target = event.target;

    var temp2 = target;
}

function Skill_SubtractSb() {

}

function CreateSkill_Test() {
    //创建技能
    var newSkill = document.createElement("div");
    newSkill.className = "skill";
    newSkill.textContent = "剑术斩击";
    newSkill.id = "skill-001";
    newSkill.style.width = "50px";
    newSkill.style.height = "50px";
    newSkill.setAttribute("draggable", "true");
    newSkill.setAttribute("InvestedMana", "0");
    newSkill.setAttribute("LeastMana", "0");
    newSkill.addEventListener('mousedown', function (event) {
        Skill_AddSb(event);
    });
    newSkill.addEventListener("dragstart", drag);
    var Tips = document.createElement("span");
    Tips.innerHTML = '1sb<br>造成攻击力120%的<span style="color: #888888;">无属性伤害</span><br>最基础的剑术。'
    Tips.className = "tooltip";
    newSkill.appendChild(Tips);
    SkillContainers_1[0].appendChild(newSkill);

    //创建技能
    var newSkill2 = document.createElement("div");
    newSkill2.className = "skill";
    newSkill2.textContent = "招架";
    newSkill2.id = "skill-002";
    newSkill2.style.width = "50px";
    newSkill2.style.height = "50px";
    newSkill2.setAttribute("draggable", "true");
    newSkill2.addEventListener("dragstart", drag);
    var Tips = document.createElement("span");
    Tips.innerHTML = '1sb<br>本回合额外提供5点防御力<br>用剑招架住敌人的攻势，提供些许防御。'
    Tips.className = "tooltip";
    newSkill2.appendChild(Tips);
    SkillContainers_1[1].appendChild(newSkill2);

    //创建技能
    var newSkill3 = document.createElement("div");
    newSkill3.className = "skill";
    newSkill3.textContent = "火球术";
    newSkill3.id = "skill-003";
    newSkill3.style.width = "50px";
    newSkill3.style.height = "50px";
    newSkill3.setAttribute("draggable", "true");
    newSkill3.addEventListener("dragstart", drag);
    var Tips = document.createElement("span");
    Tips.innerHTML = '2sb<br>造成攻击力150%的<span style="color:red;">火属性伤害</span><br>火系魔法第一堂课就教授的魔法。<br>向敌人丢出一团局部温度500℃的正在燃烧的物体。'
    Tips.className = "tooltip";
    newSkill3.appendChild(Tips);
    SkillContainers_2[0].appendChild(newSkill3);


    //创建技能
    var newSkill4 = document.createElement("div");
    newSkill4.className = "skill";
    newSkill4.textContent = "治愈术";
    newSkill4.id = "skill-004";
    newSkill4.style.width = "50px";
    newSkill4.style.height = "50px";
    newSkill4.setAttribute("draggable", "true");
    newSkill4.addEventListener("dragstart", drag);
    var Tips = document.createElement("span");
    Tips.innerHTML = '2sb<br>恢复攻击力150%的血量<br>用祝福的力量增加伤员凝血系统的效率。'
    Tips.className = "tooltip";
    newSkill4.appendChild(Tips);
    SkillContainers_2[1].appendChild(newSkill4);

    //创建技能
    var newSkill5 = document.createElement("div");
    newSkill5.className = "skill";
    newSkill5.textContent = "圣光术";
    newSkill5.id = "skill-005";
    newSkill5.style.width = "50px";
    newSkill5.style.height = "50px";
    newSkill5.setAttribute("draggable", "true");
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
    newSkill6.id = "skill-005";
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



}

function Battle_Test() {
    StartStory(0, 15);
    Init_Battle();
}