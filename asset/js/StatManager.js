// 状态数据
// 基础值
var OrigMaxHp = 100;
var OrigHp = 100;
var OrigATK = 5;
var OrigDEF = 0;
var OrigInitMana = 2;
var OrigAddMana = 1;
var OrigMaxMana = 5;


// 装备加成
var EquipMaxHp = 0;
var EquipHp = 0;
var EquipATK = 0;
var EquipDEF = 0;
var EquipInitMana = 0;
var EquipAddMana = 0;
var EquipMaxMana = 0;

// 当前值 
var CurrentMaxHp = 0;
var CurrentHp = 0;
var CurrentATK = 0;
var CurrentDEF = 0;
var CurrentInitMana = 0;
var CurrentAddMana = 0;
var CurrentMaxMana = 0;
// 金钱 
var Money = 100;

function Stat_Init() {
    // 穿脱装备导致的最大生命值变化，从而导致HP是否改变的问题，采用绝对值。
    // 直接把HP加上增加的最大HP就完事儿了

    CurrentMaxHp = OrigMaxHp + EquipMaxHp;
    CurrentHp = OrigHp + EquipMaxHp;
    CurrentATK = OrigATK + EquipATK;
    CurrentDEF = OrigDEF + EquipDEF;
    CurrentInitMana = OrigInitMana + EquipInitMana;
    CurrentAddMana = OrigAddMana + EquipAddMana;
    CurrentMaxMana = OrigMaxMana + EquipMaxMana;

    UpdateStats(CurrentMaxHp,
        CurrentHp,
        CurrentATK,
        CurrentDEF,
        CurrentInitMana,
        CurrentAddMana,
        CurrentMaxMana,
        Money);
}


//在界面上更新数据
function UpdateStats(MaxHp, CurrentHp, ATK, DEF, InitMana, AddMana, MaxMana, Money) {
    document.getElementById('attack').innerText = "攻击力：" + ATK;
    document.getElementById('defense').innerText = "防御力：" + DEF;
    document.getElementById('initpower').innerText = "初始锑能：" + InitMana;
    document.getElementById('increasepower').innerText = "增长锑能：" + AddMana;
    document.getElementById('maxpower').innerText = "最大锑能：" + MaxMana;
    document.getElementById('money').innerText = "金钱：" + Money;

    let healthBar = document.getElementById('health-bar');
    document.getElementById('health-text').innerText = CurrentHp + '/' + MaxHp;
    healthBar.style.width = (CurrentHp / MaxHp * 100) + "%";
}

//计算装备带来的数据
function CalStats() {
    EquipMaxHp = 0;
    EquipCurrentHp = 0;
    EquipATK = 0;
    EquipDEF = 0;
    EquipInitMana = 0;
    EquipAddMana = 0;
    EquipMaxMana = 0;

    PersonOneEquip.forEach(element => {
        var innerElement = element.querySelector("div");
        if (innerElement !== null) {
            var atk = innerElement.getAttribute("atk");
            if (atk !== null)
                EquipATK += parseInt(atk);

            var def = innerElement.getAttribute("def");
            if (def !== null)
                EquipDEF += parseInt(def);

            var maxhp = innerElement.getAttribute("maxhp");
            if (maxhp !== null)
                EquipMaxHp += parseInt(maxhp);

            var InitMana = innerElement.getAttribute("InitMana");
            if (InitMana !== null)
                EquipInitMana += parseInt(InitMana);

            var MaxMana = innerElement.getAttribute("MaxMana");
            if (MaxMana !== null)
                EquipMaxMana += parseInt(MaxMana);

            var AddMana = innerElement.getAttribute("AddMana");
            if (AddMana !== null)
                EquipAddMana += parseInt(AddMana);
        }
    });

    PersonTwoEquip.forEach(element => {
        var innerElement = element.querySelector("div");
        if (innerElement !== null) {
            var atk = innerElement.getAttribute("atk");
            if (atk !== null)
                EquipATK += parseInt(atk);

            var def = innerElement.getAttribute("def");
            if (def !== null)
                EquipDEF += parseInt(def);

            var maxhp = innerElement.getAttribute("maxhp");
            if (maxhp !== null)
                EquipMaxHp += parseInt(maxhp);

            var InitMana = innerElement.getAttribute("InitMana");
            if (InitMana !== null)
                EquipInitMana += parseInt(InitMana);

            var MaxMana = innerElement.getAttribute("MaxMana");
            if (MaxMana !== null)
                EquipMaxMana += parseInt(MaxMana);

            var AddMana = innerElement.getAttribute("AddMana");
            if (AddMana !== null)
                EquipAddMana += parseInt(AddMana);
        }
    });

    Stat_Init();
}