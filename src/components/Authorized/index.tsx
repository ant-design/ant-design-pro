import Authorized from './Authorized';
import Secured from './Secured';
import check from './CheckPermissions';
import renderAuthorize from './renderAuthorize';
import AuthorizedRoute from './AuthorizedRoute';

Authorized.Secured = Secured;
Authorized.check = check;
Authorized.AuthorizedRoute = AuthorizedRoute;

const RenderAuthorize = renderAuthorize(Authorized);

export default RenderAuthorize;
