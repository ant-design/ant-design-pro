import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from './authority';

const Authorized = (window.g_authorized = RenderAuthorized(getAuthority())); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  Authorized.replaceCurrentAuthority(getAuthority());
};

export { reloadAuthorized };
export default Authorized;
