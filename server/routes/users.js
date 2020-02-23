var express = require('express');
var router = express.Router();
var User = require('./../models/user');
require('./../util/util')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 登录
router.post("/login",function (req,res,next) {
  var param = {
    userName:req.body.userName,
    userPwd:req.body.userPwd
  }
  User.findOne(param,function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message
      });
    }else{
      if(doc){
        res.cookie("userId",doc.userId,{
          path:'/',
          maxAge:1000*60*60
        });
        res.cookie("userName",doc.userName,{
          path:'/',
          maxAge:1000*60*120
        });
        // session需要安装插件
        // req.session.user = doc;
        res.json({
          status:'0',
          msg:'',
          result:{
            userName:doc.userName,
          }
        })
      }else{
        res.json({
          status:'1',
          msg:'账号或密码错误',
          result:''
        })
      }
    }
  })
});
// 登出
router.post("/logout",function (req,res,next) {
  res.cookie("userId","",{
    path:"/",
    maxAge:-1
  });
  res.json({
    status:'0',
    msg:'',
    result:''
  })
});
// 校验是否登录
router.get("/checkLogin",function (req,res,next) {
  if(req.cookies.userId){
    res.json({
      status:'0',
      msg:'',
      result:req.cookies.userName || ''
    });
  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    });
  }
});


// 查询当前用户的购物车数据
router.get("/cartList",function (req,res,next) {
  var userId = req.cookies.userId;
  User.findOne({userId:userId},function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      if(doc){
        res.json({
          status:'0',
          msg:'',
          result:doc.cartList
        });
      }
    }
  });
});

// 删除购物车
router.post("/cartDel",function (req,res,next) {
  var userId = req.cookies.userId,productId = req.body.productId;
  User.update({
    userId:userId
  },{
    $pull:{
      'cartList':{
        'productId':productId
      }
    }
  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      });
    }
  });
});

// 编辑购物车
router.post("/cartEdit",function (req,res,next) {
  var userId = req.cookies.userId,
      productId = req.body.productId,
      productNum = req.body.productNum,
      checked = req.body.checked;
  User.update({"userId":userId,"cartList.productId":productId},{
    "cartList.$.productNum":productNum,
    "cartList.$.checked":checked,
  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      });
    }
  });
});
// 全部选中
router.post("/editCheckAll",function (req,res,next) {
  var userId = req.cookies.userId,
      checkAll = req.body.checkAll;
  User.findOne({userId:userId},function (err,user) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      if(user){
        user.cartList.forEach((item)=>{
          item.checked = checkAll;
        });
        user.save(function (err1,doc) {
          if(err1){
            res.json({
              status:'1',
              msg:err1.message,
              result:''
            });
          }else{
            res.json({
              status:'0',
              msg:'',
              result:'suc'
            });
          }
        });
      }
    }
  });
});

// 查询用户地址
router.get("/addressList",function (req,res,next) {
  var userId = req.cookies.userId;
  User.findOne({userId:userId},function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:doc.addressList
      });
    }
  });
});
// 设置默认地址
router.post("/setDefault",function (req,res,next) {
  var userId = req.cookies.userId,
      addressId = req.body.addressId;
  if(!addressId){
    res.json({
      status:'1003',
      msg:'addressId is null',
      result:''
    });
  }else{
    User.findOne({userId:userId},function (err,docUser) {
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        });
      }else{
        var addressList = docUser.addressList;
        addressList.forEach((item)=>{
          if(item.addressId == addressId){
            item.isDefault = true;
          }else{
            item.isDefault = false;
          }
        });
        docUser.save(function (err1,doc1) {
          if(err1){
            res.json({
              status:'1',
              msg:err1.message,
              result:''
            });
          }else{
            res.json({
              status:'0',
              msg:'',
              result:'suc'
            });
          }
        });
      }
    });
  }
});
//删除地址
router.post("/delAddress",function (req,res,next) {
  var userId = req.cookies.userId,
      addressId = req.body.addressId;
  User.update({
    userId:userId
  },{
    $pull:{
      'addressList':{
        'addressId':addressId
      }
    }
  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      });
    }
  });
});

// 确认订单
router.post("/payMent",function (req,res,next) {
  var userId = req.cookies.userId,
      orderTotal = req.body.orderTotal,
      addressId = req.body.addressId;
  User.findOne({userId:userId},function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      var address = '',goodsList = [];
      // 获取当前用户的地址信息
      doc.addressList.forEach((item)=>{
        if(addressId == item.addressId){
          address = item;
        }
      });
      // 获取用户购物车的选中的商品,该filter()方法创建一个新的匹配过滤条件的数组。
      doc.cartList.filter((item)=>{
        goodsList.push(item);
      });
      var platForm = '622';
      var r1 = Math.floor(Math.random()*10);
      var r2 = Math.floor(Math.random()*10);
      var sysDate = new Date().Format('yyyyMMddhhmmss');
      var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
      var orderId = platForm+r1+sysDate+r2;
      var order = {
        orderId:orderId,
        orderTotal:orderTotal,
        addressInfo:address,
        orderStatus:'1',
        createDate:createDate
      }
      doc.orderList.push(order);
      doc.save(function (err1,doc1) {
        if(err1){
          res.json({
            status:'1',
            msg:err1.message,
            result:''
          });
        }else{
          res.json({
            status:'0',
            msg:'',
            result:{
              orderId:order.orderId,
              orderTotal:order.orderTotal
            }
          });
        }
      });
    }
  });
});

// 成功页订单信息
router.get("/orderDetail",function (req,res,next) {
  var userId = req.cookies.userId,
      orderId = req.param('orderId');
  User.findOne({userId:userId},function (err,userInfo) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      var orderList = userInfo.orderList;
      if(orderList.length>0){
          var orderTotal = 0;
          orderList.forEach((item)=>{
            if(item.orderId = orderId){
              orderTotal = item.orderTotal;
            }
          });
          if(orderTotal>0){
            res.json({
              status:'0',
              msg:'',
              result:{
                orderId:orderId,
                orderTotal:orderTotal
              }
            });
          }else{
            res.json({
              status:'120002',
              msg:'无此订单',
              result:''
            });
          }
      }else{
        res.json({
          status:'120001',
          msg:'无此订单',
          result:''
        });
      }

    }
  });
});

// 查询购物车数量
router.get("/getCartCount",function (req,res,next) {
  if(req.cookies && req.cookies.userId){
    var userId = req.cookies.userId;
    User.findOne({userId:userId},function (err,doc) {
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        });
      }else{
        var cartList = doc.cartList;
        let cartCount = 0;
        cartList.map(function (item) {
          cartCount += parseInt(item.productNum);
        });
        res.json({
          status:'0',
          msg:'',
          result:cartCount
        });
      }
    });
  }
});
module.exports = router;

