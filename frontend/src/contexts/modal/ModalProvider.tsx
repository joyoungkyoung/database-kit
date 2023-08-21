import { LoadableComponent } from "@loadable/component";
import { PropsWithChildren, useMemo, useState } from "react";
import { ModalDispatchContext, ModalPropsType, ModalStateContext, ModalType } from "./ModalContext";
import ModalRender from "./Modals";

const ModalProvider = ({ children }: PropsWithChildren) => {
    const [openedModals, setOpenedModals] = useState<ModalType[]>([]);

    const open = (Component: LoadableComponent<ModalPropsType>, props: any) => {
        setOpenedModals((modals) => {
            return [...modals, { Component, props }];
        });
    };
    const close = (Component: LoadableComponent<ModalPropsType>) => {
        setOpenedModals((modals) => {
            return modals.filter((modal) => modal.Component !== Component);
        });
    };

    const dispatch = useMemo(() => ({ open, close }), []);

    return (
        <ModalDispatchContext.Provider value={dispatch}>
            <ModalStateContext.Provider value={openedModals}>
                {children}
                <ModalRender />
            </ModalStateContext.Provider>
        </ModalDispatchContext.Provider>
    );
};

export default ModalProvider;
