import RenderAuthorized from '../components/Authorized';
import { getAuthority } from './authority';

const Authorized = RenderAuthorized(getAuthority());
export default Authorized;
