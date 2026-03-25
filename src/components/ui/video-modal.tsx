"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconPlayerPlayFilled, IconX } from "@tabler/icons-react";
import Image from "next/image";

interface VideoModalProps {
  videoSrc: string;
  thumbnailSrc?: string;
  title: string;
}

export const VideoModal = ({ videoSrc, thumbnailSrc, title }: VideoModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="relative cursor-pointer group w-full aspect-video rounded-3xl overflow-hidden border border-neutral-800 bg-brand-black shadow-[0_0_30px_rgba(0,0,0,0.5)]"
      >
        {/* We use a video as a thumbnail preview if no image is passed, playing silently */}
        {thumbnailSrc ? (
          <Image src={thumbnailSrc} fill alt={title} className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center -rotate-90 pointer-events-none">
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="absolute object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ width: '56.25%', height: '177.7778%' }}
            />
          </div>
        )}
        
        {/* Landscape crop overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent pointer-events-none" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-brand-tosca/80 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(21,154,156,0.6)] group-hover:scale-110 transition-transform">
            <IconPlayerPlayFilled className="w-6 h-6 text-white ml-1" />
          </div>
        </div>

        <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
          <h3 className="text-white font-medium text-lg md:text-xl drop-shadow-md">{title}</h3>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-xl px-4 md:px-8"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden border border-brand-tosca/30 shadow-[0_0_100px_rgba(21,154,156,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 hover:bg-brand-tosca/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
              >
                <IconX className="w-5 h-5" />
              </button>
              
              {/* Force rotate the portrait video sideways while maintaining perfect aspect-video bounds via CSS geometry */}
              <div className="absolute inset-0 flex items-center justify-center -rotate-90 pointer-events-none">
                <video
                  src={videoSrc}
                  autoPlay
                  controls
                  playsInline
                  className="absolute object-cover pointer-events-auto"
                  style={{ width: '56.25%', height: '177.7778%' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
