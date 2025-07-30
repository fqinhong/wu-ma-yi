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
    const materialSelector = sectionElement.querySelector('#material-selector'); // 新增：材质选择器
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
    const layer = new Konva.Layer();
    stage.add(layer);

    const backgroundRect = new Konva.Rect({ x: 0, y: 0, width: baseWidth, height: initialHeight, fill: '#f0f0f0' });
    layer.add(backgroundRect);

    const konvaText = new Konva.Text({ x: stage.width() / 2, y: stage.height() / 2, text: '你的文字', fontSize: 30, fontFamily: 'Arial', fill: '#000000', draggable: true });
    layer.add(konvaText);
    konvaText.offsetX(konvaText.width() / 2);
    konvaText.offsetY(konvaText.height() / 2);

    // --- 3. 定义可重用的函数 ---

    // 函数：更新画布尺寸
    const updateCanvasSize = (newSizeValue) => {
      const newRatio = sizeRatios[newSizeValue];
      const newHeight = baseWidth * newRatio;
      konvaContainer.style.height = `${newHeight}px`;
      stage.height(newHeight);
      backgroundRect.height(newHeight);
      konvaText.position({ x: baseWidth / 2, y: newHeight / 2 });
      layer.draw();
    };

    // 函数：加载并应用基础材质图片
    const applyBaseMaterial = (materialUrl) => {
      console.log(`applyBaseMaterial: 正在加载基础材质 - ${materialUrl}`);
      const imageObj = new Image();
      imageObj.crossOrigin = 'Anonymous';
      imageObj.onload = () => {
        backgroundRect.fillPatternImage(imageObj);
        backgroundRect.fillPatternRepeat('repeat');
        // 重置纯色填充，确保只显示基础材质
        backgroundRect.fill(null); 
        layer.draw();
        console.log(`applyBaseMaterial: 基础材质加载并应用成功!`);
      };
      imageObj.src = materialUrl;
    };

    // --- 4. 绑定所有事件监听器 ---

    // 尺寸选择器
    sizeSelector.addEventListener('change', (e) => {
      if (e.target.name === 'label-size') { updateCanvasSize(e.target.value); }
    });

    // 【新增】材质选择器
    materialSelector.addEventListener('change', (e) => {
      if (e.target.name === 'label-material') {
        applyBaseMaterial(e.target.value);
      }
    });
    
    // 文本和字体控制
    textInput.addEventListener('input', (e) => { konvaText.text(e.target.value || ' '); konvaText.offsetX(konvaText.width() / 2); layer.draw(); });
    fontSizeInput.addEventListener('input', (e) => { konvaText.fontSize(parseInt(e.target.value, 10)); konvaText.offsetX(konvaText.width()/2); konvaText.offsetY(konvaText.height()/2); layer.draw(); });
    colorInput.addEventListener('input', (e) => { konvaText.fill(e.target.value); layer.draw(); });

    // 添加到购物车
    addToCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
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
            '材质': selectedMaterialName, // <-- 保存清晰的材质名称
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
    // 获取默认选中的材质URL并应用
    const initialMaterialUrl = materialSelector.querySelector('input[name="label-material"]:checked').value;
    applyBaseMaterial(initialMaterialUrl);

    layer.draw();
    console.log("Konva: 初始化流程完成！");
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