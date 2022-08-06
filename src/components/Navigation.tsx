import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ToggleNavigationButton } from "./ToggleNavigationButton";

// Top Navigation Bar
export const Navigation = () => {
    const [toggleMobileMenu, setToggleMobileMenu] = useState<boolean>(false);

    return (
        <div className=''>
            <nav className="p-2 lg:py-2 lg:px-5 max-w-section mx-auto flex items-center justify-between relative">
                <Link href="/dashboard" >
                    <div className="flex items-center">
                        <Image
                            src={'/images/logo/logo.png'}
                            width={75}
                            height={75}
                            className=''
                        />
                    </div>
                </Link>

                <ToggleNavigationButton
                    toggleMobileMenu={toggleMobileMenu}
                    setToggleMobileMenu={setToggleMobileMenu}
                />

                <ul id="navigationLinks" className={`flex gap-x-5 gap-y-0${toggleMobileMenu ? 'nav-list nav-active' : 'nav-list'} `}>
                    <li >
                        <Link href="/">
                            <a>
                                Account
                            </a>
                        </Link>
                    </li>
                    <li >
                        <Link href="/dashboard">
                            <a>
                                Dashboard
                            </a>
                        </Link>
                    </li>
                </ul>

            </nav>
        </div>
    )
}