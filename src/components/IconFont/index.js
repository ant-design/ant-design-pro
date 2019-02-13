import { Icon } from 'antd';
import { iconfontUrl as scriptUrl } from '../../defaultSettings';

// iconFontScriptUrl 修改成自己的iconfont图标项目地址
// 注意：如果需要图标多色，Iconfont图标项目里要进行批量去色处理
// 使用：
// import IconFont from '@/components/IconFont';
// <IconFont type='icon-demo' className='xxx-xxx' />
export default Icon.createFromIconfontCN({ scriptUrl });
