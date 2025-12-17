import { create } from "zustand";


interface MobileMenuStore {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

const MobileMenuStore = create<MobileMenuStore>((set) => ({
    isSidebarOpen: false,
    setIsSidebarOpen: (isSidebarOpen) => set(() => ({ isSidebarOpen }))
})) 

export function useMobileMenu () {

    const {isSidebarOpen, setIsSidebarOpen} = MobileMenuStore()

    function openMenu () {
        setIsSidebarOpen(true);
    }

    function closeMenu () {
        setIsSidebarOpen(false);
    }

    return { isSidebarOpen, openMenu, closeMenu }

}