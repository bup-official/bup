import { Dispatch, SetStateAction } from "react"

// Navigation Button
export const ToggleNavigationButton: React.FC<{
    toggleMobileMenu: boolean,
    setToggleMobileMenu: Dispatch<SetStateAction<boolean>>
}> = ({ toggleMobileMenu, setToggleMobileMenu }) => {

    return (
        <button
            aria-expanded={toggleMobileMenu ? 'true' : 'false'}
            aria-controls="navigationLinks"
            title="Open and Close Navigation"
            onClick={() => setToggleMobileMenu(!toggleMobileMenu)}
            className="lg:hidden"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
    )
}
