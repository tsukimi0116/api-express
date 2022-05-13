import dayjs from 'dayjs';
import { Router } from 'express';
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
const router = Router();

router.get('/', (req, res) => {
  try{
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      res.status(500).send({
        message: 'search date is not found',
      });
    } else {
      const start = dayjs(startDate, 'YYYY-MM-DD');
      const end = dayjs(endDate, 'YYYY-MM-DD');
      const rows = req.context.models.checkData.filter((item) => {
        const day = dayjs(item.date, 'YYYY-MM-DD');
        return start.isSameOrBefore(day) && end.isSameOrAfter(day);
      });
      res.send({ rows });
    }
  }catch{
    res.status(500).send({message:'error'})
  }
});

router.post('/', (req, res) => {
  try{
    const {checkData} = req.context.models
    const {date,type,time} = req.body
    if(!date || !type || !time){
      res.status(500).send({
        message: 'data is not enough'
      })
    }else{
      if(type === 'on'){
        const on = checkData.find(item=>{
          return item.date === date && item.type === 'on'
        })
        if(on){
          res.status(500).send({message:'work on record is exist!'})
        }else{
          checkData.push({
            date,
            time: '09:00',
            check: time,
            type: 'on',
            id: '000001'
          })
          res.send(true)
        }
      }else if(type === 'off'){
        const off = checkData.find(item=>{
          return item.date === date && item.type === 'off'
        })
        if(off){
          res.status(500).send({message:'work off record is exist!'})
        }else{
          checkData.push({
            date,
            time: '18:00',
            check: time,
            type: 'off',
            id: '000001'
          })
          res.send(true)
        }
      }else{
        res.status(500).send({message:'type if wrong'})
      }
    }
  }catch{
    res.status(500).send({message:'error'})
  }
});

export default router;
