$(document).ready(function (e) {
  var vm = new Vue({
    el: '#app',
    data: {
      editing: true,
      features: ['店長推薦', '國外進口', '國產好茶', '冬季限定'],
      milkTeas: [
        {
          name: '四季奶青加珍珠',
          foam: 10,
          milk: 25,
          'green-tea': 25,
          'black-tea': 0,
          bubbles: 5,
          type: 'thermos',
          accType: 'top'
        },
        {
          name: '京都風雲珍珠奶綠',
          foam: 5,
          milk: 20,
          'green-tea': 30,
          'black-tea': 0,
          bubbles: 10,
          type: 'paper-cup',
          accType: 'straw'
        },
        { name: '日月潭奶蓋紅茶', foam: 10, milk: 15, 'green-tea': 0, 'black-tea': 10, bubbles: 1, type: 'coffee-cup' },
        { name: '暖心紅茶拿鐵', foam: 5, milk: 25, 'green-tea': 0, 'black-tea': 20, bubbles: 5, type: 'mug' }
      ],
      cupTypes: ['thermos', 'paper-cup', 'coffee-cup', 'mug'],
      cupTypesChinese: ['自備環保保溫杯', '風味手搖杯', '古典白瓷咖啡杯', '經典馬克杯'],
      accTypes: ['top', 'straw'],
      computed: {
        //adapt ingradients background color to milkTeas (with Vue.js)
        // for html .ingradients: :style="{'backgroundColor': getIngradientColor}"
        getIngradientColor: function () {
          var ingradientColor = ''
          var blackTeaHeight = Number(milkTea['black-tea'])
          var greenTeaHeight = Number(milkTea['green-tea'])
          var milkHeight = Number(milkTea.milk)
          var foamHeight = Number(milkTea.foam)
          if (blackTeaHeight != 0) {
            ingradientColor = '#801a08'
          } else if (greenTeaHeight != 0) {
            ingradientColor = '#9dab86'
          } else if (milkHeight != 0) {
            ingradientColor = '#f7d8bb'
          } else if (foamHeight != 0) {
            ingradientColor = '#eee'
          }
          return ingradientColor
        }
      }
    }
  })
  window.vm = vm

  //adapt ingradients background color to milkTeas (with jQuery)
  console.log(vm.milkTeas.length)
  var ingradientColor = ''
  for (var i = 0; i <= vm.milkTeas.length; i++) {
    var blackTeaHeight = parseInt($('.ingradients').eq(i).find('.black-tea').css('height'))
    var greenTeaHeight = parseInt($('.ingradients').eq(i).find('.green-tea').css('height'))
    var milkHeight = parseInt($('.ingradients').eq(i).find('.milk').css('height'))
    var foamHeight = parseInt($('.ingradients').eq(i).find('.foam').css('height'))
    if (blackTeaHeight != 0) {
      ingradientColor = '#801a08'
    } else if (greenTeaHeight != 0) {
      ingradientColor = '#9dab86'
    } else if (milkHeight != 0) {
      ingradientColor = '#f7d8bb'
    } else if (foamHeight != 0) {
      ingradientColor = '#eee'
    }
    $('.ingradients').eq(i).css('background-color', ingradientColor)
  }

  $(document).on('input', 'input', function (e) {
    console.log('you just adjust the ingradients!')
    for (var i = 0; i <= vm.milkTeas.length; i++) {
      var blackTeaHeight = parseInt($('.ingradients').eq(i).find('.black-tea').css('height'))
      var greenTeaHeight = parseInt($('.ingradients').eq(i).find('.green-tea').css('height'))
      var milkHeight = parseInt($('.ingradients').eq(i).find('.milk').css('height'))
      var foamHeight = parseInt($('.ingradients').eq(i).find('.foam').css('height'))
      if (blackTeaHeight != 0) {
        ingradientColor = '#801a08'
      } else if (greenTeaHeight != 0) {
        ingradientColor = '#9dab86'
      } else if (milkHeight != 0) {
        ingradientColor = '#f7d8bb'
      } else if (foamHeight != 0) {
        ingradientColor = '#eee'
      }
      $('.ingradients').eq(i).css('background-color', ingradientColor)
      //prevent beverages overflow out of the cup
      // if(blackTeaHeight+greenTeaHeight+milkHeight+foamHeight >= 70){
      //     $(this).attr('disabled', 'disabled');
      // } else {
      //     $('input').removeAttr('disabled');
      // }
    }
  })
})