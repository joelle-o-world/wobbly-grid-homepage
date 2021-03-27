import {useEffect, useState} from 'react';
import useElementPosition from './useElementPosition';

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({
    mouseX: 0,
    mouseY: 0,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        mouseX: e.clientX,
        mouseY: e.clientY,
      })
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition
}

export default useMousePosition;

export function useRelativeMousePosition(toElement: React.MutableRefObject<HTMLElement|null>) {
  const {mouseX, mouseY} = useMousePosition();
  const {elementLeft, elementTop} = useElementPosition(toElement)

  return {
    mouseX: mouseX - elementLeft,
    mouseY: mouseY - elementTop,
  }
}
