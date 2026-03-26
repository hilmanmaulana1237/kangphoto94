"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";

export const HeroParallax = ({
  products,
  header,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  header?: React.ReactNode;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-200, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] pt-0 pb-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      {header || <Header />}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="-mt-[50vh] md:-mt-[40vh]"
      >
        <div className="w-full text-center pb-16">
          <h2 className="text-3xl md:text-5xl font-light text-neutral-900 dark:text-white tracking-tight">Hasil <span className="font-bold text-brand-tosca">Karya Udara</span> Kami</h2>
          <p className="text-neutral-600 dark:text-brand-gray mt-4 max-w-xl mx-auto text-sm md:text-base">Lihat bagaimana cerita bahagiamu jadi lebih hidup saat diabadikan dari ketinggian.</p>
        </div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
      <h1 className="text-3xl md:text-7xl font-light dark:text-white text-neutral-900 tracking-tight">
        Mahakarya <br /> Visual
      </h1>
      <p className="max-w-2xl text-sm md:text-xl mt-8 dark:text-neutral-200 text-neutral-600 leading-relaxed font-light">
        Kumpulan dokumentasi udara eksklusif dan landscape menakjubkan yang telah kami abadikan. Cuplikan komposisi sinematik kelas atas yang hanya bisa dicapai dari perspektif angkasa.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <a
        href={product.link}
        className="block group-hover/product:shadow-2xl rounded-2xl overflow-hidden shadow-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 h-full w-full relative"
      >
        <Image
          src={product.thumbnail}
          fill
          className="object-contain p-2 md:p-4 object-center absolute inset-0 grayscale-[20%] group-hover/product:grayscale-0 transition-all duration-500"
          alt={product.title}
          unoptimized
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-50 bg-black/40 pointer-events-none transition-opacity duration-300 rounded-2xl"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-brand-tosca font-bold text-xl pointer-events-none transition-opacity duration-300">
        {product.title}
      </h2>
    </motion.div>
  );
};
