import Authorized from './Authorized';
import Secured from './Secured';
import check from './CheckPermissions';
import renderAuthorize from './renderAuthorize';

Authorized.Secured = Secured;
Authorized.check = check;

const RenderAuthorize = renderAuthorize(Authorized);

export default RenderAuthorize;
