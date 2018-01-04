import { RenderSecured } from '../components/Authorized';
import { getAuthority } from './authority';

const Secured = RenderSecured(getAuthority());
export default Secured;
