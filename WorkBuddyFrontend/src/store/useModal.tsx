import type { ReactNode } from "react";
import { create } from "zustand";

type ModalType = 'form' | 'info';


interface ModalI {
    isOpen: boolean;
    type: ModalType;
    renderedComponent: ReactNode;
    openModal: (component: ReactNode, type: ModalType, title?: string, description?: string) => void;
    closeModal: () => void;
    title?: string;
    description?: string;
}

export const useModal = create<ModalI>(set => ({
    isOpen: false,
    type: 'form',
    renderedComponent: null,
    openModal: (component: ReactNode, type: ModalType, title?: string, description?: string) => set(() => ({ isOpen: true, renderedComponent: component, type, title, description })),
    closeModal: () => set(() => ({ isOpen: false }))
}))