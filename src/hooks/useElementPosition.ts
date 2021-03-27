import {useState, useEffect} from 'react';

export function useElementPosition(ref: React.MutableRefObject<HTMLElement|null>) {
  const [elementPosition, setElementPosition] = useState({
    elementTop: 0,
    elementBottom: 0,
    elementLeft: 0,
    elementRight: 0,
  })

  const refresh = () => {
    let element = ref.current;

    if(element) {
      let {left, right, top, bottom} = element.getBoundingClientRect();
      setElementPosition({
        elementTop: top,
        elementLeft: left,
        elementRight: right, 
        elementBottom: bottom,
      })
    }
  }

  useEffect(refresh, [ref.current])
  useEffect(() => {
    window.addEventListener('scroll', refresh);
    window.addEventListener('resize', refresh);

    return () => {
      window.removeEventListener('scroll', refresh);
      window.removeEventListener('resize', refresh);
    }
  }, [ref, refresh])

  return elementPosition
}

export default useElementPosition;
