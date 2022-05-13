import { Router } from 'express';
import dayjs from 'dayjs'
const router = Router();

router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.users));
});

router.post('/login', (req, res) => {
  console.log(req.body);
  try {
    if (req.body && req.body.phone) {
      const user = req.context.models.users.find(item => item.phone === req.body.phone)
      if (user) {
        const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
        res.send({
          success: true,
          token,
          user
        })
      } else {
        res.status(401).send({ message: 'user not find' })
      }
    } else {
      res.status(401).send({ message: 'phone not find' })
    }
  } catch {
    res.status(500).send({ message: 'error' })
  }

})

router.get('/check', (req, res) => {
  try {
    const { users, checkData } = req.context.models
    const current = dayjs()
    const user = users.find(item => item.phone === req.query.phone)
    if (user) {
      const on = checkData.find(item => {
        return item.date === current.format('YYYY-MM-DD') && item.id === user.id && item.type === 'on'
      })
      const off = checkData.find(item => {
        return item.date === current.format('YYYY-MM-DD') && item.id === user.id && item.type === 'off'
      })
      res.send({
        user,
        onWork: on?.time || null,
        offWork: off?.time || null,
        date: current.format('YYYY-MM-DD'),
      })
    } else {
      res.status(401).send({ message: 'user not found' })
    }
  } catch {
    res.status(500).send({ message: 'error' })
  }

});

router.post('/check', (req, res) => {
  const current = dayjs()
  const { users, checkData } = req.context.models
  const user = users.find(item => item.phone === req.body.phone)
  if (user) {
    const on = checkData.find(item => {
      return item.date === current.format('YYYY-MM-DD') && item.id === user.id && item.type === 'on'
    })
    const off = checkData.find(item => {
      return item.date === current.format('YYYY-MM-DD') && item.id === user.id && item.type === 'off'
    })
    if (on) {
      if (off) {
        res.status(500).send({
          message: 'user is checked already'
        })
      } else {
        req.context.models.checkData.push({
          date: current.format('YYYY-MM-DD'),
          time: '18:00',
          check: current.format('HH:mm'),
          type: 'off',
          id: user.id
        })
        res.send(true)
      }
    } else {
      req.context.models.checkData.push({
        date: current.format('YYYY-MM-DD'),
        time: '09:00',
        check: current.format('HH:mm'),
        type: 'on',
        id: user.id
      })
      res.send(true)
    }
  } else {
    res.status(401).send({ message: 'user not found' })
  }
})

export default router;
