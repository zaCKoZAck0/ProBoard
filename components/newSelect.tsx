"use client"
import React from "react";
import { RadioGroup, Radio, useRadio, VisuallyHidden, cn } from "@nextui-org/react";
import {CheckCircle} from '@/lib/icons'
import type { RadioProps } from "@nextui-org/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const CustomRadio = (props : RadioProps) => {
  const {
    Component,
    children,
    isSelected,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
        " cursor-pointer border-3 border-default rounded-lg gap-4 p-4",
        "data-[selected=true]:border-primary data-[selected=true]:bg-accent",
      )}
    >
    <CheckCircle className={isSelected?"text-primary transition-opacity":"opacity-0"} size={25} />
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className="text-small text-foreground opacity-70 max-w-[200px]">{description}</span>
        )}
      </div>
    </Component>
  );
};

export default function App() {
  return (
    <RadioGroup label="Select your work type">
      <CustomRadio description="Create Organization" value="org">
        <span className="font-semibold text-lg">I have a team</span>
      </CustomRadio>
      <CustomRadio description="You can still create or join Organization(s) later." value="solo">
        <span className="font-semibold text-lg">I work solo</span>
      </CustomRadio>
    </RadioGroup>
  );
}
