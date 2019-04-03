import { Icon } from 'antd';
import Settings from '@config/readSetting';

const scriptUrl = Settings.get('iconfontUrl');
// 使用：
// import IconFont from '@/components/IconFont';
// <IconFont type='icon-demo' className='xxx-xxx' />
export default Icon.createFromIconfontCN({ scriptUrl });
