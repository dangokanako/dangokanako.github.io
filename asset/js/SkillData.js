// 颜色变化也要考虑一下

const SkillData = {};

function Init_SkillData() {
    const skill_001 = `skill_001`;
    SkillData[skill_001] = [
        [1, "剑术斩击", '1sb<br>造成一次攻击力120%的<span style="color: #888888;">无属性伤害</span><br>最基础的剑术。'],
        [2, "剑术重击", '2sb<br>造成一次攻击力160%的<span style="color: #888888;">无属性伤害</span><br>在最基础的剑术上——使劲砍下去。'],
        [4, "剑术连击", '4sb<br>造成两次攻击力170%的<span style="color: #888888;">无属性伤害</span><br>咄咄逼人的剑术。'],
    ]
    const skill_003 = `skill_003`;
    SkillData[skill_003] = [
        [2, "火球术", '2sb<br>造成攻击力150%的<span style="color:red;">火属性伤害</span><br>火系魔法第一堂课就教授的魔法。<br>向敌人丢出一团局部温度500℃的正在燃烧的可燃物。'],
        [4, "火球连射", '4sb<br>造成两次攻击力160%的<span style="color:red;">火属性伤害</span><br>向敌人丢出两团局部温度500℃的正在燃烧的可燃物。'],
        [6, "火焰喷射", '6sb<br>造成攻击力500%的<span style="color:red;">火属性伤害</span><br>有低概率灼烧敌人<br>中阶火焰魔法。<br>用魔法将可燃液体在高压下喷出并点燃，<br>对敌人的皮肤以及衣物会产生一些可预见的不利影响。'],
        [10, "哈哈，没想好", ''],
    ]
}
