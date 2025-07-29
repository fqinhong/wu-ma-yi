const stage = new Konva.Stage({
  container: 'labelCanvas',
  width: 500,
  height: 200,
});
const layer = new Konva.Layer();
stage.add(layer);

function addText() {
  const textNode = new Konva.Text({
    text: '输入文字',
    x: 50,
    y: 80,
    fontSize: 24,
    draggable: true,
    fill: 'black',
  });
  layer.add(textNode);
  layer.draw();
}

function addIcon() {
  Konva.Image.fromURL('https://cdn-icons-png.flaticon.com/512/25/25231.png', function(imageNode) {
    imageNode.setAttrs({
      x: 100,
      y: 100,
      width: 50,
      height: 50,
      draggable: true,
    });
    layer.add(imageNode);
    layer.draw();
  });
}

function saveDesign() {
  const dataURL = stage.toDataURL(); // base64 图像
  fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [{
        id: CUSTOM_PRODUCT_VARIANT_ID, // 需要替换为你 Shopify 产品的变体 ID
        quantity: 1,
        properties: {
          'Custom Design': dataURL, // 加入购物车的自定义内容
        },
      }]
    })
  }).then(res => res.json())
    .then(data => {
      alert('已添加到购物车');
    });
}
