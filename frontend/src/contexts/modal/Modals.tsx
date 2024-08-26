import loadable from "@loadable/component";
import React, { useContext } from "react";
import { ModalDispatchContext, ModalStateContext } from "./ModalContext";

export const modals = {
    TwoButtonModal: loadable(() => import("@/components/Modals/TwoButtonModal")),
    SchemaModal: loadable(() => import("@/components/Modals/SchemaModal")),
};

export type ModalList = keyof typeof modals;

const ModalRender = () => {
    const openedModals = useContext(ModalStateContext);
    const { close } = useContext(ModalDispatchContext);

    return (
        <React.Fragment>
            {openedModals.map((modal, index) => {
                const { Component, props } = modal;

                const { onSubmit = () => {}, onClose = () => {}, ...restProps } = props;
                const handleClose = async () => {
                    await onClose?.();
                    close(Component);
                };
                const handleSubmit = async (_props?: any) => {
                    await onSubmit?.(_props);
                    close(Component);
                };

                return <Component key={index} onSubmit={handleSubmit} onClose={handleClose} {...restProps} />;
            })}
        </React.Fragment>
    );
};

export default ModalRender;
