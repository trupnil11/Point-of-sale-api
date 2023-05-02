
const { query } = require('express');
const mysqlDb = require( '../helpers/config' );

exports.or_insDetail = async(req, res) => {
    
    console.log('or_insDetail called');
    const values = req.body;
    console.log(values)
    
   
    var sql =
    "INSERT INTO `orders` (`user_id`,`customer_id`,`product_id`,`o_price`,`o_total_discount`,`o_status`,`o_pay_type`,`o_transection_id`,`o_pay_status`,`o_delivery_add`) VALUES  ?"; 
    
    var detail = [
        [
          values.user_id,
          values.customer_id,
          values.product_id,
          values.o_price,
          values.o_total_discount,
          values.o_status,
          values.o_pay_type,
          values.o_transection_id,
          values.o_pay_status,
          values.o_delivery_add          
        ]
      ];

      await mysqlDb.query(sql, [detail], (err, result) => {
        if(err){   
          console.log(err);
          return res.send({
           Error_Message: err.sqlMessage,
           Sql_Query: err.sql
         });
         }else{
        console.log(result);
        if (result.affectedRows > 0) {
          return res.send({
            Insert_Id: result.insertId,
            Affected_Rows: result.affectedRows,
            Message: "Data Inserted Succesfully",
            Data: req.body,
          });
        } else {
          return res.send({
            Message_1: "Something Went Wrong!",
            Message_2: "Data Insertion Failed!"
          });
        }
    }
  });
}

exports.or_selDetail = (req, res, next) => {
    console.log('or_selDetail called');
    mysqlDb.query("SELECT * FROM `orders`;", (err, result) => {
        if(err){   
          console.log(err);
          return res.send({
           Error_Message: err.sqlMessage,
           Sql_Query: err.sql
         });
         }else{
        console.log(result);
        return res.send({
          Message: "Data Fetched Successfully",
          Data: result
        });
    }
  });
}

exports.or_upDetail = async(req, res, next) => {
    console.log('or_upDetail called');
    var oid = req.params.id;

    const values = req.body;
var sql = "UPDATE orders SET o_status= ?,o_pay_status= ?  WHERE orders.id = ?";


    var detail = [
      values.o_status,
      values.o_pay_status,
      oid
    ];
   
  await mysqlDb.query(sql,detail, (err, result) => {
    if(err){   
      console.log(err);
      return res.send({
       Error_Message: err.sqlMessage,
       Sql_Query: err.sql
     });
     }else {
      console.log(result);
      if(result.affectedRows < 1){
        return res.send({
          Message_1: "Something Went Wrong!",
          Message_2: "Data Updation Failed!"
        });
      }else{
         return res.send({
         Row_ID: oid,
         Message: "Data Updated Succesfully"
       });
      }      
   }
  });
}

exports.or_delDetail = async (req, res, next) => {
    console.log('or_delDetail called');
    var oid = req.params.id;
    
    sql="DELETE FROM `orders` WHERE `orders`.`id`= ?";
    
    await mysqlDb.query(sql,oid,(err, result) => {
        if(err){   
         console.log(err);
         return res.send({
          Error_Message: err.sqlMessage,
          Sql_Query: err.sql
        });
        } else {
        console.log(result);
        if(result.affectedRows < 1){
          return res.send({
            Message_1: "Something Went Wrong!",
            Message_2: "Data Deletion Failed!"
          });
        }else{
           return res.send({
           Row_ID: oid,
           Message: "Data Deleted Succesfully"
         });
        }
              
     }
  });
}

exports.or_select_Detail = async (req, res, next) => {
  console.log('or_select_Detail called');
  var oid = req.params.id;
  
  sql="SELECT * FROM `orders` WHERE `orders`.`id`= ?";
  
  await mysqlDb.query(sql,oid,(err, result) => {
      if(err){   
       console.log(err);
       return res.send({
        Error_Message: err.sqlMessage,
        Sql_Query: err.sql
      });
      } else {
      console.log(result);
      if(result == ""){
        return res.send({
          Message_1: "Something Went Wrong!",
          Message_2: "Failed To Fetch Data!"
        });
      }else{
         return res.send({
         Row_ID: oid,
         Message: "Data Fetched Succesfully",
         Data : result
       });
      }
            
   }
});
}


