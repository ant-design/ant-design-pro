import Authorized from './Authorized';
import renderAuthorize, { CurrentAuthority } from './renderAuthorize';

export { CurrentAuthority };
export default renderAuthorize(Authorized);
