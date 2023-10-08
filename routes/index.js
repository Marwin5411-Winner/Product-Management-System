/*
//ชื่อสินค้า, ประเภท, ราคา, และจำนวนสต็อก
ผู้ใช้สามารถดูรายการสินค้าทั้งหมดได้
ผู้ใช้สามารถแก้ไขสินค้าที่มีอยู่แล้วได้
ผู้ใช้สามารถลบสินค้าที่มีอยู่แล้วได้
*/
var express = require('express');
var router = express.Router();

var stock = [{
  id: 0,
  name: 'iPhone 7',
  type: 'Phone',
  price: 25000,
  amount: 10
}];

//Form-encoded ใช้เพื่อส่งข้อมูลแบบฟอร์ม

/* GET home page. */
//ดูรายการสินค้าทั้งหมด
router.get('/', function(req, res, next) {
  res.json(stock);
});

//เพิ่มสินค้า
router.post('/', function(req, res, next) {
  var item = req.body;
  item.id = stock.length;
  item.name = req.body.name;
  item.type = req.body.type;
  item.price = req.body.price;
  item.amount = req.body.amount;
  stock.push(item);
  res.json(stock);
});

//แก้ไขสินค้า
router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  const product = stock.find(item => item.id === Number(id));
  if (!product) return res.status(404).send('The product with the given ID was not found.');
  var item = req.body;
  item.id = id;
  stock[id] = item;
  res.json(stock);
});

//ลบสินค้า
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  const product = stock.find(item => item.id === Number(id));
  if (!product) return res.status(404).send('The product with the given ID was not found.');
  stock.splice(id, 1);
  res.json(stock);
});

module.exports = router;
