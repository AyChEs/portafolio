import { motion, useReducedMotion } from 'framer-motion';

const VARIANTS = {
  up: { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
};

// Scroll-triggered reveal wrapper built on framer-motion's whileInView.
export default function Reveal({
  as = 'div',
  variant = 'up',
  delay = 0,
  className,
  children,
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className} {...rest}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      variants={VARIANTS[variant]}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.75, 0.25, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
