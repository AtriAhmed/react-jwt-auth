import { Fragment, useEffect } from "react";
import { Transition } from "@headlessui/react";

function Modal({
  show,
  hide,
  afterEnter = () => {},
  afterLeave = () => {},
  initialFocusRef,
  dialogClassName = "w-full scr600:max-w-[500px] py-20 px-6 scr600:rounded-[50px]",
  children,
}) {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [show]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && show) {
        hide();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, hide]);

  return (
    <Transition.Root
      show={show}
      as={"div"}
      afterEnter={() => {
        afterEnter();
        if (initialFocusRef.current) {
          initialFocusRef.current.focus();
        }
      }}
      afterLeave={afterLeave}
      className={"fixed inset-0 z-10 overflow-y-auto flex items-center justify-center"}
    >
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={hide} />
      </Transition.Child>

      {/* <div className="fixed inset-0 z-10 overflow-y-auto"> */}
      {/* <div className="flex scr600:items-center justify-center min-h-full scr600:p-4 text-center cursor-pointer"> */}
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 scr600:translate-y-0 scr600:scale-95"
        enterTo="opacity-100 translate-y-0 scr600:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 scr600:scale-100"
        leaveTo="opacity-0 translate-y-4 scr600:translate-y-0 scr600:scale-95"
      >
        <div className={`${dialogClassName} relative bg-white text-left shadow-xl transition-all cursor-auto min-h-full scr600:min-h-0`}>{children}</div>
      </Transition.Child>
      {/* </div> */}
      {/* </div> */}
    </Transition.Root>
  );
}

export default Modal;
