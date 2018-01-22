const localUserManger = {
  getUserName: () => {
    return localStorage.getItem('ant_pro_userName') || 'admin';
  },
  save: (userName) => {
    localStorage.setItem('ant_pro_userName', userName);
  },
  remove: () => {
    localStorage.removeItem('ant_pro_userName');
  },
};

export default localUserManger;
