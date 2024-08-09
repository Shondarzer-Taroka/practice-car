'use client'
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
    let pathName = usePathname()
    return (
        <div>
            <Navbar fluid rounded>
                <Navbar.Brand href="https://flowbite-react.com">
                    {/* <h1>Practice car</h1> */}
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Practice car</span>
                </Navbar.Brand>
                <div className="flex md:order-3">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">Bonnie Green</span>
                            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Earnings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>

                    {
                        links.map((link, index) => <Link href={link.path} key={link.path}><li className={`${pathName == link.path && 'text-orange-500'} hover:text-red-600 font-semibold`}>{link.title}</li></Link>)
                    }
                </Navbar.Collapse>
            </Navbar>

        </div>
    );
};

const links = [
    {
        title: 'Home',
        path: '/'
    },
    {
        title: 'About',
        path: '/about'
    },
    {
        title: 'Services',
        path: '/services'
    },
    {
        title: 'Blog',
        path: '/blog'
    },
    {
        title: 'My bookings',
        path: '/my-bookings'
    },
]

export default NavBar;