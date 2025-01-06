const ExpenseApp = require('../model/expensemodel');

//create
exports.Create=async(req,res)=>{
    try{
    const newdata = ExpenseApp(req.body);
    const savedata = await newdata.save();
    res.status(201).json(savedata);
    }
    catch(err){
        res.status(404).json({message: "error in creatind data api"});
    }
}

//fetch data
exports.Fetch=async(req,res)=>{
    try{
      const finddata = await ExpenseApp.find();
      res.status(200).json(finddata);
    }
    catch(err){
     res.status(404).json({message: 'error in fetching data'});
    }
}

exports.DeleteId=async(req,res)=>{
    try{
        const {id} = req.params;
        const deldata = await ExpenseApp.findByIdAndDelete(id);
        res.status(200).json(deldata);
    }
    catch(err){
        res.status(404).json({message: "error in delete by Id"})
    }
}