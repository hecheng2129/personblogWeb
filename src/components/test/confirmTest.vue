<template>
  <div class="site-demo-button" id="layerDemo" style="margin-bottom: 0;">
    <button data-method="setTop" class="layui-btn">多窗口模式，层叠置顶</button>
    <button data-method="notice" class="layui-btn">示范一个公告层</button>
  </div>
</template>

<script>
  export default {
    name: "confirmTest",
    methods: {}
  };

  layui.use('layer', function () { //独立版的layer无需执行这一句
    var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句

    //触发事件
    var active = {
      setTop: function () {
        var that = this;
        //多窗口模式，层叠置顶
        layer.open({
          type: 2 //此处以iframe举例
          , title: '当你选择该窗体时，即会在最顶端'
          , area: ['390px', '260px']
          , shade: 0
          , maxmin: true
          , offset: [ //为了演示，随机坐标
            Math.random() * ($(window).height() - 300)
            , Math.random() * ($(window).width() - 390)
          ]
          , content: '//layer.layui.com/test/settop.html'
          , btn: ['继续弹出', '全部关闭'] //只是为了演示
          , yes: function () {
            $(that).click();
          }
          , btn2: function () {
            layer.closeAll();
          }

          , zIndex: layer.zIndex //重点1
          , success: function (layero) {
            layer.setTop(layero); //重点2
          }
        });
      },
      notice: function () {
        //示范一个公告层
        layer.open({
          type: 1
          ,
          title: false //不显示标题栏
          ,
          closeBtn: false
          ,
          area: '300px;'
          ,
          shade: 0.8
          ,
          id: 'LAY_layuipro' //设定一个id，防止重复弹出
          ,
          btn: ['火速围观', '残忍拒绝']
          ,
          btnAlign: 'c'
          ,
          moveType: 1 //拖拽模式，0或者1
          ,
          content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">你知道吗？亲！<br>layer ≠ layui<br><br>layer只是作为Layui的一个弹层模块，由于其用户基数较大，所以常常会有人以为layui是layerui<br><br>layer虽然已被 Layui 收编为内置的弹层模块，但仍然会作为一个独立组件全力维护、升级。<br><br>我们此后的征途是星辰大海 ^_^</div>'
          ,

          success: function (layero) {
            var btn = layero.find('.layui-layer-btn');
            btn.find('.layui-layer-btn0').attr({
              href: 'http://www.layui.com/'
              , target: '_blank'
            });
          }
        });
      }
    }

    $('#layerDemo .layui-btn').on('click', function () {
      var othis = $(this), method = othis.data('method');
      active[method] ? active[method].call(this, othis) : '';
    });
  });
</script>

<style scoped>
   .updateinformation {
    background-color: wheat;
    width: 32%;
    display: none;
    position: absolute;
    top: 160px;
    left: 35%;
  }

  .updateUserInformation {
    font-size: 20px;
    margin: 0 0 10px 30px;
  }
</style>
