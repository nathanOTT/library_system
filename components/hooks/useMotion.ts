import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';

export const useMotion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerControls = useAnimationControls();
  const itemControls = useAnimationControls();
  const svgControls = useAnimationControls();
  const controls = useAnimationControls();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      containerControls.start({ opacity: 1 });
      itemControls.start({ opacity: 1 });
      svgControls.start({ rotate: 90 });
    } else {
      containerControls.start({ opacity: 0 });
      itemControls.start({ opacity: 0 });
      svgControls.start({ rotate: 0 });
    }
  }, [controls]);

  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const toggleLeftSidebar = () => {
    setIsOpen(!isOpen);
  }

  const handleOpenClose = () => {
    setIsVisible(!isVisible);
  }

  // Slide in from the left animation
  const slideInFromLeft = {
    hidden: { x: -300 },
    visible: { x: 0 },
  };

  // Slide in from the right animation
  const slideInFromRight = {
    hidden: { x: 300 },
    visible: { x: 0 },
  };

  // Slide in from the top animation
  const slideInFromTop = {
    hidden: { y: -300 },
    visible: { y: 0 },
  };

  // Slide in from the bottom animation
  const slideInFromBottom = {
    hidden: { y: 300 },
    visible: { y: 0 },
  };

  // Fade in animation
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Fade out animation
  const fadeOut = {
    hidden: { opacity: 1 },
    visible: { opacity: 0 },
  };

  // Scale in animation
  const scaleIn = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
  };

  // Scale out animation
  const scaleOut = {
    hidden: { scale: 1 },
    visible: { scale: 0 },
  };

  // svg variants
  const svgVariants = {
    open: { rotate: 90 },
    closed: { rotate: 0 },
  };

  // svg transition
  const svgTransition = {
    type: "spring",
    stiffness: 260,
    damping: 20,
  };

  type BookCoverVariant = "extraSmall" | "small" | "regular" | "medium" | "large";

  // Variant styles
  const variantStyles: Record<BookCoverVariant, string> = {
    extraSmall: "book-cover-extra_small",
    small: "book-cover_small",
    regular: "book-cover_regular",
    medium: "book-cover_medium",
    large: "book-cover_large",
  };

  return {
    motion,
    animations: {
      slideInFromLeft, slideInFromRight, slideInFromTop, slideInFromBottom, fadeIn, fadeOut, scaleIn, scaleOut,
    },
    controls, isVisible, isOpen, setIsOpen, containerControls, itemControls, svgControls, toggleLeftSidebar, handleOpenClose, slideInFromLeft, slideInFromRight, slideInFromTop, slideInFromBottom, fadeIn, fadeOut, scaleIn, scaleOut, svgVariants, svgTransition, variantStyles,
  }
}

export default useMotion;