// 原作用 Vue 2 的資料綁定加 jQuery 改底色；這裡改成 plain JS：資料改了就重畫那一杯。
var features = ['店長推薦', '國外進口', '國產好茶', '冬季限定']
var cupTypes = ['thermos', 'paper-cup', 'coffee-cup', 'mug']
var cupTypesChinese = ['自備環保保溫杯', '風味手搖杯', '古典白瓷咖啡杯', '經典馬克杯']
var milkTeas = [
  { name: '四季奶青加珍珠', foam: 10, milk: 25, 'green-tea': 25, 'black-tea': 0, bubbles: 5, type: 'thermos' },
  { name: '京都風雲珍珠奶綠', foam: 5, milk: 20, 'green-tea': 30, 'black-tea': 0, bubbles: 10, type: 'paper-cup' },
  { name: '日月潭奶蓋紅茶', foam: 10, milk: 15, 'green-tea': 0, 'black-tea': 10, bubbles: 1, type: 'coffee-cup' },
  { name: '暖心紅茶拿鐵', foam: 5, milk: 25, 'green-tea': 0, 'black-tea': 20, bubbles: 5, type: 'mug' }
]
var sliders = [['foam', '奶蓋', 50], ['milk', '牛奶', 50], ['green-tea', '綠茶', 50], ['black-tea', '紅茶', 50], ['bubbles', '珍珠', 20]]

function el(tag, className, text) {
  var node = document.createElement(tag)
  if (className) node.className = className
  if (text) node.textContent = text
  return node
}

// 杯底的顏色跟著最下層、有份量的成分（原作的 jQuery 迴圈）
function ingredientColor(tea) {
  if (Number(tea['black-tea']) != 0) return '#801a08'
  if (Number(tea['green-tea']) != 0) return '#9dab86'
  if (Number(tea.milk) != 0) return '#f7d8bb'
  if (Number(tea.foam) != 0) return '#eee'
  return ''
}

function drawBeverage(beverage, tea) {
  beverage.textContent = ''
  var handle = el('div', 'handle')
  if (tea.type == 'thermos') handle.classList.add('top')
  if (tea.type == 'paper-cup') handle.classList.add('straw')
  var cup = el('div', 'cup ' + tea.type)
  var ingredients = el('div', 'ingradients ' + tea.type + '-height')
  if (tea.type == 'coffee-cup') ingredients.classList.add('ingradients-radius')
  ingredients.style.backgroundColor = ingredientColor(tea)
  var box = el('div', 'box')
  ;['-one', '-two', '-three'].forEach(function (name) { box.appendChild(el('div', 'wave ' + name)) })
  ingredients.appendChild(box)
  ;['foam', 'milk', 'green-tea', 'black-tea'].forEach(function (key) {
    var layer = el('div', key)
    layer.style.height = tea[key] + 'px'
    ingredients.appendChild(layer)
  })
  for (var i = 0; i < tea.bubbles; i++) ingredients.appendChild(el('div', 'bubbles'))
  cup.appendChild(ingredients)
  beverage.appendChild(handle)
  beverage.appendChild(cup)
}

function drawControls(controls, tea, beverage) {
  controls.appendChild(document.createTextNode(tea.name))
  var editing = el('div', 'editing')
  editing.appendChild(el('h2', 'controls-subtitle', '杯型選擇'))
  var select = document.createElement('select')
  cupTypes.forEach(function (type, index) {
    var option = el('option', '', cupTypesChinese[index])
    option.value = type
    option.selected = type == tea.type
    select.appendChild(option)
  })
  select.addEventListener('change', function () { tea.type = select.value; drawBeverage(beverage, tea) })
  editing.appendChild(select)
  editing.appendChild(el('h2', 'controls-subtitle', '成分調整'))
  sliders.forEach(function (slider, index) {
    var label = el('label', '', slider[1])
    var range = document.createElement('input')
    range.type = 'range'; range.min = 0; range.max = slider[2]; range.value = tea[slider[0]]
    range.addEventListener('input', function () { tea[slider[0]] = Number(range.value); drawBeverage(beverage, tea) })
    label.appendChild(document.createElement('br'))
    label.appendChild(range)
    editing.appendChild(label)
    if (index < sliders.length - 1) editing.appendChild(document.createElement('br'))
  })
  controls.appendChild(editing)
}

var container = document.querySelector('#app .container')
milkTeas.forEach(function (tea, index) {
  var product = el('div', 'product-container')
  var beverage = el('div', 'beverage')
  var controls = el('div', 'controls')
  product.appendChild(el('div', 'feature', features[index]))
  product.appendChild(beverage)
  product.appendChild(controls)
  drawBeverage(beverage, tea)
  drawControls(controls, tea, beverage)
  container.appendChild(product)
})

// 「點餐」開關：關掉時藏起每一杯的調整面板
var editingSwitch = document.getElementById('editing-switch')
editingSwitch.addEventListener('change', function () {
  document.querySelectorAll('.editing').forEach(function (node) { node.classList.toggle('hideOrder', !editingSwitch.checked) })
})
