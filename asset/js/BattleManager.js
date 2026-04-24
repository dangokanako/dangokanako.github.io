// 我草，咋写啊？
// 图标网站 https://fontawesome.com
// 配色选择 https://coolors.co

// 可用锑能
var CurrentMana_Battle = 0;
var OnBattle = false;
var OnTurn = false;
// 技能栏
var SkillContainers_0 = [];
var SkillContainers_1 = [];
var SkillContainers_2 = [];
var Enemy_SkillContainers = [];
// 敌人技能和敌人掉落
var enemySkillData = [];
var EnemyDrop = [];




// 战斗初始化（战斗开始时执行）
// param1 敌人数据，为一个对象。
// param2 敌人技能列表，为一个数组。
function Init_Battle(enemy) {
    // 在战斗标志
    OnBattle = true;

    // 显示对应敌人图片
    if (enemy.pic == "" || enemy.pic == null) {
        console.error("获取敌人图片失败");
        return;
    }
    EnemyDrop = enemy.Drop;
    enemySkillData = enemy.Skill;
    let enemypic = document.getElementById("enemy-container");
    enemypic.style.backgroundRepeat = "no-repeat";
    enemypic.style.backgroundPosition = "center center";
    enemypic.style.backgroundImage = "url(/asset/game/image/enemies/" + enemy.pic + ")";

    // 显示、更新敌人状态数值
    Enemy_Stat_Atk = enemy.atk;
    Enemy_Stat_Def = enemy.def;
    Enemy_Stat_Maxhp = enemy.hp;
    Enemy_Stat_Hp = enemy.hp;
    UpdateEnemySata(Enemy_Stat_Atk, Enemy_Stat_Def, Enemy_Stat_Maxhp, Enemy_Stat_Hp);

    // 读取敌人技能框，开始创建敌人技能
    Enemy_SkillContainers.forEach(element => {
        element.innerHTML = '';
    });
    CreateEnemySkill(enemySkillData);

    // 隐藏掉空白格子
    SkillContainers_0.forEach(element => {
        if (element.children.length === 0) {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    });
    SkillContainers_1.forEach(element => {
        if (element.children.length === 0) {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    });
    SkillContainers_2.forEach(element => {
        if (element.children.length === 0) {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    });
    Enemy_SkillContainers.forEach(element => {
        if (element.children.length === 0) {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    });

    // 计算锑能
    CurrentMana_Battle = CurrentInitMana;
    GetCurrentManaElement = document.getElementById("CurrentMana_Battle");
    GetCurrentManaElement.innerText = "可用锑能：" + CurrentMana_Battle;

    //显示战斗框
    $("#battle-container").fadeIn(350);

}


// 结束战斗
function End_Battle() {
    OnBattle = false;
    OnTrun = false;

    // 根据敌人，开始计算掉落
    if (EnemyDrop) {
        CreateShop(2, EnemyDrop);
    }

    // 隐藏战斗框
    $("#battle-container").fadeOut(350);

    // 战斗结束事件
    if (AfterBattle.func != null) {
        AfterBattle.func();
        AfterBattle.func = null;
    }
}


// 禁止输入，在地图/战斗面板上贴上一层透明的区域，禁止点击
function ForceInput(ifforce) {
    let element = document.getElementById("force-input");
    if (ifforce == true)
        element.style.display = "block";
    else
        element.style.display = "none";

}

// 开始计算回合
async function StartTurn() {
    ForceInput(true);
    // if (OnTurn == true) {
    //     return;
    // }
    //回合结算中标志
    //OnTurn = true;

    // 回合开始重新计算状态
    Stat_Init()

    // 结算我方BUFF
    if (OnBattle)
        CalculateBuff();
    // 结算我方伤害
    if (OnBattle)
        await CalculateDamage();
    //toastr.info('结算BUFF！');


    // 结算敌人伤害
    //toastr.info('敌人的回合！');
    if (OnBattle)
        await CalculateEneryDamage();
    await sleep(700);



    // 更新可用值
    CurrentMana_Battle += CurrentAddMana;
    GetCurrentManaElement = document.getElementById("CurrentMana_Battle");
    GetCurrentManaElement.innerText = "可用锑能：" + CurrentMana_Battle;



    //TODO 我觉得这个方法不可靠
    // 读取敌人技能框，重新创建敌人技能
    Enemy_SkillContainers.forEach(element => {
        $(`#${element.id}`).slideUp(500);
        element.innerHTML = '';
    });
    CreateEnemySkill(enemySkillData);
    // 再显示出来
    Enemy_SkillContainers.forEach(element => {
        if (element.children.length !== 0) {
            $(`#${element.id}`).slideDown(500);
        }
    });

    // 读取自己技能框，重新创建技能，再显示出来
    SkillContainers_0.forEach(element => {
        $(`#${element.id}`).slideUp(500);
        element.innerHTML = '';
    });
    SkillContainers_1.forEach(element => {
        $(`#${element.id}`).slideUp(500);
        element.innerHTML = '';
    });
    SkillContainers_2.forEach(element => {
        $(`#${element.id}`).slideUp(500);
        element.innerHTML = '';
    });
    CreateSkill_Test();
    SkillContainers_0.forEach(element => {
        if (element.innerHTML != '')
            $(`#${element.id}`).slideDown(500);
    });
    SkillContainers_1.forEach(element => {
        if (element.innerHTML != '')
            $(`#${element.id}`).slideDown(500);
    });
    SkillContainers_2.forEach(element => {
        if (element.innerHTML != '')
            $(`#${element.id}`).slideDown(500);
    });
    ForceInput(false);

    //OnTurn = false;
}

// 好累，我突然想写死。
function CalculateBuff() {
    for (let element of SkillContainers_1) {
        if (element.firstElementChild) {
            if (element.firstElementChild.getAttribute("damagetype") == "buff") {
                CurrentDEF += Number(element.firstElementChild.getAttribute("adddef"));
            }
        }
    }
    for (let element of SkillContainers_2) {
        if (element.firstElementChild) {
            if (element.firstElementChild.getAttribute("damagetype") == "buff") {
                CurrentDEF += Number(element.firstElementChild.getAttribute("adddef"));
            }
        }
    }

    UpdateStats(CurrentMaxHp,
        CurrentHp,
        CurrentATK,
        CurrentDEF,
        CurrentInitMana,
        CurrentAddMana,
        CurrentMaxMana,
        CurrentCritRate,
        Money);
}

// 计算我方伤害
async function CalculateDamage() {
    for (let element of SkillContainers_1) {
        if (element.firstElementChild) {
            if (element.firstElementChild.getAttribute("damagetype") && element.firstElementChild.getAttribute("damagepower")) {

                //TODO 好写！大脑严重缺氧写出来的吧？
                if (element.firstElementChild.getAttribute("damagenumber")) {
                    DamageToEnemy(element.firstElementChild.getAttribute("damagetype"), element.firstElementChild.getAttribute("damagepower"), element.firstElementChild.innerHTML);
                }
                // 伤害计算 
                DamageToEnemy(element.firstElementChild.getAttribute("damagetype"), element.firstElementChild.getAttribute("damagepower"), element.firstElementChild.innerHTML);
                await sleep(300);

            }
        }
    }

    for (let element of SkillContainers_2) {
        if (element.firstElementChild) {
            if (element.firstElementChild.getAttribute("damagetype") && element.firstElementChild.getAttribute("damagepower")) {
                // 伤害计算 
                DamageToEnemy(element.firstElementChild.getAttribute("damagetype"), element.firstElementChild.getAttribute("damagepower"), element.firstElementChild.innerHTML);
                await sleep(300);
            }
        }
    }
}


// 结算敌人技能 
async function CalculateEneryDamage() {
    for (const element of Enemy_SkillContainers) {
        // 如果不是空
        if (element.style.display != "none") {

            let type = element.firstElementChild.getAttribute("damagetype");

            // //部分技能不结算
            if (type == "passive")
                continue;

            // // 伤害计算 
            // let damage = ;
            // damage *= Enemy_Stat_Atk;
            // damage /= 100;
            // damage -= CurrentDEF;

            // if (damage < 0)
            //     damage = 0;

            $(`#${element.id}`).animate({
                backgroundColor: "#ff3f4a" // 目标颜色值
            }, 700); // 动画持续时间（毫秒）
            DamageToPlayer(element.firstElementChild.getAttribute("damagetype"), element.firstElementChild.getAttribute("damagepower"), element.firstElementChild.innerHTML);

            await sleep(700);

            $(`#${element.id}`).animate({
                backgroundColor: "#ffffff" // 目标颜色值
            }, 700);
            // $(`#${element.id}`).slideUp(500);
            // $(`#${element.id}`).slideDown(500);
        }
    }
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// param1 伤害种类
// param2 伤害
// param3 技能名
function DamageToPlayer(type, damage, name) {
    let toastrBottomRight = toastr;
    toastrBottomRight.options.timeOut = 500;
    toastrBottomRight.options.positionClass = "toast-top-center";

    damage *= Enemy_Stat_Atk;
    damage /= 100;

    switch (type) {
        case "none": type = "无属性"; break;
        case "fire": type = "火属性"; break;
        case "holy": type = "圣属性"; break;
    }

    // 减去防御
    damage -= CurrentDEF;
    if ((damage - CurrentDEF) < damage * 0.05) {
        damage = damage * 0.05;
    }

    toastrBottomRight.error('敌人使用' + name + '，造成了' + damage + '点' + type + '伤害');
    ChangeHp(-damage);
}

async function DamageToEnemy(type, damage, name) {
    let toastrBottomRight = toastr;
    toastrBottomRight.options.timeOut = 500;
    toastrBottomRight.options.positionClass = "toast-top-center";

    damage *= CurrentATK;
    damage /= 100;

    // 暴击，先计算攻击再计算防御
    if (CurrentCritRate >= getRandomInt(1, 100)) {
        toastrBottomRight.success("会心一击！")
        damage *= 2;
    }

    // 减去敌人防御
    damage -= Enemy_Stat_Def;
    if ((damage - Enemy_Stat_Def) < damage * 0.05) {
        damage = damage * 0.05;
    }

    switch (type) {
        case "heal": {
            // 我能怎么办，我也很绝望啊
            ChangeHp(damage);
            toastrBottomRight.success('我方使用' + name + '，回复量为' + damage + '点HP');
            return;
            break;
        }
        case "none": type = "无属性"; break;
        case "fire": type = "火属性"; break;
        case "holy": type = "圣属性"; break;
    }

    toastrBottomRight.success('我方使用' + name + '，造成了' + damage + '点' + type + '伤害');
    if (ChangeEnemyHp(-damage) == true) {
        await sleep(5000);
        End_Battle();
    }
}

// 界面初始化（仅执行一次）
function Init_Battle_Panel() {
    for (var i = 1; i <= 7; i++) {
        SkillContainers_0.push(document.getElementById("personzeroskill" + i));
        SkillContainers_1.push(document.getElementById("persononeskill" + i));
        SkillContainers_2.push(document.getElementById("persontwoskill" + i));
    }
    for (var i = 1; i <= 10; i++) {
        Enemy_SkillContainers.push(document.getElementById("enemyskill" + i));
    }

    // ☆ 目前放的技能，仅测试！以后还要移植的
    //技能初始化 可以移植
    CreateSkill_Test();

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
                // 最好使用for...of

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
                    if (element[3])
                        event.target.style.backgroundColor = element[3];

                    // 设置威力、属性等战斗属性
                    for (var key in element[4]) {
                        if (element[4].hasOwnProperty(key)) {
                            event.target.setAttribute(key, element[4][key]);
                        }
                    }

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
    newSkill5.setAttribute("draggable", "true");
    newSkill5.setAttribute("InvestedMana", "0");
    newSkill5.setAttribute("MinInvestedMana", "2");
    newSkill5.setAttribute("MaxInvestedMana", "2");
    newSkill5.addEventListener('mouseup', function (event) {
        Skill_AddSb(event);
    });
    newSkill5.addEventListener("dragstart", drag);
    var Tips = document.createElement("span");
    Tips.innerHTML = '能量不足，请供能。'
    Tips.className = "tooltip";
    newSkill5.appendChild(Tips);
    SkillContainers_2[2].appendChild(newSkill5);

    //创建技能
    var newSkill6 = document.createElement("div");
    newSkill6.className = "skill";
    newSkill6.textContent = "火之加护";
    newSkill6.id = "skill_999";
    newSkill6.setAttribute("draggable", "true");
    newSkill6.addEventListener("dragstart", drag);
    var Tips = document.createElement("span");
    Tips.innerHTML = '<span style="color:red;">火属性</span>的学院法杖可以增加火系魔法的温度。<br><span style="color:red;">火属性</span>攻击额外增加20%伤害。'
    Tips.className = "tooltip";
    newSkill6.appendChild(Tips);
    SkillContainers_0[0].appendChild(newSkill6);
}


function UpdateCurrentMana(mana) {
    GetCurrentManaElement = document.getElementById("CurrentMana_Battle");
    GetCurrentManaElement.innerText = "可用锑能：" + mana;
}