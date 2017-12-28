import { RenderSecured } from '../components/Authorized';
import { getRole } from './role';

const Secured = RenderSecured(getRole());
export default Secured;
