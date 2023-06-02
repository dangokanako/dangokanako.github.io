// //对于基于HTML, CSS和JavaScript的简单网页游戏，您可以使用Web浏览器提供的 localStorage API来实现存档功能。localStorage 是一个持久化的键值存储，它允许您在用户的浏览器中保存和读取数据。

// 以下是一个简单示例，说明如何使用 localStorage 保存和读取游戏进度：

// 保存游戏数据：

// javascript

// function saveGame() {
// const gameData = {
// score: 100,
// level: 2,
// items: ['item1', 'item2']
// };

// // 将游戏数据对象转换为JSON字符串
// const gameDataString = JSON.stringify(gameData);

// // 使用 localStorage 保存游戏数据
// localStorage.setItem('gameData', gameDataString);
// }

// 在这个示例中，我们首先创建了一个包含游戏数据的对象，然后将其转换为JSON字符串。之后，我们使用 localStorage.setItem() 方法将数据字符串存储到localStorage。

// 读取游戏数据：

// javascript

// function loadGame() {
// // 使用 localStorage 获取游戏数据
// const gameDataString = localStorage.getItem('gameData');

// if (gameDataString) {
// // 将JSON字符串解析为游戏数据对象
// const gameData = JSON.parse(gameDataString);

// // 恢复游戏状态
// console.log(`Score: ${gameData.score}, Level: ${gameData.level}, Items: ${gameData.items}`);
// } else {
// console.log('No saved game data found.');
// }
// }

// 在这个示例中，我们首先使用 localStorage.getItem() 方法从localStorage获取游戏数据字符串。如果找到保存的数据，我们将JSON字符串解析为游戏数据对象，并恢复游戏状态。

// 请注意，localStorage 的数据仅保存在用户的浏览器上，不同用户之间无法共享。此外，存储空间可能受到限制（约5MB），因此在使用 localStorage 时要注意不要存储过多的数据。