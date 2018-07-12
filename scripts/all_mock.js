import api from '../mock/api';
import chart from '../mock/chart';
import geographic from '../mock/geographic';
import notices from '../mock/notices';
import profile from '../mock/profile';
import rule from '../mock/rule';
import user from '../mock/user';

const data = {};
Object.keys(api).forEach(key => {
  data[key] = api[key];
});
Object.keys(chart).forEach(key => {
  data[key] = chart[key];
});

Object.keys(geographic).forEach(key => {
  data[key] = geographic[key];
});
Object.keys(notices).forEach(key => {
  data[key] = notices[key];
});
Object.keys(profile).forEach(key => {
  data[key] = profile[key];
});
Object.keys(rule).forEach(key => {
  data[key] = rule[key];
});
Object.keys(user).forEach(key => {
  data[key] = user[key];
});

export default data;
