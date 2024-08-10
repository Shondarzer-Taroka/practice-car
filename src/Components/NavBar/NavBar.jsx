'use client'
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
    let session=useSession()
    let pathName = usePathname()
    // console.log(session?.data);
    
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
                            <Avatar className="border" alt="User settings" img={session?.data?.user?.image} rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">Bonnie Green</span>
                            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                        </Dropdown.Header>
                        <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Earnings</Dropdown.Item>
                        <Dropdown.Divider />
                       {session.data?.user?.email &&  <Dropdown.Item onClick={()=> signOut()}>Sign out</Dropdown.Item> }
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