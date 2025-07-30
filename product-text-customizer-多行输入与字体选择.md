{% comment %}
  版本 3.2: 添加更多艺术和卡通字体
  - 在 @font-face 规则中注册了多种新的 Google Fonts 字体。
  - 在三个字体选择下拉菜单中同步更新了所有新字体的 <option>。
  - JavaScript 部分无需任何改动，展示了良好扩展性。
{% endcomment %}

<!-- [更新] 使用 Shopify 的 @font-face 方法加载更多字体 -->
<style>
  {%- assign font_families = "Lobster,Pacifico,Roboto,Playfair Display,Sacramento,Great Vibes,Cinzel Decorative,Comic Neue,Bangers,Fredoka One,Luckiest Guy,Press Start 2P" | split: "," -%}
  {%- for font_family in font_families -%}
    @font-face {
      font-family: "{{ font_family }}";
      src: url("{{ font_family | font_url }}");
    }
  {%- endfor -%}
</style>

<style>
  .color-swatch.active {
    @apply ring-2 ring-offset-2 ring-indigo-600 ring-offset-white;
  }
</style>

<div class="page-width py-10 border-t border-gray-200">
  <div class="customizer-container flex flex-wrap gap-8">
    
    <div class="customizer-controls w-full md:w-1/3">
      <h3 class="text-xl font-bold mb-6">设计你的标签</h3>
      
      <!-- 各项控件 (无变化) -->
      <div class="control-group mb-5"><label class="block text-sm font-medium text-gray-700 mb-2">1. 选择标签尺寸:</label><div id="size-selector" class="flex items-center gap-4"><div><input type="radio" id="size-60x15" name="label-size" value="60x15" class="hidden peer" checked><label for="size-60x15" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100"><div class="block"><div class="w-full text-sm font-semibold">2.36" x 0.59"</div><div class="w-full text-xs">60 x 15 mm</div></div></label></div><div><input type="radio" id="size-60x20" name="label-size" value="60x20" class="hidden peer"><label for="size-60x20" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100"><div class="block"><div class="w-full text-sm font-semibold">2.36" x 0.79"</div><div class="w-full text-xs">60 x 20 mm</div></div></label></div></div></div>
      <div class="control-group mb-5"><label class="block text-sm font-medium text-gray-700 mb-2">选择标签材质:</label><div id="material-selector" class="flex items-center gap-4"><div><input type="radio" id="material-fabric" name="label-material" value="{{ 'fabric.jpg' | asset_url }}" class="hidden peer" checked><label for="material-fabric" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100"><div class="block"><div class="w-full text-sm font-semibold">布料</div><div class="w-full text-xs">Fabric</div></div></label></div><div><input type="radio" id="material-leather" name="label-material" value="{{ 'leather.jpg' | asset_url }}" class="hidden peer"><label for="material-leather" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100"><div class="block"><div class="w-full text-sm font-semibold">皮革</div><div class="w-full text-xs">Leather</div></div></label></div></div></div>
      <div class="control-group mb-5"><label class="block text-sm font-medium text-gray-700 mb-2">2. 选择固定方式:</label><div id="fixing-type-selector" class="flex items-center gap-4"><div><input type="radio" id="sew-on" name="fixing-type" value="Sew On" class="hidden peer" checked><label for="sew-on" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100"><div class="block"><div class="w-full text-sm font-semibold">缝纫</div><div class="w-full text-xs">Sew On</div></div></label></div><div><input type="radio" id="iron-on" name="fixing-type" value="Iron On" class="hidden peer"><label for="iron-on" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100"><div class="block"><div class="w-full text-sm font-semibold">熨烫</div><div class="w-full text-xs">Iron On</div></div></label></div></div></div>
      <div class="control-group mb-5"><label class="block text-sm font-medium text-gray-700 mb-2">3. 选择标签颜色:</label><div id="label-color-selector" class="flex flex-wrap gap-2"><div title="White" data-color-name="White" data-color-hex="#FFFFFF" class="color-swatch active w-9 h-9 rounded-full cursor-pointer bg-cover bg-center transition hover:opacity-75" style="background-image: url('{{ "white.jpg" | asset_url }}')"> </div><div title="Apple Green" data-color-name="Apple Green" data-color-hex="#77B800" class="color-swatch w-9 h-9 rounded-full cursor-pointer bg-cover bg-center transition hover:opacity-75" style="background-image: url('{{ "applegreen.jpg" | asset_url }}')"> </div><div title="Black" data-color-name="Black" data-color-hex="#000000" class="color-swatch w-9 h-9 rounded-full cursor-pointer bg-cover bg-center transition hover:opacity-75" style="background-image: url('{{ "black.jpg" | asset_url }}')"> </div><div title="Blue" data-color-name="Blue" data-color-hex="#0000FF" class="color-swatch w-9 h-9 rounded-full cursor-pointer bg-cover bg-center transition hover:opacity-75" style="background-image: url('{{ "blue.jpg" | asset_url }}')"> </div><div title="Brown" data-color-name="Brown" data-color-hex="#A52A2A" class="color-swatch w-9 h-9 rounded-full cursor-pointer bg-cover bg-center transition hover:opacity-75" style="background-image: url('{{ "brown.jpg" | asset_url }}')"> </div><div title="Red" data-color-name="Red" data-color-hex="#FF0000" class="color-swatch w-9 h-9 rounded-full cursor-pointer bg-cover bg-center transition hover:opacity-75" style="background-image: url('{{ "red.jpg" | asset_url }}')"> </div></div></div>
      <div class="control-group mb-5"><label class="block text-sm font-medium text-gray-700 mb-2">4. 选择色彩模式:</label><div id="pure-color-selector" class="flex items-center gap-4"><div><input type="radio" id="pure-color-standard" name="pure-color" value="Standard" class="hidden peer" checked><label for="pure-color-standard" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100"><div class="block"><div class="w-full text-sm font-semibold">标准</div><div class="w-full text-xs">Standard (show texture)</div></div></label></div><div><input type="radio" id="pure-color-on" name="pure-color" value="Pure Color" class="hidden peer"><label for="pure-color-on" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100"><div class="block"><div class="w-full text-sm font-semibold">纯色</div><div class="w-full text-xs">With Pure Color</div></div></label></div></div></div>

      <!-- [更新] 5. Text 定制 -->
      <div class="control-group mb-5">
        <label class="block text-sm font-medium text-gray-700 mb-2">5. 定制你的文字:</label>
        
        <div id="text-rows-container" class="space-y-4">
          <!-- Text Row 1 -->
          <div class="text-row-item border p-3 rounded-md">
            <label for="text-input-1" class="block text-xs font-medium text-gray-500">Text Row 1</label>
            <input type="text" id="text-input-1" data-row-index="0" placeholder="第一行文字" class="text-input w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mb-2">
            <label for="font-selector-1" class="block text-xs font-medium text-gray-500 mt-2">Choose Font</label>
            <select id="font-selector-1" data-row-index="0" class="font-selector w-full p-2 border border-gray-300 rounded-md shadow-sm">
              <option value="Roboto" style="font-family: 'Roboto', sans-serif;">Roboto</option>
              <option value="Playfair Display" style="font-family: 'Playfair Display', serif;">Playfair Display</option>
              <option value="Lobster" style="font-family: 'Lobster', cursive;">Lobster</option>
              <option value="Pacifico" style="font-family: 'Pacifico', cursive;">Pacifico</option>
              <!-- [新增字体] -->
              <option value="Sacramento" style="font-family: 'Sacramento', cursive;">Sacramento</option>
              <option value="Great Vibes" style="font-family: 'Great Vibes', cursive;">Great Vibes</option>
              <option value="Cinzel Decorative" style="font-family: 'Cinzel Decorative', cursive;">Cinzel Decorative</option>
              <option value="Comic Neue" style="font-family: 'Comic Neue', cursive;">Comic Neue</option>
              <option value="Bangers" style="font-family: 'Bangers', cursive;">Bangers</option>
              <option value="Fredoka One" style="font-family: 'Fredoka One', cursive;">Fredoka One</option>
              <option value="Luckiest Guy" style="font-family: 'Luckiest Guy', cursive;">Luckiest Guy</option>
              <option value="Press Start 2P" style="font-family: 'Press Start 2P', cursive;">Press Start 2P</option>
              <option value="Arial" style="font-family: Arial, sans-serif;">Arial</option>
              <option value="Georgia" style="font-family: Georgia, serif;">Georgia</option>
            </select>
          </div>
          <!-- Text Row 2 -->
          <div class="text-row-item border p-3 rounded-md">
            <label for="text-input-2" class="block text-xs font-medium text-gray-500">Text Row 2</label>
            <input type="text" id="text-input-2" data-row-index="1" placeholder="第二行文字" class="text-input w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mb-2">
            <label for="font-selector-2" class="block text-xs font-medium text-gray-500 mt-2">Choose Font</label>
            <select id="font-selector-2" data-row-index="1" class="font-selector w-full p-2 border border-gray-300 rounded-md shadow-sm">
              <option value="Roboto" style="font-family: 'Roboto', sans-serif;">Roboto</option>
              <option value="Playfair Display" style="font-family: 'Playfair Display', serif;">Playfair Display</option>
              <option value="Lobster" style="font-family: 'Lobster', cursive;">Lobster</option>
              <option value="Pacifico" style="font-family: 'Pacifico', cursive;">Pacifico</option>
              <!-- [新增字体] -->
              <option value="Sacramento" style="font-family: 'Sacramento', cursive;">Sacramento</option>
              <option value="Great Vibes" style="font-family: 'Great Vibes', cursive;">Great Vibes</option>
              <option value="Cinzel Decorative" style="font-family: 'Cinzel Decorative', cursive;">Cinzel Decorative</option>
              <option value="Comic Neue" style="font-family: 'Comic Neue', cursive;">Comic Neue</option>
              <option value="Bangers" style="font-family: 'Bangers', cursive;">Bangers</option>
              <option value="Fredoka One" style="font-family: 'Fredoka One', cursive;">Fredoka One</option>
              <option value="Luckiest Guy" style="font-family: 'Luckiest Guy', cursive;">Luckiest Guy</option>
              <option value="Press Start 2P" style="font-family: 'Press Start 2P', cursive;">Press Start 2P</option>
              <option value="Arial" style="font-family: Arial, sans-serif;">Arial</option>
              <option value="Georgia" style="font-family: Georgia, serif;">Georgia</option>
            </select>
          </div>
          <!-- Text Row 3 -->
          <div class="text-row-item border p-3 rounded-md">
            <label for="text-input-3" class="block text-xs font-medium text-gray-500">Text Row 3</label>
            <input type="text" id="text-input-3" data-row-index="2" placeholder="第三行文字" class="text-input w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mb-2">
            <label for="font-selector-3" class="block text-xs font-medium text-gray-500 mt-2">Choose Font</label>
            <select id="font-selector-3" data-row-index="2" class="font-selector w-full p-2 border border-gray-300 rounded-md shadow-sm">
              <option value="Roboto" style="font-family: 'Roboto', sans-serif;">Roboto</option>
              <option value="Playfair Display" style="font-family: 'Playfair Display', serif;">Playfair Display</option>
              <option value="Lobster" style="font-family: 'Lobster', cursive;">Lobster</option>
              <option value="Pacifico" style="font-family: 'Pacifico', cursive;">Pacifico</option>
              <!-- [新增字体] -->
              <option value="Sacramento" style="font-family: 'Sacramento', cursive;">Sacramento</option>
              <option value="Great Vibes" style="font-family: 'Great Vibes', cursive;">Great Vibes</option>
              <option value="Cinzel Decorative" style="font-family: 'Cinzel Decorative', cursive;">Cinzel Decorative</option>
              <option value="Comic Neue" style="font-family: 'Comic Neue', cursive;">Comic Neue</option>
              <option value="Bangers" style="font-family: 'Bangers', cursive;">Bangers</option>
              <option value="Fredoka One" style="font-family: 'Fredoka One', cursive;">Fredoka One</option>
              <option value="Luckiest Guy" style="font-family: 'Luckiest Guy', cursive;">Luckiest Guy</option>
              <option value="Press Start 2P" style="font-family: 'Press Start 2P', cursive;">Press Start 2P</option>
              <option value="Arial" style="font-family: Arial, sans-serif;">Arial</option>
              <option value="Georgia" style="font-family: Georgia, serif;">Georgia</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- 全局字体大小和颜色 -->
      <div class="control-group mb-5"><label for="font-size-input" class="block text-sm font-medium text-gray-700 mb-1">字体大小 (应用于所有行):</label><input type="number" id="font-size-input" value="20" min="8" max="72" class="w-full p-2 border border-gray-300 rounded-md shadow-sm"></div>
      <div class="control-group mb-5"><label for="color-input" class="block text-sm font-medium text-gray-700 mb-1">字体颜色 (应用于所有行):</label><input type="color" id="color-input" value="#000000" class="w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer"></div>

      <button id="add-to-cart-btn" class="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">添加到购物车</button>
    </div>

    <div class="canvas-wrapper w-full md:flex-1 bg-gray-50 border border-gray-200 rounded-md">
      <div id="konva-container"></div>
    </div>
  </div>
</div>

<script>
// JavaScript部分完全不变
const initializeKonvaApp = (sectionElement) => {
  const konvaContainer = sectionElement.querySelector('#konva-container');
  if (!konvaContainer || konvaContainer.dataset.initialized === 'true') return;
  konvaContainer.dataset.initialized = 'true';

  console.log("Konva: 初始化开始 (版本 3.2 - 更多字体)...");

  // --- 1. 获取所有 HTML 元素 ---
  const sizeSelector = sectionElement.querySelector('#size-selector');
  const fixingTypeSelector = sectionElement.querySelector('#fixing-type-selector');
  const materialSelector = sectionElement.querySelector('#material-selector');
  const labelColorSelector = sectionElement.querySelector('#label-color-selector');
  const pureColorSelector = sectionElement.querySelector('#pure-color-selector');
  const textRowsContainer = sectionElement.querySelector('#text-rows-container');
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
  const stage = new Konva.Stage({ container: konvaContainer, width: baseWidth, height: initialHeight });
  const mainLayer = new Konva.Layer();
  stage.add(mainLayer);
  const guideLayer = new Konva.Layer();
  stage.add(guideLayer);
  const backgroundRect = new Konva.Rect({ x: 0, y: 0, width: baseWidth, height: initialHeight, fill: '#f0f0f0' });
  mainLayer.add(backgroundRect);
  const colorOverlayRect = new Konva.Rect({ x: 0, y: 0, width: baseWidth, height: initialHeight, fill: '#FFFFFF', opacity: 0, name: 'color-overlay' });
  mainLayer.add(colorOverlayRect);
  const textObjects = [];
  const NUM_TEXT_ROWS = 3;
  for (let i = 0; i < NUM_TEXT_ROWS; i++) {
    const textNode = new Konva.Text({
      x: stage.width() / 2, y: 0,
      text: i === 0 ? '第一行文字' : '',
      fontSize: 20, fontFamily: 'Roboto', fill: '#000000', draggable: true, name: `text-line-${i}`
    });
    textObjects.push(textNode);
    mainLayer.add(textNode);
  }

  // --- 3. 定义可重用的函数 ---
  const GUIDELINE_OFFSET = 5;
  const repositionAllTexts = () => {
    const activeTexts = textObjects.filter(t => t.text());
    if (activeTexts.length === 0) return;
    const totalHeight = activeTexts.reduce((sum, t) => sum + t.height(), 0);
    let startY = (stage.height() - totalHeight) / 2;
    textObjects.forEach(textNode => {
      textNode.x(stage.width() / 2);
      textNode.offsetX(textNode.width() / 2);
      if (textNode.text()) {
        textNode.y(startY);
        textNode.offsetY(0);
        startY += textNode.height();
      } else {
        textNode.y(-1000);
      }
    });
    mainLayer.batchDraw();
  };
  const updateCanvasSize = (newSizeValue) => {
    const newRatio = sizeRatios[newSizeValue];
    const newHeight = baseWidth * newRatio;
    konvaContainer.style.height = `${newHeight}px`;
    stage.height(newHeight);
    backgroundRect.height(newHeight);
    colorOverlayRect.height(newHeight);
    repositionAllTexts();
    stage.batchDraw();
  };
  const applyBaseMaterial = (materialUrl) => { const imageObj = new Image(); imageObj.crossOrigin = 'Anonymous'; imageObj.onload = () => { backgroundRect.fillPatternImage(imageObj); backgroundRect.fillPatternRepeat('repeat'); backgroundRect.fill(null); mainLayer.batchDraw(); }; imageObj.src = materialUrl; };
  const applyLabelColor = (colorHex) => { colorOverlayRect.fill(colorHex); const isPureColor = pureColorSelector.querySelector('#pure-color-on').checked; if (isPureColor) { colorOverlayRect.opacity(1.0); } else { if (colorHex.toUpperCase() === '#FFFFFF') { colorOverlayRect.opacity(0); } else { colorOverlayRect.opacity(0.7); } } mainLayer.batchDraw(); };
  function getLineGuideStops() { const vertical = [0, stage.width() / 2, stage.width()]; const horizontal = [0, stage.height() / 2, stage.height()]; return { vertical, horizontal }; }
  function getObjectSnappingEdges(node) { const box = node.getClientRect(); const absPos = node.absolutePosition(); return { vertical: [ { guide: Math.round(box.x), offset: Math.round(absPos.x - box.x), snap: 'start' }, { guide: Math.round(box.x + box.width / 2), offset: Math.round(absPos.x - box.x - box.width / 2), snap: 'center' }, { guide: Math.round(box.x + box.width), offset: Math.round(absPos.x - box.x - box.width), snap: 'end' }, ], horizontal: [ { guide: Math.round(box.y), offset: Math.round(absPos.y - box.y), snap: 'start' }, { guide: Math.round(box.y + box.height / 2), offset: Math.round(absPos.y - box.y - box.height / 2), snap: 'center' }, { guide: Math.round(box.y + box.height), offset: Math.round(absPos.y - box.y - box.height), snap: 'end' }, ], }; }
  function drawGuides(guides) { guides.forEach((lg) => { let line = new Konva.Line({ points: lg.orientation === 'H' ? [-6000, 0, 6000, 0] : [0, -6000, 0, 6000], stroke: 'rgb(0, 161, 255)', strokeWidth: 1, name: 'guid-line', dash: [4, 6], }); guideLayer.add(line); line.absolutePosition({ x: lg.lineGuide, y: lg.lineGuide }); }); }

  // --- 4. 绑定所有事件监听器 ---
  sizeSelector.addEventListener('change', (e) => { if (e.target.name === 'label-size') { updateCanvasSize(e.target.value); } });
  materialSelector.addEventListener('change', (e) => { if (e.target.name === 'label-material') { applyBaseMaterial(e.target.value); } });
  labelColorSelector.addEventListener('click', (e) => { const swatch = e.target.closest('.color-swatch'); if (!swatch) return; labelColorSelector.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active')); swatch.classList.add('active'); const newColor = swatch.dataset.colorHex; applyLabelColor(newColor); });
  pureColorSelector.addEventListener('change', () => { const activeSwatch = labelColorSelector.querySelector('.color-swatch.active'); if (activeSwatch) { applyLabelColor(activeSwatch.dataset.colorHex); } });
  textRowsContainer.addEventListener('input', (e) => { if (e.target.classList.contains('text-input')) { const index = e.target.dataset.rowIndex; const textNode = textObjects[index]; textNode.text(e.target.value); repositionAllTexts(); } });
  textRowsContainer.addEventListener('change', (e) => { if (e.target.classList.contains('font-selector')) { const index = e.target.dataset.rowIndex; const textNode = textObjects[index]; textNode.fontFamily(e.target.value); repositionAllTexts(); } });
  fontSizeInput.addEventListener('input', (e) => { const newSize = parseInt(e.target.value, 10); textObjects.forEach(textNode => textNode.fontSize(newSize)); repositionAllTexts(); });
  colorInput.addEventListener('input', (e) => { textObjects.forEach(textNode => textNode.fill(e.target.value)); mainLayer.batchDraw(); });
  mainLayer.on('dragmove', (e) => { guideLayer.find('.guid-line').forEach((l) => l.destroy()); const lineGuideStops = getLineGuideStops(); const itemBounds = getObjectSnappingEdges(e.target); const guides = []; lineGuideStops.vertical.forEach((lineGuide) => { itemBounds.vertical.forEach((itemBound) => { const diff = Math.abs(lineGuide - itemBound.guide); if (diff < GUIDELINE_OFFSET) { e.target.x(Math.round(e.target.x() - (itemBound.guide - lineGuide))); guides.push({ lineGuide, orientation: 'V' }); } }); }); lineGuideStops.horizontal.forEach((lineGuide) => { itemBounds.horizontal.forEach((itemBound) => { const diff = Math.abs(lineGuide - itemBound.guide); if (diff < GUIDELINE_OFFSET) { e.target.y(Math.round(e.target.y() - (itemBound.guide - lineGuide))); guides.push({ lineGuide, orientation: 'H' }); } }); }); drawGuides(guides); guideLayer.batchDraw(); });
  mainLayer.on('dragend', () => { guideLayer.find('.guid-line').forEach((l) => l.destroy()); guideLayer.batchDraw(); });
  addToCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    guideLayer.destroyChildren();
    const productForm = document.querySelector('form[action*="/cart/add"]');
    const variantIdInput = productForm ? productForm.querySelector('[name="id"]') : null;
    if (!variantIdInput || !variantIdInput.value) { alert('错误：找不到产品变体ID。'); return; }
    const properties = {
      'CustomTextPreview': stage.toDataURL({ mimeType: 'image/jpeg', quality: 0.7 }),
      '尺寸': sizeSelector.querySelector('input[name="label-size"]:checked').value,
      '固定方式': fixingTypeSelector.querySelector('input[name="fixing-type"]:checked').value,
      '材质': materialSelector.querySelector('input[name="label-material"]:checked').nextElementSibling.querySelector('.text-xs').textContent,
      '标签颜色': labelColorSelector.querySelector('.color-swatch.active')?.dataset.colorName || 'N/A',
      '色彩模式': pureColorSelector.querySelector('input[name="pure-color"]:checked').value,
      '字体大小': fontSizeInput.value,
      '字体颜色': colorInput.value,
    };
    for (let i = 0; i < NUM_TEXT_ROWS; i++) {
      const textVal = sectionElement.querySelector(`#text-input-${i+1}`).value;
      if (textVal) {
        properties[`Text Line ${i+1}`] = textVal;
        properties[`Font Line ${i+1}`] = sectionElement.querySelector(`#font-selector-${i+1}`).value;
      }
    }
    const formData = { items: [{ id: variantIdInput.value, quantity: 1, properties }] };
    fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      .then(res => res.json()).then(data => { if (!data.status) { window.location.href = '/cart'; } else { alert('添加失败: ' + data.description); }})
      .catch(console.error);
  });

  // --- 5. 最终初始化 ---
  const initialMaterialUrl = materialSelector.querySelector('input[name="label-material"]:checked').value;
  applyBaseMaterial(initialMaterialUrl);
  const initialColorSwatch = labelColorSelector.querySelector('.color-swatch.active');
  if (initialColorSwatch) { applyLabelColor(initialColorSwatch.dataset.colorHex); }
  repositionAllTexts();
  stage.batchDraw();
  console.log("Konva: 初始化流程完成！ (版本 3.2)");
};
  
// ---- 启动器代码 (bootstrapper) ----
const bootstrapper = () => { const konvaCheckInterval = setInterval(() => { if (typeof window.Konva !== 'undefined') { clearInterval(konvaCheckInterval); const sectionId = 'shopify-section-{{ section.id }}'; const sectionElement = document.getElementById(sectionId); if (!sectionElement) { console.error('Konva Initializer: Could not find section element with ID:', sectionId); return; } const elementCheckInterval = setInterval(() => { const konvaContainer = sectionElement.querySelector('#konva-container'); if (konvaContainer) { clearInterval(elementCheckInterval); initializeKonvaApp(sectionElement); } }, 100); setTimeout(() => { clearInterval(elementCheckInterval); }, 5000); } }, 100); setTimeout(() => { clearInterval(konvaCheckInterval); }, 5000); };
document.addEventListener('turbo:load', bootstrapper);
document.addEventListener('shopify:section:load', (event) => { const sectionElement = event.target; if (sectionElement && sectionElement.querySelector('#konva-container')) { initializeKonvaApp(sectionElement); } });
if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', bootstrapper); } else { bootstrapper(); }
</script>

{% schema %}
{
  "name": "Product Text Customizer",
  "settings": [],
  "presets": [ { "name": "Product Text Customizer" } ]
}
{% endschema %}