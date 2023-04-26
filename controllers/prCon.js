

const mysqlDb = require( '../helpers/config' );

exports.pr_insDetail = async(req, res) => {
    
    console.log('pr_insDetail called');
    const values = req.body;
    console.log(values);
   
    var sql =
    "INSERT INTO `product`(`Pname`,`MRP`,`Dis_price`,`Image`,`Short_des`,`Long_des`,`Status`,`Datetime`,`Registration_id`) VALUES  ?"; 
    
    var detail = [
        [
          values.Pname,
          values.MRP,
          values.Dis_price,
          values.Image,
          values.Short_des,
          values.Long_des,
          values.Status,
          values.Datetime,
          values.Registration_id
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
            Success: False,
            Message: "Data Insertion Failed !",
          });
        }
    });
}

exports.pr_selDetail = (req, res, next) => {
    console.log('pr_selDetail called');
    mysqlDb.query("SELECT * FROM `product`;", (err, result) => {
        if(err){  throw err;  }
        console.log(result);
        return res.send(result);
    });
}

exports.pr_upDetail = async(req, res, next) => {
    console.log('pr_upDetail called');
    var id = req.params.id;
     
    const values = req.body;
    sql="UPDATE product SET Pname= ?,MRP= ?,Dis_price= ?,Image= ?,Short_des= ?,Long_des= ?,Status= ?,Datetime= ? WHERE product.id= ?";  
    
    var detail = [
      values.Pname,
      values.MRP,
      values.Dis_price,
      values.Image,
      values.Short_des,
      values.Long_des,
      values.Status,
      values.Datetime,
      id
     ];
   
     await mysqlDb.query(sql,detail, (err, result) => {
      console.log(result);
      if (result.changedRows > 0) {
      return res.send({
        Changed_Rows: result.changedRows,
        Row_ID: id,
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


exports.pr_delDetail = async (req, res, next) => {
  console.log('pr_delDetail called');
  var pid = req.params.id;
  
  sql="DELETE FROM `product` WHERE `product`.`id`= ?";
  
  await mysqlDb.query(sql,pid,(err, result) => {
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
         Row_ID: pid,
         Message: "Data Deleted Succesfully"
       });
      }
            
   }
});
}

exports.pr_select_Detail = async (req, res, next) => {
  console.log('pr_select_Detail called');
  var pid = req.params.id;
  
  sql="SELECT * FROM `product` WHERE `product`.`id`= ?";
  
  await mysqlDb.query(sql,pid,(err, result) => {
      if(err){   
       console.log(err);
       return res.send({
        Error_Message: err.sqlMessage,
        Sql_Query: err.sql
      });
      } else {
      console.log(result);
      if(result != ""){
        return res.send({
          Row_ID: pid,
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
