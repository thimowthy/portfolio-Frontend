"use client";
import { Tab, initTE } from "tw-elements";

initTE({ Tab });

export default function InitTab(props: any) {
  return <>{props.children}</>;
}
