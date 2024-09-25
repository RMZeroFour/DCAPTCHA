import { useEffect, useRef } from 'react';

export function useGeolocation() {
  const isProxy = useRef(false);
  const isAbuser = useRef(false);
  const country = useRef('');
  const state = useRef('');
  const city = useRef('');

  useEffect(() => {
    fetch('https://api.ipapi.is')
      .then(res => res.json())
      .then(res => {
        isProxy.current = res['is_proxy'];
        isAbuser.current = res['is_abuser'];
        country.current = res['location']['country'];
        state.current = res['location']['state'];
        city.current = res['location']['city'];
      });
  }, []);

  return { isProxy, isAbuser, country, state, city };
}
