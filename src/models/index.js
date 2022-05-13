let users = [
  {
    id: '000001',
    name: '員工',
    phone: '0912345678'
  }
];

let checkData = [
  {
    date: '2022-05-02',
    time: '09:00',
    check: '08:55',
    type: 'on',
    id: '000001'
  },
  {
    date: '2022-05-02',
    time: '18:00',
    check: '18:52',
    type: 'off',
    id: '000001'
  },
  {
    date: '2022-05-03',
    time: '09:00',
    check: '08:55',
    type: 'on',
    id: '000001'
  },
  {
    date: '2022-05-03',
    time: '18:00',
    check: '19:36',
    type: 'off',
    id: '000001'
  },  {
    date: '2022-05-04',
    time: '09:00',
    check: '08:40',
    type: 'on',
    id: '000001'
  },
  {
    date: '2022-05-04',
    time: '18:00',
    check: '18:25',
    type: 'off',
    id: '000001'
  },  {
    date: '2022-05-05',
    time: '09:00',
    check: '08:00',
    type: 'on',
    id: '000001'
  },
  {
    date: '2022-05-05',
    time: '18:00',
    check: '18:37',
    type: 'off',
    id: '000001'
  },  {
    date: '2022-05-06',
    time: '09:00',
    check: '09:01',
    type: 'on',
    id: '000001'
  },
  {
    date: '2022-05-06',
    time: '18:00',
    check: '18:01',
    type: 'off',
    id: '000001'
  },
]

let leaveData = [
  {
    startTime: '2022-05-07 09:00',
    endTime: '2022-05-07 18:00',
    category: 1,
    approve: false,
    reason: '肚子痛'
  },
  {
    startTime: '2022-05-11 09:00',
    endTime: '2022-05-12 18:00',
    category: 2,
    approve: true,
    reason: '加班'
  }
]


export default {
  users,
  checkData,
  leaveData
};
