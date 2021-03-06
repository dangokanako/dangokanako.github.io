// 颜色变化也要考虑一下
// 我他妈的，为什么这个时候没用对象
const SkillData = {};

function Init_SkillData() {
    const skill_001 = `skill_001`;
    SkillData[skill_001] = [
        [0, "剑术斩击", '能量不足，请供能。', '',
            {
                damagetype: "none",
                damagepower: 0,
            }],
        [1, "剑术斩击", '1sb<br>造成一次攻击力120%的<span style="color: #888888;">无属性伤害</span><br>最基础的剑术。', '#E9ECEF',
            {
                damagetype: "none",
                damagepower: 120,
            }],
        [2, "剑术重击", '2sb<br>造成一次攻击力160%的<span style="color: #888888;">无属性伤害</span><br>在最基础的剑术上——使劲砍下去。', '#DEE2E6', ,
            {
                damagetype: "none",
                damagepower: 160,
            }],
        [4, "剑术连击", '4sb<br>造成两次攻击力170%的<span style="color: #888888;">无属性伤害</span><br>咄咄逼人的剑术。', '#CED4DA', {
            damagetype: "none",
            damagepower: 170,
            damagenumber: 2
        }],
    ];

    const skill_002 = `skill_002`;
    SkillData[skill_002] = [
        [0, "抱头蹲防", '能量不足，请供能。', '',
            {
                damagetype: "buff",
            }],
        [1, "抱头蹲防", '1sb<br>本回合额外提供5点防御力<br>用威严的吸血鬼的防御秘笈抵御敌人的攻击。', '#E9ECEF',
            {
                damagetype: "buff",
                adddef: 5,
            }],
        [3, "招架", '3sb<br>本回合额外提供17点防御力<br>企图用气势防御住敌人的攻击', '#DEE2E6',
            {
                damagetype: "buff",
                adddef: 17
            }],
        [6, "持剑招架", '6sb<br>本回合额外提供40点防御力<br>架好态势，用剑招架敌人汹涌的攻击。', '#CED4DA',
            {
                damagetype: "buff",
            }],
    ]

    const skill_003 = `skill_003`;
    SkillData[skill_003] = [
        [0, "火球术", '能量不足，请供能。', '', {
            damagetype: "fire",
            damagepower: 0,
        }],
        [2, "火球术", '2sb<br>造成攻击力150%的<span style="color:red;">火属性伤害</span><br>火系魔法第一堂课就教授的魔法。<br>向敌人丢出一团局部温度500℃的正在燃烧的可燃物。', '#FFBA08DD', {
            damagetype: "fire",
            damagepower: 150,
        }],
        [4, "炎之矢", '4sb<br>造成两次攻击力160%的<span style="color:red;">火属性伤害</span><br>向敌人丢出两团局部温度500℃的正在燃烧的可燃物。', '#FAA307DD', {
            damagetype: "fire",
            damagepower: 160,
            damagenumber: 2
        }],
        [6, "火焰放射", '6sb<br>造成攻击力500%的<span style="color:red;">火属性伤害</span><br>有低概率灼烧敌人<br>中阶火焰魔法。<br>用魔法将可燃液体在高压下喷出并点燃，<br>对目标的身体健康情况会产生一些可预见的不利影响。', '#F48C06DD', {
            damagetype: "fire",
            damagepower: 500,
        }],
        [10, "「火神的光辉」", '10sb<br>造成攻击力1800%的<span style="color:red;">火属性伤害</span><br>必定灼烧敌人<br>高阶火焰魔法。<br>火符「アグニレイディアンス」<br>召唤火神并喷射出2000℃的高温烈焰。', '#E85D04DD', {
            damagetype: "fire",
            damagepower: 0,
        }],
    ]

    const skill_004 = `skill_004`;
    SkillData[skill_004] = [
        [0, "治愈术", '能量不足，请供能。', '', {
            damagetype: "heal",
        }],
        [2, "治愈术", '2sb<br>恢复攻击力150%的血量<br>用祝福的力量增加伤口凝血系统的效率。', '#9EF01ADD', {
            damagetype: "heal",
            damagepower: 150
        }]
    ]

    const skill_005 = `skill_005`;
    SkillData[skill_005] = [
        [0, "圣光术", '能量不足，请供能。', ''],
        [2, "圣光术", '2sb<br>造成攻击力150%的<span style="color:yellow;">圣属性伤害</span><br>向敌人照射一道80,000勒克斯亮度的光。', '#FFF75EDD', {
            damagetype: "holy",
            damagepower: 150
        }]
    ]
}

