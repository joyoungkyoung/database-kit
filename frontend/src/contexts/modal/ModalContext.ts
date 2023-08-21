/* eslint-disable @typescript-eslint/no-empty-function */
import { LoadableComponent } from '@loadable/component';
import { createContext } from 'react';

export type ModalPropsType = {
    onClose?: () => void;
    onSubmit?: (_props?: any) => void;
    [key: string]: any;
};
export type ModalType = {
    Component: LoadableComponent<ModalPropsType>;
    props: ModalPropsType;
};
export const ModalStateContext = createContext<ModalType[]>([]);

interface DispatchContext {
    open: (Component: LoadableComponent<ModalPropsType>, props: ModalPropsType) => void;
    close: (Component: LoadableComponent<ModalPropsType>) => void;
}
export const ModalDispatchContext = createContext<DispatchContext>({
    open: () => {},
    close: () => {},
});
