import { TOKEN_INFO } from '../constants/index';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet, Navigate, useLocation } from 'react-router-dom';
import { setAuth } from '../slices/authSlice';

function GlobalPrivateRouter() {
  const { isLogin, sub } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [login, setLogin] = useState(isLogin);

  const accessToken = localStorage.getItem(TOKEN_INFO.accessToken);
  useEffect(() => {
    const accessToken = localStorage.getItem(TOKEN_INFO.accessToken);
    if (accessToken) {
      dispatch(setAuth({ isLogin: true }));
      setLogin(true);
    }
  }, []);

  const location = useLocation();
  if (!isLogin && !accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

export default GlobalPrivateRouter;
