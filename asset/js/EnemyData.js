let Enemy_Stat_Atk = 0;
let Enemy_Stat_Def = 0;
let Enemy_Stat_Maxhp = 0;
let Enemy_Stat_Hp = 0;

function UpdateEnemySata(atk, def, maxhp, hp) {
    let element = document.getElementById("enemy-stat");
    element.innerText = "攻击力：" + atk + "  防御力：" + def;

    let elementHp = document.getElementById("enemy-health-text");
    elementHp.innerText = hp + "/" + maxhp;
}


// 敌人数据示例
// Rogue
const Enemy_Rogue = {
    //图片路径
    pic: "Rogue.png",
    hp: 170,
    atk: 30,
    def: 0,
}
const Enemy_Rogue_Skill = [
    {
        // 概率 ： 1000为100%触发，1为0.1%触发
        rate: 1000,
        name: '锁链连击',
        tips: '被动。普通攻击有50%的概率再产生一个普通攻击技能。',
        type: "passive",
    },
    {
        // 概率 ： 1000为100%触发，1为0.1%触发
        rate: 1000,
        name: '普通攻击',
        tips: '最基础的一击。造成100%攻击力的无属性伤害。',
        type: "none",
        power: "100"
    }, {
        rate: 500,
        name: '普通攻击',
        tips: '最基础的一击。造成100%攻击力的无属性伤害。',
        type: "none",
        power: "100"
    }, {
        rate: 500,
        name: '普通攻击',
        tips: '最基础的一击。造成100%攻击力的无属性伤害。',
        type: "none",
        power: "100"
    }, {
        rate: 500,
        name: '普通攻击',
        tips: '最基础的一击。造成100%攻击力的无属性伤害。',
        type: "none",
        power: "100"
    }, {
        rate: 500,
        name: '普通攻击',
        tips: '最基础的一击。造成100%攻击力的无属性伤害。',
        type: "none",
        power: "100"
    },
]

function CreateEnemySkill(enemySkill) {
    enemySkill.forEach(element => {
        // 概率判定过了
        if (element.rate > getRandomInt(1, 1000)) {
            // 选取空位
            var firstEmpty = Enemy_SkillContainers.findIndex(function (element) {
                return element.childElementCount === 0;
            })
            // TODO 没空位的情况，晚点再做

            // 创建元素
            let enemyskill = document.createElement("div");
            enemyskill.className = "skill";
            enemyskill.innerHTML = element.name;

            // 增加威力
            enemyskill.setAttribute("damageType", element.type);
            if (element.type != "passive") {
                enemyskill.setAttribute("damagePower", element.power);
            }
            // 创建提示条
            var Tips = document.createElement("span");
            Tips.innerHTML = element.tips;
            Tips.className = "tooltip";
            enemyskill.appendChild(Tips);

            Enemy_SkillContainers[firstEmpty].appendChild(enemyskill);
        }
    });
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}