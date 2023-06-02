// TODO 地图初始化需要封装
// TODO 是否已阅读过
// TODO 地图逻辑
// 别数像素了，#map用这个https://imagemap.org/

// 当前位置
var CurrentLocation = 0;

function MapTest() {
    alert("Yoshi");
}

var AreasData_Aldor = [
    { id: 1, shape: "rect", coords: "326,433,463,485", alt: "Area 1" },
    { id: 2, shape: "rect", coords: "526,365,605,410", alt: "Area 2" },
    { id: 3, shape: "rect", coords: "58,222,268,283", alt: "Area 3" },
];

//新手村初始化
function Init_Map() {
    var mapName = "Aldor"

    var imageElement = document.createElement("img");
    imageElement.src = '/asset/game/image/test.png';
    imageElement.useMap = "#" + mapName;
    imageElement.className = "map";
    // 创建 map 元素
    var mapElement = document.createElement("map");
    mapElement.name = mapName;

    AreasData_Aldor.forEach(function (area) {
        var areaElement = document.createElement("area");
        areaElement.shape = area.shape;
        areaElement.coords = area.coords;
        areaElement.alt = area.alt;
        areaElement.style.cursor = 'pointer';
        areaElement.addEventListener("click", function () {
            Aldor_Move(area.id)
        });

        // 将 area 元素追加到 map 元素中
        mapElement.appendChild(areaElement);
    });


    // 将 img 和 map 元素追加到页面上的容器元素中
    var container = document.getElementById("game-panel");
    container.appendChild(imageElement);
    container.appendChild(mapElement);
};

function Aldor_Move(id) {
    if (StroyLock) return;

    if (id == 1) {
        Aldor_Weapon_Shop()
    }
}

function Aldor_Weapon_Shop() {
    ClearMap();
    Aldor_Weapon_Shop_Create();
    StartStory(0, 1)
}

function Aldor_Weapon_Shop_Create() {
    var mapName = "Aldor_Weapon_Shop";

    var imageElement = document.createElement("img");
    imageElement.src = '/asset/game/image/test2.png';
    imageElement.useMap = "#" + mapName;
    imageElement.className = "map";
    // 创建 map 元素
    var mapElement = document.createElement("map");
    mapElement.name = mapName;

    AreasData_Aldor.forEach(function (area) {
        var areaElement = document.createElement("area");
        areaElement.shape = area.shape;
        areaElement.coords = area.coords;
        areaElement.alt = area.alt;

        areaElement.addEventListener("click", function () {
            Aldor_Move(area.id)
        });

        // 将 area 元素追加到 map 元素中
        mapElement.appendChild(areaElement);
    });


    // 将 img 和 map 元素追加到页面上的容器元素中
    var container = document.getElementById("game-panel");
    container.appendChild(imageElement);
    container.appendChild(mapElement);
}

// 地图清理
function ClearMap() {
    var cleaner = document.getElementById("game-panel");
    if (cleaner.firstChild !== null)
        cleaner.firstChild.remove();
    if (cleaner.firstChild !== null)
        cleaner.firstChild.remove();
}