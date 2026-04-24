// TODO 创建道具需要封装

//背包
var bagContainers = [];
//装备栏
var PersonOneEquip = [];
var PersonTwoEquip = [];
//商店栏
var ShopItemContainers = [];

//初始化函数，包括背包数组和装备栏的初始化
//旧代码，别他妈从这复制拿去改了
function item_init() {
    for (var i = 1; i <= 10; i++) {
        bagContainers.push(document.getElementById("bag" + i));
    }
    for (var i = 1; i <= 10; i++) {
        ShopItemContainers.push(document.getElementById("shop" + i));
    }
    PersonOneEquip.push(document.getElementById("persononeweapon"));
    PersonOneEquip.push(document.getElementById("persononearmor"));
    PersonOneEquip.push(document.getElementById("persononejewelry"));
    PersonOneEquip.push(document.getElementById("persononejewelry2"));
    PersonTwoEquip.push(document.getElementById("persontwoweapon"));
    PersonTwoEquip.push(document.getElementById("persontwoarmor"));
    PersonTwoEquip.push(document.getElementById("persontwojewelry"));
    PersonTwoEquip.push(document.getElementById("persontwojewelry2"));

    //创建初始装备
    var newItem = document.createElement("div");

    // 为新元素设置属性和内容
    newItem.className = "item";
    newItem.textContent = "铁剑";
    newItem.id = "item-weapon-001";

    newItem.style.width = "50px";
    newItem.style.height = "50px";
    newItem.setAttribute("draggable", "true");
    newItem.setAttribute("allowitem", "weapon");
    newItem.setAttribute("allowperson", "one");
    newItem.setAttribute("atk", "6");

    newItem.addEventListener("dragstart", drag);

    var Tips = document.createElement("span");
    Tips.innerHTML = "攻击力+6<br>新手冒险者经常使用的武器。"
    Tips.className = "tooltip";

    newItem.appendChild(Tips);
    PersonOneEquip[0].appendChild(newItem);


    var newItem2 = document.createElement("div");

    newItem2.className = "item";
    newItem2.textContent = "皮甲";
    newItem2.id = "item-cloth-001";
    newItem2.style.width = "50px";
    newItem2.style.height = "50px";
    newItem2.setAttribute("draggable", "true");
    newItem2.setAttribute("allowitem", "armor");
    newItem2.setAttribute("def", "3");
    newItem2.setAttribute("maxhp", "100");

    newItem2.addEventListener("dragstart", drag);

    var Tips = document.createElement("span");
    Tips.innerHTML = "最大HP+100<br>防御力+3<br>新手冒险者经常使用的防具。"
    Tips.className = "tooltip";

    newItem2.appendChild(Tips);
    PersonOneEquip[1].appendChild(newItem2);


    var newItem3 = document.createElement("div");

    newItem3.className = "item";
    newItem3.textContent = "学院法杖";
    newItem3.id = "item-weapon-002";
    newItem3.style.width = "50px";
    newItem3.style.height = "50px";
    newItem3.setAttribute("draggable", "true");
    newItem3.setAttribute("allowitem", "weapon");
    newItem3.setAttribute("allowperson", "two");
    newItem3.setAttribute("InitMana", "2");
    newItem3.setAttribute("MaxMana", "3");

    newItem3.addEventListener("dragstart", drag);

    var Tips = document.createElement("span");
    Tips.innerHTML = '初始锑能+2<br>最大锑能+3<br>赫兹拉德魔法学院统一发放的法杖。<br>露娜选择了<span style="color: red;">火属性风格</span>的。'
    Tips.className = "tooltip";

    newItem3.appendChild(Tips);
    PersonTwoEquip[0].appendChild(newItem3);

    var newItem4 = document.createElement("div");

    newItem4.className = "item";
    newItem4.textContent = "学院制服";
    newItem4.id = "item-cloth-002";
    newItem4.style.width = "50px";
    newItem4.style.height = "50px";
    newItem4.setAttribute("draggable", "true");
    newItem4.setAttribute("allowitem", "armor");
    newItem4.setAttribute("allowperson", "two");
    newItem4.setAttribute("InitMana", "2");
    newItem4.setAttribute("def", "2");

    newItem4.addEventListener("dragstart", drag);

    var Tips = document.createElement("span");
    Tips.innerHTML = "初始锑能+2<br>防御力+2<br>赫兹拉德魔法学院统一发放的制服。<br>露娜是白色款。"
    Tips.className = "tooltip";

    newItem4.appendChild(Tips);
    PersonTwoEquip[1].appendChild(newItem4);

    var newItem5 = document.createElement("div");

    newItem5.className = "item";
    newItem5.textContent = "好伤药";
    newItem5.id = "item-001";
    newItem5.setAttribute("allowitem", "item");
    newItem5.setAttribute("draggable", "true");
    newItem5.style.backgroundImage = 'url("/asset/game/image/icon/haoshangyao.png")'
    newItem5.style.backgroundRepeat = 'no-repeat'
    newItem5.style.backgroundPosition = 'center center'
    newItem5.addEventListener("dragstart", drag);
    newItem5.addEventListener("contextmenu", function (event) {
        let ret = ChangeHp(50);
        if (ret != false) {
            this.remove();
        }
    });


    var Tips = document.createElement("span");
    Tips.innerHTML = '使用后HP+50<br>阿瓦隆制药最新科技结晶。<br>可以迅速为冒险者或者士兵恢复伤口。<br>此为一般<span style="color: #888888;">民用型</span>。<br>至于为什么是喷雾型至今仍是个谜。'
    Tips.className = "tooltip";

    newItem5.appendChild(Tips);
    bagContainers[0].appendChild(newItem5);
}

function IfBagEmpty() {
    var firstEmpty = bagContainers.findIndex(function (element) {
        return element.childElementCount === 0;
    })

    if (firstEmpty === -1) {
        return false;
    } else { return true; }
}



//好伤药 道具示例
const ItemData_Haoshangyao = {
    // 名字
    name: "好伤药",
    // 小图标
    backgroundimage: "haoshangyao.png",
    // tips
    tips: '使用后HP+50<br>阿瓦隆制药最新科技结晶。<br>可以迅速为冒险者或者士兵恢复伤口。<br>此为一般<span style="color: #888888;">民用型</span>。<br>至于为什么是喷雾型至今仍是个谜。',
    // 如果是装备，要设置给谁才能装备
    allowitem: 'item',
    allowperson: '',
    // 右键执行函数
    RightClickFunc: function (event) {
        let ret = ChangeHp(50);
        if (ret != false) {
            this.remove();
        }
    },

    //额外属性部分
}
//钱袋子
const ItemData_Xiaoqiandai = {
    // 名字
    name: "小钱袋",
    // 小图标
    // backgroundimage: "haoshangyao.png",
    // tips
    tips: '使用后随机获得1~50金钱',
    // 如果是装备，要设置给谁才能装备
    allowitem: 'item',
    allowperson: '',
    // 右键执行函数
    RightClickFunc: function (event) {
        let random = getRandomInt(1, 50);
        toastr.success("获得了" + random + "枚硬币");
        ChangeMoney(random);
        this.remove();
    },
    //额外属性部分
}
//希格斯粒子剑
const ItemData_HiggsSword = {
    name: `<span style="color:#BA55D3 ; display: inline-block; background-image:url('/asset/game/image/backgroud.gif');">希格斯粒子剑</span>`,
    tips: `攻击力+20<br>每回合锑能+2<br>北方联盟普通士兵批量使用的武器。<br>亚特姆这把只做了最低限度的能量供给，但即使如此，<br>也是<span style="color:red">军用级</span>装备。`,
    //额外属性部分
    attributes:
    {
        atk: 20,
        AddMana: 2,
        allowperson: "one",
        allowitem: "weapon",
    },
}

//在道具栏创建道具
function createItem(item, position) {
    var firstEmpty;
    if (position == "bag") {
        //选取空位
        firstEmpty = bagContainers.findIndex(function (element) {
            return element.childElementCount === 0;
        })
    } else if (position == "shop") {
        //选取空位
        firstEmpty = ShopItemContainers.findIndex(function (element) {
            return element.childElementCount === 0;
        })
    }

    if (firstEmpty == -1) {
        return false;
    }

    // 创建新元素
    var newItem = document.createElement("div");

    // 为新元素设置属性和内容
    newItem.className = "item";
    newItem.innerHTML = item.name;
    newItem.id = `temp-id-${Date.now()}-${Math.random().toString(10)}`;

    // 背景图片设置
    if (item.backgroundimage != '' && item.backgroundimage != undefined) {
        newItem.style.backgroundImage = `url("/asset/game/image/icon/${item.backgroundimage}")`;
        newItem.style.backgroundRepeat = 'no-repeat';
        newItem.style.backgroundPosition = 'center center';
    }

    // 拖动模块
    newItem.addEventListener("dragstart", drag);
    newItem.setAttribute("draggable", "true");


    if (item.allowitem) {
        newItem.setAttribute("allowitem", item.allowitem)
    }
    if (item.allowperson) {
        newItem.setAttribute("allowperson", item.allowitem)
    }

    // 浮动提示
    var Tips = document.createElement("span");
    Tips.innerHTML = item.tips;
    Tips.className = "tooltip";
    newItem.appendChild(Tips);

    // 增加右键执行函数    
    if (item.RightClickFunc) {
        newItem.addEventListener("contextmenu", item.RightClickFunc);
    }

    // 增加自定义属性
    if (item.attributes) {
        for (let key in item.attributes) {
            newItem.setAttribute(key, item.attributes[key]);
        }
    }

    // 将新元素添加到道具栏容器中
    if (position == "bag") {
        bagContainers[firstEmpty].appendChild(newItem);
    } else if (position == "shop") {
        ShopItemContainers[firstEmpty].appendChild(newItem);
    }
}



//拖动模块
function allowDrop(event) {
    event.preventDefault();
    event.stopPropagation();
}

function dragstart(event) {
    event.preventDefault();
    event.stopPropagation();


    //event.dataTransfer.setData("text", event.target.id);
}
function drag(event) {

    if (OnBattle) {
        if (event.target.className == 'item') {
            toastr.info("战斗中没有空闲去更换装备！");
        }
        return;
    }
    event.stopPropagation();
    if (!event.target.id) {
        event.target.id = `temp-id-${Date.now()}-${Math.random().toString(10)}`;
    }

    event.dataTransfer.setData("text", event.target.id);
    event.dataTransfer.effectAllowed = "move";
}



//拖动物品放下
function drop(event) {
    event.preventDefault();
    event.stopPropagation();


    var itemId = event.dataTransfer.getData("text");
    var sourceElement = document.getElementById(itemId);
    if (event.target.childElementCount === 0) {

        //如果拖放到装备栏，则需要判断是否能装备
        if (event.target.className === "equipment") {


            if (
                (sourceElement.getAttribute('allowitem') === null ||
                    sourceElement.getAttribute('allowitem') === event.target.getAttribute('allowitem'))
                && (sourceElement.getAttribute('allowperson') === null ||
                    sourceElement.getAttribute('allowperson') === event.target.getAttribute('allowperson'))
            ) {
                event.target.appendChild(sourceElement);
                //更新装备之后需要更新状态
                CalStats();
            }
            else {
                toastr.info('该角色的这个位置，无法装备这件物品喔');
                return;
            }
        } else {
            //道具栏无所谓了
            // TODO 0607 操你妈，有BUG了
            event.target.appendChild(sourceElement);
            //更新装备之后需要更新状态
            CalStats();
        }


    } else {
        // 如果目标位置有物品，则不能拖放
        console.log("Invalid drop: Target slot is already occupied");
        return;
    }

    // 获取源元素的信息
    //var itemType = sourceElement.getAttribute('equipment');
}



//商店创建
// type为模式，2的话为掉落模式
function CreateShop(type, item) {
    switch (type) {
        case 2: {
            // 清空商店缓存
            ShopItemContainers.forEach(element => {
                element.innerHTML = '';
            });

            for (let drop of item) {
                if (drop.rate >= getRandomInt(1, 1000)) {
                    createItem(drop.item, "shop");
                }
            }

            //至少有一个掉落的话，显示商店框
            if (ShopItemContainers[0].innerHTML) {

                ShopItemContainers.forEach(element => {
                    if (element.innerHTML) {
                        element.style.display = "block";
                    }
                });
                let elementUI = document.getElementById("shop-panel")
                elementUI.style.display = "flex";
            }

            break;
        }

    }
}
// 商店退出
function QuitShop() {
    let elementUI = document.getElementById("shop-panel")
    elementUI.style.display = "none";
}
// 商店购买
function ShopBuy(event) {
    // 左键点击 
    if (event.button == 0) {
        // 空的就别点了
        if (event.target.className != 'item') {
            return;
        }

        // 无消耗
        if (event.target.getAttribute("cost")) {
        }


        //选取空位
        firstEmpty = bagContainers.findIndex(function (element) {
            return element.childElementCount === 0;
        })


        if (firstEmpty != -1) {
            bagContainers[firstEmpty].appendChild(event.target);
        }// TODO 没空位情况

        //event.target.remove();

    }
}