import dayjs from 'dayjs';
import { Router } from 'express';
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
const router = Router();

router.get('/category',(req,res)=>{
  res.send([{
    id: 1,
    name: '特休'
  },{
    id: 2,
    name: '補休'
  },{
    id: 3,
    name: '事假'
  },{
    id: 4,
    name: '病假'
  },{
    id: 5,
    name: '產假'
  }])
})

router.get('/',(req,res)=>{
  try{
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      res.status(500).send({
        message: 'search date is not found',
      });
    } else {
      const start = dayjs(startDate, 'YYYY-MM-DD');
      const end = dayjs(endDate, 'YYYY-MM-DD').add(1,'day');
      const rows = req.context.models.leaveData.filter((item) => {
        return start.isSameOrBefore(dayjs(item.startTime)) && end.isSameOrAfter(dayjs(item.endTime));
      });
      res.send({ rows });
    }
  }catch{
    res.status(500).send({message:'error'})
  }
})
router.post('/',(req,res)=>{
  try{
    const {leaveData} = req.context.models
    const {startTime,endTime,category,reason = ''} = req.body
    if(!startTime || !endTime || !category){
      res.status(500).send({
        message: 'data is not enough'
      })
    }else{
      leaveData.push({
        startTime,
        endTime,
        approve: false,
        reason,
        category
      })
      res.send(true)
    }
  }catch{
    res.status(500).send({message:'error'})
  }
})
export default router;
