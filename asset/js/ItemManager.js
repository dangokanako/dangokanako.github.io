//背包
var bagContainers = [];
//装备栏
var PersonOneEquip = [];
var PersonTwoEquip = [];

//初始化函数，包括背包数组和装备栏的初始化
function item_init() {
    for (var i = 1; i <= 10; i++) {
        bagContainers.push(document.getElementById("bag" + i));
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
    newItem.setAttribute("allow-item", "weapon");
    newItem.setAttribute("allow-person", "one");
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
    newItem2.setAttribute("allow-item", "armor");
    newItem2.setAttribute("allow-person", "two");
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
    newItem3.setAttribute("allow-item", "weapon");
    newItem3.setAttribute("allow-person", "two");
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
    newItem4.setAttribute("allow-item", "armor");
    newItem4.setAttribute("allow-person", "two");
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
    newItem5.style.width = "50px";
    newItem5.style.height = "50px";
    newItem5.setAttribute("allow-item", "item");

    newItem5.setAttribute("draggable", "true");
    newItem5.setAttribute("use-hp", "50");

    newItem5.addEventListener("dragstart", drag);

    var Tips = document.createElement("span");
    Tips.innerHTML = '使用后HP+50<br>阿瓦隆制药最新科技结晶。<br>可以迅速为冒险者或者士兵恢复伤口。<br>此为一般<span style="color: #888888;">民用型</span>。<br>至于为什么是喷雾型至今仍是个谜。'
    Tips.className = "tooltip";

    newItem5.appendChild(Tips);
    bagContainers[0].appendChild(newItem5);
}

//在道具栏创建道具
function createItem_Test() {
    //选取空位
    var firstEmpty = bagContainers.findIndex(function (element) {
        return element.childElementCount === 0;
    })


    // 创建新元素
    var newItem = document.createElement("div");

    // 为新元素设置属性和内容
    newItem.className = "item";
    newItem.textContent = "铁剑";
    newItem.id = "item-weapon-005";

    newItem.setAttribute("draggable", "true");
    newItem.setAttribute("allow-item", "weapon");
    newItem.setAttribute("allow-person", "one");
    newItem.setAttribute("atk", "6");

    newItem.addEventListener("dragstart", drag);

    var Tips = document.createElement("span");
    Tips.innerHTML = "攻击力+6。<br>新手冒险者经常使用的武器。"
    Tips.className = "tooltip";

    newItem.appendChild(Tips);
    // 将新元素添加到道具栏容器中
    bagContainers[firstEmpty].appendChild(newItem);
}


//拖动模块
function allowDrop(event) {
    event.preventDefault();
    event.stopPropagation();
}

function dragstart(event) {
    event.preventDefault();
    event.stopPropagation();
}
function drag(event) {
    event.stopPropagation();
    event.dataTransfer.setData("text/plain", event.target.id);
    event.dataTransfer.effectAllowed = "move";
}

function onDragOverHandler(event) {
    event.preventDefault();
    event.stopPropagation();
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
                (sourceElement.getAttribute('allow-item') === null ||
                    sourceElement.getAttribute('allow-item') === event.target.getAttribute('allow-item'))
                && (sourceElement.getAttribute('allow-person') === null ||
                    sourceElement.getAttribute('allow-person') === event.target.getAttribute('allow-person'))
            ) {
                event.target.appendChild(sourceElement);
            }
            else {
                alert("无法装备，请确认装备位置或者角色是否匹配");
                return;
            }
        } else {
            //道具栏无所谓了
            event.target.appendChild(sourceElement);
        }

    } else {
        // 如果目标位置有物品，则不能拖放
        console.log("Invalid drop: Target slot is already occupied");
        return;
    }

    // 获取源元素的信息
    var itemType = sourceElement.getAttribute('equipment');
}

