// import moment from 'moment';

// mock data
const homeData = {
    user : {
      name: 'PIZY',
      qq: '644260163',
    },
    userinfo : {
      score: 63231,
      phone: 13812341323,
      proxy: '一级代理',
    },
    barinfo : {
      barnum: 236,
      machine: 52132,
    }
}

const getStaticData = {
  homeData
};

export default {
  'GET /api/home': getStaticData,
};
