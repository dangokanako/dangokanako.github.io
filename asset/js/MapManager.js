// TODO 地图初始化需要封装
// TODO 是否已阅读过
// TODO 地图逻辑
// 别数像素了，#map用这个https://imagemap.org/

// 当前位置
var CurrentLocation = 0;



var LoadAssets = [
    "/asset/game/image/Aldor.png",
    "/asset/game/image/AldorWeaponShop.png",
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
    "/asset/game/audio/Break.m4a",
    "/asset/game/audio/Coin.m4a",
    "/asset/game/audio/Damage1.m4a",
    "/asset/game/audio/Flash2.m4a",
    "/asset/game/audio/Open2.m4a",
    "/asset/game/audio/Sword5.m4a",
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


var AreasData_Aldor = [
    "test.png",
    { id: "test", shape: "rect", coords: "326,433,463,485", alt: "Area 1" },
    { id: 2, shape: "rect", coords: "526,365,605,410", alt: "Area 2" },
    { id: 3, shape: "rect", coords: "58,222,268,283", alt: "Area 3" },
];


var MapData_AldorWeaponShop = [
    "AldorWeaponShop",
    "AldorWeaponShop.png",
    { id: "Aldor", shape: "rect", coords: "326,433,463,485", alt: "Area 1", cursor: "pointer" },
    { id: "Aldor", shape: "rect", coords: "526,365,605,410", alt: "Area 2", cursor: "pointer" },
    { id: "Aldor", shape: "rect", coords: "58,222,268,283", alt: "Area 3", cursor: "pointer" },
]
function Event_AldorWeaponShop() {
    StartStory(0, 1)
}


var MapData_Aldor = [
    "Aldor",
    "Aldor.png",
    { id: "AldorWeaponShop", shape: "rect", coords: "326,433,463,485", alt: "Map", cursor: "pointer" },
    { id: "AldorWeaponShop", shape: "rect", coords: "526,365,605,410", alt: "Map", cursor: "pointer" },
    { id: "AldorWeaponShop", shape: "rect", coords: "58,222,268,283", alt: "Map", cursor: "pointer" },
];

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

                    const funcname = "Event_" + data.id;
                    if (typeof window[funcname] === 'function') {
                        window[funcname]();
                    }
                    //如果是地图的话，跳转，如果是事件的话，调用
                    //等一下，地图好像也有事件啊，必须得做一个是否看过剧情的了……还不能是布尔型
                    if (data.alt === "Map") {
                        General_Map_Create(data.id)
                        ClearMap();
                    }


                    // 明天做一下动态调用故事函数
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
}

