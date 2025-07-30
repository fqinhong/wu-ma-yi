我想再梳理一下下一阶段的功能与开发流程。
根据https://wunderlabel.com/woven-labels/woven-labels-with-text-and-symbol/这个页面的定制流程：
1、woven-label定制
（1）label size选择
      提供两种label size选择，2.36" x 0.59" (60 x 15 mm) 与 2.36" x 0.79" (60 x 20 mm)。画布根据选择的size显示对应的大小。

      这里wunderlabel的画布大小并非实际的label size大小，比如选择2.36" x 0.59" (60 x 15 mm) 这个尺寸，页面显示的画布大小并不是真正的60 x 15mm，我目测长宽有160 x 60mm左右，像素为774 x 257px，当然这个尺寸和像素我观察了，会根据浏览器窗口大小的调整而变化，比如我窗口放大了到125%，长宽变成了180 x 70mm，像素变成了833 x 277px。

      所以我也想实现同样的功能，即有两种label size供客户选择。

（2）label texture选择
      wunderlabel目前提供了一种选择，图片是那种编织布的样式，所以我暂时也提供者一种选择，命名为Standard
（3）Sew On / Iron On 选择
    提供缝纫Sew On和熨烫Iron On两种选择，使用单选框实现的

2、Color定制
  （1）Label Color选择
      这里提供了颜色标签进行选择，样式是圆的
  （2）Pure Color选择
      提供Standard (without Pure Color) 与 With Pure Color 两种选择，使用单选框实现的

3、Text定制
  （1）Add Your Text 添加文字
    一共提供了三行文字的输入，Text Row 1，Text Row 2，Text Row 3。每行文字都提供字体选择Choose Font，里面有预设的很多字体
  （2）Text Color选择
      这里提供很多字体颜色选择，颜色的种类和上面Label Color的一样，所以当字体颜色和label color的对比度较低时，则禁止该颜色的选择。比如我label color选择了Dark Pink，则字体颜色就把Dark Pink和pink都禁止了，不能再选择了。

4、Symbol定制
  这里提供了很多symbol进行选择，并进行了分类。点击一个类别，比如hearts，里面都是各种心形的符号。

5、Frame选择
  这里提供了几种woven labels的形状选择，比如长方形的，长方虚线形等等，并有默认形状，就是啥都不选。

所以，请根据Woven Labels的这个定制流程，开发属于我们的定制流程，让我们一步步来。


