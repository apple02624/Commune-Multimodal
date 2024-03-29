/* eslint-disable @typescript-eslint/no-explicit-any */

import "simplebar-react/dist/simplebar.min.css";
import { FC, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GiAbstract012 } from "react-icons/gi";
import { GrMultiple, GrTechnology } from "react-icons/gr";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdDashboard, MdSlowMotionVideo } from "react-icons/md";
import { RxBoxModel } from "react-icons/rx";
import SimpleBar from "simplebar-react";
import { sidebarStructure } from "./structure";

interface SidebarProps {
  setExpand: (value: boolean) => void;
}

const SidebarMenu: FC<SidebarProps> = ({ setExpand }) => {
  const link = "/";

  const [openedMenu, setOpenedMenu] = useState<Record<string, any>>({});
  const [activeName, setActiveName] = useState("");
  const activeLink = window.location.pathname;

  const listRef = useRef<any>({});

  const [isExpand, setIsExpand] = useState(true);
  const [isExpandOnHover, setIsExpandOnHover] = useState(false);

  const handleHoverExpand = (value: boolean) => {
    if (!isExpand) {
      setIsExpandOnHover(value);
    }
  };

  const handleNavigate = (path: string) => {
    console.log("asadfsadfsdfsadfsdf", path);
    setActiveName(path);
  };

  const handleToggle = (name: string) => {
    const rootEl = name.split(".")[0];

    if (openedMenu[name]?.open === true) {
      setOpenedMenu((prevState) => ({
        ...prevState,
        [name]: {
          open: false,
          height: "0px",
        },
        [rootEl]: {
          open: rootEl === name ? false : true,
          height: `${
            (listRef.current[rootEl]?.scrollHeight || 0) -
            (listRef.current[name]?.scrollHeight || 0)
          }px`,
        },
      }));
    } else {
      setOpenedMenu((prevState) => ({
        ...prevState,
        [name]: {
          open: true,
          height: `${listRef.current[name]?.scrollHeight || 0}px`,
        },
        [rootEl]: {
          open: true,
          height: `${
            (listRef.current[rootEl]?.scrollHeight || 0) +
            (listRef.current[name]?.scrollHeight || 0)
          }px`,
        },
      }));
    }
  };

  const generateIcon = (icon: string) => {
    const icons_map: Record<string, JSX.Element> = {};

    icons_map["introduction"] = <GrMultiple width={50} height={50} />;
    icons_map["dashboard"] = <MdDashboard width={50} height={50} />;
    icons_map["description"] = <GrTechnology width={50} height={50} />;
    icons_map["demonstration"] = <RxBoxModel width={50} height={50} />;
    icons_map["abstract"] = <GiAbstract012 width={50} height={50} />;
    icons_map["help"] = <MdSlowMotionVideo width={50} height={50} />;
    icons_map["paper"] = <IoNewspaperOutline width={50} height={50} />;
    return icons_map[icon];
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateMenu = (item: any, index: number, recursive: number = 0) => {
    if (activeName === "" && activeLink.includes(item.link)) {
      setActiveName(item.name);
    }
    const classesActive = activeName === item.name ? "active" : "";

    return (
      <li key={index}>
        <a
          href={item.link}
          role="button"
          tabIndex={0}
          id={item.id}
          onClick={() => {
            if ("child" in item) {
              handleToggle(item.name);
            } else if ("link" in item) {
              handleNavigate(item.link);
            }
          }}
          onKeyDown={(event) => {
            const { code } = event;
            if (code === "Space") {
              if ("child" in item) {
                handleToggle(item.name);
              } else if ("link" in item) {
                handleNavigate(item.name);
              }
            }
          }}
          className={[
            "group m-0 flex cursor-pointer rounded-lg items-center justify-between h-12 py-0 pr-3 mb-1 focus:outline-none",
            recursive === 0 ? "pl-4" : recursive === 1 ? "pl-11" : "pl-16",
            activeName === item.name || activeName.split(".")[0] === item.name
              ? `text-blue-600 font-semibold ${
                  item.parent ? "bg-blue-200/20 " : "bg-transparent"
                }`
              : ` text-white ${item.parent && ""}`,
            "hover:bg-slate-300/20",
            classesActive,
          ].join(" ")}
        >
          <div className="flex items-center gap-3">
            {item.icon ? (
              item.icon === "dot" ? (
                <div className="h-3 w-3 flex items-center justify-center">
                  <div
                    className={[
                      `${classesActive ? "h-2 w-2" : "h-1 w-1"}`,
                      "bg-current rounded-full duration-200",
                    ].join(" ")}
                  />
                </div>
              ) : (
                generateIcon(item.icon)
              )
            ) : null}
            <div
              className={`truncate ${
                isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
              }`}
            >
              {item.title}
            </div>
          </div>
          {"child" in item ? (
            <div
              className={`${
                isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            false
          )}
        </a>
        {"child" in item ? (
          <ul
            // ref={(el) => (listRef.current[item.name] = el)}
            className={[
              "overflow-hidden duration-300 ease-in-out",
              isExpand ? "" : isExpandOnHover ? "" : "h-0",
            ].join(" ")}
            style={{ maxHeight: `${openedMenu[item.name]?.height || "0px"}` }}
            key={item.name}
          >
            {item.child.map((value: any, idx: number) =>
              generateMenu(value, idx, recursive + 1)
            )}
          </ul>
        ) : (
          false
        )}
      </li>
    );
  };

  return (
    <nav
      role="navigation"
      className={[
        "border-r dark:border-slate-700 border-gray-800 shadow-sm absolute inset-y-0 left-0",
        "duration-300 ease-in-out md:fixed md:translate-x-0 absolute z-50",
        `${
          isExpand
            ? " bg-gray-900 w-72 bg-opacity-20"
            : isExpandOnHover
              ? " bg-gray-900 w-72 backdrop-blur-md bg-opacity-20"
              : " bg-gray-800 w-20 bg-opacity-20"
        }`,
      ].join(" ")}
    >
      <button
        className="absolute z-50 top-16 -right-3 bg-slate-600 hover:bg-slate-100 text-white hover:text-slate-600 p-0.5 rounded-full border border-slate-200"
        onClick={() => {
          setIsExpand(!isExpand);
          setExpand(!isExpand);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            isExpand ? "rotate-0" : "rotate-180"
          } transform duration-500 h-4 w-4`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        onMouseEnter={() => handleHoverExpand(true)}
        onMouseLeave={() => handleHoverExpand(false)}
        className={`relative h-screen overflow-hidden`}
      >
        <SimpleBar style={{ height: "100%" }} autoHide timeout={100}>
          <div>
            <div className="my-8 flex flex-col items-center h-44 overflow-x-hidden">
              <a
                href={link}
                className={`text-center flex flex-col items-center justify-center`}
              >
                <div
                  className={`overflow-hidden duration-300 ${
                    isExpand
                      ? "h-28 w-28"
                      : isExpandOnHover
                        ? "h-28 w-28"
                        : "h-12 w-12"
                  }`}
                >
                  <Link href="/">
                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                        marginRight: "-0.25rem",
                      }}
                      src="/gif/logo/commune.gif"
                      alt="Commune Logo"
                      width={64}
                      height={64}
                    />
                  </Link>
                </div>
                <div
                  className={`text-base font-semibold text-white mt-3 truncate duration-300 ${
                    isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
                  }`}
                >
                  Commune AI
                </div>
                <div
                  className={`duration-300 text-sm text-white truncate ${
                    isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
                  }`}
                >
                  Multimodal
                </div>
              </a>
            </div>

            <div className="mt-3 mb-10 p-0">
              <ul className="list-none text-sm font-normal px-3">
                {sidebarStructure.map((item, index) =>
                  generateMenu(item, index)
                )}
              </ul>
            </div>
          </div>
        </SimpleBar>
      </div>
    </nav>
  );
};

export default SidebarMenu;
