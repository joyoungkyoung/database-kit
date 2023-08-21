import { ModalDispatchContext, ModalPropsType } from "@/contexts/modal/ModalContext";
import { ModalList, modals } from "@/contexts/modal/Modals";
import { LoadableComponent } from "@loadable/component";
import { useContext } from "react";

export default function useModal() {
    const { open, close } = useContext(ModalDispatchContext);

    const openModal = (modalKey: ModalList, props: ModalPropsType) => {
        const Component: LoadableComponent<ModalPropsType> = modals[modalKey];

        open(Component, props);
    };

    const closeModal = (Component: LoadableComponent<ModalPropsType>) => close(Component);

    return { openModal, closeModal };
}
