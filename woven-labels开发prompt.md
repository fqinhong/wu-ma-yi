我想使用shopify+Konva.js开发一个类似wunderlabel.com的标签定制化网站，以下是我梳理的功能实现与开发流程。

根据

https://wunderlabel.com/woven-labels/woven-labels-with-text-and-symbol/

这个页面的定制流程：

1、woven-label定制
（1）label size选择
      提供两种label size选择，2.36" x 0.59" (60 x 15 mm) 与 2.36" x 0.79" (60 x 20 mm)。画布根据选择的size显示对应的大小。

      这里wunderlabel的画布大小并非实际的label size大小，比如选择2.36" x 0.59" (60 x 15 mm) 这个尺寸，页面显示的画布大小并不是真正的60 x 15mm，我目测长宽有160 x 60mm左右，像素为774 x 257px，当然这个尺寸和像素我观察了，会根据浏览器窗口大小的调整而变化，比如我窗口放大了到125%，长宽变成了180 x 70mm，像素变成了833 x 277px。

      所以我也想实现同样的功能，即有两种label size供客户选择。

      另外，对于画布，我目前已经实现了元素的智能对齐，像在figma中一样。

（2）label material选择
      画布提供fabric和leather两种选择，选择相应的材质，则会把画布调整为这个材质的。

（3）Sew On / Iron On 选择
    提供缝纫Sew On和熨烫Iron On两种选择，使用单选框实现的

2、Color定制
  （1）Label Color选择
      这里提供了颜色标签进行选择，样式是圆的。需要注意的是，颜色标签并不是#ffffff这种纯色图标，而是采用相关颜色图片作为背景图的方式来实现。比如wunderlabel的代码如下：
      <div class="wl---flex--item wl---flex--item__20 Reset-Color1">
				<div class="item-color text-color flag-trigger Reset Color1" title="Apple Green" data-input="applegreen" data-group="standard" id="Color1-applegreen" data-hex="#77B800" data-dynamic="" data-input-target="Color1">
							<div class="item_image item_image_bg_cover" style="background-image: url(/assets/products/images/yarn-color/applegreen.jpg)"></div>
				</div>
			</div>

      我事先已经把所有需要的颜色图片已上传至Shopify theme的Assets文件夹里，都是jpg结尾的文件。

      当选择颜色按钮时，wunderlabel的画布上就会有对应的颜色“叠加”到前面选择的画布材质上，但依然能看清画布的材质，我猜想实现的方法应该是预先设置好对应的颜色，然后根据选择哪个颜色按钮，直接铺满画布。由于事先调整了颜色的透明度，所以可以看到画布。当然这是我自己的猜想，因为我查看wunderlabel的代码，没有发现是如何达成的。你有好的思路也可以告诉我。


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

所以，请根据以上这个定制流程，开发属于我们的定制流程，让我们一步步来，目前“1、woven-label定制”的所有功能已实现，现在让我们从 “2、Color定制的（1）Label Color选择” 开始进行。

以下是product-text-customizer.liquid中的所有代码：
{% comment %}
  最终决战版: 我们不再依赖任何CSS来设定尺寸。
  脚本将直接用 JavaScript 为画布容器赋予一个固定的尺寸，
  以此来对抗主题中可能存在的、用于重置高度的脚本。
{% endcomment %}

<div class="page-width py-10 border-t border-gray-200">
  <div class="customizer-container flex flex-wrap gap-8">
    
    <div class="customizer-controls w-full md:w-1/3">
      <h3 class="text-xl font-bold mb-6">设计你的标签</h3>
      
      <!-- 标签尺寸选择 -->
      <div class="control-group mb-5">
        <label class="block text-sm font-medium text-gray-700 mb-2">1. 选择标签尺寸:</label>
        <div id="size-selector" class="flex items-center gap-4">
          
          <div>
            <input type="radio" id="size-60x15" name="label-size" value="60x15" class="hidden peer" checked>
            <label for="size-60x15" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100">                           
              <div class="block">
                <div class="w-full text-sm font-semibold">2.36" x 0.59"</div>
                <div class="w-full text-xs">60 x 15 mm</div>
              </div>
            </label>
          </div>

          <div>
            <input type="radio" id="size-60x20" name="label-size" value="60x20" class="hidden peer">
            <label for="size-60x20" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100">
              <div class="block">
                <div class="w-full text-sm font-semibold">2.36" x 0.79"</div>
                <div class="w-full text-xs">60 x 20 mm</div>
              </div>
            </label>
          </div>

        </div>
      </div>
      
      <!-- 标签材质选择 -->
      <div class="control-group mb-5">
        <label class="block text-sm font-medium text-gray-700 mb-2">选择标签材质:</label>
        <div id="material-selector" class="flex items-center gap-4">
          
          <div>
            <!-- 默认选中 Fabric -->
            <input type="radio" id="material-fabric" name="label-material" value="{{ 'fabric.jpg' | asset_url }}" class="hidden peer" checked>
            <label for="material-fabric" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100">                           
              <div class="block">
                <div class="w-full text-sm font-semibold">布料</div>
                <div class="w-full text-xs">Fabric</div>
              </div>
            </label>
          </div>

          <div>
            <input type="radio" id="material-leather" name="label-material" value="{{ 'leather.jpg' | asset_url }}" class="hidden peer">
            <label for="material-leather" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100">
              <div class="block">
                <div class="w-full text-sm font-semibold">皮革</div>
                <div class="w-full text-xs">Leather</div>
              </div>
            </label>
          </div>

        </div>
      </div>

      <!-- 标签“缝纫/熨烫”选择 -->
      <div class="control-group mb-5">
        <label class="block text-sm font-medium text-gray-700 mb-2">2. 选择固定方式:</label>
        <div id="fixing-type-selector" class="flex items-center gap-4">
          
          <div>
            <input type="radio" id="sew-on" name="fixing-type" value="Sew On" class="hidden peer" checked>
            <label for="sew-on" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100">                           
              <div class="block">
                <div class="w-full text-sm font-semibold">缝纫</div>
                <div class="w-full text-xs">Sew On</div>
              </div>
            </label>
          </div>

          <div>
            <input type="radio" id="iron-on" name="fixing-type" value="Iron On" class="hidden peer">
            <label for="iron-on" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100">
              <div class="block">
                <div class="w-full text-sm font-semibold">熨烫</div>
                <div class="w-full text-xs">Iron On</div>
              </div>
            </label>
          </div>

        </div>
      </div>

      <div class="control-group mb-5">
        <label for="text-input" class="block text-sm font-medium text-gray-700 mb-1">输入文字:</label>
        <input type="text" id="text-input" placeholder="你的文字" class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
      </div>
      <div class="control-group mb-5">
        <label for="font-size-input" class="block text-sm font-medium text-gray-700 mb-1">字体大小:</label>
        <input type="number" id="font-size-input" value="20" min="8" max="72" class="w-full p-2 border border-gray-300 rounded-md shadow-sm">
      </div>
      <div class="control-group mb-5">
        <label for="color-input" class="block text-sm font-medium text-gray-700 mb-1">字体颜色:</label>
        <input type="color" id="color-input" value="#000000" class="w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer">
      </div>
      <button id="add-to-cart-btn" class="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        添加到购物车
      </button>
    </div>

    <div class="canvas-wrapper w-full md:flex-1 bg-gray-50 border border-gray-200 rounded-md">
      <div id="konva-container"></div>
    </div>

  </div>
</div>

<script>
  
  const initializeKonvaApp = (sectionElement) => {
  const konvaContainer = sectionElement.querySelector('#konva-container');
  if (!konvaContainer || konvaContainer.dataset.initialized === 'true') return;
  konvaContainer.dataset.initialized = 'true';

  console.log("Konva: 初始化开始...");

  // --- 1. 获取所有 HTML 元素 ---
  const sizeSelector = sectionElement.querySelector('#size-selector');
  const fixingTypeSelector = sectionElement.querySelector('#fixing-type-selector');
  const materialSelector = sectionElement.querySelector('#material-selector');
  const textInput = sectionElement.querySelector('#text-input');
  const fontSizeInput = sectionElement.querySelector('#font-size-input');
  const colorInput = sectionElement.querySelector('#color-input');
  const addToCartBtn = sectionElement.querySelector('#add-to-cart-btn');

  // --- 2. 初始化画布和 Konva 对象 ---
  const baseWidth = konvaContainer.parentElement.clientWidth || 500;
  const sizeRatios = { '60x15': 15 / 60, '60x20': 20 / 60 };
  const initialSizeValue = sizeSelector.querySelector('input[name="label-size"]:checked').value;
  const initialHeight = baseWidth * sizeRatios[initialSizeValue];

  konvaContainer.style.width = `${baseWidth}px`;
  konvaContainer.style.height = `${initialHeight}px`;
  konvaContainer.style.border = '2px dashed blue';

  const stage = new Konva.Stage({ container: konvaContainer, width: baseWidth, height: initialHeight });
  
  // 创建图层
  const mainLayer = new Konva.Layer();
  stage.add(mainLayer);
  const guideLayer = new Konva.Layer(); // 用于绘制对齐线的图层
  stage.add(guideLayer);

  // 创建对象并添加到主图层
  const backgroundRect = new Konva.Rect({ x: 0, y: 0, width: baseWidth, height: initialHeight, fill: '#f0f0f0' });
  mainLayer.add(backgroundRect);

  const konvaText = new Konva.Text({ x: stage.width() / 2, y: stage.height() / 2, text: '你的文字', fontSize: 30, fontFamily: 'Arial', fill: '#000000', draggable: true });
  mainLayer.add(konvaText);
  konvaText.offsetX(konvaText.width() / 2);
  konvaText.offsetY(konvaText.height() / 2);

  // --- 3. 定义可重用的函数 ---

  // 智能对齐线核心逻辑
  const GUIDELINE_OFFSET = 5;

  function getLineGuideStops() {
    const vertical = [0, stage.width() / 2, stage.width()];
    const horizontal = [0, stage.height() / 2, stage.height()];
    return { vertical, horizontal };
  }

  function getObjectSnappingEdges(node) {
    const box = node.getClientRect();
    const absPos = node.absolutePosition();
    return {
      vertical: [
        { guide: Math.round(box.x), offset: Math.round(absPos.x - box.x), snap: 'start' },
        { guide: Math.round(box.x + box.width / 2), offset: Math.round(absPos.x - box.x - box.width / 2), snap: 'center' },
        { guide: Math.round(box.x + box.width), offset: Math.round(absPos.x - box.x - box.width), snap: 'end' },
      ],
      horizontal: [
        { guide: Math.round(box.y), offset: Math.round(absPos.y - box.y), snap: 'start' },
        { guide: Math.round(box.y + box.height / 2), offset: Math.round(absPos.y - box.y - box.height / 2), snap: 'center' },
        { guide: Math.round(box.y + box.height), offset: Math.round(absPos.y - box.y - box.height), snap: 'end' },
      ],
    };
  }
  
  function drawGuides(guides) {
    guides.forEach((lg) => {
      let line = new Konva.Line({
        points: lg.orientation === 'H' ? [-6000, 0, 6000, 0] : [0, -6000, 0, 6000],
        stroke: 'rgb(0, 161, 255)',
        strokeWidth: 1,
        name: 'guid-line',
        dash: [4, 6],
      });
      guideLayer.add(line);
      line.absolutePosition({ x: lg.lineGuide, y: lg.lineGuide });
    });
  }
  
  // 函数：更新画布尺寸
  const updateCanvasSize = (newSizeValue) => {
    const newRatio = sizeRatios[newSizeValue];
    const newHeight = baseWidth * newRatio;
    konvaContainer.style.height = `${newHeight}px`;
    stage.height(newHeight);
    backgroundRect.height(newHeight);
    konvaText.position({ x: baseWidth / 2, y: newHeight / 2 });
    stage.batchDraw();
  };

  // 函数：加载并应用基础材质图片
  const applyBaseMaterial = (materialUrl) => {
    const imageObj = new Image();
    imageObj.crossOrigin = 'Anonymous';
    imageObj.onload = () => {
      backgroundRect.fillPatternImage(imageObj);
      backgroundRect.fillPatternRepeat('repeat');
      backgroundRect.fill(null);
      mainLayer.batchDraw();
    };
    imageObj.src = materialUrl;
  };

  // --- 4. 绑定所有事件监听器 ---

  sizeSelector.addEventListener('change', (e) => {
    if (e.target.name === 'label-size') { updateCanvasSize(e.target.value); }
  });

  materialSelector.addEventListener('change', (e) => {
    if (e.target.name === 'label-material') { applyBaseMaterial(e.target.value); }
  });
  
  textInput.addEventListener('input', (e) => { konvaText.text(e.target.value || ' '); konvaText.offsetX(konvaText.width() / 2); mainLayer.batchDraw(); });
  fontSizeInput.addEventListener('input', (e) => { konvaText.fontSize(parseInt(e.target.value, 10)); konvaText.offsetX(konvaText.width()/2); konvaText.offsetY(konvaText.height()/2); mainLayer.batchDraw(); });
  colorInput.addEventListener('input', (e) => { konvaText.fill(e.target.value); mainLayer.batchDraw(); });

  // 智能对齐线的核心事件监听
  mainLayer.on('dragmove', (e) => {
    guideLayer.find('.guid-line').forEach((l) => l.destroy());
    const lineGuideStops = getLineGuideStops();
    const itemBounds = getObjectSnappingEdges(e.target);
    const guides = [];

    lineGuideStops.vertical.forEach((lineGuide) => {
      itemBounds.vertical.forEach((itemBound) => {
        const diff = Math.abs(lineGuide - itemBound.guide);
        if (diff < GUIDELINE_OFFSET) {
          e.target.x(Math.round(e.target.x() - (itemBound.guide - lineGuide)));
          guides.push({ lineGuide, orientation: 'V' });
        }
      });
    });

    lineGuideStops.horizontal.forEach((lineGuide) => {
      itemBounds.horizontal.forEach((itemBound) => {
        const diff = Math.abs(lineGuide - itemBound.guide);
        if (diff < GUIDELINE_OFFSET) {
          e.target.y(Math.round(e.target.y() - (itemBound.guide - lineGuide)));
          guides.push({ lineGuide, orientation: 'H' });
        }
      });
    });

    drawGuides(guides);
    guideLayer.batchDraw(); // 只重绘对齐线图层
  });

  mainLayer.on('dragend', () => {
    guideLayer.find('.guid-line').forEach((l) => l.destroy());
    guideLayer.batchDraw(); // 清除后重绘
  });

  addToCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    guideLayer.destroyChildren(); // 导出前确保对齐线图层是空的

    const productForm = document.querySelector('form[action*="/cart/add"]');
    const variantIdInput = productForm ? productForm.querySelector('[name="id"]') : null;
    if (!variantIdInput || !variantIdInput.value) { alert('错误：找不到产品变体ID。'); return; }
    
    const selectedSize = sizeSelector.querySelector('input[name="label-size"]:checked').value;
    const selectedFixingType = fixingTypeSelector.querySelector('input[name="fixing-type"]:checked').value;
    const selectedMaterialInput = materialSelector.querySelector('input[name="label-material"]:checked');
    const selectedMaterialName = selectedMaterialInput.nextElementSibling.querySelector('.text-xs').textContent;

    const previewImage = stage.toDataURL({ mimeType: 'image/jpeg', quality: 0.7 });

    const formData = {
      items: [{
        id: variantIdInput.value,
        quantity: 1,
        properties: {
          'CustomTextPreview': previewImage,
          '尺寸': selectedSize,
          '固定方式': selectedFixingType,
          '材质': selectedMaterialName,
          '定制文字': textInput.value,
          '字体大小': fontSizeInput.value,
          '字体颜色': colorInput.value,
        }
      }]
    };
    fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      .then(res => res.json()).then(data => { if (!data.status) { window.location.href = '/cart'; } else { alert('添加失败: ' + data.description); }})
      .catch(console.error);
  });
  
  // --- 5. 最终初始化 ---
  const initialMaterialUrl = materialSelector.querySelector('input[name="label-material"]:checked').value;
  applyBaseMaterial(initialMaterialUrl);

  stage.batchDraw();
  console.log("Konva: 初始化流程完成！(带智能对齐线)");
};
  
  // ---- 启动器代码 (bootstrapper) 保持不变 ----
  const bootstrapper = () => {
    const konvaCheckInterval = setInterval(() => {
      if (typeof window.Konva !== 'undefined') {
        clearInterval(konvaCheckInterval);
        const sectionId = 'shopify-section-{{ section.id }}';
        const sectionElement = document.getElementById(sectionId);
        if (!sectionElement) return;
        const elementCheckInterval = setInterval(() => {
          const konvaContainer = sectionElement.querySelector('#konva-container');
          if (konvaContainer) {
            clearInterval(elementCheckInterval);
            initializeKonvaApp(sectionElement);
          }
        }, 100);
        setTimeout(() => { clearInterval(elementCheckInterval); }, 5000);
      }
    }, 100);
    setTimeout(() => { clearInterval(konvaCheckInterval); }, 5000);
  };
  document.addEventListener('turbo:load', bootstrapper);
  document.addEventListener('shopify:section:load', bootstrapper);
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', bootstrapper); } else { bootstrapper(); }
</script>

{% schema %}
{
  "name": "Product Text Customizer",
  "settings": [],
  "presets": [
    {
      "name": "Product Text Customizer"
    }
  ]
}
{% endschema %}

请在这个代码的基础上进行下一步的开发，谢谢。


