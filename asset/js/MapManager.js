// TODO 地图初始化需要封装
// TODO 是否已阅读过
// TODO 地图逻辑
// 别数像素了，#map用这个https://imagemap.org/

// 当前位置
let CurrentLocation = 0;
let HasRead = {
    AldorWeaponShop: 0,
    AldorHome: 0,
    AldorHome_Bed: 0,
    AldorItemShop: 0,
    AldorAlley: 0,
    AldorMercenary: 0,
    AldorOuter: 0,
}



// 动态创建地图
function General_Map_Create(map) {
    var dataArrayName = 'MapData_' + map;
    var dataArray = window[dataArrayName];
    if (dataArray === null || dataArray === undefined) {
        alert(map + "地图信息未找到");
    }

    if (Array.isArray(dataArray)) {
        var mapName = dataArray[0];
        var imageElement = document.createElement("img");
        imageElement.src = '/asset/game/image/' + dataArray[1];
        imageElement.useMap = "#" + mapName;
        imageElement.className = "map";

        // 创建 map 元素
        var mapElement = document.createElement("map");
        mapElement.name = mapName;

        for (i = 2; i < dataArray.length; i++) {
            var areaElement = document.createElement("area");
            areaElement.shape = dataArray[i].shape;
            areaElement.coords = dataArray[i].coords;
            areaElement.alt = dataArray[i].alt;
            areaElement.style.cursor = dataArray[i].cursor;
            areaElement.addEventListener("click", (function (data) {
                return function () {
                    if (StroyLock)
                        return;

                    // 检查是否有事件，有的话执行
                    let funcname = "Event_" + data.id;
                    if (typeof window[funcname] === 'function') {
                        if (window[funcname]() === false)
                            // 如果事件返回false，则直接跳出，不进行地图跳转
                            return;
                    }

                    //如果是地图的话，跳转
                    if (data.alt === "map") {

                        $("#game-panel").fadeOut(350, function () {
                            $("#game-panel").fadeIn(350);
                            ClearMap()
                            General_Map_Create(data.id)
                        });

                        // ClearMap();
                        // General_Map_Create(data.id)
                    }
                };
            })(dataArray[i]));

            // 将 area 元素追加到 map 元素中
            mapElement.appendChild(areaElement);
        }

        var container = document.getElementById("game-panel");
        container.appendChild(imageElement);
        container.appendChild(mapElement);
    }
}


// 地图清理
function ClearMap() {
    var cleaner = document.getElementById("game-panel");
    if (cleaner.firstChild !== null)
        cleaner.firstChild.remove();
    if (cleaner.firstChild !== null)
        cleaner.firstChild.remove();
    if (cleaner.firstChild !== null)
        cleaner.firstChild.remove();
}





// 预加载图片模块
let LoadAssets = [
    "/asset/game/image/Aldor.png",
    "/asset/game/image/AldorHome.png",
    "/asset/game/image/AldorWeaponShop.png",
    "/asset/game/image/AldorItemShop.png",
    "/asset/game/image/AldorOuter.png",
    "/asset/game/image/AldorMercenary.png",
    "/asset/game/image/1.png",
    "/asset/game/image/2.png",
    "/asset/game/image/3.png",
    "/asset/game/image/4.png",
    "/asset/game/image/5.png",
    "/asset/game/image/6.png",
    "/asset/game/image/7.png",
    "/asset/game/image/8.png",
    "/asset/game/image/9.png",
    "/asset/game/head/atom1.png",
    "/asset/game/head/evil1.png",
    "/asset/game/head/evil2.png",
    "/asset/game/head/nitori.png",
    "/asset/game/head/runa1.png",
    "/asset/game/head/yuri.png",
    "/asset/game/head/Misaki.png",
    "/asset/game/head/albert.png",
    "/asset/game/audio/Break.m4a",
    "/asset/game/audio/Coin.m4a",
    "/asset/game/audio/Damage1.m4a",
    "/asset/game/audio/Flash2.m4a",
    "/asset/game/audio/Open2.m4a",
    "/asset/game/audio/Sword5.m4a",
    "/asset/game/audio/Heal3.m4a",
]

function updateProgressBar(percentage) {
    var progressBarInner = document.getElementById("progress-bar-inner");
    progressBarInner.style.width = percentage + "%";
}

function preloadImage(url, onProgress) {
    return new Promise(function (resolve, reject) {
        console.log("资源加载中");

        const fileType = url.split(".").pop().toLowerCase();
        let asset;

        if (fileType === "m4a") {
            asset = new Audio();
            asset.oncanplaythrough = function () {
                resolve(asset);
            };
        } else if (fileType === "png" || fileType === "jpg" || fileType === "jpeg" || fileType === "gif") {
            asset = new Image();
            asset.onload = function () {
                resolve(asset);
            };
        } else {
            console.error("未知资源类型：", url);
            reject(null);
            return;
        }

        asset.src = url;
        asset.onerror = function (err) {
            reject(err);
        };

        onProgress();
    });
}

function preloadImages(images) {
    var promises = [];
    var loadedCount = 0;
    console.log("图像预加载启动");
    for (var i = 0; i < images.length; i++) {
        promises.push(preloadImage(images[i], function () {
            loadedCount++;
            updateProgressBar((loadedCount / images.length) * 100);
        }));
    }

    return Promise.all(promises);
}



//// Aldor地图数据
// MapData为地图数据我，包含了地图名字，地图图片文件，地图可点击模块
// id为跳转地图或者事件名
// Event为触发事件
// cyberpunk,aerial view,daytime,lights,neon lights,sky
var MapData_Aldor = [
    "Aldor",
    "Aldor.png",
    { id: "AldorOuter", cursor: "pointer", alt: "map", coords: "0,0,95,83", shape: "rect" },
    { id: "AldorLockheed", cursor: "pointer", alt: "event", coords: "106,144,241,222", shape: "rect" },
    { id: "AldorGov", cursor: "pointer", alt: "event", coords: "312,111,443,191", shape: "rect" },
    { id: "AldorMercenary", cursor: "pointer", alt: "map", coords: "592,186,725,261", shape: "rect" },
    { id: "AldorAlley", cursor: "pointer", alt: "event", coords: "617,389,725,454", shape: "rect" },
    { id: "AldorHome", cursor: "pointer", alt: "map", coords: "472,332,586,394", shape: "rect" },
    { id: "AldorItemShop", cursor: "pointer", alt: "map", coords: "337,296,453,373", shape: "rect" },
    { id: "AldorWeaponShop", cursor: "pointer", alt: "map", coords: "267,399,403,477", shape: "rect" }
];
// 武器店
var MapData_AldorWeaponShop = [
    "AldorWeaponShop",
    "AldorWeaponShop.png",
    { id: "Aldor", shape: "rect", coords: "0,0,90,90", alt: "map", cursor: "pointer" },
]
function Event_AldorWeaponShop() {
    switch (HasRead.AldorWeaponShop) {
        case 0: {
            StartStory(0, 1);
            HasRead.AldorWeaponShop++;
            break;
        }
        case 1: {
            StartStory(0, 3);
            break;
        }
    }
}
function Event_AldorGov() {
    StartStory(0, 4);
}
function Event_AldorLockheed() {
    StartStory(0, 5);
}
// 家
var MapData_AldorHome = [
    "AldorHome",
    "AldorHome.png",
    { id: "Aldor", shape: "rect", coords: "0,0,90,90", alt: "map", cursor: "pointer" },
    { id: "AldorHome_Bed", shape: "rect", coords: "220,239,597,446", alt: "event", cursor: "pointer" },
    { id: "AldorHome_Nigthstand", shape: "rect", coords: "100,307,227,479", alt: "event", cursor: "pointer" },

]
function Event_AldorHome() {
    switch (HasRead.AldorHome) {
        case 0: {
            StartStory(0, 6);
            HasRead.AldorHome++;
            break;  
        }
    }
}
function Event_AldorHome_Bed() {
    playAudio("Heal3.m4a");
    switch (HasRead.AldorHome_Bed) {
        case 0: {
            StartStory(0, 7);
            HasRead.AldorHome_Bed++;
            break;
        }
        case 1: {
            StartStory(0, 8);
            break;
        }
    }
}
function Event_AldorHome_Nigthstand() {
    StartStory(0, 13);
}
// 道具店
var MapData_AldorItemShop = [
    "AldorItemShop",
    "AldorItemShop.png",
    { id: "Aldor", shape: "rect", coords: "0,0,90,90", alt: "map", cursor: "pointer" },
]
function Event_AldorItemShop() {
    if (HasRead.AldorWeaponShop == 0) {
        StartStory(0, 9);
        return false;
    }

    switch (HasRead.AldorItemShop) {
        case 0: {
            StartStory(0, 10);
            HasRead.AldorItemShop++;
            break;
        }
        case 1: {
            StartStory(0, 17);
            break;
        }
    }
}
// 佣兵工会
var MapData_AldorMercenary = [
    "AldorMercenary",
    "AldorMercenary.png",
    { id: "Aldor", shape: "rect", coords: "0,0,90,90", alt: "map", cursor: "pointer" },
]
function Event_AldorMercenary() {
    if (HasRead.AldorWeaponShop == 0) {
        StartStory(0, 9);
        return false;
    }

    switch (HasRead.AldorMercenary) {
        case 0: {
            StartStory(0, 14);
            HasRead.AldorMercenary++;
            break;
        }
    }
}
// 小巷
function Event_AldorAlley() {
    switch (HasRead.AldorAlley) {
        case 0: {
            StartStory(0, 11);
            break;
        }
    }
}
// 奥尔多尔外部
var MapData_AldorOuter = [
    "AldorOuter",
    "AldorOuter.png",
    { id: "Aldor", shape: "rect", coords: "283,169,625,317", alt: "map", cursor: "pointer" },
    // ☆ 这里记得改成map
    { id: "AldorTower", shape: "rect", coords: "221,338,473,487", alt: "event", cursor: "pointer" },
]
function Event_AldorOuter() {
    if (HasRead.AldorMercenary == 0) {
        StartStory(0, 12);
        return false;
    }

    switch (HasRead.AldorOuter) {
        case 0: {
            StartStory(0, 15);
            HasRead.AldorOuter++;
            break;
        }
    }
}
// 奥尔多尔塔
function Event_AldorTower() {
    StartStory(0, 16);
}