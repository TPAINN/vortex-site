import { useCallback, useRef } from "react";
function useMagnetic({ strength = 18 } = {}) {
  const ref = useRef(null);
  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      const dx = x / (r.width / 2) * strength;
      const dy = y / (r.height / 2) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [strength]
  );
  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }, []);
  return { ref, onMouseMove, onMouseLeave };
}
function Magnetic({
  children,
  strength = 16,
  className = "",
  as = "div",
  href,
  onClick,
  ...rest
}) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic({ strength });
  const Tag = as;
  return <Tag
    ref={ref}
    href={href}
    onClick={onClick}
    onMouseMove={onMouseMove}
    onMouseLeave={onMouseLeave}
    className={className}
    style={{ transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)", willChange: "transform" }}
    {...rest}
  >
      {children}
    </Tag>;
}
export {
  Magnetic,
  useMagnetic
};
