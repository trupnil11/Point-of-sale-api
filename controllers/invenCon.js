

const mysqlDb = require( '../helpers/config' );

exports.in_insDetail = async(req, res) => {
    
    console.log('in_insDetail called');
    const values = req.body;
    
   
    var sql =
    "INSERT INTO `inventory`(`product_id`,`available_qty`,`minimum_notify_qty`) VALUES  ?"; 
    
    var detail = [
        [
          values.product_id,
          values.available_qty,
          values.minimum_notify_qty
        ]
      ];

      mysqlDb.query(sql, [detail], (err, result) => {
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
            success: False,
            message: "Data Insertion Failed !",
          });
        }
    });
}
     

exports.in_selDetail = (req, res, next) => {
    console.log('in_selDetail called');
    mysqlDb.query("SELECT * FROM `inventory`;", (err, result) => {
        if(err){  throw err;  }
        console.log(result);
        return res.send(result);
    });
}

exports.in_upDetail = async(req, res, next) => {
  console.log('in_upDetail called'); 
  var inid = req.params.id;
   
  const values = req.body;
   var sql = "UPDATE inventory SET product_id= ?,available_qty= ?,minimum_notify_qty= ?  WHERE inventory.id = ?";


   var detail = [
    values.product_id,
    values.available_qty,
    values.minimum_notify_qty,
    inid
   ];
 
   await mysqlDb.query(sql,detail, (err, result) => {
    console.log(result);
    if (result.changedRows > 0) {
    return res.send({
      Changed_Rows: result.changedRows,
      Row_ID: inid,
      Message: "Data Updated Succesfully",
      Data: req.body,
    });
  } else {
    return res.send({
      Message_1: "Something Went Wrong!",
      Message_2: "Data Updation Failed!"

    });
  }
});

}

exports.in_delDetail = async (req, res, next) => {
  console.log('in_delDetail called');
  var inid = req.params.id;
  
  sql="DELETE FROM `inventory` WHERE `inventory`.`id`= ?";
  
  await mysqlDb.query(sql,inid,(err, result) => {
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
         Row_ID: inid,
         Message: "Data Deleted Succesfully"
       });
      }
            
   }
});
}

exports.in_select_Detail = async (req, res, next) => {
  console.log('in_select_Detail called');
  var inid = req.params.id;
  
  sql="SELECT * FROM `inventory` WHERE `inventory`.`id`= ?";
  
  await mysqlDb.query(sql,inid,(err, result) => {
      if(err){   
       console.log(err);
       return res.send({
        Error_Message: err.sqlMessage,
        Sql_Query: err.sql
      });
      } else {
      console.log(result);
      if(result){
        return res.send({
          Row_ID: inid,
          Message: "Data Fetched Succesfully",
          Data: result
        });
      }else{
      return res.send({
         Message_1: "Something Went Wrong!",
         Message_2: "Failed To Fetch Data!"
       });
      }
            
   }
});
}
