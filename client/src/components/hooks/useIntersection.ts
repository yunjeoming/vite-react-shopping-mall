import { useCallback, useEffect, useRef, useState } from 'react';

const useIntersection = (targetRef: React.RefObject<HTMLDivElement>) => {
  // new IntersectionObserver로 만들어도 되지만, 이 ProductListPage는 계속해서 렌더링 되기 때문에 무한으로 생성되는 것을 막기 위해 ref사용

  const observerRef = useRef<IntersectionObserver>();
  const [intersecting, setIntersecting] = useState(false);

  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        setIntersecting(entries[0]?.isIntersecting);
      });
    }
    return observerRef.current;
  }, [observerRef.current]);

  useEffect(() => {
    if (targetRef.current) getObserver().observe(targetRef.current);
  }, [targetRef.current]);

  return intersecting;
};

export default useIntersection;
