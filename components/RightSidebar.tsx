import React, { useMemo, useRef } from "react";

import { RightSidebarProps } from "@/types/type";
import { bringElement, modifyShape } from "@/lib/shapes";

import Text from "./settings/Text";
import Color from "./settings/Color";
import Export from "./settings/Export";
import Dimensions from "./settings/Dimensions";
import Link from "next/link";
import { exportToPdf } from "@/lib/utils";
import { Button } from "./ui/button";

const RightSidebar = ({
  elementAttributes,
  setElementAttributes,
  fabricRef,
  activeObjectRef,
  isEditingRef,
  syncShapeInStorage,
}: RightSidebarProps) => {
  const colorInputRef = useRef(null);
  const strokeInputRef = useRef(null);

  const handleInputChange = (property: string, value: string) => {
    if (!isEditingRef.current) isEditingRef.current = true;

    setElementAttributes((prev) => ({ ...prev, [property]: value }));

    modifyShape({
      canvas: fabricRef.current as fabric.Canvas,
      property,
      value,
      activeObjectRef,
      syncShapeInStorage,
    });
  };

  // memoize the content of the right sidebar to avoid re-rendering on every mouse actions
  const memoizedContent = useMemo(
    () => (
      <section className='sticky right-0 flex h-full min-w-[227px] select-none flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 max-sm:hidden'>
        {/* <span className='mt-3 border-b border-primary-grey-200 px-5 pb-4 text-xs text-primary-grey-300'>
          Created by {""}
          <Link
            href='https://your-portfolio-url.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <strong>PIYUSH MAHAJAN</strong>
          </Link>
        </span>{" "} */}
        <h3 className=' px-5 pt-4 text-xs uppercase'>Design Here</h3>
        <Dimensions
          isEditingRef={isEditingRef}
          width={elementAttributes.width}
          height={elementAttributes.height}
          handleInputChange={handleInputChange}
        />
        <Text
          fontFamily={elementAttributes.fontFamily}
          fontSize={elementAttributes.fontSize}
          fontWeight={elementAttributes.fontWeight}
          handleInputChange={handleInputChange}
        />
        <Color
          inputRef={colorInputRef}
          attribute={elementAttributes.fill}
          placeholder='color'
          attributeType='fill'
          handleInputChange={handleInputChange}
        />
        <Color
          inputRef={strokeInputRef}
          attribute={elementAttributes.stroke}
          placeholder='stroke'
          attributeType='stroke'
          handleInputChange={handleInputChange}
        />
        <Export />
        <div className='flex flex-col gap-3 px-5 py-3'>
          <h3 className='text-[10px] uppercase'>Build and Designed By </h3>
          <Link
            href='https://piyushmahajan.vercel.app/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Button
              variant='outline'
              className='w-full border border-primary-grey-100 hover:bg-primary-green hover:text-primary-black'
            >
              Piyush Mahajan
            </Button>
          </Link>
        </div>
        {/* <span className='mt-10 border-b border-primary-grey-200 px-5 pb-4 text-xs text-primary-grey-300'>
          Created by {""}
          <Link
            href='https://your-portfolio-url.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <strong>PIYUSH MAHAJAN</strong>
          </Link>
        </span>{" "} */}
      </section>
    ),
    [elementAttributes]
  ); // only re-render when elementAttributes changes

  return memoizedContent;
};

export default RightSidebar;
