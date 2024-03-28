"use client";
import classNames from "classnames";
import Image from "next/image";
import classes from "./home.module.css";
import HomepageHeader from "@/components/templates/homepage-header";
import WelcomeSection from "@/components/templates/welcome/welcome";
import { RxBoxModel } from "react-icons/rx";
import {useRouter}  from 'next/navigation';

function SectionWrapper({
  imageUrl,
  backgroundClassName,
  children,
}: {
  imageUrl: string;
  backgroundClassName: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="">
        <div
          className={`
            ${backgroundClassName} flex lg:flex-row flex-col items-center 
            justify-center hover-effect w-[100%] lg:mx-auto`}
        >
          <div className=" flex-none lg:-mr-4 m-10 mt-20">
            <Image
              alt="Image"
              className="w-[200px] h-[200px] duration-300"
              src={imageUrl}
              width={200}
              height={200}
            />
          </div>
          <div className="flex-initial w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function Content() {
  const router = useRouter();
  const openModelPage = () => {1
    router.push('/models');
  }
  return (
    <>
      <main className={classNames(classes.main, "flex flex-col ")}>
        <HomepageHeader />
        <WelcomeSection />
        <SectionWrapper
          imageUrl="/gif/cubes/commune-single-block_blue.gif"
          backgroundClassName="bg-white dark:bg-gray-900"
        >
          <div className="text-black" id="introduction">
            <div className="text-right w-fit pb-10 m-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl py-10 md:py-15 lg:py-20 px-3 w-fit text-center dark:text-white">
                Models
              </h1>
              <div className="flex flex-col space-y-10">
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-center items-center justify-center px-2 h-[700px]">
                    Get Started
                </div>
                 */}
                   <div
                  className="bg-slate-900 rounded-lg bg-opacity-20 hover:bg-opacity-40 shadow-custom hover:shadow-2xl text-center 
                  hover:bg-slate-200 duration-200 text-xl text-white hover:text-white 
                  font-sans font-semibold justify-center px-2 py-3 cursor-pointer flex gap-3 items-center
                "
                  onClick= {openModelPage}
                >
                  <RxBoxModel width={50} height={50} />
                  Model
                </div>

              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>
    </>
  );
}
