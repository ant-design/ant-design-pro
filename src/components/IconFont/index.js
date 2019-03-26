import { Icon } from 'antd';
import Setting from '@/utils/readSetting';

// 使用：
// import IconFont from '@/components/IconFont';
// <IconFont type='icon-demo' className='xxx-xxx' />
export default Icon.createFromIconfontCN({ scriptUrl: Setting.iconfontUrl });
